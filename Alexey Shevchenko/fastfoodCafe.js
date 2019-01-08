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
 * Fast-food cafe module.
 * @module fastfoodcafe
 */

/**
 * Class MenuItem
 *
 * @constructor
 * @param type Type can be 'Drink', 'Hamburger' or 'Salad'
 * @param name
 * @param price
 * @param calories
 */
function MenuItem(type, name, price, calories) {
	this.type = type;
	this.name = name;
	this.price = price;
	this.calories = calories;
}

MenuItem.prototype.calculatePrice = function() {
	return this.price;
};

MenuItem.prototype.calculateCalories = function() {
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
	console.log('Your order:\n +');
	this.items.map(function (item) {
		console.log('* ' + item.name);
	});
};

/**
 * Add a dish item into the order.
 * @param item
 */
Order.prototype.addItem = function (item) {
	this.items.push(item);
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
	Object.freeze(this);
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
	this.showOrder();
	console.log('Total price: ' + this.calculateOrderPrice() + ' tugriks');
	console.log('The energy value: ' + this.calculateOrderCalories() + ' calories');
	console.log('-\nWaiting for the payment...');
};



/**
 * Class, which objects describe hamburger's params.
 *
 * @constructor
 * @param size        Size
 * @param stuffing    Stuffing
 */
function Hamburger(size, stuffing) {

	this.size = size;

}

Hamburger.prototype = Object.create(MenuItem.prototype);
Hamburger.prototype.constructor = Hamburger;

/* sizes, types of stuffings */
Hamburger.SIZE_SMALL = ...
Hamburger.SIZE_LARGE = ...
Hamburger.STUFFING_CHEESE = ...
Hamburger.STUFFING_SALAD = ...
Hamburger.STUFFING_POTATO = ...

/**
 * Get hamburger's size
 */
Hamburger.prototype.getSize = function () {
	return;
};

/**
 * Get hamburger's stuffing
 */
Hamburger.prototype.getStuffing = function () {

};

/**
 * Get hamburger's price
 * @return {Number} Prince in tugriks
 */
Hamburger.prototype.calculatePrice = function () {

};

/**
 * Get hamburger's calorie
 * @return {Number} Calorie in calories
 */
Hamburger.prototype.calculateCalories = function () {

};


/* CONST */
Drink.COLA = {
	type: 'Drink',
	name: 'Cola',
	price: 50,
	calories: 40
};
Drink.COFFEE = {
	type: 'Drink',
	name: 'Coffee',
	price: 80,
	calories: 20
};


/**
 * Class, which objects describe drink's params.
 *
 * @constructor
 */
function Drink(name) {
	switch(name) {
		case 'Cola':
			break;
		case '':
			break;
	}
	MenuItem.call(this, name, name);
	this.type = 'Drink';
}


Drink.prototype = Object.create(MenuItem.prototype);
Drink.prototype.constructor = Drink;

