var fastfoodcafe = (function () {
	var c = 1;

	function inc() {
		c++;
	}

	var _privateProp = 'hello';
	return {
		c: c,
		inc: inc
	};
}());

var z = fastfoodcafe.c;

/**
 * Deep freeze instead of just Object.freeze.
 * @param obj
 * @returns {ReadonlyArray<any>}
 */
function deepFreeze(obj) {
	// Get property names from obj
	var propNames = Object.getOwnPropertyNames(obj);

	// Freeze properties to freeze the object
	propNames.forEach(function (name) {
		var prop = obj[name];

		// Freeze 'prop' if it is an object
		if (typeof prop === 'object' && prop !== null) {
			deepFreeze(prop);
		}
	});

	// Freeze the object 'obj' (nothing will be wrong if it is already freezed)
	return Object.freeze(obj);
}

/**
 * Fast-food cafe module.
 * @module fastfoodcafe
 */

/**
 * Class MenuItem
 *
 * @param type Type can be 'Drink', 'Hamburger' or 'Salad'
 * @param name
 * @param price
 * @param calories
 * @constructor
 */
function MenuItem(type, name, price, calories) {
	this.type = type;
	this.name = name;
	this.price = price;
	this.calories = calories;
}

MenuItem.prototype.getType = function () {
	return this.type;
};

MenuItem.prototype.getName = function () {
	return this.name;
};

MenuItem.prototype.calculatePrice = function () {
	return this.price;
};

MenuItem.prototype.calculateCalories = function () {
	return this.calories;
};


/**
 * Class Order
 *
 * @constructor
 */
function Order() {
	this.items = [].slice.call(arguments);
	this.isPaid = false;
}

/**
 * Shows items from an order.
 */
Order.prototype.showOrder = function () {
	if (this.items.length) {
		console.log('Order:');
		this.items.map(function (item) {
			console.log('* ' + item.name);
		});
	}
	else {
		console.log('Order is empty!');
	}
};

/**
 * Add a dish item into the order.
 * @param item
 */
Order.prototype.addItem = function (item) {
	this.items.push(item);
	return this;
};

/**
 * Delete a dish item from the order.
 * @param item
 */
Order.prototype.deleteItem = function (item) {
	var idx = this.items.indexOf(item);
	if (idx === -1) {
		console.log('There is no presented item or your order is empty!');
	}
	else {
		this.items.splice(idx, 1);
		console.log('The ' + '\"' + item.name + '\" has been deleted');
	}
};

/**
 * Pay for an order and freeze {Order}.
 */
Order.prototype.payOrder = function () {
	this.isPaid = true;
	deepFreeze(this);
	console.log('Order was successfully payed and closed!');
};

/**
 * Calculate total price for an order.
 * @returns {number} Total order price
 */
Order.prototype.calculateOrderPrice = function () {
	this.totalPrice = 0;
	this.items.map(function (item) {
		this.totalPrice += item.price;
	});
	return this.totalPrice;
};

/**
 * Calculate total calories for an order.
 * @returns {number} Total order calories
 */
Order.prototype.calculateOrderCalories = function () {
	this.totalCalories = 0;
	this.items.map(function (item) {
		this.totalCalories += item.calories;
	});
	return this.totalCalories;
};

Order.prototype.getBill = function () {
	if (this.isPaid) {
		console.log('This order was payed earlier!');
	}
	else {
		this.showOrder();
		if (this.items.length) {
			console.log('Total price: ' + this.calculateOrderPrice() + ' tugriks\n' +
				'The energy value: ' + this.calculateOrderCalories() + ' calories\n' +
				'-\nWaiting for the payment...');
		}
	}
};

Order.prototype.showOrderInfo = function () {
	console.log('\n*** Order information ***');
	if (this.isPaid) {
		console.log('Status: \'PAYED\'');
		this.showOrder();
		console.log('Total price: ' + this.totalPrice + ' tugriks\n' +
			'The energy value: ' + this.totalCalories + ' calories\n');
	}
	else {
		console.log('Status: \'NOT PAYED\'');
		this.showOrder();
	}
};


// /**
//  * Class, which objects describe hamburger's params.
//  *
//  * @constructor
//  * @param size        Size
//  * @param stuffing    Stuffing
//  */
// function Hamburger(size, stuffing) {
//
// 	this.size = size;
//
// }
//
// Hamburger.prototype = Object.create(MenuItem.prototype);
// Hamburger.prototype.constructor = Hamburger;
//
// /* sizes, types of stuffings */
// Hamburger.SIZE_SMALL = ...
// Hamburger.SIZE_LARGE = ...
// Hamburger.STUFFING_CHEESE = ...
// Hamburger.STUFFING_SALAD = ...
// Hamburger.STUFFING_POTATO = ...
//
// /**
//  * Get hamburger's size
//  */
// Hamburger.prototype.getSize = function () {
// 	return;
// };
//
// /**
//  * Get hamburger's stuffing
//  */
// Hamburger.prototype.getStuffing = function () {
//
// };
//
// /**
//  * Get hamburger's price
//  * @return {Number} Prince in tugriks
//  */
// Hamburger.prototype.calculatePrice = function () {
//
// };
//
// /**
//  * Get hamburger's calorie
//  * @return {Number} Calorie in calories
//  */
// Hamburger.prototype.calculateCalories = function () {
//
// };

/* constants of Cola, Coffee for class Drink */
Drink.COLA = {
	name: 'Cola',
	price: 50,
	calories: 40
};
Drink.COFFEE = {
	name: 'Coffee',
	price: 80,
	calories: 20
};

/**
 *
 * Class, which objects describe drink's params.
 *
 * @param name Name of drink - 'Cola', 'Coffee'
 * @constructor
 */
function Drink(name) {
	switch (name) {
		case Drink.COLA.name:
			MenuItem.call(this, 'Drink', name, Drink.COLA.price, Drink.COLA.calories);
			break;
		case Drink.COFFEE.name:
			MenuItem.call(this, 'Drink', name, Drink.COFFEE.price, Drink.COFFEE.calories);
			break;
	}
}

Drink.prototype = Object.create(MenuItem.prototype);
Drink.prototype.constructor = Drink;


/* --- main entry point --- */
var order1 = new Order();
order1.getBill();
order1.deleteItem(1);
order1.addItem('cash').addItem('rules');
order1.getBill();
order1.payOrder();
//order1.addItem('q');
order1.showOrder();
order1.getBill();
order1.showOrderInfo();
// order1.addItem('q');
// order1.addItem('q');
// order1.showOrder();
// order1.getBill();
// console.log(Object.isFrozen(order1));
// order1.isPaid = false;
// console.log(order1.isPaid);
