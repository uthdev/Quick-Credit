import { Router } from 'express';
import authRoute from './authRoutes';

const router = new Router();

router.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Quick Credit API',
  });
});

router.use('/api/v1', authRoute);

export default router;
