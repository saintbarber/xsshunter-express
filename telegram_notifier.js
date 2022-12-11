const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

help_msg = `Welcome to the XSS Hunter Telegram notifier.
Here is a list of the available commands:
* /start  - Initializes server chat id to send XSS fires.
* /frappe - Orders a Frappe
* /help   - This help page`

start_msg = `XSS Bot has been initialized successfuly
Any XSS payloads fired will now be sent here, please use the /help command for more info`

if(process.env.TELEGRAM_BOT_NOTIFICATIONS_ENABLED === "true"){
    
    bot.telegram.setWebhook(process.env.HOSTNAME+process.env.WEBHOOK_PATH);
    // Start bot 
    console.log("Setting up bot commands")
    bot.start((ctx) => {ctx.reply(start_msg); global.chat = ctx.chat;})
    bot.help((ctx) => ctx.reply(help_msg));

    bot.command('frappe',(ctx) => ctx.reply("Έφτασεεεεν … Ρούφα τζαι έρκετε!"));

    console.log("Bot Launched Successfully");    
    console.log("Use /start command to initialize Bot");    
    
}

async function send_telegram_notification(xss_payload_fire_data){

    xss_msg = `
XSS Fired:
url: ${xss_payload_fire_data.url}
ip_address: ${xss_payload_fire_data.ip_address}
`
    try{
        bot.telegram.sendMessage(chat.id, xss_msg );
        bot.telegram.sendPhoto(chat.id, xss_payload_fire_data.screenshot_url );
    }
    catch (e){
        console.log("XSS Fired, but failed to send telegram message");
        console.log("Make sure to initiate telegram bot with /start");
    }
}

module.exports.bot = bot;
module.exports.send_telegram_notification = send_telegram_notification;