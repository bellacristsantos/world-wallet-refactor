import mongoose from '../db';
import  { Document, Schema, model } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  balances: object[];
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  balances: {
    type: [Object],
    default: [],
  },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);


export default UserModel ;
