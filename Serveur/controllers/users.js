import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { cookie } from 'express-validator';
import cookieParser from 'cookie-parser';
import db from '../database/database';
import CheckLog from '../middleware/verifySession';

const useConnectedURL = '/api/v1/post';


dotenv.config();

class userController {
  static async signup(req, res) {
    const {
      name, email, password,
    } = req.body;

    const sql1 = `SELECT * FROM users WHERE email='${email}'`;
    const hashpass = bcryptjs.hashSync(password, 10);
    const sql2 = `INSERT INTO users(name,email,password) VALUES('${name}','${email}','${hashpass}')`;


    try {
      db.query(sql1, (err, rows, fields) => {
        // console.log(rows[0]);
        if (rows.length > 0) {
          console.log(rows[0]);
          res.send({
            message: 'this is email is taken choose another',
          });
        } else {
          db.query(sql2, (err, rows2, fields) => {
            db.query(sql1, (err, rows3, fields) => jwt.sign({ data: rows3[0] }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
              // req.session.userSession = token;
              res.send(JSON.stringify({
                status: 200,
                code: 'OK',
              }));
              res.redirect('/api/v1/auth/signin');
            }));
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getSignup(req, res) {
    // CheckLog.onConnected(req.session.userSession, res, req, useConnectedURL, () => {
    res.render('register');
    // });
  }

  static async signin(req, res, next) {
    const { email, password } = req.body;

    const sql1 = `SELECT * FROM users WHERE email='${email}'`;
    // localStorage.setItem('item', 'mwafrika');
    db.query(sql1, (err, rows, fields) => {
      if (rows.length > 0) {
        const comparePass = bcryptjs.compareSync(password, rows[0].password);
        if (!comparePass) {
          res.send({ err: 'password not valid' });
        } else {
          const data = {
            id: rows[0].id,
            email: rows[0].email,
            password: rows[0].password,
          };

          jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
            req.session.user = token;
            // req.session.userSession = token;
            // res.cookie('jwt', token, { httpOnly: false, secure: false, maxAge: 3600000 });
            // res.end('hey');
            // console.log(req.cookies);
            res.send({
              token,
            });
            console.log(req.user);
          });
          // res.redirect('/api/v1/products');
        }
      } else {
        res.send({
          err: 'You are not registered, please signup to login',
        });
      }
    });
  }

  static async getSignin(req, res) {
    // CheckLog.onConnected(req.session.userSession, res, req, useConnectedURL, () => {
    res.render('login');
    // });
  }

  // not done
  static async resetPassword(req, res) {
    const {
      newPassword, confirmPass, password, email,
    } = req.body;
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    const sql1 = `UPDATE users SET password = '${password}'`;
    db.query(sql, (err, rows, fields) => {
      if (rows.length > 0) {
        if (newPassword === confirmPass) {
          db.query(sql1, (err, rows1, fields) => {
            if (err) return res.send({ err });
            res.send({
              message: 'votre mot de passe a ete reinitialise avec succes',
            });
          });
        }
      }
    });
  }
}


export default userController;
