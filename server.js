const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});

//router github
const githubRouter = express.Router();
app.use('/github', githubRouter);
const githubPost = require('./controllers/github');


const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();


client.login(process.env.BOT_TOKEN);
let netlify_channel;
let github_channel;

client.on('ready', () => {
    console.log("BOT READY");
    const channels = client.channels.cache.array();
    
    channels.forEach((channel) => {
        if (channel.name === process.env.NETLIFY_CHANNEL_ID) {
            netlify_channel = channel
        } else if(channel.name === process.env.GITHUB_CHANNEL_NAME) {
            github_channel = channel
        }
    });
})


githubRouter.route('/push').post(githubPost.discordMessage);

app.get('/test', (req, res) => {
        netlify_channel.send("acces au site")
        res.send("message sent")
    })












