import mongo from 'mongoose';

const {Schema, model} = mongo;

const ActivitySchema = Schema({
  name: {
    type: String,
    required: [true, 'activity name is required']
  },
  description: {
    type: String,
    required: [true, 'activity description is required']
  },
  start_date: {
    type: Date,
    required: [true, 'activity start date is required']
  },
  end_date: {
    type: Date,
    required: [true, 'activity end date is required']
  },
  owner: {
    type: String,
    required: [true, 'activity owner is required']
  },
  activityId: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
});

const Activity = model('Activity', ActivitySchema);

export default Activity;
