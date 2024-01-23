import { Request, Response, NextFunction } from 'express';
import User, { UserDocument }  from '../models/user';
import { Session } from 'express-session'
import { Document } from 'mongoose';

export interface CustomSession extends Session {
  uid?: string;

};


export interface User extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  balances: object[];
}


export interface RequestWithSession extends Request {

  session: CustomSession;
  user?: UserDocument | null;

}

export interface UserController {
  create: (req: Request, res: Response) => Promise<void>;
  login: (req: Request, res: Response) => Promise<void>;
  profile: (req: Request, res: Response) => Promise<void>;
  logout: (req: Request, res: Response) => Promise<void>;
  createLinkTokenUS: (req: Request, res: Response) => Promise<void>;
  createLinkTokenES: (req: Request, res: Response) => Promise<void>;
  createLinkTokenGB: (req: Request, res: Response) => Promise<void>;
  exchangePublicToken: (req: Request, res: Response) => Promise<void>;
  getBalances: (req: Request, res: Response) => Promise<void>;
}

export type AuthMiddleware =
  (req: RequestWithSession, res: Response, next: NextFunction) => void;
