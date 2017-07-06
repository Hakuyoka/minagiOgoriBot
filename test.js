/**
 * Created by kotato on 2017/07/06.
 */

var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token = process.env.SLACK_BOT_TOKEN || '';

let channel;
var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var rtm = new RtmClient(bot_token);
var ogoriWord = "(奢|おご)"
var minagiWord = "(みなぎ|皆木)"
var re = new RegExp(minagiWord+"(の?"+ogoriWord+"り|"+ogoriWord+"って)");

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {

    if (c.is_member && c.name ==='random') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
  console.log(channel)
});

//you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage("万世Botがinしました", channel);
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log('Message:', message); //this is no doubt the lamest possible message handler, but you get the idea
  console.log(message.text,typeof message.text)
  if(message.text && channel == message.channel){
    console.log(message.text.match(re))
    if(message.text.match(re)) {
      rtm.sendMessage("https://mansei-10th-floor.slack.com/files/kotato/F659QLSCE/02b35e47433fd685686e166a25aefe742726e947.11.1.24.2.jpg", channel);
    }
  }
});

rtm.start();

