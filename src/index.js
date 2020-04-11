const express = require('express');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

app.use(helmet());

app.get('/', (req, res) => {
  const data = { msg: 'Hello' };
  res.json(data);
});

app.get('/test', (req, res) => {
  const data = { msg: 'test' };
  res.json(data);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
