const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');


app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});


const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();


client.login(process.env.BOT_TOKEN);
let netlify_channel;

client.on('ready', () => {
    console.log("BOT READY");
    const channels = client.channels.cache.array();
    
    channels.forEach((channel) => {
        if (channel.name === process.env.NETLIFY_CHANNEL_ID) {
            netlify_channel = channel
        }

    });
})

app.get('/test', (req, res) => {
        netlify_channel.send("acces au site")
        res.send("message sent")
    // axios.post('https://discord.com/api/webhooks/841578979722133505/0UafC6l_CR2HiXuE1xzwgbsaq-yHj3AjILanRUX7tyW6mCSysL-LladRAO0bobMCWC8C',
    //     {content: "petit message"})
    })
app.post('/start', (req, res) => {
    console.log(req);

    res.send('')
})












