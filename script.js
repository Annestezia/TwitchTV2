const streamers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"];

$.each(streamers, function(i, streamer) {
  function makeUrl(streamer, type) {
    return `https://wind-bow.glitch.me/twitch-api/${type}/${streamer}`;
  }
  $.getJSON(makeUrl(streamer, "streams"), function(json) {
    var status, descr, noUser;
    
    if (json.stream) {
      descr = json.stream.channel.status;
      status = "online";
    } else {
      status = "offline";
    }
    $.getJSON(makeUrl(streamer, "users"), function(user) {
      const {logo,display_name}=user;
  
      createBox(logo, status, display_name, descr);
    });
  });

  function createBox(logo, status, streamer, descr) {
    var link = "https://www.twitch.tv/" + streamer;
    var box = $("<li></li>");
    var innerBox =
      '<h3 class="name">' +
      streamer +
      "</h3>" +
      '<span class ="status">' +
      descr +
      "</span>";

    if (status === "online") {
      box.append(
        '<a href="' +
          link +
          '" target ="_blank" title="Watch on Twitch">' +
          innerBox +
          "</a>"
      );
    } else {
      box.append(
        '<a href="' +
          link +
          '" target ="_blank" title="Go to channel on Twitch"><h3 class = "name">' +
          streamer +
          "</h3></a>"
      );
    }

    box
      .addClass("box")
      .css({ backgroundImage: "url(" + logo + ")", backgroundSize: "cover" });

    if (status === "online") {
      box.addClass("online");
    } else if (status === "offline") {
      box.addClass("offline");
    }
    $("#output").append(box);
  }
});

$(document).ready(function() {
  $("#filters").on("click", 'input[name="filter"]', function(e) {
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


$(function() {

  $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");


}); 

