if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const { TG_API_TOKEN, CAT_API_URL, HEROKU_APP_NAME } = process.env
const WEBHOOK_PORT = parseInt(process.env.PORT || '1234', 10)
const FLOOD_CONTROL_MS = parseInt(process.env.FLOOD_CONTROL_MS || '3000', 10)

const isHeroku = () => !!HEROKU_APP_NAME

module.exports = {
  TG_API_TOKEN,
  CAT_API_URL,
  FLOOD_CONTROL_MS,
  WEBHOOK_PORT,
  HEROKU_APP_NAME,
  isHeroku
}
