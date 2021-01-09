process.env.NTBA_FIX_319 = 1;


const TelegamBot = require('node-telegram-bot-api');
const TOKEN = "1360805324:AAHlXXMm3qUzWl1ARJSABFnYNUuI2FQsibM"

const bot = new TelegamBot(TOKEN, {
    polling: true,
});


//объект с пользавотелями
let users = [
    {login: 'yevhenii', password: 12345}
];


//счета
let accounts = {
    yevhenii: {dollars: 100, hrivnas: 500}
}

bot.on("polling_error", (err) => console.log(err));



//обработчик на кнопку старт
bot.onText(/\/start/, function onStartText(msg) {
    const opts = {
      reply_to_message_id: msg.message_id,
      reply_markup: JSON.stringify({
        keyboard: [
          ['/войти\ с\ логином'],
          ['/зарегистрироватся'],
          ['/пополнить счет'],
        ]
      })
    };
    bot.sendMessage(msg.chat.id, 'Hello', opts);
  });



//войти с логином
bot.onText(/\/войти\ с\ логином/, function logIn(msg) {
    bot.sendMessage(  msg.chat.id, 'Введите логин')
    bot.on('message', (m) => {
        for(let i = 0; i < users.length; i++) {
            if(users[i].login === m.text) {
                console.log('have this user')
                passwordValidator(users[i], msg.chat.id);

                return
            }
        }
    })
    
  })



//проверка пароля
function passwordValidator(user, chatId) {
    bot.sendMessage(chatId, `Введите ваш пароль ${user.login}`)

    bot.on('message', (m) => {  
        if(m.text == user.password) {
            bot.sendMessage(chatId, 'Вы вошли')
            showAccounts(user, chatId)
            bot.removeListener('message')
            return true
        }else {
            bot.sendMessage(chatId, 'Не верный пароль повторите еще раз')
            return false
        }
    })
    return
}


//показывает счета которые есть на пользавотеле
let showAccounts = (user,chatId) => {
    let account = accounts[user.login];
    
    let currency = Object.keys(account);
    // console.log(currency.map(i => [{[i]: account[i]}]))
    const opts = {
        reply_markup: JSON.stringify({
        keyboard: 
            currency.map(i => [i])
        })
    };
    bot.sendMessage(chatId,'Ваши счета', opts);
    showMoney(account,chatId)
}

let showMoney = (acc,chatId) => {
    console.log('egege')
    bot.add
    bot.addListener('message',  (m) => {
        console.log(acc[m.text])
        
        bot.sendMessage(chatId, 'hello')
    })
}


//для запуска команда node bot.js

