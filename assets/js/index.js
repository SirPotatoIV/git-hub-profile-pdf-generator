// console.log('hello!')
const axios = require('axios');
const inquirer = require('inquirer');

// Taken from axios module README
// Make a request for a GitHub users profile with a given ID
// https://developer.github.com/v3/repos/contents/

function getUserProfile() {
    const githubUsername = "SirPotatoIV";
    const githubUrlRequest = `https://api.github.com/users/${githubUsername}/repos?per_page=100`; 

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