import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ufundiDB',
  multipleStatements: true,
});

db.connect((err, res) => {
  if (err) throw err;
  console.log('database is successfully connected');
  // db.end();
});
export default db;
