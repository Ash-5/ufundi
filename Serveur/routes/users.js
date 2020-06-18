import { Router } from 'express';
// import validator from 'express-joi-validation';
import userController from '../controllers/users';
import valid from '../middleware/validateUser';

const app = Router();
// const valid = validator.createValidator({});
app
  .post('/signup', valid.signup, userController.signup)
  .get('/signup', userController.getSignup)
  .post('/signin', valid.signin, userController.signin)
  .get('/signin', userController.getSignin)
  .get('/logout', valid.logout);

export default app;
