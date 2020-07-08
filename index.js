require('dotenv/config');
const express = require('express');
const app = express();
const nocache = require('nocache');
const port = process.env.PORT;

app.use(nocache());

app.get('/hello', (req, res) =>
  res.status(200).json({ name: 'John Doe', age: 40, message: 'Hello' })
);

app.get('/home', (req, res) => {
  res.status(200).json({ title: 'home', description: 'Just another homepage' });
});

app.listen(port, () => {
  console.log(`listening at http://${BASE_URL}:${port}`);
});
