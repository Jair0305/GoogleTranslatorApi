

document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

let lenguajes;
let originValue, destinyValue 

document.addEventListener('DOMContentLoaded', () => {
	let originLanguage = document.querySelector('.origin-language');
	let destinyLanguage = document.querySelector('.destiny-language')
	const instance = M.FormSelect.init(originLanguage);
	const instanceRight = M.FormSelect.init(destinyLanguage);

	const options = {
		method: 'GET',
		headers: {
			'Accept-Encoding': 'application/gzip',
			'X-RapidAPI-Key': '2db93253c1msh578fc661660b48ap14541fjsn76b5571aa65b',
			'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
		}
	};
	
	fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages?target=es', options)
	.then(response => response.json())
	.then((response) => {
		lenguajes = response.data.languages;
		console.log(lenguajes);

		for (let i = 0; i < lenguajes.length; i++) {
			let lenguaje = lenguajes[i];

			// Crear una nueva opción para el select de origen
			const optionOrigin = document.createElement('option');
			optionOrigin.value = lenguaje.language;
			optionOrigin.text = lenguaje.name;
			originLanguage.add(optionOrigin);

			// Crear una nueva opción para el select de destino
			const optionDestiny = document.createElement('option');
			optionDestiny.value = lenguaje.language;
			optionDestiny.text = lenguaje.name;
			destinyLanguage.add(optionDestiny);
		}

		instance.destroy();
		instanceRight.destroy();
		M.FormSelect.init(originLanguage);
		M.FormSelect.init(destinyLanguage);

		let button = document.querySelector('#translate-button');


		button.addEventListener('click', () =>  {
			let textArea = document.querySelector('#textarea1')
			let textAreaValue = textArea.value

			originValue = originLanguage.value;
			destinyValue = destinyLanguage.value;


			const encodedParams = new URLSearchParams();
			encodedParams.append("q", `${textAreaValue}`);
			encodedParams.append("target", `${destinyValue}`);
			encodedParams.append("source", `${originValue}`);


			const options = {
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
					'Accept-Encoding': 'application/gzip',
					'X-RapidAPI-Key': '2db93253c1msh578fc661660b48ap14541fjsn76b5571aa65b',
					'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
				},
				body: encodedParams
			};

			fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
				.then(response => response.json())
				.then(response => {
					const traductionParagraph = document.querySelector('.response')
					console.log(response)
					const translation = response.data.translations[0].translatedText
					traductionParagraph.innerHTML = `${translation}`
				})
				.catch(err => console.error(err));
		})

	})
	.catch(err => console.error(err));

});

