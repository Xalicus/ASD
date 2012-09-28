/*
Author: Kevin Ward
Class: ASD1210
Name: Project 1
Date: 09-27-2012
*/

$("#home").on("pageinit", function(){
	
	// Home page code goes here.
	$("header nav")
		.slideUp()
		.slideDown()
	;
	
	/*$('<a href="#">Link</a>')
		.appendTo('#nav')
		.wrap('<p />')
		.bind('click', function(){
			console.log('nav event!');
			$(this).parent().addClass('active')
			return false;
		})
	;*/
	
	//mouseenter mouseleave
	//focusin focusout
	
}); // End code for home page.


		
$('#addItem').on('pageinit', function(){

	$('#petsForm div').on('click', function(e){
		console.log(e);
	});

	$('#koolness').slider("refresh");
	$('#petName').val("Enter KoolPet Name here!");
	$('#petName').on('click', function() {
		$('#petName').val("");
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
			};
			
			var dateToday = function() {
				var today = new Date();
				var day = today.getDate();
				var month = today.getMonth() + 1;
				var year = today.getFullYear();
				
				if (day < 10) {
					day = day + "0";
				}
				
				if (month < 10) {
					month = "0" + month;
				}
				
				today = month + "-" + day + "-" + year;
				$('#birthDate').val(today);
			};
				dateToday();
			
			$('#reset').on('click', function() {
				// this is to reset the form
				resetPF();
				location.reload('#addItem');
			});
			var resetPF = function() {
				$('#kool1').attr('checked', false);
				$('#petName').val("");
				$('#petGroups').val("");
				$('#petEmail').val("");
				$('#male').attr('checked', true);
				$('#female').attr('checked', false);
				$('#favePet').attr('checked', false);
				dateToday();
				$('#koolness').val(25);
				$('#comments').val("");
			};
		});

	//any other code needed for addItem page goes here


	// My getElementById or gebi function
	var gebi = function(x){
		var theElement = document.getElementById(x);
		return theElement;
	};

	// My Variables for the functions
	var	genderValue;
	var	faveValue = "No";
	var	errMsg = $("#errors");
	
	var toggleControls = function(n) {
		switch(n) {
			case "on":
				$("#petForm").style.display = "none";
				$("#clearData").style.display = "inline";
				$("#showData").style.display = "none";
				$("#addNew").style.display = "inline";
				$("#items").style.display = "inline";
				break;
			case "off":
				$("#petForm").style.display = "block";
				$("#clearData").style.display = "inline";
				$("#showData").style.display = "inline";
				$("#addNew").style.display = "none";
				$("#items").style.display = "none";
				break;
			default:
				return false;
		};
	};

// Live Search
	$(document).ready(function(){
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
		});
	});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.


// My autoFillData function
var autoFillData = function (){
	// The actual JSON OBJECT data required for this to work is coming from the 
	// json.js file, which is loaded from the html page.
	// Store the JSON OBJECT into local storage.
	for(var n in json) {
		var id = Math.floor(Math.random()*1000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	};
};

// My storeData function
var storeData = function(key){
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
	
	getSelectedRadio();
	getCheckboxValue();
	
	var pet					= {};
		pet.kool1			= ["What is your Pet? ", $('#kool1').val()];
		pet.petGroups		= ["KoolPet Type: ", $('#petGroups').val()];
		pet.petName			= ["KoolPet\'s Name: ", $('#petName').val()];
		pet.petEmail		= ["KoolPet Email: ", $('#petEmail').val()];
		pet.genderValue		= ["Gender: ", $('input:radio[name=genderValue]:checked').val()];
		pet.favePet			= ["Favorite KoolPet: ", $('input:slider[name=favePet]:true').val()];
		pet.birthDate		= ["Date of Birth: ", $('#birthDate').val()];
		pet.koolness		= ["Koolness Factor: ", $('#koolness').val()];
		pet.comments		= ["Comments: ", $('#comments').val()];
	// Save data into Local Storage: Use Stringify to convert the object to a string.
	localStorage.setItem(id, JSON.stringify(item));
	alert("Pet saved to the KoolPetsDex!");
}; 

// My getData function
var getData = function(){

	toggleControls("on");
	if(localStorage.length === 0) {
		alert("There were no Pets, so KoolPets were added!");
		autoFillData();
	};
	
// This is to get images for the correct category.
	var getImg = function(catName, makeSubList) {
		var imgLi = document.createElement("div");
		makeSubList.appendChild(imgLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
		imgLi.appendChild(newImg);
	};

// My Make Item Links Function
	// Create the edit and delete links for each stored item when displayed.
	var makeItemLinks = function(key, linksLi) {
		// Add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#addItem";
		editLink.key = key;
		var editText = "Edit KoolPet";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		// Add my line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);


		// Add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#addItem";
		deleteLink.key = key;
		var deleteText = "Release KoolPet";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	};
	
	// This is supposed to write data from Local Storage back to the browser.
	var makeDiv = document.createElement("div");
	// makeDiv.setAttribute("id", "items"); // Found out I don't need this line anymore.
	var makeList = document.createElement("ul");
	// makeDiv.appendChild(makeList); // Modified this line to work with my current code.
	gebi("items").appendChild(makeList);
	// This code should add the data to my page when I press show data.
	document.body.appendChild(makeDiv);
	gebi("items").style.display = "block";
	for (var i=0, len=localStorage.length; i<len; i++) {
		var makeLi = document.createElement("li");
		var linksLi = document.createElement("div");
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		// Convert strings back to being an object from localStorage value.
		var object = JSON.parse(value);
		var makeSubList = document.createElement("div");
		makeLi.appendChild(makeSubList);
		// This next line is to grab the Img that fits the category it's in.
		getImg(object.petGroups[1], makeSubList);
		for (var n in object) {
			var makeSubLi = document.createElement("div");
			makeSubList.appendChild(makeSubLi);
			var optSubText = object[n][0] + " " + object[n][1];
			makeSubLi.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
		};
		// Create the edit and delete buttons/link for each item in local storage.
		makeItemLinks(localStorage.key(i), linksLi);
	};

// My Edit Single Item Function
	var editItem = function() {
		// Grab data from the item local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		// To show the form again
		toggleControls("off");
		
		// Populate the form fields with current localStorage values.
		gebi("petGroups").value = item.petGroups[1];
		gebi("petName").value = item.petName[1];
		gebi("petEmail").value = item.petEmail[1];
		var radios = document.forms[0].genderValue;
		for (var i=0; i<radios.length; i++) {
			if (radios[i].value == "Male" && item.genderValue[1] == "Male") {
				radios[i].setAttribute("checked", "checked");
			} else if (radios[i].value == "Female" && item.genderValue[1] == "Female") {
				radios[i].setAttribute("checked", "checked");
			};
		};
		if (item.favePet[1] == "Yes") {
			gebi("favePet").setAttribute("value", "On");
		};
		gebi("birthDate").value = item.birthDate[1];
		gebi("koolness").value = item.koolness[1];
		gebi("comments").value = item.comments[1];
		
		// Remove the initial listener from the input "save pet" button.
		storeData.removeEventListener("click", submit);
		// Change SaveData button Value to Edit Button
		gebi("submit").value = "Edit KoolPet";
		var editSubmit = gebi("submit");
		
		// Save the key value established in this function as a prop of the editSubmit event
		// so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", submit);
		editSubmit.key = this.key;
	};

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
var clearDataStorage = function(){
	if(localStorage.length === 0) {
		alert("No KoolPets in the KoolPetsDex.");
	} else {
		localStorage.clear();
		alert("All KoolPets have been Released!");
		window.location.reload();
		return false;
	};
};

// My Variables
	var showData = $("#showData");
	showData.addEventListener("click", getData);
	var clearLink = $("#clearData");	
	clearLink.addEventListener("click", clearDataStorage);
	var saveData = $("#submit");
	saveData.addEventListener("click", storeData);


}); // End code for page.


$("#showItem").on("pageinit", function(){
	// Page code goes here.
	$("header nav")
		.slideUp()
		.slideDown()
	;
	
	function searchInput() {
		if ($('#searchField').val() == "") {
			$('#searchResults').html("");
		}
	}

var search = function() {
	var getInput = $('#searchField').val();
	var getCat = $().val();
	var error = true;
	var match;
	
	if (getInput == "") {
		alert("Please input a search term.");
		return;
	}

};
	
}); // End code for page.


$("#info").on("pageinit", function(){
	// Page code goes here.
	$("header nav")
		.slideUp()
		.slideDown()
	;	
}); // End code for page.


$("#news").on("pageinit", function(){
	// Page code goes here.
	$("header nav")
		.slideUp()
		.slideDown()
	;	
}); // End code for page.


$("#cs").on("pageinit", function(){
	// Page code goes here.
	$("header nav")
		.slideUp()
		.slideDown()
	;	
}); // End code for page.


$("#addItemErrors").on("pageinit", function(){
	// Page code goes here.
	$("header nav")
		.slideUp()
		.slideDown()
	;	
}); // End code for page.