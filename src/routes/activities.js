import {Router} from 'express';
import {createActivity, editActivity, deleteActivity} from '../controllers/activities';
import verifyToken from '../helpers/verifyToken';

const activitiesRouter = Router();

activitiesRouter.post('/create', verifyToken, createActivity);
activitiesRouter.put('/edit', verifyToken, editActivity);
activitiesRouter.options('/delete', verifyToken, deleteActivity);

export default activitiesRouter;
