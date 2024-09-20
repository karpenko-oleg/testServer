// const TelegramBot = require("node-telegram-bot-api");

// const appUrl = "https://c638-223-204-222-125.ngrok-free.app/";
// const token = "6292279734:AAEu4dTAxe6YTPGGeNQuDgXPMSmqLieDCBg";
// const bot = new TelegramBot(token, { polling: true });

// //кнопки в чате и в меню
// bot.onText(/\/start/, async (msg) => {
//   const chatId = msg.chat.id;
//   const keybordKl = {
//     reply_markup: {
//       keyboard: [[{ text: "заполнить форму" }]],
//     },
//   };
//   const options = {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           // {
//           //   text: "сделать заказ",
//           //   url: "https://example.com/order",
//           // },
//           {
//             text: "web App приложение ваше",
//             web_app: {
//               url: appUrl,
//             }
//           },
//         ],
//       ],
//     },
//   };
//   await bot.sendMessage(chatId, "переходи на сайт", options);
//   await bot.sendMessage(chatId, "Заполни форму", keybordKl);
// });
// Ваш API Token для Cryptoclaud
// const cryptoclaudApiToken = 'YOUR_CRYPTOCLAUD_API_TOKEN';

// Обработка POST-запросов на /api/payment
// app.post('/', async (req, res) => {
//   const { name, address, phone, products } = req.body;
//   try {
//     // Пример запроса к Cryptoclaud для создания платежа
//     const response = await axios.post('https://api.cryptoclaud.com/v1/checkout', {
//       name,
//       address,
//       phone,
//       products,
//     }, {
//       headers: {
//         'Authorization': `Bearer ${cryptoclaudApiToken}`,
//       },
//     });

//     // Отправляем URL на страницу оплаты обратно клиенту
//     res.json({ success: true, paymentUrl: response.data.paymentUrl });
//   } catch (error) {
//     console.error('Error processing payment:', error);
//     res.status(500).json({ success: false, error: 'Payment processing error' });
//   }
// });
//Обработка подтверждения оплаты
// app.post('/api/payment/webhook', async (req, res) => {
//   const paymentData = req.body;
//   // Обработка уведомления о платеже
//   console.log('Payment data received:', paymentData);
//   // Обновление статуса заказа в базе данных и т.д.
//   res.sendStatus(200);
// });

// import express from 'express';
// import TelegramBot from 'node-telegram-bot-api';
// import cors from 'cors'; // Импорт пакета cors
// import mongoose from 'mongoose';
// import UserModel from './models/user.js';

// // Подключение к MongoDB
// mongoose.connect('mongodb+srv://1karpenkooleg1:3NRCk0bqVoSn2Wny@telegramshop.r5ozx.mongodb.net/TelegramShop?retryWrites=true&w=majority&appName=telegramshop')
//   .then(() => { console.log('Подключение прошло успешно MongoDb'); })
//   .catch((err) => { console.log('Произошла ошибка подключения MongoDb', err); });

// // Конфигурация Telegram Bot
// const token = '6292279734:AAEu4dTAxe6YTPGGeNQuDgXPMSmqLieDCBg';
// const bot = new TelegramBot(token, { polling: true });
// const appUrl = 'https://79a1-223-204-223-231.ngrok-free.app/';

// // Создание и конфигурация Express сервера
// const app = express();
// const port = 3001;

// // Настройка CORS
// app.use(cors({
//   origin: 'http://localhost:3000' // Разрешите запросы только с этого источника
// }));

// // Middleware для обработки JSON запросов
// app.use(express.json());
// // Обработка GET-запросов на '/data-profil'
// app.get('/data-profil', async (req, res) => {
//   try {
//     //достаем данные из базы данных
//     const items = await UserModel.find(); // Получите все элементы из коллекции
//     res.json(items); // Отправьте данные в формате JSON на фронтенд

//   } catch (err) {
//     console.error("Произошла ошибка", err);
//     res.status(500).json({ message: "Ошибка сервера" });
//   }
// });

// // Функция для запуска MongoDB и Telegram бота
// async function run() {
//   try {
//     console.log('Bot is running');

//     // Обработка команды /start
//     bot.onText(/\/start/, async (msg) => {
//       const chatId = msg.chat.id;
      
//       const options = {
//         reply_markup: {
//           inline_keyboard: [
//             [
//               {
//                 text: 'web App приложение ваше',
//                 web_app: {
//                   url: appUrl,
//                 },
//               },
//             ],
//           ],
//         },
//       };

//       await bot.sendMessage(chatId, 'Добро пожаловать! Пожалуйста, выберите опцию:', options);

//       // Сбор данных о пользователе при команде /start
//       const user = {
//         chatId: chatId,
//         userName: msg.from.username || 'N/A',
//         firstName: msg.from.first_name || 'N/A',
//         lastName: msg.from.last_name || 'N/A',
//         date: new Date(),
//       };

//       // Получение информации о профиле
//       try {
//         const userProfilePhotos = await bot.getUserProfilePhotos(chatId);
//         const profilePhoto = userProfilePhotos.photos[0] ? userProfilePhotos.photos[0][0].file_id : null;

//         // Получение URL фотографии
//         let avatarUrl = null;
//         if (profilePhoto) {
//           const file = await bot.getFile(profilePhoto);
//           avatarUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
//         }
//         // Добавление фотографии к данным пользователя
//         user.avatarUrl = avatarUrl;

//         // Проверка существования пользователя и обновление или создание записи
//         const existingUser = await UserModel.findOne({ chatId: user.chatId });

//         if (existingUser) {
//           // Обновляем существующую запись
//           await UserModel.updateOne({ chatId: user.chatId }, user);
//         } else {
//           // Создаем новую запись
//           const doc = new UserModel(user);
//           await doc.save();
//         }
//         // Подтверждение получения данных
//         await bot.sendMessage(chatId, 'Ваши данные успешно отправлены!');

//       } catch (err) {
//         console.error('Error inserting user or fetching profile photo:', err);
//         await bot.sendMessage(chatId, 'Произошла ошибка при отправке данных.');
//       }
//     });

//   } catch (err) {
//     console.error('Connection error:', err);
//   }
// }

// // Запуск функции, которая подключает MongoDB и запускает Telegram бота
// run().catch(console.dir);
// // Запуск Express сервера
// app.listen(port, () => {
//   console.log(`Frontend server running at http://localhost:${port}`);
// });


import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import cors from 'cors';
import mongoose from 'mongoose';
// import path from 'path';
import UserModel from './models/user.js'; // Убедитесь, что путь правильный
import fetch from 'node-fetch';
const router = express.Router();

// Подключение к MongoDB
mongoose.connect('mongodb+srv://1karpenkooleg1:3NRCk0bqVoSn2Wny@telegramshop.r5ozx.mongodb.net/TelegramShop?retryWrites=true&w=majority&appName=telegramshop')
  .then(() => { console.log('Подключение прошло успешно MongoDb'); })
  .catch((err) => { console.log('Произошла ошибка подключения MongoDb', err); });

const app = express();
const port = 3001;
const token = '6292279734:AAEu4dTAxe6YTPGGeNQuDgXPMSmqLieDCBg';
const appUrl = "https://afb7-223-204-220-161.ngrok-free.app";

// Создание экземпляра бота
const bot = new TelegramBot(token, { polling: true });

// Настройка CORS
// app.use(cors());
app.use(cors({
  origin: 'https://afb7-223-204-220-161.ngrok-free.app', // Укажите URL вашего клиентского приложения
}));
// Middleware для обработки JSON запросов
app.use(express.json());

// Обработка команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Перейти в Web App',
            web_app: {
              url: appUrl,
            },
          },
        ],
      ],
    },
  };
  await bot.sendMessage(chatId, 'Добро пожаловать! Пожалуйста, выберите опцию:', options);
  try {
    // Поиск пользователя в базе данных
    let existingUser = await UserModel.findOne({ chatId: chatId });
    if (!existingUser) {
      // Создание нового пользователя
      const newUser = new UserModel({
        chatId: chatId,
        firstName: user.first_name,
        lastName: user.last_name,
        userName: user.username,
      });
      // берем аватарку пользователя
      const userProfilePhotos = await bot.getUserProfilePhotos(chatId);
      const profilePhoto = userProfilePhotos.photos[0] ? userProfilePhotos.photos[0][0].file_id : null;
      let avatarUrl = null;
      if (profilePhoto) {
          const file = await bot.getFile(profilePhoto);
          avatarUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
      }
      newUser.avatarUrl = avatarUrl;
      // сохранение в базе
      await newUser.save();
      await bot.sendMessage(chatId, 'Приветствуем, ваш акк создан');
    } else {
      // Пользователь уже существует
      await bot.sendMessage(chatId, 'ваш аккаунт существует');
    }
  } catch (error) {
    console.error('ошибка в сохранении пользавателя:', error);
    await bot.sendMessage(chatId, 'произошла ошибка');
  }
});

// Обработка сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Вы отправили сообщение: ${msg.text}`);
});

// Обработка запроса на получение профиля
app.get('/api/profile', async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(userId)
    const user = await UserModel.findOne({ chatId: userId });
    console.log(user)
    if (user) {
      res.json(user); // Отправляем данные пользователя
    } else {
      res.status(404).send('Пользователь не найден');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Ошибка при получении данных пользователя');
  }
});

// Обработка запроса на получение профиля версия 2
// app.get('/api/profile', async (req, res) => {
//   try {
//     // Получаем userId из строки запроса
//     const userId = req.query.userId;
//     console.log('пришел вот такой id', userId);

//     // Выполняем запрос в базу данных для получения данных о пользователе
//     const user = await UserModel.findOne({ chatId: userId });
//     console.log('найден вот такой пользователь', user);

//     if (user) {
//       res.json(user); // Отправляем данные пользователя
//     } else {
//       res.status(404).send('Пользователь не найден');
//     }
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).send('Ошибка при получении данных пользователя');
//   }
// });

// Маршрут для сохранения заказа
router.post('/api/save-order', async (req, res) => {
  try {
    const { chatId, uuid, amount } = req.body;
    // Находим пользователя по chatId
    const user = await UserModel.findOne({ chatId });
    console.log(user, 'данные пользователя пришедшие после оплаты');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    // Создаем новый заказ
    const newOrder = {
      uuid,
      amount,
      status: 'paid', // Устанавливаем статус заказа как 'paid'
      createdAt: new Date(),
    };
    // Добавляем заказ в массив заказов пользователя
    user.orders.push(newOrder);
    await user.save();
    res.status(201).json({ message: 'Заказ успешно сохранён', order: newOrder });
  } catch (error) {
    console.error('Ошибка при сохранении заказа:', error);
    res.status(500).json({ message: 'Ошибка при сохранении заказа' });
  }
});

export default router;

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





// 1
// bot.onText(/\/start/, async (msg) => {
//     const chatId = msg.chat.id;
//     // const userId = msg.from.id;
//     const userName = msg.from.username || 'N/A';
//     const firstName = msg.from.first_name || 'N/A';
//     const lastName = msg.from.last_name || 'N/A';

//     const options = {
//         reply_markup: {
//             inline_keyboard: [
//                 [
//                     {
//                         text: 'Перейти в Web App',
//                         web_app: {
//                             // url: `${appUrl}?userId=${userId}&userName=${encodeURIComponent(userName)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}}`,
//                             url: appUrl,
//                         },
//                     },
//                 ],
//             ],
//         },
//     };
//     await bot.sendMessage(chatId, 'Добро пожаловать! Пожалуйста, выберите опцию:', options);

//     const user = {
//         chatId: chatId,
//         userName: userName,
//         firstName: firstName,
//         lastName: lastName,
//         date: new Date(),
//     };

//     try {
//         const userProfilePhotos = await bot.getUserProfilePhotos(chatId);
//         const profilePhoto = userProfilePhotos.photos[0] ? userProfilePhotos.photos[0][0].file_id : null;

//         let avatarUrl = null;
//         if (profilePhoto) {
//             const file = await bot.getFile(profilePhoto);
//             avatarUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
//         }
//         user.avatarUrl = avatarUrl;

//         const existingUser = await UserModel.findOne({ chatId: user.chatId });
//         if (existingUser) {
//           await UserModel.updateOne({ chatId: user.chatId }, user);
//         } else {
//           const doc = new UserModel(user);
//           await doc.save();
//         }
//         // Отправьте данные на ваш веб-приложение
//         fetch('http://localhost:3001/api/telegram-data', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(user),
//         }).then(response => response.json())
//           .then(data => console.log('Data sent to web app:', data))
//           .catch(error => console.error('Error sending data:', error));
      
      
//         await bot.sendMessage(chatId, 'Ваши данные успешно отправлены!');
//         console.log('Данные успешно отправлены на сервер:', user);
//     } catch (err) {
//         console.error('Ошибка при обработке данных:', err);
//         await bot.sendMessage(chatId, 'Произошла ошибка при отправке данных.');
//     }
// });

// Обработка текстовых сообщений
// const User = mongoose.model('User', UserModel);




// app.get('/user-profil', async (req, res) => {
//   try {
//     const { chatId } = req.query;
//     console.log('Запрашиваемый chatId:', chatId);

//     const userData = await UserModel.findOne({ chatId: chatId });
//     console.log('Найденные данные пользователя:', userData);

//     if (userData) {
//       res.json(userData);
//     } else {
//       res.status(404).json({ message: 'Пользователь не найден' });
//     }
//   } catch (error) {
//     console.error('Ошибка при обработке GET-запроса:', error);
//     res.status(500).json({ message: 'Ошибка на сервере' });
//   }
// });
// app.get('/user', async (req, res) => {
//   try {
//     const { chatId } = req.query;
    
//      res.status(200).json({message: 'Пользователь найден' });
//   } catch (error) {
//     res.status(500).json({ message: 'Ошибка на сервере' });
//   }
// });
// Обработка команды /start
// bot.onText(/\/start/, async (msg) => {
//     const chatId = msg.chat.id;
//     const options = {
//         reply_markup: {
//             inline_keyboard: [
//                 [
//                     {
//                         text: 'web App приложение ваше',
//                         web_app: {
//                             url: appUrl,
//                         },
//                     },
//                 ],
//             ],
//         },
//     };

//     await bot.sendMessage(chatId, 'Добро пожаловать! Пожалуйста, выберите опцию:', options);

//     const user = {
//         chatId: chatId,
//         userName: msg.from.username || 'N/A',
//         firstName: msg.from.first_name || 'N/A',
//         lastName: msg.from.last_name || 'N/A',
//         date: new Date(),
//     };

//     try {
//         const userProfilePhotos = await bot.getUserProfilePhotos(chatId);
//         const profilePhoto = userProfilePhotos.photos[0] ? userProfilePhotos.photos[0][0].file_id : null;

//         let avatarUrl = null;
//         if (profilePhoto) {
//             const file = await bot.getFile(profilePhoto);
//             avatarUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
//         }
//         user.avatarUrl = avatarUrl;
//         // Проверка существования пользователя и обновление или создание записи
//         const existingUser = await UserModel.findOne({ chatId: user.chatId });

//         if (existingUser) {
//           // Обновляем существующую запись
//           await UserModel.updateOne({ chatId: user.chatId }, user);
//         } else {
//           // Создаем новую запись
//           const doc = new UserModel(user);
//           await doc.save();
//         }
//         // Подтверждение получения данных
//         await bot.sendMessage(chatId, 'Ваши данные успешно отправлены!');
//         // Отправка данных на сервер
//         const serverUrl = 'http://localhost:3001/user-profil';
//         await axios.get(serverUrl, {
//             params: {
//                 chatId: user.chatId,
//                 userName: user.userName,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 date: user.date.toISOString(),
//                 avatarUrl: user.avatarUrl || 'N/A',
//             },
//         });

//         console.log('Данные успешно отправлены на сервер:', user);
//         await bot.sendMessage(chatId, 'Ваши данные успешно отправлены на сервер!');
//     } catch (err) {
//         console.error('Ошибка при обработке данных:', err);
//         await bot.sendMessage(chatId, 'Произошла ошибка при отправке данных.');
//     }
// });


// 2
// bot.onText(/\/start/, async (msg) => {
//     const chatId = msg.chat.id;
//     // const userId = msg.from.id;
//     const userName = msg.from.username || 'N/A';
//     const firstName = msg.from.first_name || 'N/A';
//     const lastName = msg.from.last_name || 'N/A';

//     const options = {
//         reply_markup: {
//             inline_keyboard: [
//                 [
//                     {
//                         text: 'Перейти в Web App',
//                         web_app: {
//                             url: appUrl,
//                         },
//                     },
//                 ],
//             ],
//         },
//     };
//     await bot.sendMessage(chatId, 'Добро пожаловать! Пожалуйста, выберите опцию:', options);

//     const user = {
//         chatId: chatId,
//         userName: userName,
//         firstName: firstName,
//         lastName: lastName,
//         date: new Date(),
//     };

//     try {
//         const userProfilePhotos = await bot.getUserProfilePhotos(chatId);
//         const profilePhoto = userProfilePhotos.photos[0] ? userProfilePhotos.photos[0][0].file_id : null;

//         let avatarUrl = null;
//         if (profilePhoto) {
//             const file = await bot.getFile(profilePhoto);
//             avatarUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
//         }
//         user.avatarUrl = avatarUrl;

//         const existingUser = await UserModel.findOne({ chatId: user.chatId });
//         if (existingUser) {
//           await UserModel.updateOne({ chatId: user.chatId }, user);
//         } else {
//           const doc = new UserModel(user);
//           await doc.save();
//         }

//         // Преобразуем данные в строку запроса
//         const queryString = new URLSearchParams(user).toString();

//         // Отправка данных методом GET
//         fetch(`http://localhost:3001/api/telegram-data?${queryString}`)
//             .then(response => response.json())
//             .then(data => console.log('Data sent to web app:', data))
//             .catch(error => console.error('Error sending data:', error));
      
//         await bot.sendMessage(chatId, 'Ваши данные успешно отправлены!');
//         console.log('Данные успешно отправлены на сервер:', user);
//     } catch (err) {
//         console.error('Ошибка при обработке данных:', err);
//         await bot.sendMessage(chatId, 'Произошла ошибка при отправке данных.');
//     }
// });