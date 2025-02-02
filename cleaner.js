const CommandRunner = require("./src/cleaner/core")
const cleaning_commands = require("./src/data/cleaner.command")

async function main() {
    try {
        console.log("Cleaner is running...")
        const runner = new CommandRunner(cleaning_commands);
        await runner.run();

        setInterval(() => runner.run(), 1000 * 60 * 60 * 24);
    } catch (error) {
        console.log(error)
    }
}

main();