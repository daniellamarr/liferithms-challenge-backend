import Activity from '../models/Activity';
import randomize from '../helpers/randomize';
import findUser from '../helpers/findUser';

const createActivity = async (req, res) => {
  try {
    const {name, description, start_date, end_date, owner} = req.body;
    const activityId = randomize(null, 8);

    const user = await findUser(owner);
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
      owner,
      activityId
    });

    return res.status(201).send({
      success: true,
      message: 'activity created successfully',
      data: create
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'there was an error on the server'
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
      ...activity,
      name: name || activity.name,
      description: description || activity.description,
      start_date: start_date || activity.start_date,
      end_date: end_date || activity.end_date
    }

    await Activity.updateOne(updatedActivity);

    return res.send({
      success: true,
      message: 'activity updated successfully',
      data: updatedActivity
    });
  } catch (error) {
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

    await Activity.updateOne({active: false});

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

export {
  createActivity,
  editActivity,
  deleteActivity
}
