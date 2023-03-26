const inquirer = require('inquirer');
const database = require('./db/database');
const logo = require('asciiart-logo');
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