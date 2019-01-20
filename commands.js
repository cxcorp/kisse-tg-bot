const { allowedToSendToChatAlready } = require('./flood-control')
const api = require('./api')

/**
 * Sends a "Loading..." message, then removes it after the action has finished.
 * @param {TelegramClient} tgClient
 * @param {string} chatId
 * @param {() => Promise<void>} action
 * @returns {Promise<void>}
 */
const doWithLoadingMessage = async (tgClient, chatId, action) => {
  const opts = {
    parse_mode: 'markdown',
    disable_notification: true
  }

  const loadingMessage = await tgClient.sendMessage(
    chatId,
    '_Kisse lataa..._',
    opts
  )
  await action()
  await tgClient.deleteMessage(chatId, loadingMessage.message_id)
}

const createCatCommand = (tgClient, getApiUrl) => msg => {
  const chatId = msg.chat.id
  if (!allowedToSendToChatAlready(chatId)) return

  doWithLoadingMessage(
    tgClient,
    chatId,
    async () => await tgClient.sendPhoto(chatId, getApiUrl())
  )
}

const attachCommands = tgClient => {
  tgClient.onText(
    /^\/kisse\b/,
    createCatCommand(tgClient, api.getCatPictureUrl)
  )
  tgClient.onText(/^\/kissegif\b/, createCatCommand(tgClient, api.getCatGifUrl))
}

module.exports = {
  attachCommands
}
