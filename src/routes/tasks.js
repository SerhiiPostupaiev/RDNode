const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const dbStorage = require('../db.json');
const Database = require('../DBService');

// @desc - get all tasks
router.get('/', (req, res) => {
  try {
    const db = new Database(dbStorage, './db.json');
    const data = db.allTasks;

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @desc - get concrete task
router.get('/:id', (req, res) => {
  try {
    const db = new Database(dbStorage, './db.json');
    const data = db.getConcreteTask(+req.params.id);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @desc - add task
router.post(
  '/',
  [
    check('header', 'Header is required').not().isEmpty(),
    check('text', 'Task description is required').not().isEmpty(),
    check(
      'text',
      'Task description is too long, only 30 symbols allowed'
    ).isLength({ max: 30 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const db = new Database(dbStorage, './db.json');
      const data = db.addTask(req.body);
      res.json(data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @desc - delete task
router.delete('/:id', (req, res) => {
  try {
    const db = new Database(dbStorage, './db.json');
    db.deleteTask(+req.params.id);

    res.json({ msg: 'task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @desc - edit task
router.put(
  '/:id',
  [
    check('header', 'Header is required').not().isEmpty(),
    check('text', 'Task description is required').not().isEmpty(),
    check(
      'text',
      'Task description is too long, only 30 symbols allowed'
    ).isLength({ max: 30 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { header, text } = req.body;

    const taskFields = {
      id: req.params.id,
      header,
      text,
    };

    try {
      const db = new Database(dbStorage, './db.json');

      const task = db.getConcreteTask(+req.params.id);

      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }

      const data = db.editTask(+req.params.id, taskFields);

      res.json(data);
    } catch (err) {
      console.error(er.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
