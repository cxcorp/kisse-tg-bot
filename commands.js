const fetch = require('node-fetch')
const fileType = require('file-type')
const { allowedToSendToChatAlready } = require('./flood-control')
const { CAT_API_URL } = require('./config')

const FETCH_OPTS = {
  headers: {
    'User-Agent': 'Kisse Telegram Bot (github.com/cxcorp/kisse-tg-bot)'
  },
  timeout: 5000
}

const createCatCommand = (tgClient, apiEndpoint) => msg => {
  const chatId = msg.chat.id
  if (!allowedToSendToChatAlready(chatId)) return

  doWithLoadingMessage(tgClient, chatId, async () => {
    const res = await fetch(`${CAT_API_URL}${apiEndpoint}`, FETCH_OPTS)
    const buffer = await res.buffer()

    const { ext, mime } = fileType(buffer)
    tgClient.sendPhoto(
      chatId,
      buffer,
      {},
      {
        filename: `kisse_${new Date().getTime()}.${ext}`,
        contentType: mime
      }
    )
  })
}

/**
 * Sends a "Loading..." message, then removes it after the action has finished.
 * @param {TelegramClient} tgClient
 * @param {string} chatId
 * @param {() => Promise<void>} action
 * @returns {Promise<void>}
 */
async function doWithLoadingMessage(tgClient, chatId, action) {
  const opts = {
    parse_mode: 'markdown',
    disable_notification: true
  }

  const loadingMessage = await tgClient.sendMessage(
    chatId,
    '_Kissakuva lataa..._',
    opts
  )
  await action()
  await tgClient.deleteMessage(chatId, loadingMessage.message_id)
}

const attachCommands = tgClient => {
  tgClient.onText(/^\/kisse\b/, createCatCommand(tgClient, '/cat'))
  tgClient.onText(/^\/kissegif\b/, createCatCommand(tgClient, '/cat/gif'))
}

module.exports = {
  attachCommands
}
