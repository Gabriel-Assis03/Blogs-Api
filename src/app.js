const express = require('express');
const { loginController, userController } = require('./controllers');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', async (req, res) => loginController.postLogin(req, res));

app.post('/user', async (req, res) => userController.postUser(req, res));

module.exports = app;
