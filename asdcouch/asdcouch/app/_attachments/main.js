$("#home").on("pageinit", function(){
	console.log('I am ready');

}); // End code for home page.

$('#addItem').on('pageinit', function(){
	console.log('Get ready for this!');

	
}); // End code for add item page.

$('#showItem').on('pageinit', function () {
	console.log('Hello World!');
	$.ajax({
		"url"		: '/asd1210/_all_docs?include_docs=true&startkey="pets:"&endkey="pets:zzzzz"',
		//"url"		: '_view/pets', // It doesn't work right.
		"type"		: 'GET',
		"dataType"	: 'json',
		"success"	: function(data) {
			console.log(data)
			$('#petList').empty();
			$.each(data.rows, function(index, pets){
				var name	= pets.doc.petName;
				var group	= pets.doc.petGroups;
				var gender	= pets.doc.genderValue;
				var fave	= pets.doc.favePet;
				var kool	= pets.doc.koolness;
				var com		= pets.doc.comments;
				$('#petList').append(
					$('<li>').append(
						$('<a>').attr("href", "#")
							.text(name)
					)
				);
				//console.log(pets);
				
			});
			$('#petList').listview('refresh');
			
			/*for(var i=0, j=data.pets.length; i<j; i++){
				var pet = data.pets[i];
				$('' +
					'<div class="jpets">' +
						getImg(object.petGroups[1]) +
						'<h2>'+ pet.petName +'</h2>' +
						'<p>'+ pet.petGroups +'</p>' +
						'<p>'+ pet.genderValue +'</p>' +
						'<p>'+ pet.favePet +'</p>' +
						'<p>'+ pet.koolness +'</p>' +
						'<p>'+ pet.comments +'</p>' +
					'</div>'
				).appendTo('#items');
			};
			console.log(data);
			changePage();
			$('#items').listview('refresh');*/
		},
		"error": function(data) {
			console.log(data);
		}
		
	});
	
});