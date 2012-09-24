/*
Author: Kevin Ward
Class: ASD1210
Name: Project 1
Date: 09-27-2012
*/


$("#home").on("pageinit", function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $("#petForm"),
			aierrorsLink = $("#aierrorsLink")
			;
		
		    myForm.validate({
			invalidHandler: function(form, validator) {
				aierrorsLink.click();
				//console.log(validator.submitted);
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
	
$("#petForm").validate({
	rules: {
		birthDate: {
			required: true,
			dateISO: true
		}
	}
});
	
	
	//any other code needed for addItem page goes here


	// My getElementById or gebi function
	var gebi = function(x){
		var theElement = document.getElementById(x);
		return theElement;
	};

	// My Variables for the functions
	var petGroups = ["--Choose A Pet Group--", "Birds", "Cats", "Dogs", "Farm_Animals", 
					"Mythical", "Reptiles", "Rodents"];
	var	genderValue;
	var	faveValue = "No";
	var	errMsg = gebi("errors");

	// Create select field element and populate with options.
/*	var makeCats = function() {
		var formTag = document.getElementsByTagName("petForm"),
			selectLi = gebi("petsType"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "petGroups");
			makeSelect.setAttribute("class", "required");
		for (var i=0, j=petGroups.length; i<j; i++) {
			var makeOption = document.createElement("option");
			var optTxt = petGroups[i];
			makeOption.setAttribute("value", optTxt);
			makeOption.innerHTML = optTxt;
			makeSelect.appendChild(makeOption);
		};
		selectLi.appendChild(makeSelect);
	};*/
	
	// Find the value of selected radio button.
	var getSelectedRadio = function() {
		var radio = document.forms[0].genderValue;
		for (var i=0; i<radio.length; i++) {
			if (radio[i].checked) {
				genderValue = radio[i].value;
			};
		};
	};
	
	// Finds the value of the Checkbox
	var getCheckboxValue = function(){
		if (gebi("favePet").checked) {
			faveValue = gebi("favePet").value;
		} else {
			faveValue = "Off";
		};
	};
	
	var toggleControls = function(n) {
		switch(n) {
			case "on":
				gebi("petForm").style.display = "none";
				gebi("clearData").style.display = "inline";
				gebi("showData").style.display = "none";
				gebi("addNew").style.display = "inline";
				gebi("items").style.display = "inline";
				break;
			case "off":
				gebi("petForm").style.display = "block";
				gebi("clearData").style.display = "inline";
				gebi("showData").style.display = "inline";
				gebi("addNew").style.display = "none";
				gebi("items").style.display = "none";
				break;
			default:
				return false;
		};
	};
	
	
// My Validate Function
/*	var validate = function(e) {
		// Define the elements we want to check
		var getPetGroups = gebi("petGroups");
		var getPetName = gebi("petName");
		var getPetEmail = gebi("petEmail");
		
		// Resetting Error Messages
		errMsg.innerHTML = "";
		getPetGroups.style.border = "1px solid black";
		getPetName.style.border = "1px solid black";
		getPetEmail.style.border = "1px solid black";
		
		// Get Error Messages
		var messageArray = [];
		
		// Pet Type Validation
		if (getPetGroups.value === "--Choose A Pet Group--") {
			var petGroupsError = "Please choose a KoolPet Group!";
			getPetGroups.style.border = "1px solid red";
			messageArray.push(petGroupsError);
		};
		
		// Pet Name Validation
		if (getPetName.value === "") {
			var petNameError = "Please enter a KoolPet Name!";
			getPetName.style.border = "1px solid red";
			messageArray.push(petNameError);
		};
		
		// Email Validation
		var re = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
		var re2 = /^([a-z0-9])([\w\.\-\+])+([a-z0-9])\@((\w)([\w\-]?)+\.)+([a-z]{2,6})$/;
		if (!(re.exec(getPetEmail.value))) {
			var petEmailError = "Please enter an email for your KoolPet!";
			getPetEmail.style.border = "1px solid red";
			messageArray.push(petEmailError);
		};
		
		// If there were errors, display them on the screen.
		if (messageArray.length >= 1) {
			for (var i=0, j=messageArray.length; i < j; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = messageArray[i];
				errMsg.appendChild(txt);
			};
			e.preventDefault();
			return false;
		} else {
			// If all is OK, save the data! Send the key value (which came from the editData function).
			// Remember this key value was passed through the editSubmit event listener as a prop.
			storeData(this.key);
		};
	};*/
	

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
// var submit = function(key){
var storeData = function(key){
	// If there isn't a key, this means this is a brand new item and we need a new key.
	if (!key) {
		var id				= Math.floor(Math.random()*1000001);
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
	
	var item				= {};
		item.petGroups		= ["KoolPet Type:", gebi("petGroups").value];
		item.petName		= ["KoolPet\'s Name:", gebi("petName").value];
		item.petEmail		= ["KoolPet Email:", gebi("petEmail").value];
		item.genderValue	= ["Gender:", genderValue];
		item.favePet		= ["Favorite KoolPet:", faveValue];
		item.birthDate		= ["Date of Birth:", gebi("birthDate").value];
		item.koolness		= ["Koolness Factor:", gebi("koolness").value];
		item.comments		= ["Comments:", gebi("comments").value];
	// Save data into Local Storage: Use Stringify to convert the object to a string.
	localStorage.setItem(id, JSON.stringify(item));
	// alert("Pet saved to the KoolPetsDex!");
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

// Calling the makeCats function.
//	makeCats();
	
// My Variables
	var showData = gebi("showData");
	showData.addEventListener("click", getData);
	var clearLink = gebi("clearData");	
	clearLink.addEventListener("click", clearDataStorage);
	var saveData = gebi("submit");
	saveData.addEventListener("click", storeData);


});