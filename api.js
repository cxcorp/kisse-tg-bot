const uuid = require('uuid/v4')

const getCatGifUrl = () =>
  `https://cataas.com/cat/gif?telegram_no_cache_plz=${encodeURIComponent(
    uuid()
  )}`

const getCatPictureUrl = () =>
  `https://cataas.com/cat?telegram_no_cache_plz=${encodeURIComponent(uuid())}`

module.exports = {
  getCatGifUrl,
  getCatPictureUrl
}
