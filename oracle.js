const Oracle = require("./src/oracle/core")

async function main() {
    try {
        console.log("Oracle is running...")
        await Oracle.launch()
    } catch (error) {
        console.log(error)
    }
}

main()