const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


class Team {
  constructor(id, name, employeeType, email) {
    this.id = id;
    this.name = name;
    this.employeeType = employeeType;
    this.email = email;
  }

  create() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Are you ready to set up your dev team ?",
        },
      ])
      .then((val) => {
        if (val.choice) {
          this.choiceOfRoles();
        } else {
          this.quit();
        }
      });
  }

  // Logs goodbye and exits the node app
  quit() {
    console.log(chalk.red("\nThe app has EXITED !! Goodbye!"));
    process.exit(0);
  }

  choiceOfRoles() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "id",
          message: "What is the Employee's Id ... ?",
        },
        {
          type: "input",
          name: "name",
          message: "What is the Employee's name ... ?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the Employee's email ... ?",
        },
        {
          type: "list",
          name: "roles",
          message: "Which Role would you like to add this team member to?",
          choices: ["Manager", "Engineer", "Intern"],
        },
      ])
      .then((val) => {
        console.log(val);
        switch (val.roles) {
          case "Manager":
            this.manager(val);
            break;
          case "Engineer":
            this.engineer(val);
            break;
          case "Intern":
            this.intern(val);
            break;
          default:
            break;
        }
      });
  }

  askMangerQuestion() {}

  manager(manager) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "officeNum",
          message: "What is your office number ?",
        },
      ])
      .then((val) => {
        console.log(val, manager);
      });
  }

  intern(intern) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "school",
          message: "What School do you attend ?",
        },
      ])
      .then((val) => {
        console.log(val, intern);
      });
  }

  engineer(engineer) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "officeNum",
          message: "What is your git hub user name ?",
        },
      ])
      .then((val) => {
        console.log(val, engineer);
      });
  }
}

const team = new Team();

team.create();

module.exports = Team;