const app = require('express')();

const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();


client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
    console.log("BOT READY");
    const channels = client.channels.cache.array();
    let netlify_channel;
    channels.forEach((channel) => {
        if (channel.id === process.env.NETLIFY_CHANNEL_ID) {
            netlify_channel = channel
        }

    });
    app.get('/', (req, res) => {
        netlify_channel.send("acces au site")
        res.send("message sent")
    })
    app.post('/start', (req, res) => {
        console.log(req);
        res.send("recu");
    })
    
    app.listen(3000);
})












