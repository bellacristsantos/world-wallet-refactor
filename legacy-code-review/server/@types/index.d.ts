import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument<string, any>;
    }
  }
}

declare module "express-session" {
  interface Session {
    uid?: string;
  }
}

declare module 'connect-mongodb-session' {
  import * as session from 'express-session';

  interface MongoDBStoreOptions {
    uri: string;
    collection: string;
  }

  class MongoDBStore extends session.Store {
    constructor(options: MongoDBStoreOptions);
  }
  export = MongoDBStore;
}