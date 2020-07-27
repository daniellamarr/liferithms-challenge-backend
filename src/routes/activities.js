import {Router} from 'express';
import {
  createActivity,
  editActivity,
  deleteActivity,
  fetchActivity,
  fetchActivities
} from '../controllers/activities';
import verifyToken from '../helpers/verifyToken';

const activitiesRouter = Router();

activitiesRouter.post('/create', verifyToken, createActivity);
activitiesRouter.put('/edit/:activityId', verifyToken, editActivity);
activitiesRouter.put('/delete/:activityId', verifyToken, deleteActivity);
activitiesRouter.get('/view/:activityId', verifyToken, fetchActivity);
activitiesRouter.get('/view', verifyToken, fetchActivities);

export default activitiesRouter;
