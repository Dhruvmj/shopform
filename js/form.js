var phoneNoRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var postCodeRegex = /^[A-Za-z][0-9][A-Za-z][\s]?[0-9][A-Za-z][0-9]$/;
var creditCardRegix = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
var emailRegex = /^[\w\d]+@[\w\d]+.[\w\d]+$/;
// var emailRegex1 = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; for only one @ and .
var expYearMin = 2020; //In account of current year
var expMonthRegix = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;
var passwordRegix = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;

function checkout() {

	var tax = 0;
	var errors = '';
	var total = 0;
	var netAmount = 0;
	
	//Fetching values
	var firstName = document.getElementById('firstName').value;
	var lastName = document.getElementById('lastName').value;
	var phoneNo = document.getElementById('phoneNo').value;
	var email = document.getElementById('email').value;
	var postCode = document.getElementById('postCode').value;
	var address = document.getElementById('address').value;
	var province = document.getElementById('province').value;
	var city = document.getElementById('city').value;
	var creditCard = document.getElementById('creditCard').value;
	var cardExpireYear = document.getElementById('cardExpireYear').value;
	var cardExpireMonth = document.getElementById('cardExpireMonth').value;
	var password = document.getElementById('password').value;
	var passwordConfirm = document.getElementById('passwordConfirm').value;
	// var tax = { Ontario: 13, Alberta: 15, BritishColumbia: 14 };
	// alert(tax.Ontario);
	var foodQty = document.getElementsByName('food');
	var foodPrice = [7, 5.99, 4.5, 3.3, 2.9];


	firstName = firstName.trim();
	lastName = lastName.trim();
	phoneNo = phoneNo.trim();
	email = email.trim();
	address = address.trim();
	creditCard = creditCard.trim();
	password = password.trim();
	passwordConfirm = passwordConfirm.trim();

	//Checking for empty values and validate input

	if (firstName == "" || firstName == null) {
		errors += ` *Please enter First name <br> `;
	}
	if (lastName == "" || lastName == null) {
		errors += ` *Please enter Last name <br> `;
	}
	if (phoneNo == "" || phoneNo == null) {
		errors += ` *Please enter Phone Number <br> `;
	} else if (!phoneNoRegex.test(phoneNo)) {
		errors += `*Please enter correct value for Phone Number <br>`;
	}
	if (email == "" || email == null) {
		errors += ` *Please enter Email <br> `;
	} else if (!emailRegex.test(email)) {
		errors += `*Please enter correct value for Email <br>`;
	}
	if (postCode == "" || postCode == null) {
		errors += ` *Please enter Post code <br> `;
	} else if (!postCodeRegex.test(postCode)) {
		errors += `*Please enter correct value for Post code <br>`;
	}
	if (address == "" || address == null) {
		errors += ` *Please enter Address <br> `;
	}
	if (province == "" || province == null) {
		errors += ` *Please enter Province <br> `;
	}
	if (city == "" || city == null) {
		errors += ` *Please enter City <br> `;
	}
	if (creditCard == "" || creditCard == null) {
		errors += ` *Please enter Credit card info. <br> `;
	} else if (!creditCardRegix.test(creditCard)) {
		errors += `*Please enter correct value for Credit card <br>`;
	}
	if (cardExpireYear == "" || cardExpireYear == null) {
		errors += ` *Please enter Card expire Year <br> `;
	} else if (expYearMin > cardExpireYear) {
		errors += `*Please enter correct value for Expiry Year <br>`;
	}
	if (cardExpireMonth == "" || cardExpireMonth == null) {
		errors += ` *Please enter Expiry Month <br> `;
	} else if (!expMonthRegix.test(cardExpireMonth)) {
		errors += `*Please enter correct value for Expiry Month <br>`;
	}
	if (password == "" || password == null) {
		errors += ` *Please enter password <br> `;
	} else if (!passwordRegix.test(password)) {
		errors += `*Please enter correct value for password <br>`;
	}
	if (passwordConfirm == "" || passwordConfirm == null) {
		errors += ` *Please enter Confirm password <br> `;
	} else if (passwordConfirm != password) {
		errors += `*Confirm password does not match <br>`;
	}
	for (var i = 0; i < foodPrice.length; i++) {
		total += (foodQty[i].value * foodPrice[i]);
	}
	switch (document.getElementById('province').value) {
		case "Ontario":
			tax = 13;
			break;
		case "Alberta":
			tax = 15;
			break;
		case "British Columbia":
			tax = 12;
			break;
	}
	if (total < 10) {
		errors += ` *Minimum purchase of 10$ is required <br> `;

	} else {
		netAmount = total * (1 + (tax / 100));
	}
	
	if (errors != '') { // if there are errors
		document.getElementById('errors').innerHTML = errors;
	} else {
		
		var myOutput = `<p style = "font-family: "Times New Roman", Times, serif;">
		First Name:     ${firstName} <br>
		Last name:      ${lastName} <br>
		Phone Number:   ${phoneNo} <br>
		Email:          ${email} <br>
		Post code:      ${postCode} <br>
		Address:        ${address} <br>
		Province:       ${province} <br>
		City:           ${city} <br></br>
		Credit Card:    ${creditCard} <br>
		Expire Year:    ${cardExpireYear} <br>
		Expire Month:   ${cardExpireMonth} <br>
		Total:      	$${total}<br>
		Tax:            ${tax}%<br>
		<hr>
		Net Amount: 	$${netAmount.toFixed(2)}<br>
		</p>
		`;
	
		document.getElementById('formResult').innerHTML = myOutput;
		document.getElementById('errors').innerHTML = '';
	
	}
	// 


	// Return false will stop the form from submitting and keep it on the current page.
	return false;


}

// 