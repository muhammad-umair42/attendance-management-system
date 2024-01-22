import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

export const app = express();

//app middlewares and configuration

app.use(cors({ origin: `${process.env.CORS_ORIGIN}`, credentials: true }));
app.use(express.json({ limit: '16kb' }));

app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

//Routes

import authRouter from './routes/auth.route.js';

app.use('/api/v1/auth', authRouter);
