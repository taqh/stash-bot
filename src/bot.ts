import { Client, GatewayIntentBits } from 'discord.js';
import config from './config';
import { commands } from './commands';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log('Spade🤖 is ready🔥');
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = commands.find(cmd => cmd.data.name === interaction.commandName);
  
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(config.DISCORD_TOKEN);