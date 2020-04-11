const express = require('express');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(helmet());
app.use(
  express.json({
    extended: false,
  })
);
app.use(allowCrossDomain);

app.get('/', (req, res) => {
  const data = { msg: 'Task list API...' };
  res.json(data);
});

app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
