const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
		'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
	},
	body: '{"input":[0,0,8,9,0,0,4,0,0,0,0,5,6,0,0,0,0,0,3,0,0,7,0,0,6,0,9,5,0,0,0,0,4,0,2,0,0,0,0,0,0,0,0,6,5,0,0,2,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,8,9,0,0,0,7,0,4,0,0,2,0,0]}'
};

fetch('https://sudoku-solver3.p.rapidapi.com/sudokusolver/', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));




document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, options);
    });

    // Or with jQuery

    $(document).ready(function(){
    $('.parallax').parallax();
});