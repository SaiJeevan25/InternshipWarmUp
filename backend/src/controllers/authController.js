import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { getUserByEmail, createUser, setMobileVerified, setEmailVerified } from '../models/userModel.js';
import { sendEmailVerification, sendMobileOTP, verifyFirebaseEmail, verifyFirebaseOTP } from '../services/firebaseService.js';
import createError from 'http-errors';

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, { errors: errors.array() }));
    }
    const { email, password, full_name, gender, mobile_no, signup_type } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) return next(createError(400, 'Email already registered'));
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ email, password: hashedPassword, full_name, gender, mobile_no, signup_type });
    await sendMobileOTP(mobile_no);
    await sendEmailVerification(email);
    res.status(201).json({ success: true, message: 'User registered successfully. Please verify mobile OTP.', data: { user_id: user.id } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return next(createError(401, 'Invalid credentials'));
    const match = await bcrypt.compare(password, user.password);
    if (!match) return next(createError(401, 'Invalid credentials'));
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '90d' });
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { oobCode, email } = req.query;
    const verified = await verifyFirebaseEmail(oobCode, email);
    if (!verified) return next(createError(400, 'Invalid or expired verification link'));
    await setEmailVerified(email);
    res.json({ success: true, message: 'Email verified successfully.' });
  } catch (err) {
    next(err);
  }
};

export const verifyMobile = async (req, res, next) => {
  try {
    const { mobile_no, otp } = req.body;
    const verified = await verifyFirebaseOTP(mobile_no, otp);
    if (!verified) return next(createError(400, 'Invalid OTP'));
    await setMobileVerified(mobile_no);
    res.json({ success: true, message: 'Mobile verified successfully.' });
  } catch (err) {
    next(err);
  }
};
