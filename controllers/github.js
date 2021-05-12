const chan = require('../channels.js');
const moment = require('moment');
moment.locale();

async function push(req, res) {
    const name = req.body.head_commit.author.name;
    const message = req.body.head_commit.message;
    const repo = req.body.repository.name;
    const date = req.body.head_commit.timestamp;
    const embed = new MessageEmbed()
        .setColor("GREEN")
        .addField("Repo : ", repo)
        .addField("Auteur du push : ", name)
        .addField("Message du commit : ", message || "Aucun contenu")
        .addField("Date : ", date.moment().format('Do MMMM YYYY, h:mm:ss a'));
        chan.github_channel.send(embed);
        res.send('');
}

exports.push = push;


async function pullRequest(req, res) {
    console.log(req);
    chan.github_channel.send('Pull Request');
}

exports.pullRequest = pullRequest;