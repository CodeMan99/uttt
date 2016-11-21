var test = require('tape');
var uttt = require('../uttt.js');

test('uttt', t => {
	t.equal(uttt.X, 'x', 'cross piece');
	t.equal(uttt.O, 'o', 'circle piece');
	t.equal(uttt.Grid.X, 'x', 'cross piece');
	t.equal(uttt.Grid.O, 'o', 'circle piece');

	t.end();
});

test('uttt.Grid', t => {
	var grid = new uttt.Grid('test');

	t.equal(grid.name, 'test', 'name');
	t.equal(grid.valueOf(), null, 'no plays');
	t.equal(grid.toString(), '', 'no plays');

	t.ok('A0' in grid, 'upper left');
	t.ok('A1' in grid, 'upper center');
	t.ok('A2' in grid, 'upper right');

	t.ok('B0' in grid, 'middle left');
	t.ok('B1' in grid, 'middle center');
	t.ok('B2' in grid, 'middle right');

	t.ok('C0' in grid, 'lower left');
	t.ok('C1' in grid, 'lower center');
	t.ok('C2' in grid, 'lower right');

	t.end();
});

test('uttt.createBoard', t => {
	var board = uttt.createBoard();

	t.equal(board.name, 'board', 'name');
	t.equal(board.valueOf(), null, 'no plays');
	t.equal(board.toString(), '', 'no plays');

	t.end();
});
