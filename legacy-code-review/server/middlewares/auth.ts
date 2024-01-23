import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { RequestWithSession, AuthMiddleware } from '../types/types';


export const authMiddleware = async (req: RequestWithSession, res: Response, next: NextFunction): Promise<void> => {

  try {
    const uid  = req.session.uid;

    if (!uid) throw new Error('User not authenticated');

    const user = await User.findOne({ _id: uid });
    if (!user) throw new Error('User not found');
    req.user = user;
    next();
  } catch (error) {
     res.sendStatus(401);
  }
};

export default authMiddleware;
