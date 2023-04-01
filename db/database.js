// This page piggybacks off of the index.js file" I originally had a lot more in here, but an askbcs tutor had me delete most of this page. At the moment, everything still functions as it should.
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

