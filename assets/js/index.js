function generatePDFofGitHubProfile(){
    // Bring in npms (axios, inquirer, and probably one for a pdf)
    const axios = require('axios');
    const inquirer = require('inquirer');
    const generatePdf = require('./generatePdf.js');
    // https://www.npmjs.com/package/html-to-pdf

    // Get a github username and color from prompts
    function promptUser(){
        // https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/examples/input.js
        questions = [
            {
              type: 'input',
              name: 'username',
              message: "Enter GitHub username of user you would like to generate a Resume from."
            },
            {
              type: 'input',
              name: 'color',
              message: "Choose a background color for the generated PDF",
              default: function() {
                return 'blue';
              }
            }
        ];
        
        // Help from inquirer README
        inquirer
            .prompt(
                /* Pass your questions in here */
                questions
            )
            .then(answers => {
                // Use user feedback for... whatever!!
                const userInput = answers;
                countStars(userInput);
            });
        }
    promptUser();

    function countStars(userInput){
        const {username} = userInput;
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

        let starCount = 0;

        axios.get(queryUrl).then(function({data}) {
            // console.log(data.length);
            for(let i=0; i < data.length; i++){
                starCount = data[i].stargazers_count + starCount;
            }
            getUserProfile(userInput,starCount);
        });

    }
    
    // Get the provided username github profile information
    function getUserProfile(userInput, starCount) {
        const selectedColor = userInput.color;
        const githubUsername = userInput.username;
        const githubUrlRequest = `https://api.github.com/users/${githubUsername}`; 
        
        // Taken from axios module README
        // https://developer.github.com/v3/users/
        axios.get(githubUrlRequest)
            .then(function ({data}) {
                // handle success
                const githubProfileData = data;
                generatePdf.addUserInformationTohtml(githubProfileData, starCount, selectedColor)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
}
generatePDFofGitHubProfile();
    // Calculate the users total number of stars
   