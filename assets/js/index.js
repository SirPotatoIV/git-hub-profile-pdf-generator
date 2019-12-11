function generatePDFofGitHubProfile(){
    // Have the application be invoked with sh node index.js ?????
    // Bring in npms (axios, inquirer, and probably one for a pdf)
    const axios = require('axios');
    const inquirer = require('inquirer');
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
                // console.log(JSON.stringify(answers, null, ' '));
                const stringifiedUserInput = JSON.stringify(answers);
                getUserProfile(stringifiedUserInput);
            });
        }
    
    
        // promptUser();
    
    
        // Get the provided username github profile information
    function getUserProfile(stringifiedUserInput) {
        const userInput = JSON.parse(stringifiedUserInput);
        const githubUsername = userInput.username;
        const githubUrlRequest = `https://api.github.com/users/${githubUsername}`; 
        
        // Taken from axios module README
        // https://developer.github.com/v3/users/
        axios.get(githubUrlRequest)
            .then(function ({data}) {
                // handle success
                // console.log(data);
                const githubProfileData = data;
                generateResumeHtml(githubProfileData)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    function generateResumeHtml(githubProfileData){
        // * Profile image - avatar_url
        // * User name - login
        // * Links to the following:
        //   * User location via Google Maps - location
        //   * -- This will be need another function
        //   * User GitHub profile - html_url
        //   * User blog - blog
        // * User bio - bio
        // * Number of public repositories - public_repos
        // * Number of followers - followers
        // * Number of GitHub stars - starred_url 
        // * -- Need to create function to count the stars. GET /users/:username/starred
        // * Number of users following - following
        
        // Organize the github profile information for use in generating the pdf
        const { avatar_url: avatarUrl, login, location, html_url: htmlUrl, blog, bio, public_repos: publicRepos, followers, following} = githubProfileData;
        
        // Code below take from GitHub user bcbrian to help with understanding how to utilize the npm electron-html-to
        const resumeText = "<p>Hello my name is Jake</p>"
        const fs = require('fs'),
        convertFactory = require('electron-html-to');
     
        const conversion = convertFactory({
            converterPath: convertFactory.converters.PDF
        });
        
        conversion({ html: `${resumeText}` }, function(err, result) {
             if (err) {
            return console.error(err);
            }
        
            console.log(result.numberOfPages);
            console.log(result.logs);
            result.stream.pipe(fs.createWriteStream('./index.pdf'));
            conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
        });
    }
    // Function created only for test purposes so prompt, axios, and pdf creation don't need to keep happening.
    function test(){
        htmlResume = require('./html-template');
        console.log(htmlResume.htmlResume)
    }
    test();
}
generatePDFofGitHubProfile();
    // Calculate the users total number of stars
    // Create link to google maps based on the users Github listed location
    // https://developers.google.com/maps/documentation/urls/guide
    // Generate HTML to create the content for the pdf
    // Generate the PDF



    // Make a request for a GitHub users profile with a given ID
    // Followed class activity for some help