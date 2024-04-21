import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './starategies/local-strategy.mjs';
import localStrategy from './starategies/local-strategy.mjs';

const app = express();

app.use(express.json());
app.use(cookieParser('helloworld'));

app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60,
  },
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);

app.use(routes);

app.post('/api/auth', passport.authenticate('local'), (req, res) => {
  console.log('or');
  res.send(req.user);
  res.sendStatus(200);
});

app.get('/api/auth/status', (req, res) => {
  console.log('inside /api/auth/status');
  console.log(req.session);
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

app.post('/api/auth/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout(err => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});

const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   // console.log(req.session);
//   // console.log(req.session.id);
//   req.session.visited = true;
//   res.cookie('hello', 'world', { maxAge: 30000, signed: true });
//   res.status(201).send({ msg: 'Hello' });
// });

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
