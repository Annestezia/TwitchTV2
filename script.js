{const streamers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"];

const makeUrl = (userName, type) => `https://wind-bow.glitch.me/twitch-api/${type}/${userName}`;

$.each(streamers, function(i, streamer) {
  const getStreams = $.getJSON(makeUrl(streamer, "streams"), function (streamData) {
      return streamData;
    });
  const getUsers =$.getJSON(makeUrl(streamer, "users"), function (userData) {  
    return userData;
  });

  Promise.all([getStreams, getUsers]).then(values => {
    const {display_name}=values[1];
    let {logo}=values[1], descr="",status="offline";
    if (values[0].stream!==null) {
      descr = values[0].stream.channel.status;
      status = "online";
    } else{
     status = "offline"; 
     descr='offline';
    }
    createBox(logo, status, display_name, descr);
  }).catch(function(err) {
    console.log(err.message);
  });
  
  function createBox(logo, status, display_name, descr) {
    const link = `https://www.twitch.tv/${display_name}`;
    const box = $("<li class='box'></li>");
    const innerBox = `<h3 class="name">${display_name}</h3><span class ="status">${descr}</span>`;  

    if (status === "online") {
      box.append(`<a href="${link}" target ="_blank" title="Watch on Twitch">${innerBox}</a>`);
    } else {
      box.append(`<a href="${link}" target ="_blank" title="Go to channel on Twitch"><h3 class = "name">${display_name}</h3></a>`); 
    }

    box.addClass(status)
    .css({ backgroundImage: `url(${logo })`, backgroundSize: "cover" })
    .on('error', function(err){
      console.log(err);
    });

    $("#output").append(box);
  }
});

$(document).ready(function () {
  $("#filters").on("click", 'input[name="filter"]', function (e) {
    $("#output")
      .children()
      .hide();
    switch (this.id) {
      case "online":
        $("#output")
          .find(".online")
          .show();
        break;
      case "offline":
        $("#output")
          .find(".offline")
          .show();
        break;
      case "all":
        $("#output")
          .children()
          .show();
        break;
    }
  });
});

$( window ).on("load", function() {
  $(".preload").addClass("preload-finish")
});
}
