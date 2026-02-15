#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SKILLS_DIR="skills"
ISSUES=0
WARNINGS=0
PASSED=0

echo "🔍 Auditing Skills Against Agent Skills Specification"
echo "======================================================"
echo ""

# Validation rules from CLAUDE.md
# name: 1-64 chars, lowercase a-z, numbers, hyphens only
# description: 1-1024 chars with trigger phrases
# SKILL.md: under 500 lines
# Required fields: name, description

for skill_dir in "$SKILLS_DIR"/*/; do
    skill_name=$(basename "$skill_dir")
    skill_file="$skill_dir/SKILL.md"

    echo -n "📋 $skill_name: "

    # Check if SKILL.md exists
    if [[ ! -f "$skill_file" ]]; then
        echo -e "${RED}❌ Missing SKILL.md${NC}"
        ((ISSUES++))
        continue
    fi

    # Extract frontmatter
    frontmatter=$(sed -n '/^---$/,/^---$/p' "$skill_file" | head -n -1 | tail -n +2)

    # Check name field
    name_in_file=$(echo "$frontmatter" | grep "^name:" | sed 's/^name: //' | tr -d ' ')

    if [[ -z "$name_in_file" ]]; then
        echo -e "${RED}❌ Missing name in frontmatter${NC}"
        ((ISSUES++))
        continue
    fi

    # Check name matches directory
    if [[ "$name_in_file" != "$skill_name" ]]; then
        echo -e "${RED}❌ Name mismatch: dir='$skill_name' but frontmatter='$name_in_file'${NC}"
        ((ISSUES++))
        continue
    fi

    # Validate name format: lowercase, alphanumeric, hyphens only
    if ! [[ "$name_in_file" =~ ^[a-z0-9]([a-z0-9-]{0,62}[a-z0-9])?$ ]]; then
        echo -e "${RED}❌ Invalid name format: '$name_in_file'${NC}"
        ((ISSUES++))
        continue
    fi

    # Check name length (1-64 chars)
    if [[ ${#name_in_file} -lt 1 || ${#name_in_file} -gt 64 ]]; then
        echo -e "${RED}❌ Name length invalid: ${#name_in_file} chars (must be 1-64)${NC}"
        ((ISSUES++))
        continue
    fi

    # Extract description
    description=$(echo "$frontmatter" | grep "^description:" | sed 's/^description: //' | sed 's/^"//' | sed 's/"$//')

    if [[ -z "$description" ]]; then
        echo -e "${RED}❌ Missing description in frontmatter${NC}"
        ((ISSUES++))
        continue
    fi

    # Check description length (1-1024 chars)
    desc_len=${#description}
    if [[ $desc_len -lt 1 || $desc_len -gt 1024 ]]; then
        echo -e "${RED}❌ Description length invalid: $desc_len chars (must be 1-1024)${NC}"
        ((ISSUES++))
        continue
    fi

    # Check for trigger phrases in description (at least "also use when" or similar)
    if ! echo "$description" | grep -qi "when\|also\|mention\|use"; then
        echo -e "${YELLOW}⚠️  Warning: Description lacks trigger phrases${NC}"
        ((WARNINGS++))
    fi

    # Count lines in SKILL.md
    line_count=$(wc -l < "$skill_file")
    if [[ $line_count -gt 500 ]]; then
        echo -e "${YELLOW}⚠️  Warning: SKILL.md is $line_count lines (should be <500)${NC}"
        ((WARNINGS++))
    fi

    # All checks passed
    echo -e "${GREEN}✓ Valid${NC}"
    ((PASSED++))
done

echo ""
echo "======================================================"
echo "Summary:"
echo -e "  ${GREEN}✓ Passed: $PASSED${NC}"
if [[ $WARNINGS -gt 0 ]]; then
    echo -e "  ${YELLOW}⚠️  Warnings: $WARNINGS${NC}"
fi
if [[ $ISSUES -gt 0 ]]; then
    echo -e "  ${RED}❌ Issues: $ISSUES${NC}"
fi
echo ""

if [[ $ISSUES -eq 0 ]]; then
    echo -e "${GREEN}All skills are valid! ✓${NC}"
    exit 0
else
    echo -e "${RED}Found $ISSUES issue(s) that need fixing.${NC}"
    exit 1
fi
