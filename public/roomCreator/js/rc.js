$(document).ready(function() {

  var $input = $('input').first();

  var $confirm = $('button').first();

  var server = window.location.href;

  $confirm.click(function(event) {
    //Preguntar si hay info en el $input
    if($input.val().trim()){
      console.log($input.val());
      //Pedirle al servidor el numero de rooms
      $.get(server + 'room-info', (info)=>{
        console.log(info);
        var room = $input.val().toLowerCase() + info;
        var url = window.location.href + 'play.html' + '?r=' + room;
        window.location = url;
      })
      //Redireccionar a una nueva página con params
    }
  });

});
