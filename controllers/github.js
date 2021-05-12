const chan = require('../channels.js');
const MessageEmbed = require("discord.js").MessageEmbed;

async function push(req, res) {
    const message = req.body.head_commit.message;
    const name = req.body.pusher.name;
    const repo = req.body.repository.name;
    const date = req.body.head_commit.timestamp;

    if(message.includes('Merge')){
        console.log('#### merge notification ###');
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("MERGED")
            .addField("Repo : ", repo)
            .addField("Message du merge : ", message || "Aucun contenu")
            .addField("Date : ", date);
            chan.github_channel.send(embed);
            
        res.json({
            text: "test"
        })
    } else {
        console.log('#### push notification request OK ###');
        const embed = new MessageEmbed()
            .setColor("YELLOW")
            .setTitle("PUSH")
            .addField("Repo : ", repo)
            .addField("Auteur du push : ", name)
            .addField("Message du commit : ", message || "Aucun contenu")
            .addField("Date : ", date);
            chan.github_channel.send(embed);
            
        res.json({
            text: "test"
        })
    }
    
}

exports.push = push;


async function pullRequest(req, res) {
    const state = req.body.pull_request.state;
    const name = req.body.sender.login;
    const title = req.body.pull_request.title;
    const repo = req.body.repository.name;
    const date = req.body.pull_request.created_at;
    const brancheHead = req.body.pull_request.head.ref;
    const brancheBase = req.body.pull_request.base.ref;
    const branches = 'branche '+brancheHead+' vers branche '+brancheBase;
    console.log(state);
    if(state == 'open') {
        console.log('#### pull opened notification request ###');
        const embedMessage = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle("PULL REQUEST opened")
            .setDescription(title)
            .addField("Repo : ", repo)
            .addField("Pull request : ", branches)
            .addField("Auteur de la pull request : ", name)
            .addField("Date : ", date);
            chan.github_channel.send(embedMessage);
        
        res.json({
            text: "test"
        })
    } else {
        console.log('#### pull closed notification request ###');
        const embedMessage = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("PULL REQUEST closed")
            .setDescription(title)
            .addField("Repo : ", repo)
            .addField("Pull request : ", branches)
            .addField("Auteur de la pull request : ", name)
            .addField("Date : ", date);
            chan.github_channel.send(embedMessage);
        
        res.json({
            text: "test"
        })
    }
}


exports.pullRequest = pullRequest;

