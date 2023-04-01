
const inquirer = require('inquirer');
const mysql = require('mysql2');
//const { startMenu } = require('..');
require('console.table');
require('dotenv').config();

const dbConnect = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

