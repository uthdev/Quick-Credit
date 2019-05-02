import express from 'express';

const app = express();

const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Quick credit server running at port ${PORT}...`));
