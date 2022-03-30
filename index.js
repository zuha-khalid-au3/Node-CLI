#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const init = () =>{
    console.log(
        chalk.green(
            figlet.textSync("NODE---- TEMPLATE", {
                font:"Banner",
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




