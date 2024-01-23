import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import { MemoryStore } from 'express-session'
import router from './router';

dotenv.config();

const app = express();

const store: session.Store = new MemoryStore();


app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false as boolean | undefined,
    secret: process.env.SESSION_SECRET || '',
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  }),
);

const corsConfig: cors.CorsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};


app.use(cors(corsConfig));
app.use(express.json());

app.use(router);

export { app };
