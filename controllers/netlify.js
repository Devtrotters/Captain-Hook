const chan = require('../channels.js');

async function start(req,res) {
  const embed = {
    title: "STARTED",
    color: "0xff8800",
    fields: [
      {
        name: "Site name:",
        value: req.body.name,
      },
      {
        name: "URL:",
        value: req.body.url,
      },
      {
        name: "Message:",
        value: "Build started",
      },
    ]
  }

  chan.netlify_channel.send({ embed })
  res.send('');
}

async function success(req,res) {
  const embed = {
    title: "SUCCESS",
    color: "0x00ff00",
    fields: [
      {
        name: "Site name:",
        value: req.body.name,
      },
      {
        name: "URL:",
        value: req.body.url,
      },
      {
        name: "Message:",
        value: "Site is live",
      },
    ]
  }

  chan.netlify_channel.send({ embed })
  res.send('');
}

async function fail(req, res) {

  const embed = {
    title: "ERROR",
    color: "0xff0000",
    fields: [
      {
        name: "Site name:",
        value: req.body.name,
      },
      {
        name: "URL:",
        value: req.body.url,
      },
      {
        name: "Message:",
        value: req.body.error_message,
      },
    ]
  }
  chan.netlify_channel.send({ embed });
  res.send('');
}

exports.start = start;
exports.success = success;
exports.fail = fail;
