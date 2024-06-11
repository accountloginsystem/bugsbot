const { Markup } = require('telegraf');
const { WEB_APP_URL } = require('./config');
const fs = require('fs');

const startHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;
  const referralId = ctx.message.text.split('=')[1] || '';
  const username = ctx.message.chat.username;

  // Personalized welcome message
  const welcomeMessage = `${username} Welcome to HodlSwap!`;
  const description = `HodlSwap is like a treasure hunt for tokens! Users can earn them by using different mining app features. And guess what? The players get most of the tokens!

Let's gather your squad! More buddies mean more coins.

Let's make it rain!`;

  // Use a local image file
  const imagePath = 'hodlswap_image.png';

  // Send the welcome message with image, text, and buttons
  await ctx.replyWithPhoto(
    { source: imagePath },
    {
      caption: `${welcomeMessage}\n\n${description}`,
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Play', web_app: { url: referralId ? `${WEB_APP_URL}/home/${chatId}/${referralId}` : `${WEB_APP_URL}/home/${chatId}` } }],
          [{ text: 'Join Community', url: 'https://t.me/hodlswap' }],
          // [{ text: 'Help', callback_data: '/help' }]
        ]
      }
    }
  );
};

const helpHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;
  const referralId = ctx.message.text.split('=')[1] || '';

  await ctx.reply('To use this bot, please start by sending the /start command. This will take you to the HodlSwap platform where you can start earning tokens!', 
    Markup.inlineKeyboard([
      [{ text: 'Start', callback_data: '/start' }]
    ])
  );
};

const webAppDataHandler = async (ctx) => {
  // Handle data received from the web app
  console.log('Web App Data:', ctx.webAppData);
};

module.exports = {
  startHandler,
  helpHandler,
  webAppDataHandler
};
