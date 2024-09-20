// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   chatId: { type: Number, unique: true },
//   firstName: String,
//   lastName: String,
//   userName: String,
//   avatarUrl: String,
// }, {
//   timestamps: true,
// });

// export default mongoose.model('User', UserSchema);

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  uuid: String, // UUID заказа
  amount: Number,
  status: { type: String, default: 'pending' }, // Статус заказа
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  chatId: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  userName: String,
  avatarUrl: String,
  orders: [OrderSchema], // Поле для хранения заказов
}, {
  timestamps: true,
});

export default mongoose.model('User', UserSchema);