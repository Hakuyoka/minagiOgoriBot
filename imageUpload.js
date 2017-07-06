/**
 * Created by kotato on 2017/07/06.
 */
var fs = require('fs');
var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_API_TOKEN || ''; //see section above on sensitive data

var web = new WebClient(token);

var filePath = './image/mansei.jpg';
var fileName = 'mansei.jpg';


var streamOpts = {
  file: fs.createReadStream(filePath)
};

web.files.upload(fileName, streamOpts, function(err, res) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Message sent: ', res);
  }});
