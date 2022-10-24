const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis')

const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const todosCount = await redis.getAsync('todosCount');
  await redis.setAsync('todosCount', Number(todosCount ?? 0) + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo); 
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text;
  req.todo.done = Boolean(req.body.done);
  await req.todo.save();
  res.send(req.todo); 
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
