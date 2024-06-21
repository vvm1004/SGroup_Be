// config.js
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  database: 'test',
};

export const connection = mysql.createPool(dbConfig);