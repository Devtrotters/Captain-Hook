const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});

//router github
const githubRouter = express.Router();
app.use('/github', githubRouter);
const githubPost = require('./controllers/github');


//router netlify
const netlifyRouter = express.Router();
app.use('/netlify', netlifyRouter);
const netlifyPost = require('./controllers/netlify');


const chan = require('./channels.js');

client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
    console.log("BOT READY");
    const channels = client.channels.cache.array();
    
    channels.forEach((channel) => {
        if (channel.name === process.env.NETLIFY_CHANNEL_NAME) {
            chan.netlify_channel = channel
        } 
      
        if(channel.name === process.env.GITHUB_CHANNEL_NAME) {
            chan.github_channel = channel
        }
    }); 
})

githubRouter.route('/push').post(githubPost.push);
githubRouter.route('/pull').post(githubPost.pullRequest);

netlifyRouter.route('/start').post(netlifyPost.start);
netlifyRouter.route('/success').post(netlifyPost.success);
netlifyRouter.route('/fail').post(netlifyPost.fail);













