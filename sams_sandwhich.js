var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// JavaScript Document

function checkForm() {
	alert("test") //test alert to check JS is attached //creating a varible to access each item with the class addChecl
	if (termsAndConditions.checked) {
		alert("terms box is checked")
	} else {
		alert("you need to click tc box");
		return;
	}
	var addItems = document.getElementsByClassName('radioOption');
	// Creaint an empty object array
	var checkedAddItems = [];
	var addCost = 0; //sets the cost to 0
	//this for loop goes through all items with the class name addCheck 
	for (var i = 0; i < addItems.length; i++) {
		if (addItems[i].checked) { //if an item has been checked do the following:
			//each items that has been checked is "pushed" to the empty list 
			checkedAddItems.push('' + addItems[i].value);
			alert(checkedAddItems); //test alert 	
			//finds the selected item and adds on the price 
			addCost += Number(addItems[i].dataset.price);
			alert(addCost); //test alert
		}
	}
	//once the for loop has iterated over every checked item
	//it locates the empty div and prints out the array and addCost 
	outputDIV.innerHTML = checkedAddItems + "    Total cost $" + addCost;
	customerDetails(checkedAddItems, addCost);
}

function customerDetails(checkedAddItems, addCost) {
	alert("customer details function");
	var firstname = firstNameInput.value;
	var lastname = lastNameInput.value;
	var cellPhone = cellPhoneInput.value;
	var pickUpTime = timeInput.value;
	alert(firstname + lastname + cellPhone + pickUpTime);
	outputCustomerDetails.innerHTML = firstname + " " + lastname + " " + cellPhone + " " + pickUpTime;
	//if else statements after this for higher grade
	pushData(checkedAddItems, addCost, firstname, lastname, cellPhone, pickUpTime);
}

function pushData(checkedAddItems, addCost, firstname, lastname, cellPhone, pickUpTime) {
	alert("at the push datafunction - nearly done!"); //output a message to the html a message confirming thier tickets
	console.log("myFunction fired.");
	console.log("Getting Values....");
	console.log("Initialing Airtable API....");
	var Airtable = require('airtable');
	var base = new Airtable({
		apiKey: 'patyNjBigH9V3ZUQC.d609cf3055624d63aa779d9808de989b8ff91de4270f556d01fdab5198604f27'
	}).base('appMuYEfpHHFEI93x');
	console.log("Creating a record....");
	base('sandwhich').create({
			"First name": firstname,
			"Last name": lastname,
			"Total cost": addCost,
			"Cellphone": cellPhone,
			"Pick up time": pickUpTime,
			"Sandwhich": checkedAddItems
		}, {
			typecast: true
		}, //gets the API to convert types instead of parsing everything as strings.
		function(err, record) {
			if (err) {
				console.error(err);
				return;
			}
			alert("record created");
			console.log("Record created: " + record.getId());
		});
	// When the user clicks the button, open the modal
	alert("modal is about to pop up");
	modal.style.display = "block";
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
 	if (event.target == modal) {
		modal.style.display = "none";
 		}
	}
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
 	modal.style.display = "none";
	}
	// Refresh the page after a delay of 3 seconds
	setTimeout(function(){
	location.reload();
	}, 5000); // 5000 milliseconds = 5 seconds
    console.log("End Function.");
}

