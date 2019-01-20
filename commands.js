const { allowedToSendToChatAlready } = require('./flood-control')
const api = require('./api')

const createCatCommand = (tgClient, getApiUrl) => msg => {
  const chatId = msg.chat.id
  if (!allowedToSendToChatAlready(chatId)) return

  tgClient.sendPhoto(chatId, getApiUrl())
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
