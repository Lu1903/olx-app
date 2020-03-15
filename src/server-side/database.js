var mysql = require('mysql');
const DATABASE = require('./database-credentials');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: DATABASE.host,
  user: DATABASE.user,
  password: DATABASE.password,
  database: DATABASE.database,
});
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }
    if (connection) connection.release();
    return;
})
module.exports = pool;