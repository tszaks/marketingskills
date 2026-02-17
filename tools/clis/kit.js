#!/usr/bin/env node

const API_SECRET = process.env.KIT_API_SECRET
const API_KEY = process.env.KIT_API_KEY
const BASE_URL = 'https://api.convertkit.com/v3'

if (!API_SECRET && !API_KEY) {
  console.error(JSON.stringify({ error: 'KIT_API_SECRET or KIT_API_KEY environment variable required' }))
  process.exit(1)
}

async function api(method, path, body, useSecret = true) {
  const url = new URL(`${BASE_URL}${path}`)
  if (method === 'GET' || method === 'DELETE') {
    if (useSecret && API_SECRET) {
      url.searchParams.set('api_secret', API_SECRET)
    } else if (API_KEY) {
      url.searchParams.set('api_key', API_KEY)
    }
  }
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body && (method === 'POST' || method === 'PUT')) {
    const authBody = { ...body }
    if (useSecret && API_SECRET) {
      authBody.api_secret = API_SECRET
    } else if (API_KEY) {
      authBody.api_key = API_KEY
    }
    opts.body = JSON.stringify(authBody)
  }
  if (args['dry-run']) {
    const dryRunHeaders = { ...opts.headers }
    const dryRunUrl = url.toString().replace(API_SECRET, '***').replace(API_KEY, '***')
    let dryRunBody = undefined
    if (opts.body) {
      const parsed = JSON.parse(opts.body)
      if (parsed.api_secret) parsed.api_secret = '***'
      if (parsed.api_key) parsed.api_key = '***'
      dryRunBody = parsed
    }
    return { _dry_run: true, method, url: dryRunUrl, headers: dryRunHeaders, body: dryRunBody }
  }
  const res = await fetch(url.toString(), opts)
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { status: res.status, body: text }
  }
}

function parseArgs(args) {
  const result = { _: [] }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const next = args[i + 1]
      if (next && !next.startsWith('--')) {
        result[key] = next
        i++
      } else {
        result[key] = true
      }
    } else {
      result._.push(arg)
    }
  }
  return result
}

const args = parseArgs(process.argv.slice(2))
const [cmd, sub, ...rest] = args._

async function main() {
  let result

  switch (cmd) {
    case 'subscribers':
      switch (sub) {
        case 'list': {
          const params = args.page ? `&page=${args.page}` : ''
          result = await api('GET', `/subscribers?${params}`)
          break
        }
        case 'get':
          result = await api('GET', `/subscribers/${rest[0]}`)
          break
        case 'update': {
          const body = {}
          if (args['first-name']) body.first_name = args['first-name']
          if (args.fields) body.fields = JSON.parse(args.fields)
          result = await api('PUT', `/subscribers/${rest[0]}`, body)
          break
        }
        case 'unsubscribe': {
          const body = { email: args.email }
          result = await api('PUT', '/unsubscribe', body)
          break
        }
        default:
          result = { error: 'Unknown subscribers subcommand. Use: list, get, update, unsubscribe' }
      }
      break

    case 'forms':
      switch (sub) {
        case 'list':
          result = await api('GET', '/forms', null, false)
          break
        case 'subscribe': {
          const formId = rest[0]
          const body = { email: args.email }
          if (args['first-name']) body.first_name = args['first-name']
          if (args.fields) body.fields = JSON.parse(args.fields)
          result = await api('POST', `/forms/${formId}/subscribe`, body, false)
          break
        }
        default:
          result = { error: 'Unknown forms subcommand. Use: list, subscribe' }
      }
      break

    case 'sequences':
      switch (sub) {
        case 'list':
          result = await api('GET', '/sequences', null, false)
          break
        case 'subscribe': {
          const sequenceId = rest[0]
          const body = { email: args.email }
          if (args['first-name']) body.first_name = args['first-name']
          if (args.fields) body.fields = JSON.parse(args.fields)
          result = await api('POST', `/sequences/${sequenceId}/subscribe`, body, false)
          break
        }
        default:
          result = { error: 'Unknown sequences subcommand. Use: list, subscribe' }
      }
      break

    case 'tags':
      switch (sub) {
        case 'list':
          result = await api('GET', '/tags', null, false)
          break
        case 'subscribe': {
          const tagId = rest[0]
          const body = { email: args.email }
          if (args['first-name']) body.first_name = args['first-name']
          if (args.fields) body.fields = JSON.parse(args.fields)
          result = await api('POST', `/tags/${tagId}/subscribe`, body, false)
          break
        }
        case 'remove': {
          const tagId = rest[0]
          const subscriberId = rest[1] || args['subscriber-id']
          result = await api('DELETE', `/subscribers/${subscriberId}/tags/${tagId}`)
          break
        }
        default:
          result = { error: 'Unknown tags subcommand. Use: list, subscribe, remove' }
      }
      break

    case 'broadcasts':
      switch (sub) {
        case 'list': {
          const params = args.page ? `&page=${args.page}` : ''
          result = await api('GET', `/broadcasts?${params}`)
          break
        }
        case 'create': {
          const body = {
            subject: args.subject,
            content: args.content,
          }
          if (args['email-layout-template']) body.email_layout_template = args['email-layout-template']
          result = await api('POST', '/broadcasts', body)
          break
        }
        default:
          result = { error: 'Unknown broadcasts subcommand. Use: list, create' }
      }
      break

    default:
      result = {
        error: 'Unknown command',
        usage: {
          subscribers: 'subscribers [list|get|update|unsubscribe] [id] [--email <email>] [--first-name <name>] [--fields <json>] [--page <n>]',
          forms: 'forms [list|subscribe] [form_id] [--email <email>] [--first-name <name>] [--fields <json>]',
          sequences: 'sequences [list|subscribe] [sequence_id] [--email <email>] [--first-name <name>] [--fields <json>]',
          tags: 'tags [list|subscribe|remove] [tag_id] [subscriber_id] [--email <email>] [--subscriber-id <id>]',
          broadcasts: 'broadcasts [list|create] [--subject <subject>] [--content <html>] [--email-layout-template <template>] [--page <n>]',
        }
      }
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }))
  process.exit(1)
})
