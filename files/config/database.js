const mysql = require ('mysql');
const util = require ('util');

const pool = mysql.createPool({
    connectionLimit: 1000,
    host: 'databases.000webhost.com',
    user: 'id16683812_dicias',
    password: 'J3\Sj~fcu4No<Wnj',
    database: 'id16683812_achu123',
});


pool.query = util.promisify(pool.query);

module.exports = pool; 
