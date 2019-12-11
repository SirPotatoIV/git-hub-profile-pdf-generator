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
const addUserInformationTohtml= function addUserInfoTohtml(githubProfileData, starCount, selectedColor){
    const obj = githubProfileData;
    const {avatar_url, name, location, html_url, blog, bio, public_repos, followers, following} = obj;
    // Used to create google maps link https://developers.google.com/maps/documentation/urls/guide
    const htmlResume = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <!-- https://meyerweb.com/eric/tools/css/reset/ -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css"/>
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
        <style>
            ul{
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
            }
            body {
                background-color: white;
                -webkit-print-color-adjust: exact !important;
                font-family: 'Montserrat', sans-serif;
            }
            img {
                height: 100%;
                width: auto;
                border-radius: 50%;
            }
            h1 {
                font-size: 28px;
                font-weight: bold;
            } 
            .header-text {
                font-size: 32px;
                font-weight: bold;
            }
            .mega-container{
                display: grid;
                grid-template-rows: 50px 50px 100px 1fr 1fr 10%; 
                grid-template-columns: 5% 15% 30% 30% 15% 5%;
                justify-content: center;
                background-color: ${selectedColor};
                row-gap: 10px;
            }
            .profile-pic {
                justify-self: center;
                grid-row: 2/4;
                grid-column: 2/6;
                z-index: 0;
                
            }
    
            .header-container{
                display: grid;
                grid-row: 3/5;
                grid-column: 2 / span 4;
                grid-template-rows: 50px 50px auto auto auto;
                grid-template-columns: 10% 80% 10%;
                background-color: lightskyblue;
                border-radius: 5px;
                align-items: center;
            }
    
    
                .header-text {
                    justify-self: center;
                }
                .greeting {
                    grid-row: 3/4;
                    grid-column: 2/3;
                }
                .name {
                    grid-row: 4/5;
                    grid-column: 2/3;
                }
                .links {
                    grid-row: 5/6;
                    grid-column: 2/3;
                }
    
    
            .main-container{
                display: grid;
                background-color: white;
                grid-row: 5/6;
                grid-column: 2 / span 4;
                grid-template-rows: 10px auto 1fr 1fr 30px;
                grid-template-columns: 10% 1fr 1fr 10%;
                gap: 10px 10px;
                border-radius: 5px;
            }
    
            .card{
                background: hotpink;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10px 0px 10px 0px;
            }
            .card-margin{
                margin-bottom: 10px;
            }
            .bio {
                grid-area: 2 / 2 / 3 / 4;
                justify-self: center;
                align-self: center;
                font-size: 20px;
            }
    
            .repositories {
                grid-area: 3 / 2 / 4 / 3
            }
    
            .followers {
                grid-area: 3 / 3 / 4 / 4
            }
    
            .github-stars {
                grid-area: 4 / 2 / 5 / 3
            }
    
            .following {
                grid-area: 4 / 3 / 5 / 4
            }
    
            .link a {
                color: blue;
                text-decoration: none;
                font-size: 24px;
            }
        </style>
    </head>
    <body>
        <div class = mega-container>
            <img class = "profile-pic" src="${avatar_url}"/>
            <header class = "header-container">
                <div class = "header-text greeting">
                    Hi!
                </div>
                <div class = "header-text name">My name is ${name}!</div>
                <div class = "item5 links">
                    <ul>
                        <li id="location" class="link"><a href="https://www.google.com/maps/search/?api=1&${location}">${location}</a></li>
                        <li id="htmlUrl" class="link"><a href="${html_url}">Github</a></li>
                        <li id="blog" class="link"><a href="${blog}">Blog</a></li>
                    </ul>
                </div>
            </header>
            <main class ="main-container">
                <div class ="item6 bio">${bio}</div>
                <div class="card repositories">
                    <h1 class="card-margin">Public Repositories</h1>
                    <p id="repository-count">${public_repos}</p>
                </div>
                <div class="card followers">
                    <h1 class="card-margin">Followers</h1>
                    <p id="followers-count">${followers}</p>
                </div>
                <div class="card github-stars">
                    <h1 class="card-margin">GitHub Stars</h1>
                    <p id="star-count">${starCount}</p>
                </div>
                <div class="card following">
                    <h1 class="card-margin">Following</h1>
                    <p id="following-count">${following}</p>
                </div>
            </main>
        </div>
    </body>
    </html>`
    
    createPdf(htmlResume);
}

function createPdf(htmlResume){
    // Code below take from GitHub user bcbrian to help with understanding how to utilize the npm electron-html-to
    const fs = require('fs'),
    convertFactory = require('electron-html-to');

    const conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
    });
    
    conversion({ html: `${htmlResume}` }, function(err, result) {
        if (err) {
        return console.error(err);
        }
    
        console.log(result.numberOfPages);
        console.log(result.logs);
        result.stream.pipe(fs.createWriteStream('./resume.pdf'));
        conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
    });
}

module.exports = {addUserInformationTohtml};