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
 * Shows ordered items.
 */
Order.prototype.showOrder = function () {
	if (this.items.length) {
		console.log('Order:');
		this.items.map(function (item) {
			if (item instanceof Drink) {
				console.log('* ' + item.name + ' (' + item.calculatePrice() + '₮, ' + item.calculateCalories() + 'cal.)');
			}
			else if (item instanceof Salad) {
				console.log('* ' + item.name + ' ' + item.type.toLowerCase() +
					' (' + item.calculatePrice() + '₮, ' + item.calculateCalories() + 'cal., ' + item.weight + 'gr.)');
			}
			else if (item instanceof Hamburger) {
				console.log('* ' + item.size + ' ' + item.name.toLowerCase() +
					' with ' + item.stuffing.name.toLowerCase() + ' (' + item.price + '₮ + ' + item.stuffing.calculatePrice() + '₮, ' + item.calories + 'cal. + ' + item.stuffing.calculateCalories() + ' cal.)');
			}
			else {
				console.log('* ' + item.name + ' (' + item.calculatePrice() + ' ₮,' + item.calculateCalories() + ' cal.)');
			}
		});
	}
	else {
		console.log('\nOrder is empty!');
	}
};

/**
 * Adds a dish item into the order (uses chaining).
 * @param item
 */
Order.prototype.addItem = function (item) {
	if (this.isPaid) {
		console.log('\n[Error]: Can not add items to a closed order!');
	}
	else {
		this.items.push(item);
		console.log('\nAdded ' + '\'' + item.name + '\' to an order.');
	}
	return this;
};

/**
 * Deletes a dish item from the order.
 * @param item
 */
Order.prototype.deleteItem = function (item) {
	if (this.isPaid) {
		console.log('\n[Error]: Can not delete items from a closed order!');
	}
	else {
		var idx = this.items.indexOf(item);
		if (idx === -1) {
			console.log('\n[Error]: There is no presented item or your order is empty!');
		}
		else {
			this.items.splice(idx, 1);
			console.log('\nThe ' + '\"' + item.name + '\" has been deleted');
		}
	}
};

/**
 * Pay for an order and freeze the {Order}.
 */
Order.prototype.payOrder = function () {
	this.isPaid = true;
	deepFreeze(this);
	console.log('Order was successfully payed and closed!');
};

/**
 * Calculates total price for an order.
 * @returns {number} Total order price
 */
Order.prototype.calculateOrderPrice = function () {
	var price = 0;
	this.items.map(function (item) {
		price += item.calculatePrice();
	});
	this.totalPrice = price;
	return this.totalPrice;
};

/**
 * Calculates total calories for an order.
 * @returns {number} Total order calories
 */
Order.prototype.calculateOrderCalories = function () {
	var calories = 0;
	this.items.map(function (item) {
		calories += item.calculateCalories();
	});
	this.totalCalories = calories;
	return this.totalCalories;
};

/**
 * Calculates total price&calories and shows final result before payment.
 */
Order.prototype.getBill = function () {
	if (this.isPaid) {
		console.log('\n[Error]: This order was payed earlier!');
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

/**
 * Shows main information about Order: status, items, price, calories.
 */
Order.prototype.showOrderInfo = function () {
	console.log('\n*** Order information ***');
	if (this.isPaid) {
		console.log('Status: \'PAYED\'');
		this.showOrder();
		console.log('Total price: ' + this.totalPrice + ' tugriks\n' +
			'Total energy value: ' + this.totalCalories + ' calories');
	}
	else {
		console.log('Status: \'NOT PAYED\'');
		this.showOrder();
	}
};

///////////////////////////////////////

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

///////////////////////////////////////

/* constants of Caesar, Russian for class Salad */
Salad.CAESAR = {
	name: 'Caesar',
	price: 100,
	calories: 20
};
Salad.RUSSIAN = {
	name: 'Russian',
	price: 50,
	calories: 80
};

/**
 * Class, which objects describe salad's params.
 *
 * @param name Name of the salad - 'Caesar', 'Russian'
 * @param weight Weight of the salad
 * @constructor
 */
function Salad(name, weight) {
	switch (name) {
		case Salad.CAESAR.name:
			MenuItem.call(this, 'Salad', name, Salad.CAESAR.price, Salad.CAESAR.calories);
			break;
		case Salad.RUSSIAN.name:
			MenuItem.call(this, 'Salad', name, Salad.RUSSIAN.price, Salad.RUSSIAN.calories);
			break;
	}
	this.weight = weight;
}

Salad.prototype = Object.create(MenuItem.prototype);
Salad.prototype.constructor = Salad;

Salad.prototype.calculatePrice = function () {
	return this.price * this.weight / 100;
};

Salad.prototype.calculateCalories = function () {
	return this.calories * this.weight / 100;
};

///////////////////////////////////////
/* sizes and types of stuffings as constants for class Hamburger */
Hamburger.SIZE_SMALL = {
	size: 'Small',
	name: 'Hamburger',
	price: 50,
	calories: 20
};
Hamburger.SIZE_LARGE = {
	size: 'Large',
	name: 'Hamburger',
	price: 100,
	calories: 40
};
Hamburger.STUFFING_CHEESE = {
	name: 'Cheese',
	price: 10,
	calories: 20
};
Hamburger.STUFFING_SALAD = {
	name: 'Salad',
	price: 20,
	calories: 5
};
Hamburger.STUFFING_POTATO = {
	name: 'Potato',
	price: 15,
	calories: 10
};

/**
 * Class, which objects describe hamburger's params.
 *
 * @constructor
 * @param size        Size string 'Small' or 'Large'
 * @param stuffing    Stuffing string
 */
function Hamburger(size, stuffing) {
	// Inheritance for Hamburger
	switch (size) {
		case Hamburger.SIZE_SMALL.size:
			MenuItem.call(this, Hamburger.SIZE_SMALL.name, Hamburger.SIZE_SMALL.name,
				Hamburger.SIZE_SMALL.price, Hamburger.SIZE_SMALL.calories);
			break;
		case Hamburger.SIZE_LARGE.size:
			MenuItem.call(this, Hamburger.SIZE_LARGE.name, Hamburger.SIZE_LARGE.name,
				Hamburger.SIZE_LARGE.price, Hamburger.SIZE_LARGE.calories);
			break;
	}
// Make field stuffing as a part of MenuItem
	switch (stuffing) {
		case Hamburger.STUFFING_CHEESE.name:
			this.stuffing = new MenuItem('Stuffing', Hamburger.STUFFING_CHEESE.name,
				Hamburger.STUFFING_CHEESE.price, Hamburger.STUFFING_CHEESE.calories);
			break;
		case Hamburger.STUFFING_SALAD.name:
			this.stuffing = new MenuItem('Stuffing', Hamburger.STUFFING_SALAD.name,
				Hamburger.STUFFING_SALAD.price, Hamburger.STUFFING_SALAD.calories);
			break;
		case Hamburger.STUFFING_POTATO.name:
			this.stuffing = new MenuItem('Stuffing', Hamburger.STUFFING_POTATO.name,
				Hamburger.STUFFING_POTATO.price, Hamburger.STUFFING_POTATO.calories);
			break;
	}
	this.size = size;
}

Hamburger.prototype = Object.create(MenuItem.prototype);
Hamburger.prototype.constructor = Hamburger;

/**
 * Get hamburger's size
 */
Hamburger.prototype.getSize = function () {
	return this.size;
};

/**
 * Get hamburger's stuffing
 */
Hamburger.prototype.getStuffing = function () {
	return this.stuffing;
};

/**
 * Get hamburger's price
 * @return {Number} Price in tugriks
 */
Hamburger.prototype.calculatePrice = function () {
	return this.price + this.stuffing.calculatePrice();
};

/**
 * Get hamburger's calorie
 * @return {Number} Calorie in calories
 */
Hamburger.prototype.calculateCalories = function () {
	return this.calories + this.stuffing.calculateCalories();
};

/* --- main entry point --- */
var order1 = new Order();
var cola = new Drink(Drink.COLA.name);
order1.getBill();
order1.deleteItem(cola);
order1.addItem({
	size: 'small', name: 'StrangeFood', b: 5, price: 100, calories: 2000, calculatePrice: function () {
		return this.price;
	}, calculateCalories: function () {
		return this.calories;
	}
});
console.log();
order1.getBill();
console.log();
order1.showOrder();
order1.addItem(cola);
console.log();
order1.getBill();
order1.showOrderInfo();
order1.payOrder();
order1.deleteItem(cola);
console.log();
order1.showOrder();
order1.getBill();
order1.showOrderInfo();
order1.addItem(cola);
order1.getBill();

console.log('\n--- Testing order2 ---\n');

var russian = new Salad(Salad.RUSSIAN.name, 150);
var order2 = new Order(cola, russian);
order2.getBill();
var bigBurger = new Hamburger(Hamburger.SIZE_LARGE.size, Hamburger.STUFFING_CHEESE.name);
order2.addItem(bigBurger);
order2.getBill();
order2.deleteItem(cola);
order2.showOrderInfo();
order2.getBill();
order2.payOrder();
order2.testProperty = 'test';
console.log(order2);