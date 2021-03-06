import express, { Request, Response } from 'express';
import { newsRouter } from './routes/news_routes';
import { userRouter } from './routes/users_routes';
import { newsAdminRouter } from './routes/news_admin_routes';
import './services/DataBasInit';
const bodyParser: any = require('body-parser');
// if (process.env.NODE_ENV === 'production') {
//   require('dotenv').config({ path: './prod.env' });
// } else {
//   require('dotenv').config({ path: './dev.env' });
// }
require('dotenv').config();

const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req: Request, res: Response) => {
  return res.redirect('/news');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/admin/user', userRouter);
app.use('/admin/news', newsAdminRouter);
app.use('/news', newsRouter);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Le server écoute sur le port ${PORT}\nEnvironement : ${process.env.NODE_ENV}`
  );
  console.log('username : ', process.env.MONGO_USER);
  console.log('password : ', process.env.MONGO_PASSWORD);
  console.log('database name : ', process.env.MONGO_DBNAME);
  console.log('hostname : ', process.env.MONGO_HOSTNAME);
});
