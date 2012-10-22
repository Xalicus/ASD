$('#home').on("pageshow", function() {
	/*$.couch.db("asd1210").view("petsdex/pets", {
		success: function(data) {
			//console.log(data);
			$('#homeItems').empty();
			$.each(data.rows, function(index, value) {
				var item = (value.value || value.doc);
				$('#homeItems').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "program.html")
							.text(item.title)
					)
				);
			});
			$('#homeItems').listview('refresh');
		}
	});*/

}); // End code for home page.

$('#addItem').on("pageshow", function(){
	
	$.couch.db("asd1210").saveDoc("petsdex/pets", {
	    success: function(data) {
	        console.log(data);
	        $.each(data.rows, function(index, pet) {
	        	var petValue = (pet.value || pet.doc);
	        	
	        });
	        $('#petForm').form('refresh');
	    },
	    error: function(status) {
	        console.log(status);
	        
	    }
	});
	
	$.couch.db("asd1210").view("petsdex/pets", {
		success: function(data) {
			console.log(data);
			$('#petList').empty();
			$.each(data.rows, function(index, pet) {
				var item = (pet.value || pet.doc);
				$('#petList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "pets.html?program=" + item.koolPet_Groups)
							.text(item.koolPet_Name + " in " + item.koolPet_Groups)
					)
				);
			});
			$('#petList').listview('refresh');
		}
	});
	
	
	$('#petsForm div').on('click', function(e){
		console.log(e);
	});

	$('#koolness').slider("refresh");
	$('#petName').val("Enter KoolPet Name here!");
	$('#petName').on('click', function() {
		$('#petName').val("");
	});
	$('#comments').val("Place comments like birthday and others here.");
	$('#comments').on('click', function() {
		$('#comments').val("");
	});

	var myForm = $('#petForm'),
		aierrorsLink = $('#aierrorsLink')
		;
	
		myForm.validate({
			ignore: '.ignoreValidation',
			invalidHandler: function(form, validator) {
				aierrorsLink.click();
				var html = '';
				for(var key in validator.submitted) {
					var label = $('label[for^="' + key + '"]').not('generated');
					var legend = label.closest('fieldset').find('ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>' + fieldName + '</li>';
				};
				$("#addItemErrors ul").html(html);
				
			},
			submitHandler: function() {
				var data = myForm.serializeArray();
					storeData(key);
			}
		});
		
		// My storeData function
		/*var storeData = function(key){
			// If there isn't a key, this means this is a brand new item and we need a new key.
			if (!key) {
				var id				= Math.floor(Math.random()*10000001);
			} else {
				// Set the id to the existing key I'm editing so that it will save over the data.
				// The key is the same key that's been passed along from the editSubmit event handler
				// to the validate function, and then passed here, into the storeData function.
				id					= key;
			};
			
			// Gather round ye olde form field values, and store in ye olde objects.
			// Object props contain array with the form label and input value.
			
			var pet					= {};
				pet.petGroups		= ["KoolPet Type: ", $('#petGroups').val()];
				pet.petName			= ["KoolPet\'s Name: ", $('#petName').val()];
				pet.genderValue		= ["Gender: ", $('input:radio[name=genderValue]:checked').val()];
				pet.favePet			= ["Favorite KoolPet: ", $('input:slider[name=favePet]:true').val()];
				pet.koolness		= ["Koolness Factor: ", $('#koolness').val()];
				pet.comments		= ["Comments: ", $('#comments').val()];
			// Save data into Local Storage: Use Stringify to convert the object to a string.
			localStorage.setItem(id, JSON.stringify(item));
			console.log(key.val());
			changePage();
			alert("Pet saved to the KoolPetsDex!");
		};*/

		// My Make Item Links Function
		// Create the edit and delete links for each stored item when displayed.
		var makeItemLinks = function(key, linksLi) {
			// Add edit single item link
			var editLink = $('a');
			editLink.attr("href", "#addItem");
			editLink.key = key;
			var editText = "Edit KoolPet";
			editLink.addClass("editLink")
				.on('click', editItem)
				.html(editText);
			linksLi.appendTo(editLink);

			// Add my line break
			var breakTag = $('br');
			linksLi.append(breakTag);


			// Add delete single item link
			var deleteLink = $('a');
			deleteLink.attr("href", "#addItem");
			deleteLink.key = key;
			var deleteText = "Release KoolPet";
			deleteLink.addClass("deleteLink")
				.on('click', deleteItem)
				.html(deleteText);
			linksLi.appendTo(deleteLink);
		};
		
		// My Edit Single Item Function
		var editItem = function() {
			// Grab data from the item local storage.
			var value = localStorage.getItem(this.key);
			var item = JSON.parse(value);
			
			// To show the form again
			//toggleControls("off");
			
			// Populate the form fields with current localStorage values.
			if (item.kool1[1] == "On") {
				$("kool1").attr("value", "on");
			} else {
				$("kool1").attr("value", "off");
			};
			$("petGroups").value = item.petGroups[1].val();
			$("petName").value = item.petName[1].val();
			$("petEmail").value = item.petEmail[1].val();
			var radios = document.forms[0].genderValue;
			for (var i=0; i<radios.length; i++) {
				if (radios[i].value == "Male" && item.genderValue[1] == "Male") {
					radios[i].attr("checked", "checked");
				} else if (radios[i].value == "Female" && item.genderValue[1] == "Female") {
					radios[i].attr("checked", "checked");
				};
			};
			if (item.favePet[1] == "Yes") {
				$("favePet").attr("value", "On");
			};
			$("birthDate").value = item.birthDate[1].val();
			$("koolness").value = item.koolness[1].val();
			$("comments").value = item.comments[1].val();
			
			// Remove the initial listener from the input "save pet" button.
			storeData.off("click", submit);
			// Change SaveData button Value to Edit Button
			// $("submit").value = "Edit KoolPet";
			$("submit").val("Edit KoolPet!");
			var editSubmit = $("submit");
			
			// Save the key value established in this function as a prop of the editSubmit event
			// so we can use that value when we save the data we edited.
			editSubmit.on("click", submit);
			editSubmit.key = this.key;
		};


	// My Delete Item Function
	var	deleteItem = function (){
		var ask = confirm("Are you sure you want to release this KoolPet?");
		if (ask) {
			localStorage.removeItem(this.key);
			alert("KoolPet WAS Released!!!");
			window.location.reload();
		} else {
			alert("KoolPet was NOT Released!");
		};
	};


	// My Clear Data Function
	var clearDataStorage = function() {
		if(localStorage.length === 0) {
			alert("No KoolPets in the KoolPetsDex.");
		} else {
			localStorage.empty();
			alert("All KoolPets have been Released!");
			window.location.reload();
			return false;
		};
	};

	var changePage = function(pageId) {
		$('#' + pageId).trigger('pageinit');
		$.mobile.changePage($('#' + pageId), {transition:"slide"});
	};
	
}); // End code for add item page.

$('#showItem').on("pageshow", function () {
	console.log('Hello World!');

	var search = function() {
		var getInput = $('#searchField').val();
		var getCat = $().val();
		var error = true;
		var match;
		
		if (getInput === "") {
			alert("Please input a search term.");
			return;
		}

	// Live Search
	$("#filter").keyup(function(){

		// Retrieve the input field text and reset the count to zero
		var filter = $(this).val(), count = 0;

		// Loop through the KoolPets list
		$(".itemlist li").each(function(){

			// If the list item does not contain the text phrase fade it out
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();

			// Show the list item if the phrase matches and increase the count by 1
			} else {
				$(this).show();
				count++;
			}
		});

		// Update the count
		var numberItems = count;
		$("#filter-count").text("Number of KoolPets = "+count);
	}); // end live search


	}; // end search function
	
	
	$.couch.db("asd1210").view("petsdex/pets", {
		success: function(data) {
			console.log(data);
			$('#petList').empty();
			$.each(data.rows, function(index, pet) {
				var item = (pet.value || pet.doc);
				$('#petList').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "pets.html?program=" + item.koolPet_Groups)
							.text("Name: " + item.koolPet_Name + " in " + "Group: " + item.koolPet_Groups)
					)
				);
			});
			$('#petList').listview('refresh');
		}
	});
	
	
	// Old ajax code, that we don't need to call anymore.
	/*$.ajax({
		"url"		: '/asd1210/_all_docs?include_docs=true&startkey="pets:"&endkey="pets:zzzzz"',
		//"url"		: '_view/pets', // It doesn't work right.
		"type"		: 'GET',
		"dataType"	: 'json',
		"success"	: function(data) {
			//console.log(data)
			$('#petList').empty();
			// This one is for the _all_docs one.
			$.each(data.rows, function(index, pets){
				var name	= pets.doc.petName;
				var group	= pets.doc.petGroups;
				var gender	= pets.doc.genderValue;
				var fave	= pets.doc.favePet;
				var kool	= pets.doc.koolness;
				var com		= pets.doc.comments;
				$('#petList').append(
					$('<li>').append(
						$('<a>').attr("href", "#showItem")
							.text("Name: " + name + " Group: " + group)
					)
				);
				//console.log(pets);
				
			});
			
			
			// This one is for the _view/pets one.
			//$.each(data.rows, function(index, pets){
			//	var name	= pets.value.petName;
			//	var group	= pets.value.petGroups;
			//	var gender	= pets.value.genderValue;
			//	var fave	= pets.value.favePet;
			//	var kool	= pets.value.koolness;
			//	var com		= pets.value.comments;
			//	$('#petList').append(
			//		$('<li>').append(
			//			$('<a>').attr("href", "#addItem")
			//				.text("Name: " + name + " Group: " + group)
			//		)
			//	);
			//	console.log(pets);
			//	
			//});
			//$('#petList').listview('refresh');
			
		},
		"error": function(data) {
			console.log(data);
			console.log("Errors suck.");
		}
		
	});*/
	
});	// End code for show item page.

var urlVars = function() {
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};

$('#showPets').on("pageshow", function () {
	var pets = urlVars()["group"];
	console.log(pets);
	$.couch.db("asd1210").view("petsdex/petGroups", {
		key: "pets: " + pets
	});
	
});	// End code for show pets page.





