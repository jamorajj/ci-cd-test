const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const mysql = require('mysql2/promise');

const sq = require('./config/database');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

async function startServer(app, sq) {
  try {
    await sq.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return;
  }

  await sq.sync({ alter: true });

  app.listen(3000);

  // routes
  app.get('*', checkUser);
  app.get('/', (req, res) =>  {
    res.locals.pageTitle = '- Home';
    return res.render('home');
  });
  app.get('/dashboard', requireAuth, (req, res) => {
    res.locals.pageTitle = '- Dashboard';
    return res.render('dashboard');
  });
  app.use(authRoutes);
}

mysql.createConnection({
  user     : 'root',
  password : 'password'
}).then((connection) => {
  connection.query('CREATE DATABASE IF NOT EXISTS nodeauth;').then(() => {
    startServer(app, sq);
  })
});