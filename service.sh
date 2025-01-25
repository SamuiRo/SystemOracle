#!/bin/bash

SERVICE_NAME="system-oracle"
WORK_DIR=$(pwd)
NODE_PATH=$(which node)

# Створення systemd-сервісу
echo "[Unit]
Description=System Oracle
After=network.target

[Service]
ExecStart=${NODE_PATH} ${WORK_DIR}/oracle.js
Restart=always
User=$(whoami)
EnvironmentFile=${WORK_DIR}/.env

[Install]
WantedBy=multi-user.target
" | sudo tee /etc/systemd/system/$SERVICE_NAME.service

# Запуск сервісу
sudo systemctl enable $SERVICE_NAME
sudo systemctl start $SERVICE_NAME

echo "Oracle Monitoring $SERVICE_NAME created and started!"