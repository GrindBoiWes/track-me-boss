const inquirer = require('inquirer');
const { viewDepartments } = require('./db/database');
require('console.table');

const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addEmployee,
    updateEmployeeRole,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
   
} = require('./db/database')

function startMenu() {
    inquirer
      .prompt ({
        name: 'action',
        type: 'list',
        message: 'What Would You Like To Do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add A Department',
            'Add An Employee',
            'Update An Employee Role',
            'Update An Employee Manager',
            'View Employees By Manager',
            'View Employees By Department',
            'Delete A Department',
            'Delete A Role',
            'Delete An Employee',
            'Quit'
        ]
      })
      .then(function(answer) {

        switch(answer.action) {
            case 'View All Departments':
                viewDepartments();
                startMenu();
                break;
            
            case 'View All Roles':
                viewRoles();
                startMenu();
                break;

            case 'View All Employees':
                viewEmployees();
                startMenu();
                break;

            case 'Add A Department':
                addDepartment();
                break;


            case 'Add An Employee':
                addEmployee();
                break;

            case 'Update An Employee Role':
                updateEmployeeRole();
                break;

            case 'Update An Employee Manager':
                updateEmployeeManager();
                break;

            case 'View Employees By Manager':
                viewEmployeesByManager();
                break;

            case 'View Employees By Department':
                viewEmployeesByDepartment();
                break;

            case 'Delete A Department':
                deleteDepartment();
                break;

            case 'Delete A Role':
                deleteRole();
                break;

            case 'Delete An Employee':
                deleteEmployee();
                break;

            case 'Quit':
                database.connection.end();
                break;
        }

      });
}

startMenu();

module.exports = {
    startMenu
};