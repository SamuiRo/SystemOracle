#!/bin/bash

SERVICE_NAME="system-cleaner"
WORK_DIR=$(pwd)
NODE_PATH=$(which node)

echo "[Unit]
Description=System Cleaner Service
After=network.target

[Service]
ExecStart=${NODE_PATH} ${WORK_DIR}/cleaner.js
Restart=always
User=$(whoami)
EnvironmentFile=${WORK_DIR}/.env

[Install]
WantedBy=multi-user.target
" | sudo tee /etc/systemd/system/${SERVICE_NAME}.service

# Запуск і увімкнення сервісу
sudo systemctl enable ${SERVICE_NAME}
sudo systemctl start ${SERVICE_NAME}

echo "Service ${SERVICE_NAME} created and started!"