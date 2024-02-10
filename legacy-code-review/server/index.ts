import express from 'express';
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import cors from 'cors';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

export { app };


const corsConfig: cors.CorsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

const MongoDBStore = ConnectMongoDBSession(session);

const store: ConnectMongoDBSession.MongoDBStore = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions',
});

store.on('error', (error: Error) => {
  console.log('MongoDB session store error:', error);
});

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

app.use(router);

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


export { server };