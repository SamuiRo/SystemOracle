const { exec } = require('child_process');
const { Notification } = require('../shared/notification');
const { TITLE, TELEGRAM_COMMAND_RUNNER_FORUM_ID } = require('../configs/app.config');

class CommandRunner {
    /**
     * Конструктор класу.
     * @param {string[]} commands - Масив команд для виконання.
     * @param {Notification} notif - Екземпляр класу Notification для надсилання повідомлень.
     * Якщо не передано, буде створено новий.
     */
    constructor(commands = [], notif = new Notification({ message_thread_id: TELEGRAM_COMMAND_RUNNER_FORUM_ID })) {
        this.commands = commands;
        this.notif = notif;
    }

    /**
     * Виконує одну команду і повертає результат.
     * @param {string} cmd - Команда для виконання.
     * @returns {Promise<string>} - Результат виконання команди.
     */
    async run_cmd(cmd) {
        return new Promise((resolve) => {
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    resolve(`\nКоманда: \`${cmd}\`\nПомилка: \`${error.message}\`\nStderr: \`${stderr}\``);
                } else {
                    resolve(`\nКоманда: \`${cmd}\`\nВихідні дані: \`${stdout.trim() || 'Немає виводу'}\``);
                }
            });
        });
    }

    /**
     * Виконує всі команди з масиву.
     * @returns {Promise<string>} - Об'єднаний результат виконання всіх команд.
     */
    async run_all() {
        let results = `*${TITLE} - cmd report:*\n`;
        for (const cmd of this.commands) {
            const result = await this.run_cmd(cmd);
            results += result + "\n";
        }
        return results;
    }

    /**
     * Виконує всі команди та надсилає результат за допомогою Notification.
     * @returns {Promise<void>}
     */
    async run() {
        const results = await this.run_all();
        await this.notif.send(results);
    }
}

module.exports = CommandRunner;