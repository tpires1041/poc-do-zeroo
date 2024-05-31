const axios = require('axios');
const RiveScript = require('rivescript');

let bot = new RiveScript();

const brains = 'https://gist.githubusercontent.com/tpires1041/da6a583aeb2d840193b091b81ed77051/raw/a81fa4cf531b80489f1667fd07b5658274960dca/gistfile1.txt';

axios.get(brains).then(response => {
    bot.stream(response.data);
    bot.sortReplies();
}).catch(error => {
    console.error(error);
});

const TelegramBot = require('node-telegram-bot-api');

// Substitua 'YOUR_TELEGRAM_BOT_TOKEN' pelo token do seu bot
const token = '6972642226:AAEoBLk1WeoLB3mgyYA9QvEpFQG4XY89qzM';

// Crie um bot que usa 'polling' para buscar novas atualizações
const bott = new TelegramBot(token, { polling: true });

// Responde ao comando "/echo [qualquer coisa]"
bott.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; // Captura o texto após o comando "/echo"
    bott.sendMessage(chatId, resp); // Envia a resposta de volta ao chat
});

// Escuta qualquer tipo de mensagem
bott.on('message', (msg) => {
   const chatId = msg.chat.id;
   bot.reply("local-user", msg.text).then(function(reply) {
       bott.sendMessage(chatId, botReply(reply));
   });
});
