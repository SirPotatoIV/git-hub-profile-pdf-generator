htmlResume = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- https://meyerweb.com/eric/tools/css/reset/ -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css"/>
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap" rel="stylesheet">
    <style>
        ul{
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
        }

        .mega-container{
            display: grid;
            grid-template-rows: 10% 1fr 1fr 10%; 
            grid-template-columns: 5% 15% 30% 30% 15% 5%;
            justify-content: center;
            background-color: lightcoral;
            row-gap: 10px;
        }

        .header-container{
            display: grid;
            grid-row-start: 2;
            grid-column: 2 / span 4;
            background-color: lightskyblue;
            border-radius: 5px;
        }

            .profile-pic {
                justify-self: center;
            }

            .header-text {
                justify-self: center;
            }

        .main-container{
            display: grid;
            background-color: white;
            grid-row-start: 3;
            grid-row-end: 4;
            grid-column: 2 / span 4;
            grid-template-rows: 1fr 1fr 1fr 1fr;
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
        }
        .bio2 {
            grid-area: 1 / 2 / 2 / 4;
            justify-self: center;
        }

        .repositories {
            grid-area: 2 / 2 / 3 / 3
        }

        .followers {
            grid-area: 2 / 3 / 3 / 4
        }

        .github-stars {
            grid-area: 3 / 2 / 4 / 3
        }

        .following {
            grid-area: 3 / 3 / 4 / 4
        }
    </style>
</head>
<body>
    <div class = mega-container>
        <header class = "header-container">
            <img class = "item1 profile-pic" src="http://placehold.it/200x200"/>
            <div class = "header-text welcome-text">
                Hi!
            </div>
            <div class = "header-text users-name">Jake O'Toole</div>
            <div class = "header-text bio">The Bio goes here</div>
            <div class = "item5 links">
                <ul>
                    <li id="location" class="link"><a href="https://www.google.com/maps/search/?api=1&Minneapolis,MN">Minneapolis,MN</a></li>
                    <li id="htmlUrl" class="link"><a href="https://github.com/SirPotatoIV">Github</a></li>
                    <li id="blog" class="link"><a href="https://www.jakeotoole.com">Blog</a></li>
                </ul>
            </div>
        </header>
        <main class ="main-container">
            <div class ="item6 bio2">Here is the other bio.</div>
            <div class="card repositories">
                <h1>Public Repositories</h1>
                <p id="repository-count">10</p>
            </div>
            <div class="card followers">
                <h1>Followers</h1>
                <p id="followers-count">10</p>
            </div>
            <div class="card github-stars">
                <h1>GitHub Stars</h1>
                <p id="star-count">10</p>
            </div>
            <div class="card following">
                <h1>Following</h1>
                <p id="following-count">10</p>
            </div>
        </main>
    </div>
</body>
</html>`

module.exports = {htmlResume};