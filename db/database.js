
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const { startMenu } = require('..');
require('dotenv').config();

const dbConnect = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function viewDepartments() {
    dbConnect.query(
        'SELECT id, name FROM departments',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startMenu();
        }
    );
}

function viewRoles() {
    dbConnect.query(
        `SELECT roles.id, roles.title, departments.name AS department, roles.salary
        FROM roles
        JOIN departments ON roles.department_id = departments.id`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startMenu();
        }
    );
}

function viewEmployees() {
    dbConnect.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary,
        CONCAT(managers.first_name, ' ', managers.last_name) AS manager
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startMenu();
        }
    );
}

function addDepartment() {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'Enter the name of the department:'
        })
        .then(function (answer) {
            dbConnect.query(
                'INSERT INTO departments SET ?',
                { name: answer.name },
                function (err, res) {
                    if (err) throw err;
                    console.log(`\n${res.affectedRows} department inserted!\n`);
                    startMenu();
                }
            );
        });
}

function addRole() {
    dbConnect.query(
        'SELECT * FROM departments',
        function (err, departments) {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: 'title',
                        type: 'input',
                        message: 'Enter the title of the role:'
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'Enter the salary of the role:'
                    },
                    {
                        name: 'department',
                        type: 'list',
                        message: 'Choose the department:',
                        choices: departments.map(department => ({ name: department.name, value: department.id }))
                    }
                ])
                .then(function (answer) {
                    dbConnect.query(
                        'INSERT INTO roles SET ?',
                        { title: answer.title, salary: answer.salary, department_id: answer.department },
                        function (err, res) {
                            if (err) throw err;
                            console.log(`\n${res.affectedRows} role inserted!\n`);
                            startMenu();
                        }
                    );
                });
        }
    );
}