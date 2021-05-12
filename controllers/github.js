const chan = require('../channels.js');

async function push(req, res) {
    console.log(req);
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
    console.log(req);
    res.json({
        text: "test"
      })
}


exports.pullRequest = pullRequest;

