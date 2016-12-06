var debug = require('debug')('uttt:game');
var EventEmitter = require('events');
var util = require('util');
var X = exports.X = Grid.X = 'x';
var O = exports.O = Grid.O = 'o';

exports.createBoard = createBoard;
exports.Grid = Grid;

function createBoard() {
	debug('creating board');

	var board = new Grid('board');
	var update = () => board.valueOf();

	board.A0 = new Grid('A0');
	board.A1 = new Grid('A1');
	board.A2 = new Grid('A2');
	board.A0.on('win', update);
	board.A1.on('win', update);
	board.A2.on('win', update);

	board.B0 = new Grid('B0');
	board.B1 = new Grid('B1');
	board.B2 = new Grid('B2');
	board.B0.on('win', update);
	board.B1.on('win', update);
	board.B2.on('win', update);

	board.C0 = new Grid('C0');
	board.C1 = new Grid('C1');
	board.C2 = new Grid('C2');
	board.C0.on('win', update);
	board.C1.on('win', update);
	board.C2.on('win', update);

	return board;
}

function Grid(name) {
	debug('creating grid: ' + JSON.stringify(name));

	EventEmitter.call(this);

	this.name = name;

	Object.defineProperties(this, {
		'_grid': {
			configurable: true,
			enumerable: false,
			value: {
				'A': new Array(3),
				'B': new Array(3),
				'C': new Array(3)
			},
			writable: false
		},
		'_value': {
			configurable: true,
			enumerable: false,
			value: null,
			writable: false
		}
	});

	Object.modifyProperty(this._grid.A, 'length', {writable: false});
	Object.modifyProperty(this._grid.B, 'length', {writable: false});
	Object.modifyProperty(this._grid.C, 'length', {writable: false});
}

util.inherits(Grid, EventEmitter);

Object.defineProperties(Grid.prototype, {
	'A0': {
		configurable: true,
		enumerable: true,
		get: function() {
			return this._grid.A[0];
		},
		set: function(value) {
			this._grid.A[0] = value;
			this.valueOf();
		}
	},
	'A1': {
		configurable: true,
		enumerable: true,
		get: function() {
			return this._grid.A[1];
		},
		set: function(value) {
			this._grid.A[1] = value;
			this.valueOf();
		}
	},
	'A2': {
		configurable: true,
		enumerable: true,
		get: function() {
			return this._grid.A[2];
		},
		set: function(value) {
			this._grid.A[2] = value;
			this.valueOf();
		}
	},
	'B0': {
		configurable: true,
		enumerable: true,
		get: function() {
			return this._grid.B[0];
		},
		set: function(value) {
			this._grid.B[0] = value;
			this.valueOf();
		}
	},
	'B1': {
		configurable: true,
		enumerable: true,
		get: function() {
			return this._grid.B[1];
		},
		set: function(value) {
			this._grid.B[1] = value;
			this.valueOf();
		}
	},
	'B2': {
		configurable: true,
		enumerable: true,
		get: function() {
			return this._grid.B[2];
		},
		set: function(value) {
			this._grid.B[2] = value;
			this.valueOf();
		}
	},
	'C0': {
		configurable: true,
		enumerable: true,
		get: function() {
			return this._grid.C[0];
		},
		set: function(value) {
			this._grid.C[0] = value;
			this.valueOf();
		}
	},
	'C1': {
		configurable: true,
		enumerable: true,
		get: function() {
			return this._grid.C[1];
		},
		set: function(value) {
			this._grid.C[1] = value;
			this.valueOf();
		}
	},
	'C2': {
		configurable: true,
		enumerable: true,
		get: function() {
			return this._grid.C[2];
		},
		set: function(value) {
			this._grid.C[2] = value;
			this.valueOf();
		}
	}
});

Grid.prototype.valueOf = function() {
	if (this._value) return this._value;

	var win;
	var xRow = [X, X, X].toString();
	var oRow = [O, O, O].toString();
	var keys = Object.keys(this._grid);
	var complete = [
		// rows
		/* A0, A1, A2 */ this._grid.A,
		/* B0, B1, B2 */ this._grid.B,
		/* C0, C1, C2 */ this._grid.C,
		// columns
		/* A0, B0, C0 */ keys.map(k => this._grid[k][0]),
		/* A1, B1, C1 */ keys.map(k => this._grid[k][1]),
		/* A2, B2, C2 */ keys.map(k => this._grid[k][2]),
		// diagonals
		/* A0, B1, C2 */ keys.map((k, i) => this._grid[k][i]),
		/* A2, B1, C0 */ keys.map((k, i) => this._grid[k][2 - i])
	].filter(possible => possible == xRow || possible == oRow);

	if (complete.length === 1) {
		win = complete[0] == xRow ? X : O;
		Object.modifyProperty(this, '_value', {value: win});
		this.emit('win', win, this.name);
	} else if (complete.length > 1) {
		throw new Error('Grid: unexpected number of wins');
	}

	return this._value;
};

Grid.prototype.toString = function() {
	return this._value || '';
};

Object.modifyProperty = function(obj, name, descriptor) {
	var original = Object.getOwnPropertyDescriptor(obj, name);
	var modified = Object.assign({}, original, descriptor);

	return Object.defineProperty(obj, name, modified);
};
