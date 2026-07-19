import mongoose from 'mongoose';
import { COLLECTIONS } from '../config/dbConfig.js';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    match: [/^\d{10}$/, 'Please provide a valid 10-digit mobile number'],
  },
  collegeName: {
    type: String,
    required: [true, 'College name is required'],
    enum: {
      values: ['Queens college of Arts and science for women'],
      message: 'College name must be "Queens college of Arts and science for women"',
    },
    default: 'Queens college of Arts and science for women',
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    enum: {
      values: ['I', 'II', 'III'],
      message: 'Year must be I, II, or III',
    },
  },
  course: {
    type: String,
    required: [true, 'Course/stream is required'],
    enum: {
      values: ['BA', 'BCom', 'BBA', 'B.Sc', 'BCA', 'MA', 'Mcom'],
      message: 'Course must be BA, BCom, BBA, B.Sc, BCA, MA, or Mcom',
    },
  },
  dept: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  role: {
    type: String,
    default: 'student', // Default role added
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create model mapping explicitly to the 'users' collection
const User = mongoose.model('User', userSchema, COLLECTIONS.USERS);

export default User;
