import User from '../models/User';

const findUser = async uid => {
  const user = await User.findOne({uid});

  return user;
};

export default findUser;
