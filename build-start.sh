#!/bin/bash

# === Advanced Lint + Build + Start Script with Logging ===
# Author: Md Rabiul Khan
# Description: Runs lint --fix, build, and start sequentially and logs output with timestamps.

LOG_FILE="build-log.txt"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Log helper function
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

echo "=========================================" | tee -a $LOG_FILE
log "🚀 Build Script Started"

# Step 1: Lint Fix
log "🧹 Step 1: Running ESLint with auto-fix..."
npm run lint:fix 2>&1 | tee -a $LOG_FILE
if [ ${PIPESTATUS[0]} -ne 0 ]; then
  log "❌ Lint failed. Fix the errors and try again."
  exit 1
else
  log "✅ Lint completed successfully!"
fi

# Step 2: Build
log "🏗️ Step 2: Building project..."
npm run build 2>&1 | tee -a $LOG_FILE
if [ ${PIPESTATUS[0]} -ne 0 ]; then
  log "❌ Build failed. Please check the errors."
  exit 1
else
  log "✅ Build completed successfully!"
fi

# Step 3: Start Server
log "🚀 Step 3: Starting production server..."
npm start 2>&1 | tee -a $LOG_FILE
if [ ${PIPESTATUS[0]} -ne 0 ]; then
  log "❌ Failed to start the server."
  exit 1
else
  log "✅ Server started successfully!"
fi

log "🎯 All steps completed successfully!"
echo "=========================================" | tee -a $LOG_FILE
