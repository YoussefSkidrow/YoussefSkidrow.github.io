const { Telegraf, session, Scenes } = require('telegraf');
const axios = require('axios');
require('dotenv').config()

const bot = new Telegraf(process.env.TG_API_KEY_BOT, { handlerTimeout: 9_000_000 });

const commands = [
  {
    command: "start",
    description: "Запуск бота"
  }
]

/**Функция обработчик команды /start*/
const start = async (ctx) => {
  try {
    const identifiers = ctx.payload.split('-');
    const response = await axios.get(`http://localhost:3000/catalog?id=${identifiers[0]}`);
    const filteredData = response.data[0].items.filter(item => item.id === Number(identifiers[1]));
    if (filteredData.length > 0) {
      const caption = `Вы зарезервировали <b>${filteredData[0].name}</b>\nЦена: <b>${filteredData[0].price}</b>\nЦвет: <b>${filteredData[0].color}</b>\nПамять: <b>${filteredData[0].storage}</b>`;

      ctx.replyWithPhoto(
        { source: filteredData[0].img },
        { caption, parse_mode: 'HTML' }
      );
    }
  } catch (error) {
    console.log(error);
  }
}


const setupBot = () => {
  bot.use(session({ collectionName: 'sessions' }));

  bot.telegram.setMyCommands(commands)
  bot.start(start);
  bot.catch((err, ctx) => {
    console.log(err)
    ctx.reply('Произошла ошибка...')
  })

  return bot
}


setupBot().launch();

