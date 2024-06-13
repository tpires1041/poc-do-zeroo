const axios = require('axios');
const RiveScript = require('rivescript');
const natural = require('natural');


const string1 = "quem deve aguardar para doar sangue?"
const string2 = "quais vacinas precisam aguardar?"
const string3 = "quem não pode doar sangue?"
const string4 = "quais são as recomendações para quem irá doar?"
const string5 = "qual o intervalo entre doações?"
const string6 = "o que preciso para doar sangue?"


const brains = 'https://gist.githubusercontent.com/tpires1041/da6a583aeb2d840193b091b81ed77051/raw/fe6679bc3c084a8073ac5218b816a6874bbc2c8e/gistfile1.txt';
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

    if (natural.JaroWinklerDistance(userInput, string1) > 0.9 || userInput == 1){
        userInput = 1;
    } else {
        if (natural.JaroWinklerDistance(userInput, string2) > 0.9 || userInput == 2){
            userInput = 2;
        } else {
            if (natural.JaroWinklerDistance(userInput, string3) > 0.9 || userInput == 3){
                userInput = 3;
            } else {
                if (natural.JaroWinklerDistance(userInput, string4) > 0.9 || userInput == 4){
                    userInput = 4;
                } else {
                    if (natural.JaroWinklerDistance(userInput, string5) > 0.9 || userInput == 5){
                        userInput = 5;
                    } else {
                        if (natural.JaroWinklerDistance(userInput, string6) > 0.9 || userInput == 6){
                            userInput = 6;
                        }
                    }
                }
            }
        }
    }

    bot.reply("local-user", userInput).then(function (reply) {
        bott.sendMessage(chatId, reply);
    });
});