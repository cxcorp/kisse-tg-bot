const { timestamp } = require('./util')
const { FLOOD_CONTROL_MS } = require('./config')

const chatIdToPreviousSentTimestamp = {}

function allowedToSendToChatAlready(id) {
  const now = timestamp()

  const prevTimestamp = chatIdToPreviousSentTimestamp[id]
  chatIdToPreviousSentTimestamp[id] = now

  if (!prevTimestamp) return true
  return now - prevTimestamp >= FLOOD_CONTROL_MS
}

module.exports = {
  allowedToSendToChatAlready
}
