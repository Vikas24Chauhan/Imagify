import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  credits: { type: Number, require: true },
  payment: { type: Boolean },
  date: { type: Number },
});

const transactionModel =
  mongoose.model.transaction ||
  mongoose.model("transaction", transactionSchema);

export default transactionModel;
