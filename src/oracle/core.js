const si = require('systeminformation');
const { notify } = require("../shared/notification")
const { TITLE } = require("../configs/app.config")

async function launch() {
    try {
        await sendMetrics()
        setInterval(sendMetrics, 5 * 60 * 1000);
    } catch (error) {
        console.log(error)
    }
}

async function getSystemMetrics() {
    try {
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        const disk = await si.fsSize();
        const processes = await si.processes();
        const time = await si.time();

        const uptimeMinutes = Math.floor(time.uptime / 60);
        const uptimeHours = Math.floor(uptimeMinutes / 60);
        const uptimeDays = Math.floor(uptimeHours / 24);

        const diskInfo = disk[0]; // Перший том диска
        const diskUsedGB = (diskInfo.used / 1024 / 1024 / 1024).toFixed(2); // Використано в GB
        const diskSizeGB = (diskInfo.size / 1024 / 1024 / 1024).toFixed(2); // Загалом в GB
        const diskFreeGB = (diskSizeGB - diskUsedGB).toFixed(2); // Вільно в GB

        const activeProcesses = processes.running;
        const totalProcesses = processes.all;

        return `
📟 *${TITLE}:*

🖥️ *CPU:*
  - Load: *${cpu.currentLoad.toFixed(2)}%*
  - Cores: *${cpu.cpus.length}*

💾 *RAM:*
  - Used: *${(mem.used / 1024 / 1024).toFixed(2)} MB*
  - Total: *${(mem.total / 1024 / 1024).toFixed(2)} MB*
  - Free: *${(mem.free / 1024 / 1024).toFixed(2)} MB*

📂 *Disc:*
  - Used: *${diskUsedGB} GB*
  - Total: *${diskSizeGB} GB*
  - Free: *${diskFreeGB} GB*

📋 *Processes:*
  - Active: *${activeProcesses}*
  - Total: *${totalProcesses}*

⏱️ *Uptime:*
  - System running *${uptimeDays} days, ${uptimeHours % 24} hours, ${uptimeMinutes % 60} minutes*

🛠️ *Auto mode enabled*.

    `;;
    } catch (error) {
        console.log(error)
    }
}

async function sendMetrics() {
    const metrics = await getSystemMetrics();
    await notify(metrics);
}

module.exports = {
    launch
}
