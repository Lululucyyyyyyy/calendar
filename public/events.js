$(document).ready(function() {
    console.log('in events ajax');
    function get_events
    $('#get_events', function(data){
      $.ajax({
      type: 'GET', 
      dataType: 'STRING',
      url: `/u/calendar/`
      data: JSON.stringify({ events:events }),
      success: function(response){
        console.log(response);
      },
      error: function(error){
        console.log(error);
      }
    })
      .then((events)=>{
        console.log("index:",index);
        for event in events:
          date = event[date];
          $( `#${date}` ).append( `${event[description], event[time]} `)
      });
    });

    $('#get_birthdays', function(data){
      $.ajax({
      type: 'GET', 
      dataType: 'STRING',
      url: `/u/calendar/`
      data: JSON.stringify({ events:events }),
      success: function(response){
        console.log(response);
      },
      error: function(error){
        console.log(error);
      }
    })
      .then((events)=>{
        for event in events:
          if event[type] == 'bday':
            $( '#get_birthdays').append( `<div>${event[description], event[time]}</div>` )
      })
});