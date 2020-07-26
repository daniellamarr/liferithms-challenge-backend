import admin from 'firebase-admin';

const verifyGoogleToken = async (req, res, next) => {
  try {
    const token = req.body.token
      || req.query.token
      || req.headers.authorization
      || req.headers['x-access-token'];

    if (!token) {
      return res.status(400).send({
        success: false,
        message: 'token is a required parameter'
      });
    }

    const decodedToken  = await admin
      .auth()
      .verifyIdToken(token);

    if (!decodedToken.uid) {
      return res.status(401).send({
        success: false,
        message: 'the token you passed is either invalid or expired'
      });
    }

    req.user = {
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture,
      uid: decodedToken.uid
    }

    next();
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'there was an error on the server-'
    });
  }
}

export default verifyGoogleToken;
