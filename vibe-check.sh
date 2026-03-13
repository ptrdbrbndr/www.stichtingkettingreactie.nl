#!/bin/bash
# vibe-check.sh — Run all vibe tests and report results
# Usage: ./vibe-check.sh
# Set VIBE_BASE_URL to override base URL (default: http://localhost:3000)

set -e

VIBE_BASE_URL=${VIBE_BASE_URL:-http://localhost:3000}

echo "🧪 Vibe Check — stichtingkettingreactie.nl"
echo "   Base URL: $VIBE_BASE_URL"
echo ""

# Run only vibe tests
VIBE_BASE_URL=$VIBE_BASE_URL npx playwright test tests/vibe/ --reporter=list

echo ""
echo "✅ Vibe Check complete"
