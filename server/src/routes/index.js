import { Router } from 'express';
import authRoute from './authRoutes';
import userRoute from './userRoutes';
import loanRoute from './loanRoutes';

const router = new Router();

router.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Quick Credit API',
  });
});

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/loans', loanRoute);

export default router;
