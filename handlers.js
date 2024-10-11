const { Markup } = require('telegraf');
const { WEB_APP_URL } = require('./config');
const fs = require('fs');

const startHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;
  const username = ctx.message.chat.username;

  let referralId = '';

  // Extract referral ID from the text message
  const textParts = ctx.message.text.split(' ');
  if (textParts.length > 2) {
    // Case with referral ID
    referralId = textParts[2]; // referralId will be present in this case
  } 

  console.log("Chat ID: " + chatId);
  console.log("Username: " + username);
  console.log("Referral ID: " + referralId);

  // Personalized welcome message
  const welcomeMessage = `${username}, Welcome to Bugs!`;
  const description = `Bugs is like a treasure hunt for tokens! Users can earn them by using different app features. And guess what? The players get most of the tokens!

Let's gather your squad! More buddies mean more coins.

Let's make it rain!`;

  // Message for the $50 reward
 
  // Use a local image file
  const imagePath = 'Logo.webp';

  // Send the welcome message with image, description, reward, and buttons
  await ctx.replyWithPhoto(
    { source: imagePath },
    {
      caption: `${welcomeMessage}\n\n${description}\n`,
      reply_markup: {
        inline_keyboard: [
          [
            { 
              text: 'Play', 
              web_app: { 
                url: referralId ? `${WEB_APP_URL}/home/${chatId}/${username}/${referralId}` : `${WEB_APP_URL}/home/${chatId}/${username}` 
              } 
            }
          ],
          // Add more buttons if needed
        ]
      }
    }
  );
};

const helpHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;
  const referralId = ctx.message.text.split('=')[1] || '';

  await ctx.reply('To use this bot, please start by sending the /start command. This will take you to the Bugs platform where you can start earning tokens!', 
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
