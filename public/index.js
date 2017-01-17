'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//----------------------------------------------------------------

//exercice 1
function dateDiff(date1, date2){
    var diff = {}                           // Initialisation of a temp var
    var tmp = date2 - date1;
    var dayR = 0;
 
    tmp = Math.floor(tmp/1000);             // Calculate secondes
    diff.sec = tmp % 60;                    
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Calculate minutes
    diff.min = tmp % 60;                    

    tmp = Math.floor((tmp-diff.min)/60);    // Calculate hours
    diff.hour = tmp % 24;                   
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Calculate days
    diff.day = tmp;

    dayR = diff.day;

    return dayR;
}

function calculPrice(cars,rentals){
	//rental price = time + distance
    for ( var i =0; i< rentals.length ; i++){
      //rental duration
		var beginRental = new Date(rentals[i].pickupDate);
		var endRental = new Date(rentals[i].returnDate);
		var timeRental = dateDiff(beginRental, endRental);

    var rentalPrice = 0;

		for( var j = 0; j < cars.length ; j++ ){
			if ( rentals[i].carId == cars[j].id ) {
        //case where the rent last 1 day
        if (timeRental == 0) { 
          rentalPrice = cars[j].pricePerDay + rentals[i].distance * cars[j].pricePerKm; 
        } else {
          rentalPrice = timeRental * (reducPrice(timeRental) * cars[j].pricePerDay) + rentals[i].distance * cars[j].pricePerKm; 
        }
        rentals[i].price = rentalPrice;
        commissionSplit(i, timeRental);
			}
		}
	}
}

//exercice 2
function reducPrice(datediff){
  var percent
  
  if ( datediff > 1 && datediff <= 4) { percent = 0.9;}
  else if ( datediff > 4 && datediff < 10) { percent = 0.7; }
  else if ( datediff >= 10) { percent = 0.5; }
  else { percent = 1; }
  return percent;
}

//exercice 3 
function commissionSplit( i, timeRental){
  var commission = rentals[i].price*0.3;
  var commissionSplit = rentals[i].commission;

  commissionSplit.insurance = commission/2;
  //case where the rent last 1 day
  if (timeRental == 0) { commissionSplit.assistance =1;}
  else {commissionSplit.assistance = timeRental;}
  //drivy take the rest
  //but if there is a deductible option
  if (rentals[i].options.deductibleReduction == true) {deductibleOption(i);}
  
  //otherwise
  commissionSplit.drivy = commission - (commissionSplit.insurance+commissionSplit.assistance);

return commissionSplit;
}

//exercice 4
function deductibleOption(i){
  var chargeToDrivy = 4;
  var addToCom = rentals[i].commission;

  addToCom.drivy += chargeToDrivy;
  rentals[i].price +=chargeToDrivy; //add charge to drivy in the rental price

  return addToCom;
}

//console.log(cars);
console.log(rentals);
//console.log(actors);
//console.log(rentalModifications);
console.log(calculPrice(cars,rentals));

console.log(rentals);