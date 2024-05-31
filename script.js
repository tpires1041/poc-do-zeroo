const axios = require('axios');
const RiveScript = require('rivescript');


const string1 = "Quem deve aguardar para doar sangue?"
const string2 = "Quais vacinas precisam aguardar?"
const string3 = "Quem não pode doar sangue?"
const string4 = "Quais são as recomendações para quem irá doar?"
const string5 = "Qual o intervalo entre doações?"
const string6 = "O que preciso para doar sangue?"


const brains = 'https://gist.githubusercontent.com/tpires1041/da6a583aeb2d840193b091b81ed77051/raw/a81fa4cf531b80489f1667fd07b5658274960dca/gistfile1.txt';
let bot = new RiveScript();

axios.get(brains).then(response => {
    bot.stream(response.data);
    bot.sortReplies();
}).catch(error => {
    console.error(error);
});

const TelegramBot = require('node-telegram-bot-api');


const token = '6972642226:AAEoBLk1WeoLB3mgyYA9QvEpFQG4XY89qzM';


const bott = new TelegramBot(token, { polling: true });


bott.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; 
    bott.sendMessage(chatId, resp); 
});


bott.on('message', (msg) => {
   const chatId = msg.chat.id;
   bot.reply("local-user", msg.text).then(function(reply) {
       bott.sendMessage(chatId, botReply(reply));
   });
});
