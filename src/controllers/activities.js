import Activity from '../models/Activity';
import randomize from '../helpers/randomize';
import findUser from '../helpers/findUser';

const createActivity = async (req, res) => {
  try {
    const {uid} = req.user;
    const {name, description, start_date, end_date} = req.body;

    if (!name || !description || !start_date || !end_date) {
      return res.status(400).send({
        success: false,
        message: 'missing fields'
      });
    }

    const activityId = randomize(null, 8);

    const user = await findUser(uid);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'you passed a non-existing owner id'
      });
    }

    const create = await Activity.create({
      name,
      description,
      start_date,
      end_date,
      owner: uid,
      activityId
    });

    return res.status(201).send({
      success: true,
      message: 'activity created successfully',
      data: {
        activity: create
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'there was an error on the server-'
    });
  }
}

const editActivity = async (req, res) => {
  try {
    const {activityId} = req.params;
    const {name, description, start_date, end_date} = req.body

    const activity = await Activity.findOne({activityId});

    if (!activity) {
      return res.status(404).send({
        success: false,
        message: 'this activity does not exist'
      });
    }

    const updatedActivity = {
      name: name || activity.name,
      description: description || activity.description,
      start_date: start_date || activity.start_date,
      end_date: end_date || activity.end_date
    }

    await activity.updateOne(updatedActivity);

    return res.send({
      success: true,
      message: 'activity updated successfully',
      data: {
        activity: {
          ...activity.toObject(),
          ...updatedActivity
        }
      }
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'there was an error on the server'
    });
  }
}

const deleteActivity = async (req, res) => {
  try {
    const {activityId} = req.params;

    const activity = await Activity.findOne({activityId});

    if (!activity) {
      return res.status(404).send({
        success: false,
        message: 'this activity does not exist'
      });
    }

    await activity.updateOne({active: false});

    return res.send({
      success: true,
      message: 'activity deleted successfully',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'there was an error on the server'
    });
  }
}

const fetchActivities = async (req, res) => {
  try {
    const {uid} = req.user;
    const activities = await Activity.find({
      owner: uid,
      active: true
    });

    return res.send({
      success: true,
      message: 'activities returned successfully',
      data: {
        activities
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'there was an error on the server'
    });
  }
}

const fetchActivity = async (req, res) => {
  try {
    const {uid} = req.user;
    const {activityId} = req.params;
    const activity = await Activity.findOne({
      owner: uid,
      activityId,active: true
    });

    if (!activity) {
      return res.status(404).send({
        success: false,
        message: 'this activity does not exist'
      });
    }

    return res.send({
      success: true,
      message: 'activity returned successfully',
      data: {
        activity
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'there was an error on the server'
    });
  }
}

export {
  createActivity,
  editActivity,
  deleteActivity,
  fetchActivities,
  fetchActivity
}
