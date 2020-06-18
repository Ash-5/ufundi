import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import cookies from 'cookie-parser';
import session from 'express-session';
import randomChars from 'node-random-chars';
import userRoute from './Serveur/routes/users';
import products from './Serveur/routes/produit';
import commande from './Serveur/routes/commande';
import cart from './Serveur/routes/cart';

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// cookies
app.use(cookies());
// express-session
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  genid(req) {
    return randomChars.create(32);
  },
  secret: process.env.SECRET_SESSION,
  cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: true,
  // cookie: {secure: true}
}));

// app.get('/', (req, res) => {
//   res.render('index', {
//   });
// });

app.use('/api/v1/auth', userRoute);
app.use('/api/v1', products);
app.use('/api/v1', commande);
app.use('/api/v1', cart);

const port = 7000;
app.listen(port, () => {
  console.log(`server is listning to the port ${port}`);
});
export default app;
