import express from 'express';
import router from './routes';

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

router.use('/*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Endpoint not found! Go to the homepage using: /api/v1',
  });
});

app.listen(PORT, () => console.log(`Quick credit server running at port ${PORT}...`));

export default app;
