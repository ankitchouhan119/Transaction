import mongoose, {Schema, Document} from "mongoose";
import { ITransaction } from "../types/transaction.types";

const TransactionSchema = new Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
        index: true,
      },
      amount: {
        type: Number,
        required: true,
        index: true,
      },
      description: {
        type: String,
        required: true,
        index: 'text',
      },
      timestamp: {
        type: Date,
        required: true,
        default: Date.now,
        index: true,
      },
      country: {
        type: String,
        required: true,
        index: true,
      },
      tags: [{
        type: String,
        index: true,
      }],
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
      },
})

export const Transaction = mongoose.model<ITransaction & Document >('Transaction', TransactionSchema);