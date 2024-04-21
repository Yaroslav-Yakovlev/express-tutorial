import { Router } from 'express';
import { mockUsers } from '../utils/data.js';

const router = Router();

router.post('/api/auth', (req, res) => {
  const {
    body: { username, password },
  } = req;
  const findUser = mockUsers.find(user => user.username === username);

  if (!findUser || findUser.password !== password) {
    return res.status(401).send({ msg: 'Bad credentials' });
  }

  req.session.user = findUser;
  return res.status(200).send(findUser);
});

router.get('/api/auth/status', (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    // console.log('session', session);
  });

  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(402).send({ msg: 'Not Authenticated' });
});

export default router;
