$( document ).ready(function() {
    console.log('in events ajax');
    $('#get_events' function(data){
      var username=$.ajax({
        type: 'GET',
        dataType: 'STRING',
        url: '../routes/user/',
        var username = data;
        data:JSON.stringify({ username:username}),
        success: function(response){
          console.log(response);
        },
        error: function(response){
          console.log(error);
        }
      });
      $.ajax({
      type: 'GET', 
      dataType: 'STRING',
      url: `/u/${username}/calendar/`,
      var messages = data.getElementById('send').value;
      data: JSON.stringify({ events:events }),
      success: function(response){
        console.log(response);
      },
      error: function(error){
        console.log(error);
      }
    });
      $('#get_events' ).append( `<p>${'DATA:', data[type], data[description], data[date], data[time]}</p>` );
    });
});