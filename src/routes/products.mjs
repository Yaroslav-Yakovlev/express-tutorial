import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(201).send({ msg: 'Hello' });
});

router.get('/api/products', (req, res) => {
  res.send([{ id: 123, name: 'phone', price: 123.45 }]);
});

export default router;
