const chan = require('../channels.js');

async function discordMessage(req, res) {
    chan.github_channel.send('coucou');
    res.send('');

    // const {name} = req.body;
    // if (!name) {
    //     //Le cas où le nom ne serait pas soumit ou nul
    //     return res.status(400).json({
    //         text: "Requête invalide"
    //     });
    // }

    
}

exports.discordMessage = discordMessage;