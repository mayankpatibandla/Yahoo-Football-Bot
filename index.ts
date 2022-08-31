import DiscordJS, { GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new DiscordJS.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
  ],
})

client.on('ready', () => {
  console.log('Bot is ready')

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
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName, options } = interaction

  if (commandName === 'ping') {
    interaction.reply({
      content: `Latency: ${client.ws.ping} ms`,
      ephemeral: true,
    })
  }
})

client.login(process.env.TOKEN)
