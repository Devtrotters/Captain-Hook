const chan = require('../channels.js');

async function start(req,res) {
  chan.netlify_channel.send("netlifyStart")
  res.json({
    text: "test"
  })
}

async function success(req,res) {
  chan.netlify_channel.send("netlifySuccess");
  console.log(req);
  res.send('');
}

async function fail(req,res) {
  chan.netlify_channel.send("netlifyFail")
  res.send('')
}

exports.start = start;
exports.success = success;
exports.fail = fail;