import DJS, { GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
import axios from 'axios'
const yf = require('yahoo-fantasy')

dotenv.config()

const client = new DJS.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
  ],
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`)

  client.user?.setPresence({
    status: 'dnd',
    activities: [
      {
        name: 'Fantasy Football',
      },
    ],
  })

  const guildID = '1012180041947435048'
  const guild = client.guilds.cache.get(guildID)
  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application?.commands
  }

  commands?.create({
    name: 'ping',
    description: "Replies with the bot's ping to the server",
  })

  commands?.create({
    name: 'abc',
    description: 'Replies with test data from dummy API',
  })
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName, options } = interaction

  if (commandName === 'ping') {
    interaction.reply({
      content: `Latency: ${client.ws.ping} ms`,
      ephemeral: true,
    })
  } else if (commandName === 'abc') {
    let uri = 'https://jsonplaceholder.typicode.com/todos/1'
    const { data } = await axios.get(uri)
    console.log(data)
    interaction.reply({
      content: data.title,
      ephemeral: true,
    })
  }
})

client.login(process.env.TOKEN)
