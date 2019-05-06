import { Router } from 'express';
import userRouter from './userRoutes';

const router = new Router();

router.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Quick Credit API',
  });
});

router.use('/api/v1', userRouter);

export default router;
