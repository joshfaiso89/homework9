let Manager = require("./lib/Manager");
let Engineer = require("./lib/Engineer");
let Intern = require("./lib/Intern");
let inquirer = require("inquirer");
let path = require("path");
let fs = require("fs");
let render = require('./lib/htmlRenderer.js');
let id = 1;
let constructorArray = [];

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

let askQuestions = () => {
    inquirer.prompt([{
        type: "list",
        message: "What is your role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    }])
        .then((userInput) => {
            if (userInput.role === "Manager") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your name?",
                        name: "name"
                    },

                    {
                        type: "input",
                        message: "What is your email",
                        name: "email"
                    },

                    {
                        type: "input",
                        message: "What is your office number",
                        name: "officeNumber"
                    }])
                    .then((userInput) => {
                        let manager = new Manager(userInput.name, id++, userInput.email, userInput.officeNumber)
                        constructorArray.push(manager)
                        console.log(constructorArray)
                        askQuestions()
                    })
            } else if (userInput.role === "Engineer") {
                inquirer.prompt([{
                    type: "input",
                    message: "What is your Name?",
                    name: "employeeName"
                },
                {
                    type: "input",
                    message: "What is your email?",
                    name: "email"
                },
                {
                    type: "input",
                    message: "What is your github name?",
                    name: "githubName"
                }

                ])
                    .then((userInput) => {
                        let engineer = new Engineer(userInput.name, id++, userInput.email, userInput.githubName)

                        constructorArray.push(engineer)
                        console.log(constructorArray)
                        askQuestions()
                    })
            } else if (userInput.role === "Intern") {
                inquirer.prompt([{
                    type: "input",
                    message: "What is your name",
                    name: "name"
                },
                {
                    type: "input",
                    message: "What is the name of the school you attend?",
                    name: "schoolName"
                },
                {
                    type: "input",
                    message: "What is your email",
                    name: "email"
                }]).then((userInput) => {
                    let intern = new Intern(userInput.name, id++, userInput.email, userInput.schoolName)
                    constructorArray.push(intern)
                    console.log(constructorArray)
                    //askQuestions()
                    constructorArray.forEach(displayItems);
                })
            }
        })
}
askQuestions();

 module.exports = render;