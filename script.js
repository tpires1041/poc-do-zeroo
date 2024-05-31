const axios = require('axios');
const RiveScript = require('rivescript');


const string1 = "quem deve aguardar para doar sangue?"
const string2 = "quais vacinas precisam aguardar?"
const string3 = "quem não pode doar sangue?"
const string4 = "quais são as recomendações para quem irá doar?"
const string5 = "qual o intervalo entre doações?"
const string6 = "o que preciso para doar sangue?"


const brains = 'https://gist.githubusercontent.com/tpires1041/da6a583aeb2d840193b091b81ed77051/raw/4604a8d30f5e414d7ee030cb47257a34889e7eb2/gistfile1.txt';
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

    let userInput = msg.text;

    bot.reply("local-user", userInput).then(function (reply) {
        bott.sendMessage(chatId, reply);
    });
});