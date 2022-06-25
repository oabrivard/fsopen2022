import express = require('express');
import { bmiRouter } from './controllers/bmi';
import { exerciseRouter } from './controllers/exercise';

const app = express();
app.use(express.json());

app.use('/bmi',bmiRouter);
app.use('/exo',exerciseRouter);

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});