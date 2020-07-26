import mongo from 'mongoose';

const {Schema, model} = mongo;

const UserSchema = Schema({
  uid: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  picture: String
},
{
  timestamps: true
});

const User = model('User', UserSchema);

export default User;
