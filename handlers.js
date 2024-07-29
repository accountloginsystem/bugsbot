const { Telegraf, Markup } = require('telegraf');
const { WEB_APP_URL, TELEGRAM_BOT_TOKEN } = require('./config');
const fs = require('fs');

// Initialize the bot with your token
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Handler for the /start command
const startHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;
  const messageText = ctx.message.text;
  const referralId = messageText.includes('=') ? messageText.split('=')[1] : '';
  const username = ctx.message.chat.username || 'User';

  // Personalized welcome message
  const welcomeMessage = `${username}, Welcome to HodlSwap!`;
  const description = `HodlSwap is like a treasure hunt for tokens! Users can earn them by using different mining app features. And guess what? The players get most of the tokens!

Let's gather your squad! More buddies mean more coins.

Let's make it rain!`;

  // Use a local image file
  const imagePath = 'hodlswap_image.png';

  // Construct the URL to send to the web app
  const webAppUrl = referralId 
    ? `${WEB_APP_URL}/home/${chatId}/${referralId}` 
    : `${WEB_APP_URL}/home/${chatId}`;

  // Send the welcome message with image, text, and buttons
  await ctx.replyWithPhoto(
    { source: imagePath },
    {
      caption: `${welcomeMessage}\n\n${description}`,
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Play', web_app: { url: webAppUrl } }],
          [{ text: 'Join Our Channel', url: 'https://t.me/HodL_Swap' }],
          // [{ text: 'Help', callback_data: '/help' }]
        ]
      }
    }
  );
};

// Handler for the /help command
const helpHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;

  await ctx.reply('To use this bot, please start by sending the /start command. This will take you to the HodlSwap platform where you can start earning tokens!', 
    Markup.inlineKeyboard([
      [{ text: 'Start', callback_data: '/start' }]
    ])
  );
};

// Handler for data received from the web app
const webAppDataHandler = async (ctx) => {
  console.log('Web App Data:', ctx.webAppData);
};

// Register handlers
bot.start(startHandler);
bot.help(helpHandler);
bot.on('web_app_data', webAppDataHandler);

// Start the bot
bot.launch().then(() => {
  console.log('Bot started successfully');
}).catch((err) => {
  console.error('Failed to start the bot:', err);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
