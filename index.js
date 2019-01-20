const { createClient } = require('./client')
const { attachCommands } = require('./commands')
const config = require('./config')

console.log('Starting bot...')

const getWebHookUrl = () =>
  `https://${config.HEROKU_APP_NAME}.herokuapp.com/bot${config.TG_API_TOKEN}`

const opts = { apiToken: config.TG_API_TOKEN }
if (config.isHeroku()) {
  opts.webhook = {
    url: getWebHookUrl(),
    port: config.WEBHOOK_PORT
  }
}

const client = createClient(opts)
attachCommands(client)

console.log('Bot started')
