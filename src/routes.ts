import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

const router = Router();

router.post('/users', UserController.store);
router.get('/users', authMiddleware, UserController.list);

router.post('/findUser/:email', UserController.findByEmail);
router.put('/updateUser/:id', UserController.update);

/**
 * Auth
 */
router.post('/auth', AuthController.authenticate);


export default router;