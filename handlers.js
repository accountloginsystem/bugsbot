const { Markup } = require('telegraf');
const { WEB_APP_URL } = require('./config');
const fs = require('fs');

const startHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;
  const username = ctx.message.chat.username;

  let referralId = '';

  // Extract referral ID from the text message
  const textParts = ctx.message.text.split(' ');
  if (textParts.length > 1) {
    referralId = textParts[1]; // This will be '01' in your example
  }

  console.log(ctx.message);
  console.log("refid" + referralId);

  // Personalized welcome message
  const welcomeMessage = `${username}, Welcome to Bugs!`;
  const description = `Bugs is like a treasure hunt for tokens! Users can earn them by using different app features. And guess what? The players get most of the tokens!

Let's gather your squad! More buddies mean more coins.

Let's make it rain!`;

  // Message for the $50 reward
  const rewardMessage = `🎉 Special Offer: Get a $50 reward for participating in our Bugs bounty program! Complete tasks, invite friends, and be rewarded. Claim your $50 now! 🎉`;

  // Use a local image file
  const imagePath = 'bugs_image.png';

  // Send the welcome message with image, description, reward, and buttons
  await ctx.replyWithPhoto(
    { source: imagePath },
    {
      caption: `${welcomeMessage}\n\n${description}\n\n${rewardMessage}`,
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Play', web_app: { url: referralId ? `${WEB_APP_URL}/home/${chatId}/${referralId}` : `${WEB_APP_URL}/home/${chatId}` } }],
          [{ text: 'Join Our Channel', url: 'https://t.me/bugs' }],
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
