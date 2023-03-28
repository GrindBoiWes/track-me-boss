const inquirer = require('inquirer');
const database = require('./db/database');
const logo = require('ascii-art');
const logoImg = logo({name: "Track Me Boss!"}).render();

console.log(logoImg);

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
            'Add A Role',
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
                database.viewDepartments();
                break;
            
            case 'View All Roles':
                database.viewRoles();
                break;

            case 'View All Employees':
                database.viewEmployees();
                break;

            case 'Add A Department':
                database.addDepartment();
                break;

            case 'Add A Role':
                database.addRole();
                break;

            case 'Add An Employee':
                database.addEmployee();
                break;

            case 'Update An Employee Role':
                database.updateEmployee();
                break;

            case 'Update An Employee Manager':
                database.updateEmployeeManager();
                break;

            case 'View Employees By Manager':
                database.viewEmployeesByManager();
                break;

            case 'View Employees By Department':
                database.viewEmployeesByDepartment();
                break;

            case 'Delete A Department':
                database.deleteDepartment();
                break;

            case 'Delete A Role':
                database.deleteRole();
                break;

            case 'Delete An Employee':
                database.deleteEmployee();
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