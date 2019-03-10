$( document ).ready(function() {
    $('#get_events' function(data){
      $.ajax({
      type: 'GET', 
      url: '../routes/user/calendar',
      var messages = data.getElementById('send').value;
      data: JSON.stringify({ events:events }),
      success: function(response){
        console.log(response);
      },
      error: function(error){
        console.log(error);
      }
    });
      $('#get_events' ).append( `<p>${data}</p>` );
    });
});