import User from '../models/User';
import findUser from '../helpers/findUser';
import generateToken from '../helpers/generateToken';

const signUp = async (req, res) => {
  try {
    const {name, email, picture, uid} = req.user;
    if (!name || !email || !uid) {
      return res.status(400).send({
        success: false,
        message: 'missing fields'
      });
    }

    const userExist = await findUser(uid);
    if (userExist) {
      return res.send({
        success: true,
        message: 'user logged in',
        data: {
          token: generateToken(req.user),
          user: userExist
        }
      });
    }

    const user = await User.create({
      name,
      email,
      picture,
      uid
    });

    return res.status(201).send({
      success: true,
      message: 'signed up successfully',
      data: {
        token: generateToken(req.user),
        user
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'there was an error on the server|'
    });
  }
}

const signIn = async (req, res) => {
  try {
    const {uid} = req.user;

    const user = await findUser(uid);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'you need to sign up first',
      });
    }
    return res.send({
      success: true,
      message: 'user logged in',
      data: {
        token: generateToken(req.user),
        user
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
  signUp,
  signIn
}
