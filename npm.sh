#!/bin/bash

# === Ultimate NPM + Git Auto Commit Script ===
# Usage:
#   ./npm.sh dev
#   ./npm.sh build
#   ./npm.sh commit ""your message"
#   ./npm.sh daily

CMD=$1
MSG=$2

# Predefined messages
MESSAGES=(
  "feat: 🎨 improve UI layout"
  "fix: 🐛 correct navbar bug"
  "docs: 📝 update README"
  "style: ✨ improve button hover"
  "refactor: 🔧 optimize API calls"
  "perf: ⚡ speed up image loading"
  "test: ✅ add unit tests"
  "chore: 📦 update dependencies"
  "fix: 🐛 resolve login issue"
  "feat: 🚀 add dark mode toggle"
)

# Function: Single commit
git_commit() {
  if [ -z "$MSG" ]; then
    echo "❌ Please provide a commit message!"
    echo "👉 Example: ./npm.sh commit \"fixed navbar\""
    exit 1
  fi
  git add .
  git commit -m "$MSG"
  git push
  echo "$(date '+%Y-%m-%d %H:%M:%S') — $MSG" >> commit-log.txt
  echo "✅ Commit done & logged successfully!"
}

# Function: Daily auto commits
daily_commit() {
  echo "🕒 Starting 30 daily auto commits..."
  for i in {1..30}; do
    RANDOM_MSG=${MESSAGES[$RANDOM % ${#MESSAGES[@]}]}
    git add .
    git commit -m "$RANDOM_MSG"
    git push
    echo "$(date '+%Y-%m-%d %H:%M:%S') — $RANDOM_MSG" >> commit-log.txt
    echo "✅ Commit $i: $RANDOM_MSG"
    sleep 1  # optional small delay
  done
  echo "🎉 30 auto commits completed!"
}

# Main switch
case $CMD in
  build)
    echo "🏗️ Building project..."
    npm run build
    ;;
  dev)
    echo "⚙️ Starting dev server..."
    npm run dev
    ;;
  lint)
    echo "🧹 Running ESLint..."
    npm run lint
    ;;
  start)
    echo "🚀 Starting production server..."
    npm start
    ;;
  install)
    echo "📦 Installing dependencies..."
    npm install
    ;;
  clean)
    echo "🧽 Cleaning project..."
    rm -rf node_modules package-lock.json
    npm install
    ;;
  commit)
    git_commit
    ;;
  daily)
    daily_commit
    ;;
  *)
    echo "❌ Invalid command: '$CMD'"
    echo "👉 Available: build | dev | lint | start | install | clean | commit | daily"
    ;;
esac
