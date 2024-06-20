const axios = require('axios');
const RiveScript = require('rivescript');
const natural = require('natural');
const fs = require('fs');

let strings;
fs.readFile('strings.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    strings = JSON.parse(data);
});

const brains = 'https://gist.githubusercontent.com/tpires1041/da6a583aeb2d840193b091b81ed77051/raw/ec70d1b041daa946c84a064005e06fc40dab93af/gistfile1.txt';
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

bott.onText((msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bott.sendMessage(chatId, resp);
});

bott.on('message', (msg) => {
    const chatId = msg.chat.id;
    let userInput = msg.text.toLowerCase();


    const stringKeys = Object.keys(strings);

    let matchedStringKey = stringKeys.find(key => 
        natural.JaroWinklerDistance(userInput, strings[key]) > 0.9 || userInput == key.replace('string', '')
    );

    if (matchedStringKey) {
        userInput = matchedStringKey.replace('string', '');
    }

    bot.reply("local-user", userInput).then(function (reply) {

        bott.sendMessage(chatId, reply);

        bott.sendMessage(chatId, "Em que mais posso ajudar? 😁🤖");
    });
});
