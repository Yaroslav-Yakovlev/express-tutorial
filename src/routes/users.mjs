import { Router } from 'express';
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from 'express-validator';
import { mockUsers } from '../utils/data.js';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';
import { resolveIndexByUserId } from '../middlewares/findUserMiddleware.mjs';

const router = Router();

router.get(
  '/api/users',
  query('filter').
    isString().
    notEmpty().
    withMessage('Must not be not empty').
    isLength({ min: 3, max: 10 }).
    withMessage('Must be at least 3-10 characters'),
  (req, res) => {
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      // console.log('sessionData',sessionData);
    });
    const result = validationResult(req);
    // console.log(result);
    const {
      query: { filter, value },
    } = req;

    if (filter && value) {
      return res.send(
        mockUsers.filter(user => user[filter].includes(value)),
      );
    }

    return res.send(mockUsers);
  });

router.get(
  '/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    const findUser = mockUsers[findUserIndex];
    if (!findUser) return res.sendStatus(404);

    return res.send(findUser);
  },
);

router.post(
  '/api/users',
  checkSchema(createUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    // console.log(result);

    if (!result.isEmpty()) {
      return res.status(404).send({ errors: result.array() });
    }

    const data = matchedData(req);
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUser);

    return res.status(201).send(newUser);
  });

router.put('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

router.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

router.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default router;
