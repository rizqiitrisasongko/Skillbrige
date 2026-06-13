const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Tes koneksi
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Koneksi database gagal, bro! :', err.message);
    } else {
        console.log('🚀 Mantap! Backend sukses terhubung ke Cloud Database Aiven.');
        connection.release();
    }
});

module.exports = pool.promise();