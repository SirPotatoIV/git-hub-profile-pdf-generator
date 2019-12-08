// Have the application be invoked with sh node index.js ?????
// Bring in npms (axios, inquirer, and probably one for a pdf)
// Get a github username and color from prompts
// Get the provided username github profile information
// Organize the github profile information for use in generating the pdf
// Generate HTML to create the content for the pdf
// Generate the PDF


const axios = require('axios');
const inquirer = require('inquirer');

// Taken from axios module README
// Make a request for a GitHub users profile with a given ID
// https://developer.github.com/v3/repos/contents/
function getUserProfile() {
    const githubUsername = "SirPotatoIV";
    const githubUrlRequest = `https://api.github.com/users/${githubUsername}`; 

    axios.get(githubUrlRequest)
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}
getUserProfile();