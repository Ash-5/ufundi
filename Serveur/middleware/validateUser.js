
import validator from 'validator';
import { check, validationResult } from 'express-validator';

class validation {
  static async signup(req, res, next) {
    const { name, email, password } = req.body;

    // if (!check(name).isLength({ min: 5 })) {
    //   res.send({ error: 'the name must be at least 5 characters length ' });
    // }

    if (name === '' || email === '' || password === '') {
      return res.send({ error: 'input field is required' });
    }
    if (RegExp(/^[a-zA-Z0-9]{3,30}$/).test(password)) {
      return res.send({ error: 'le mot de passe doit etre valide' });
    }
    if (!check(name).isLength({ min: 5, max: 30 }) || !check(password).isLength({ min: 6 })) {
      // if (name.length < 5 || email.length < 5 || password.length < 6) {
      return res.send({ error: 'please input the valid length' });
      // }
    }
    // if (name.length > 30 || email.length > 30 || password.length > 30) {
    //   return res.send({ error: 'please the length must not exceed the required length' });
    // }
    // if (!(RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(email).toLocaleLowerCase()))) {
    //   return res.send({ error: 'this email is not valid' });
    // }
    if (!check(email).isEmail()) {
      return res.send({ error: 'this email is not valid' });
    }
    if (!isNaN(name) || !isNaN(email) || !isNaN(password)) {
      return res.send({
        error: 'please, the value must be a string',
      });
    }

    // if (!(RegExp(/^[a-zA-Z0-9]{3,30}$/).test(password))) {
    //   return res.send({
    //     error: 'the password must be valid',
    //   });
    // }
    return next();
  }

  static async signin(req, res, next) {
    const { email, password } = req.body;
    if (email === '' || password === '') {
      return res.send({ error: 'ce champs est obligatoire' });
    } if (!(password.length > 6 && password.length < 50)) {
      return res.send({ error: 'la taille du mot de passe doit etre superieur 6' });
    } if (RegExp(/^[a-zA-Z0-9]{3,30}$/).test(password)) {
      return res.send({ error: 'le mot de passe doit etre valide' });
    } if (!(RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(email).toLocaleLowerCase()))) {
      return res.send({ error: 'email doit etre valide' });
    }
    return next();
  }

  static async logout(req, res, next) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/');
      });
    }
  }
}

export default validation;
