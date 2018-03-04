const TelegramBot = require('node-telegram-bot-api');

const debug = require('./helpers.js')
const token = '524138491:AAHseTUD-Vbj5XIud1nvw-PgFnk6fEnD620';

console.log ('BOT RUN')

const bot = new TelegramBot(token, {
  polling:{
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

bot.on('message', msg => {
  const  { id } = msg.chat

  if (msg.text.toLowerCase() === '/start'){
    bot.sendMessage(id, 'Привет, ' + msg.from.first_name + '!', {
      reply_markup: {
        keyboard: [
          [{
          text: 'Отправить свой контакт',
          request_contact: true
          }],
          ['2', '3']
        ],
        one_time_keyboard: true
      }
    })
  }

  if (msg.text.toLowerCase() === '/test'){
    bot.sendMessage(id, debug(msg))
  }


  if (msg.text.toLowerCase() === 'html'){

    const html =  '<i> Я html строка </i>'

    bot.sendMessage(id, html, {
      parse_mode: 'HTML'
    })
  }

})


bot.onText(/\/test (.+)/, (msg, arr) => {
  const  { id } = msg.chat

  bot.sendMessage(id, debug(arr[1]))
})
