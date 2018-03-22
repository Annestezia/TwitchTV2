let streamers = ["starladder5","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "voyboy"];

$.each(streamers,function(i, streamer){
  function makeUrl(streamer, type){
    return 'https://wind-bow.glitch.me/twitch-api/'+type+'/'+streamer;
  }  
 $.getJSON(makeUrl(streamer,'streams'), function(json){
    var game,status, streamName,noUser;  
   if(json.stream){
     streamName = json.stream.status;
     status = 'online';
   } else{
    status='offline';
   }  
    $.getJSON(makeUrl(streamer,'users'),function(user){       
      var logo = user.logo;
      var display_name =  user.display_name;
      if(display_name===undefined){          
        noUser=streamer;
       } 
      var link = 'https://www.twitch.tv/'+streamer;
      createBox(logo,status,noUser, display_name,link);
   });      
 });
  

  function createBox(logo,status,noUser,display_name,link){    
    var nameSpan='<span >'+display_name+'</span>';
    var box = $('<a></a>')
        .html(nameSpan)
        .addClass('box')
        .css({'backgroundImage':'url('+logo+')','backgroundSize':'cover'});
    // if (window.matchMedia("(min-width: 360px)").matches) {
    //   box.css('background', 'none');
    // }else {}
        
  
    
    
    var noUserSpan=$('<span></span>').html(noUser+' not found<br/>').addClass('noUser');

    if(status==='online'){
      box.addClass('online')
         .attr('href', link)
         .attr('title','Watch on Twitch').attr('target','_blank');
    }else if(status==='offline'){
      box.addClass('offline');
    }    
    // if (window.matchMedia("(min-width: 360px)").matches) {
    //   box.css('backgroundImage', 'none');
    // }
    $('#output').append(box);
  }    
});
  $(document).ready(function(){   
    $('#filters').on('click','input[name="filter"]',function(e){
      $('#output').children().hide();
      switch(this.id){
        case 'online':
         $('#output').find('.online').show();
         break;
        case 'offline':
          $('#output').find('.offline').show();
          break;
        case 'all':
          $('#output').children().show(); 
          break;
      }
     });
  
    });  
