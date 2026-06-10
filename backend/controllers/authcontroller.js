import User from '../models/User.js';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

async function registerUser(name, email, password) {
    
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email is already registered');

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  
  return { id: newUser._id, name: newUser.name, email: newUser.email };
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email }
  };
}

export default { registerUser, loginUser };