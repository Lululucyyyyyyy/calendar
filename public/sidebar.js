console.log('in sidebar.js');
$( document ).ready(function(){
	console.log('line 3 sidebar.js');
	var username = $.ajax({
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
	console.log(username);
	$('#birthdays').click(function(){
		console.log('redirecting to bday from jquery');
		console.log(username);
		$.ajax({
        type: 'POST',
        url: `/u/${username}/birthdays`,
        success: (function () {
            window.location.href = `../u/${username}/birthdays`;
        })
	});
	$('#calendar').click(function(){
		console.log('redirecting to bday from jquery');
		console.log(username);
		$.ajax({
        type: 'POST',
        url: `/u/${username}/calendar`,
        success: (function () {
            window.location.href = `../u/${username}/calendar`;
        })
	});
	$('#add').click(function(){
		console.log('redirecting to bday from jquery');
		console.log(username);
		$.ajax({
        type: 'POST',
        url: `/u/${username}/add`,
        success: (function () {
            window.location.href = `../u/${username}/add`;
        })
	});
	$('#four').click(function(){
		console.log('redirecting to bday from jquery');
		console.log(username);
		$.ajax({
        type: 'POST',
        url: `/u/${username}/4`,
        success: (function () {
            window.location.href = `../u/${username}/4`;
        })
	});
	$('#four').click(function(){
		console.log('redirecting to bday from jquery');
		console.log(username);
		$.ajax({
        type: 'POST',
        url: `/u/${username}/4`,
        success: (function () {
            window.location.href = `../u/${username}/4`;
        })
	});
	$('#four').click(function(){
		console.log('redirecting to bday from jquery');
		console.log(username);
		$.ajax({
        type: 'POST',
        url: `/u/${username}/4`,
        success: (function () {
            window.location.href = `../u/${username}/4`;
        })
	});
	$('#four').click(function(){
		console.log('redirecting to bday from jquery');
		console.log(username);
		$.ajax({
        type: 'POST',
        url: `/u/${username}/4`,
        success: (function () {
            window.location.href = `../u/${username}/4`;
        })
	});
});