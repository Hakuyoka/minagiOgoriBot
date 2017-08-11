/**
 * Created by kotato on 2017/07/11.
 */

//flickr
var Flickr = require("flickrapi"),
flickrOptions = {
    api_key: "",
    secret: ""
};

function getPhoto(text) {
  return new Promise((resolve, reject)=>{
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
      console.log("start")
      flickr.photos.search({
        text:text
      }, function(err, result) {
        console.log(result.photos.photo[0])
        if(result.photos.photo.length > 0) {
          flickr.photos.getInfo({
            photo_id: result.photos.photo[0].id
          }, function (err, result) {
            console.log(result.photo.urls.url[0]._content)
            resolve(result.photo.urls.url[0]._content)
          })
        }else{
          reject()
        }
      });
    });
  })
}

module.exports = getPhoto