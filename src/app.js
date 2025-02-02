const express = require('express');
const { 
  loginController, 
  userController, 
  categoriesController, 
  postController,
} = require('./controllers');
const validateJWT = require('./auth/validateJWT');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.get('/user', validateJWT, async (req, res) => userController.getUser(req, res));

app.get('/user/:id', validateJWT, async (req, res) => userController.getUserById(req, res));

app.get(
  '/categories', 
  validateJWT,
  async (req, res) => categoriesController.getCategories(req, res),
);

app.post('/login', async (req, res) => loginController.postLogin(req, res));

app.post('/user', async (req, res) => userController.postUser(req, res));

app.post(
  '/categories', 
  validateJWT,
  async (req, res) => categoriesController.postCategories(req, res),
);

app.post('/post', validateJWT, async (req, res) => postController.postPost(req, res));

module.exports = app;
