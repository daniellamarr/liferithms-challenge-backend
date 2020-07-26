import {Router} from 'express';
import usersRouter from './users';
import activitiesRouter from './activities';

const router = Router();

router.use('/users', usersRouter);
router.use('/activities', activitiesRouter);

export default router;
