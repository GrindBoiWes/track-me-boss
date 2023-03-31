
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
// const { startMenu } = require('..');
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
            console.log(res);
           
        }
    );
}

function viewRoles() {
    dbConnect.query(
        `SELECT roles.id, roles.title, department.name AS departments, roles.salary
        FROM roles
        JOIN departments ON roles.department_id = departments.id`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
           
        }
    );
}

function viewEmployees() {
    dbConnect.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name AS departments, roles.salary,
        CONCAT(managers.first_name, ' ', managers.last_name) AS manager
        FROM employees
        LEFT JOIN roles ON employee.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employee AS managers ON employee.manager_id = managers.id`,
        function (err, res) {
            if (err) throw err;
            console.log(res);
           
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

function addEmployee() {
    inquirer
      .prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the First Name of the Employee:'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the Last Name of the Employee:'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter the Role ID for the employee:'
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'Enter the Manager ID for the employee (NULL if no manager):'
        }
      ])
      .then(function(answer){
        dbConnect.query(
            'INSERT INTO employees SET ?',
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function (err) {
                if (err) throw (err);
                console.log(`Added employee: ${answer.first_name} ${answer.last_name}`);
                startMenu()
            }
        );
      });
}

function updateEmployeeRole() {
    dbConnect.query(
        'SELECT * FROM employees',
        function (err, employees) {
            if (err) throw err;
            dbConnect.query(
                'SELECT * FROM roles',
                function (err, roles) {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                name: 'employee',
                                type: 'list',
                                message: 'Select the employee to update:',
                                choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
                            },
                            {
                                name: 'role',
                                type: 'list',
                                message: 'Select the new role for the employee:',
                                choices: roles.map(role => ({ name: role.title, value: role.id }))
                            }
                        ])
                        .then(function (answer) {
                            dbConnect.query(
                                'UPDATE employees SET ? WHERE ?',
                                [
                                    {
                                        role_id: answer.role
                                    },
                                    {
                                        id: answer.employee
                                    }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(`\n${res.affectedRows} employee updated!\n`);
                                    startMenu();
                                }
                            );
                        });
                }
            );
        }
    );
}

function updateEmployeeManager() {
    dbConnect.query(
        'SELECT * FROM employees',
        function (err, employees) {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: 'employee',
                        type: 'list',
                        message: 'Select the employee to update:',
                        choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
                    },
                    {
                        name: 'manager',
                        type: 'list',
                        message: 'Select the new manager for the employee:',
                        choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
                    }
                ])
                .then(function (answer) {
                    dbConnect.query(
                        'UPDATE employees SET ? WHERE ?',
                        [
                            {
                                manager_id: answer.manager
                            },
                            {
                                id: answer.employee
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(`\n${res.affectedRows} employee updated!\n`);
                            startMenu();
                        }
                    );
                });
        }
    );
}

function viewEmployeesByManager() {
    dbConnect.query(
        `SELECT CONCAT(managers.first_name, ' ', managers.last_name) AS manager, employees.id, employees.first_name, employees.last_name, roles.title, department.name AS department, roles.salary
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id
        ORDER BY manager, employees.last_name`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startMenu();
        }
    );
}

function viewEmployeesByDepartment() {
    dbConnect.query(
        `SELECT departments.name AS department, employees.id, employees.first_name, employees.last_name, roles.title, roles.salary
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN department ON roles.department_id = department.id
        ORDER BY department, employees.last_name`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startMenu();
        }
    );
}

function deleteDepartment() {
    inquirer
        .prompt({
            name: 'departmentId',
            type: 'input',
            message: 'Enter the ID of the department to delete:'
        })
        .then(function (answer) {
            dbConnect.query(
                'DELETE FROM departments WHERE ?',
                { id: answer.departmentId },
                function (err, res) {
                    if (err) throw err;
                    console.log(`\n${res.affectedRows} department deleted!\n`);
                    startMenu();
                }
            );
        });
}

function deleteRole() {
    inquirer
        .prompt({
            name: 'roleId',
            type: 'input',
            message: 'Enter the ID of the role to delete:'
        })
        .then(function (answer) {
            dbConnect.query(
                'DELETE FROM role WHERE ?',
                { id: answer.roleId },
                function (err, res) {
                    if (err) throw err;
                    console.log(`\n${res.affectedRows} role deleted!\n`);
                    startMenu();
                }
            );
        });
}

function deleteEmployee() {
    inquirer
        .prompt({
            name: 'employeeId',
            type: 'input',
            message: 'Enter the ID of the employee to delete:'
        })
        .then(function (answer) {
            dbConnect.query(
                'DELETE FROM employees WHERE ?',
                { id: answer.employeeId },
                function (err, res) {
                    if (err) throw err;
                    console.log(`\n${res.affectedRows} employee deleted!\n`);
                    startMenu();
                }
            );
        });
}


// function startMenu() {
//     inquirer
//       .prompt ({
//         name: 'action',
//         type: 'list',
//         message: 'What Would You Like To Do?',
//         choices: [
//             'View All Departments',
//             'View All Roles',
//             'View All Employees',
//             'Add A Department',
//             'Add An Employee',
//             'Update An Employee Role',
//             'Update An Employee Manager',
//             'View Employees By Manager',
//             'View Employees By Department',
//             'Delete A Department',
//             'Delete A Role',
//             'Delete An Employee',
//             'Quit'
//         ]
//       })
//       .then(function(answer) {

//         switch(answer.action) {
//             case 'View All Departments':
//                 viewDepartments();
//                 break;
            
//             case 'View All Roles':
//                 viewRoles();
//                 break;

//             case 'View All Employees':
//                 viewEmployees();
//                 break;

//             case 'Add A Department':
//                 addDepartment();
//                 break;

//             case 'Add An Employee':
//                 addEmployee();
//                 break;

//             case 'Update An Employee Role':
//                 updateEmployee();
//                 break;

//             case 'Update An Employee Manager':
//                 updateEmployeeManager();
//                 break;

//             case 'View Employees By Manager':
//                 viewEmployeesByManager();
//                 break;

//             case 'View Employees By Department':
//                 viewEmployeesByDepartment();
//                 break;

//             case 'Delete A Department':
//                 deleteDepartment();
//                 break;

//             case 'Delete A Role':
//                 deleteRole();
//                 break;

//             case 'Delete An Employee':
//                 deleteEmployee();
//                 break;

//             case 'Quit':
//                 database.connection.end();
//                 break;
//         }

//       });
// }

//startMenu();

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    
};