$("#home").on("pageinit", function(){
	console.log('I am ready');

}); // End code for home page.

$('#addItem').on('pageinit', function(){
	console.log('Get ready for this!');

	
}); // End code for add item page.

$('#showItem').on('pageinit', function () {
	console.log('Hello World!');
	$.ajax({
		"url"		: '_view/pets',
		"type"		: 'GET',
		"dataType"	: 'json',
		"success"	: function(data) {
			console.log(data)
			$('#items').empty();
			$.each(data.rows, function(index, pets){
				var name	= pets.value.petName;
				var group	= pets.value.petGroups;
				var gender	= pets.value.genderValue;
				var fave	= pets.value.favePet;
				var kool	= pets.value.koolness;
				var com		= pets.value.comments;
				$('#petList').append(
					$('li').text(name)
				);
				console.log(pets);
				
			});
			
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