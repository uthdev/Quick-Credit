import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

const PORT = process.env.PORT || 5038;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOption));


app.use('/', router);

router.use('/*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Endpoint not found! Go to the homepage using: /api/v1',
  });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Quick credit server running at port ${PORT}...`));

export default app;
