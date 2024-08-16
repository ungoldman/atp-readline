import { AtpAgent } from '@atproto/api'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const encouragements = [
    "now that's what i call poastin",
    'poasted',
    'uploaded to the mainframe',
    "we're in 😎",
    'zing',
    'proud of you',
    'you bring honor to this house',
    'try again'
]

function getConfig (): Array<string> {
    const { ATP_SERVICE: service, ATP_USERNAME: identifier, ATP_PASSWORD: password } = process.env
    const config = [service, identifier, password]
    if (config.some(c => c == null)) {
        console.log("Don't forget to set ATP_SERVICE, ATP_USERNAME, and ATP_PASSWORD in a `.env` file!!!")
        process.exit(0)
    }
    return config
}

async function start (): Promise<void> {
    const [service, identifier, password] = getConfig()
    const agent = new AtpAgent({ service })

    await agent.login({ identifier, password })

    console.log(`\nWELCOME 🔥 ${identifier.toUpperCase()} 🔥\n\nIT IS POASTING TIME\n`)

    const rl = readline.createInterface({ input, output })
    let text = await rl.question('> ')

    while (text.trim() !== '') {
        await agent.post({ text })
        console.log(encouragements[Math.floor(Math.random() * encouragements.length)])
        text = await rl.question('> ')
    }

    console.log('\nSEE YOU SPACE COWBOY...\n')
    rl.close()
}

start()
