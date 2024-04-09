import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(routes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.cookie('hello', 'world', { maxAge: 30000, signed: true });
  res.status(201).send({ msg: 'Hello' });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
