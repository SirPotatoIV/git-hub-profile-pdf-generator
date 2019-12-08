function generatePDFofGitHubProfile(){
    // Have the application be invoked with sh node index.js ?????
    // Bring in npms (axios, inquirer, and probably one for a pdf)
    const axios = require('axios');
    const inquirer = require('inquirer');
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
                console.log(JSON.stringify(answers, null, ' '));
                const stringifiedUserInput = JSON.stringify(answers);
                getUserProfile(stringifiedUserInput);
            });
        }
        promptUser();
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
        //   * User GitHub profile - html_url
        //   * User blog - blog
        // * User bio - bio
        // * Number of public repositories - public_repos
        // * Number of followers - followers
        // * Number of GitHub stars - starred_url 
        // * -- Need to create function to count the stars.
        // * Number of users following - following
        const {avatar_url, login, location, html_url, blog, bio, public_repos, followers, following} = githubProfileData;
        console.log(avatar_url, login, location, html_url, blog, bio, public_repos, followers, following);

    }
    
}
generatePDFofGitHubProfile();
    // Organize the github profile information for use in generating the pdf
    // Generate HTML to create the content for the pdf
    // Generate the PDF



    // Make a request for a GitHub users profile with a given ID
    // Followed class activity for some help