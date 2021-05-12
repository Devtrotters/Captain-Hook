const chan = require('../channels.js');
const MessageEmbed = require("discord.js").MessageEmbed;

async function push(req, res) {
    console.log('#### push request ###');
    console.log('req.body.pusher.name ' ,req.body.pusher.name)
    console.log('req.body.head_commit.message ', req.body.head_commit.message);
    console.log('req.body.repository.name ', req.body.repository.name);
    console.log('req.body.head_commit.timestamp ',req.body.head_commit.timestamp);
    const name = req.body.pusher.name;
    const message = req.body.head_commit.message;
    const repo = req.body.repository.name;
    const date = req.body.head_commit.timestamp;
    const embed = new MessageEmbed()
        .setColor("GREEN")
        .addField("Repo : ", repo)
        .addField("Auteur du push : ", name)
        .addField("Message du commit : ", message || "Aucun contenu")
        .addField("Date : ", date);
        chan.github_channel.send(embed);
        
        res.json({
            text: "test"
          })
    
}

exports.push = push;


async function pullRequest(req, res) {

    console.log('#### pull request ###');
    console.log('Body : ', req.body);
    
    const name = req.body.sender.login;
    const repo = req.body.repository.name;
    const date = req.body.pull_request.created_at;
    const brancheHead = req.body.head.ref;
    const brancheBase = req.body.base.ref;
    const message = 'branche '+brancheHead+' vers branche '+brancheBase;
    const embedMessage = new MessageEmbed()
        .setColor("ORANGE")
        .addField("Repo : ", repo)
        .addField("Pull request : ", message)
        .addField("Auteur de la pull request : ", name)
        .addField("Date : ", date);
        chan.github_channel.send(embedMessage);
    
    res.json({
        text: "test"
      })
}


exports.pullRequest = pullRequest;

