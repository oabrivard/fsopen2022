const redis = require('../redis')
const express = require('express');
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET statictics data. */
router.get('/statistics', async (req, res) => {
  const todosCount = await redis.getAsync('todosCount');

  res.send({
    added_todos: Number(todosCount ?? 0)
  });
});

module.exports = router;
