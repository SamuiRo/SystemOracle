const axios = require("axios")
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID, TELEGRAM_FORUM_ID } = require("../configs/app.config")

class Notification {
    constructor(defaultOptions = {}) {
        this.defaultOptions = {
            chat_id: TELEGRAM_CHANNEL_ID,
            message_thread_id: TELEGRAM_FORUM_ID,
            ...defaultOptions
        };
    }

    async send_message_to_telegram(message, options = {}) {
        const chat_id = options.chat_id || this.defaultOptions.chat_id;
        const message_thread_id =
            options.message_thread_id ? options.message_thread_id : this.defaultOptions.message_thread_id;

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const payload = {
            chat_id,
            text: message,
            parse_mode: "Markdown"
        };

        if (message_thread_id) payload.message_thread_id = message_thread_id;

        try {
            const response = await axios.post(url, payload);
            console.log("Message sent successfully:", response.data.ok);
            return response.data;
        } catch (error) {
            console.error("Error sending message:", error.response ? error.response.data : error.message);
        }
    }

    async send(message, options = {}) {
        return this.send_message_to_telegram(message, options);
    }
}

/**
 * Функція для відправки повідомлення в простий чат або форумний топік
 * @param {string} message - Текст повідомлення, яке потрібно відправити
 * @param {string} chat_id - ID чату, в який потрібно надіслати повідомлення (за замовчуванням з .env)
 * @param {number} [message_thread_id] - ID форумного топіку (необов'язковий параметр)
 */
async function send_message_to_telegram(message, chat_id, message_thread_id = null) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const payload = {
            chat_id: chat_id,
            text: message,
            parse_mode: "Markdown"
        };

        if (message_thread_id) payload.message_thread_id = message_thread_id;

        const response = await axios.post(url, payload);
        console.log('Message sent successfully:', response.data.ok);
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
};

async function notify(content) {
    try {
        let message = content

        await send_message_to_telegram(message, TELEGRAM_CHANNEL_ID, TELEGRAM_FORUM_ID)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    notify,
    Notification
};