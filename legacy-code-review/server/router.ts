import { Router, Request, Response, NextFunction } from 'express';
import { UserController, AuthMiddleware, RequestWithSession } from './types/types';
import userController from './controllers/user';
import authMiddleware from './middlewares/auth';


const router = Router();


router.post('/register', (req: Request, res: Response) => userController.create);

router.post('/login', (req: Request, res: Response) => userController.login);

router.get('/me', authMiddleware, (req: RequestWithSession, res: Response, next: NextFunction) => userController.profile);

router.post('/logout', authMiddleware, (req: RequestWithSession, res: Response, next: NextFunction) => userController.logout);

router.get('/api/create_link_token/us', (req: Request, res: Response, next: NextFunction) => userController.createLinkTokenUS);

router.get('/api/create_link_token/es', (req: Request, res: Response, next: NextFunction) => userController.createLinkTokenES);

router.get('/api/create_link_token/gb', (req: Request, res: Response, next: NextFunction) => userController.createLinkTokenGB);

router.post('/api/exchange_public_token', (req: Request, res: Response, next: NextFunction) => userController.exchangePublicToken);

router.get('/api/balance', (req: Request, res: Response, next: NextFunction) => userController.getBalances);

export default router;
