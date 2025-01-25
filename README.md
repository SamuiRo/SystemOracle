# SystemOracle

Цей скрипт дозволяє моніторити ресурси VPS (CPU, RAM, місце на диску, процеси) і надсилати дані в Telegram.

## Особливості

- Легкий у використанні.
- Надсилає системну інформацію в Telegram кожні 5 хвилин.
- Простий у розгортанні завдяки `npm`.

---

## Як встановити

1. **Клонувати репозиторій:**

2. Run  ` npm install `

3. Copy ` cp .env.example .env `

4. Fill ` .env ` to edit use ` nano .env `
    - TITLE
    - TELEGRAM_BOT_TOKEN
    - TELEGRAM_CHANNEL_ID
    - TELEGRAM_FORUM_ID (Optional if you use Telegram super group)

5. Manual running ` npm start `

6. Setup as service ` npm run setup-service `

7. How check service status: ` sudo systemctl status system-oracle `

8. Stop service: ` sudo systemctl stop system-oracle `

9. Manual start service: ` sudo systemctl start system-oracle `
