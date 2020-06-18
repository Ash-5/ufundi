import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Token {
  static async authorizeAccess(req, res, next) {
    try {
      // const token = req.headers.authorization;
      // const token = req.header('Authorization').replace('Bearer ', '');
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      console.log(`mwafrikkke ${token}`);
      if (token == null) return res.status(401).send({ status: 'error', message: 'please login to get access to this route' });

      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      console.log(req.user);
      return next();
    } catch (error) {
      return res.status(400).send({ status: 'error', message: 'you are not Autorized' });
    }
  }
}

export default Token.authorizeAccess;
