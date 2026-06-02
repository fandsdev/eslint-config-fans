#!/bin/bash
INPUT=$(cat)
ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active')

if [ "$ACTIVE" = "true" ]; then
  ./node_modules/.bin/nano-staged --unstaged --quiet || true
  exit 0
fi

./node_modules/.bin/nano-staged --unstaged --quiet --bail || exit 2
