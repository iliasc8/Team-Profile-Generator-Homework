const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util')
const writeFileAsync = util.promisify(fs.writeFile);


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []


function newmembertype() {
    inquirer.prompt(
        [
            {
                type:"confirm",
                message:"Please choose another type of member",
                name:"anothermember",
            }

        ]
    )
    .then(val=>{
        if (val.anothermember){
            teammember()   
        }
        else{
            complete ()
        }
    })
}
async function complete (){
    const rendering = await render(employees)
    await writeFileAsync(outputPath, rendering);

}

function teammember() {
    inquirer.prompt(
        [
            {
                type:"list",
                message:"what kind of team member would you like to add?",
                choices:[
                    "Engineer",
                    "Intern",
                ],
                name:"choice"
            }
        ]
     )
     .then(val=>{
         if (val.choice==="Engineer")
         {
            EngineerInformation()   
         }
         else {InternInformation()}
     })
}

function managerInformation() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: `what's the team manager's name?`,
                name: "name"
            },

            {
                type: "input",
                message: `what's manager's ID?`,
                name: "id"
            },

            {
                type: "input",
                message: `what's manager's email address?`,
                name: "email"
            },

            {
                type: "input",
                message: `what's manager's office number?`,
                name: "officeNumber"
            }
        ]
    )
        .then(val => {
            const manager = new Manager(val.name, val.id, val.email, val.officeNumber)
            employees.push(manager)
        newmembertype()  
        })
}


function EngineerInformation() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: `what's the team Engineer's name?`,
                name: "name"
            },

            {
                type: "input",
                message: `what's Engineer's ID?`,
                name: "id"
            },

            {
                type: "input",
                message: `what's Engineer's email address?`,
                name: "email"
            },

            {
                type: "input",
                message: `what's Engineer's Git Hub Account Number?`,
                name: "github"
            }
        ]
    )
        .then(val => {
            const engineer = new Engineer(val.name, val.id, val.email, val.github)
            employees.push(engineer)
            newmembertype()
        })
}

function InternInformation() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: `what's the Intern's name?`,
                name: "name"
            },

            {
                type: "input",
                message: `what's Intern's ID?`,
                name: "id"
            },

            {
                type: "input",
                message: `what's Intern's email address?`,
                name: "email"
            },

            {
                type: "input",
                message: `what's Intern's School Name?`,
                name: "school"
            }
        ]
    )
        .then(val => {
            const intern = new Intern(val.name, val.id, val.email, val.school)
            employees.push(intern)
            newmembertype()
        })
}

async function init(){


try {
await managerInformation()
}
catch (err) {
    console.log(err);

}}
init()
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
