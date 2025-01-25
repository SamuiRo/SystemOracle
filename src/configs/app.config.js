require("dotenv").config()

module.exports = {
    TITLE: process.env.TITLE,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHANNEL_ID: process.env.TELEGRAM_CHANNEL_ID,
    TELEGRAM_FORUM_ID: process.env.TELEGRAM_FORUM_ID,

}