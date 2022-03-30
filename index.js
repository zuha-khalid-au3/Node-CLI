#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const init = () =>{
    console.log(
        chalk.green(
            figlet.textSync("CLI-TEMPLATE", {
                font:"Monotype Corsiva",
                horizontalLayout:"default",
                verticalLayout:"default"
            })
        )
    )
}

const askQuestions = () =>{
    const questions = [
        {  
            name:"FILENAME",
            type: "input",
            message: "Enter the name of the file you want to create",
        },
        {
            type: "list",
            name: "EXTENSION",
            message: "What type of file do you want to create? Type the extension",
            choices: [".rb",".js",".php",".css",".py"],
            filter: function(val){
                return val.split(".")[1];
            }
        }
    ];
    return inquirer.prompt(questions);
};
const createFile = (filename, extension) =>{
    const filepath = `${process.cwd()}/${filename}.${extension}`;
    shell.touch(filepath);
    return filepath;
}

const run = async () =>{
    init();

    const answers = await askQuestions();
    const {FILENAME, EXTENSION} = answers;

    const filepath = createFile(FILENAME, EXTENSION);
};
run();


// Packages Used-
// Figlet: A program for making large letters out of ordinary text.
// Inquirer: A library for building command line interfaces.
// Chalk: A library for creating colored output in terminal.
// ShellJS: A library for executing commands in the shell.