import {Router} from 'express';
import {signUp, signIn} from '../controllers/users';
import verifyGoogleToken from '../helpers/verifyGoogleToken';

const usersRouter = Router();

usersRouter.post('/signup', verifyGoogleToken, signUp);
usersRouter.post('/signin', verifyGoogleToken, signIn);

export default usersRouter;
