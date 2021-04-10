const fs = require('fs');
const inquirer = require('inquirer');
inquirer
    .prompt([
        // is generated with the title of my project and sections entitled Description, 
        // Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'gitusern'
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'useremail'
        },
        {
            type: 'input',
            message: 'What is your project`s name?',
            name: 'projname'
        },
        {
            type: 'input',
            message: 'Please write a short description of your project?',
            name: 'projdesc'
        },
        {
            type: 'list',
            message: 'What kind of license should your project have?',
            name: 'projlcns',
            choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None']
        },
        {
            type: 'input',
            message: 'What command should be run to install dependencies?',
            name: 'install',
            default: 'npm i'
        },
        {
            type: 'input',
            message: 'What command should be run to run tests?',
            name: 'tests',
            default: 'npm test'
        },
        {
            type: 'input',
            message: 'What does the user need to know about using the repo?',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'What does the user need to know about contributing to the repo?',
            name: 'contributions'
        },
    ])
    .then((answer) => {
        const filename = `README.md`;
        const licenseWithoutSpaces = `${answer.projlcns}`.replace(/ /g, '%20');
        let licenseShieldsIO;
        if (licenseWithoutSpaces == 'None') {
            licenseShieldsIO = 'None';
        } else {
            licenseShieldsIO = `![GitHub license](https://img.shields.io/static/v1.svg?label=License&message=`+ 
            licenseWithoutSpaces + `&color=yellow)\n`;
        }
        const content = `# ${answer.projname}\n`+licenseShieldsIO+`
## Description\n
${answer.projdesc}\n
## Table of Contents\n
* [Installation](#installation)\n
* [Usage](#usage)\n
* [License](#license)\n
* [Contributing](#contributing)\n
* [Tests](#tests)\n
* [Questions](#questions)\n
## Installation\n
To install necessary dependencies, run following command:\n
`+ '```' + `bash
${answer.install}\n` + '```\n' + `
## Usage\n
${answer.usage}\n
## License\n
This project has ${answer.projlcns} license.\n
## Contributing\n
${answer.contributions}\n
## Tests\n
To run tests, run the following command:\n
`+ '```' + `bash
${answer.tests}\n` + '```\n' + `
## Questions\n
If you have any questions or concerns about the repo, open an issue or contact me directly at\n
${answer.useremail}. You can find more of my work at [${answer.gitusern}](https://github.com/${answer.gitusern})`;

        const projectname = `${answer.projname}`.replace(/ /g, '-');
        function writeREADME() {
            fs.writeFile("./project-titles/" + projectname + "/" + filename, content, (err) =>
                err ? console.error(err) : console.log('Success, README.md saved!')
            );
        }
        if (fs.existsSync('./project-titles/' + projectname)) {
            console.log("Directory named " + projectname + " already exist!\n"
                + "Proceeding on saving the README.md");
            writeREADME();
        } else {
            fs.mkdir("./project-titles/" + projectname, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Directory named " + projectname + " created!");
                    writeREADME();
                }
            })
        }
    });