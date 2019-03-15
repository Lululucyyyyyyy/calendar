console.log('in sidebar.js');
$( document ).ready(function(){
	console.log('line 3 sidebar.js');
	$('#birthdays').click(function(){
		console.log('redirecting to bday from jquery');
		$.ajax({
        type: 'POST',
        url: `/u/birthdays`,
        success: (function () {
            window.location.href = `/u/birthdays`;
        })
	});
	$('#calendar').click(function(){
		console.log('redirecting to calendar from jquery');
		$.ajax({
        type: 'POST',
        url: `/u/calendar`,
        success: (function () {
            window.location.href = `/u/calendar`;
        })
	});
	$('#add').click(function(){
		console.log('redirecting to add from jquery');
		$.ajax({
        type: 'POST',
        url: `/u/add`,
        success: (function () {
            window.location.href = `/u/add`;
        })
	});
	$('#four').click(function(){
		console.log('redirecting to 4 from jquery');
		$.ajax({
        type: 'POST',
        url: `/u/4`,
        success: (function () {
            window.location.href = `/u/4`;
        })
	});
	$('#four').click(function(){
		console.log('redirecting to home from jquery');
		$.ajax({
        type: 'POST',
        url: `/u/home`,
        success: (function () {
            window.location.href = `/u/home`;
        })
	});
	$('#four').click(function(){
		console.log('redirecting to bday from jquery');
		$.ajax({
        type: 'POST',
        url: `/u/weel`,
        success: (function () {
            window.location.href = `/u/week`;
        })
	});
	$('#four').click(function(){
		console.log('redirecting to bday from jquery');
		$.ajax({
        type: 'POST',
        url: `/u/4`,
        success: (function () {
            window.location.href = `../u/4`;
        })
	});
});