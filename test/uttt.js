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

	grid.on('win', function(winner, name) {
		t.equal(this, grid, 'event has valid this');
		t.equal(winner, uttt.X, 'event cross win');
		t.equal(name, 'test', 'event name');
	});

	// x |   | o
	//   | x | o
	//   |   | x
	grid.A0 = uttt.X;
	t.equal(grid.valueOf(), null, 'no win');
	grid.A2 = uttt.O;
	t.equal(grid.valueOf(), null, 'no win');
	grid.B1 = uttt.X;
	t.equal(grid.valueOf(), null, 'no win');
	grid.B2 = uttt.O;
	t.equal(grid.valueOf(), null, 'no win');
	grid.C2 = uttt.X;
	t.equal(grid.valueOf(), uttt.X, 'cross win');

	t.end();
});

test('uttt.createBoard', t => {
	var board = uttt.createBoard();

	t.equal(board.name, 'board', 'name');
	t.equal(board.valueOf(), null, 'no plays');
	t.equal(board.toString(), '', 'no plays');

	t.ok('A0' in board, 'upper left');
	t.ok('A1' in board, 'upper center');
	t.ok('A2' in board, 'upper right');

	t.ok('B0' in board, 'middle left');
	t.ok('B1' in board, 'middle center');
	t.ok('B2' in board, 'middle right');

	t.ok('C0' in board, 'lower left');
	t.ok('C1' in board, 'lower center');
	t.ok('C2' in board, 'lower right');

	t.ok('A0' in board.A0, 'upper left of inner grid A0');
	t.ok('A1' in board.A0, 'upper center of inner grid A0');
	t.ok('A2' in board.A0, 'upper right of inner grid A0');

	t.ok('B0' in board.A0, 'middle left of inner grid A0');
	t.ok('B1' in board.A0, 'middle center of inner grid A0');
	t.ok('B2' in board.A0, 'middle right of inner grid A0');

	t.ok('C0' in board.A0, 'lower left of inner grid A0');
	t.ok('C1' in board.A0, 'lower center of inner grid A0');
	t.ok('C2' in board.A0, 'lower right of inner grid A0');

	board.once('win', winner => {
		t.equal(winner, uttt.X, 'win event');
	});

	// board
	// x | o |
	// x | x | o
	// o |   | x

	// A0 grid
	// x | o |
	// x | o |
	// x |   |
	board.A0.A0 = uttt.X;
	board.A0.A1 = uttt.O;
	board.A0.B0 = uttt.X;
	board.A0.B1 = uttt.O;
	board.A0.C0 = uttt.X;
	t.equal(board.A0.toString(), uttt.X, 'A0 cross win');
	t.equal(board.toString(), '', 'no win');

	// A1 grid
	// x | x | o
	//   | o |
	// o |   |
	board.A1.C0 = uttt.O;
	board.A1.A0 = uttt.X;
	board.A1.B1 = uttt.O;
	board.A1.A1 = uttt.X;
	board.A1.A2 = uttt.O;
	t.equal(board.A1.toString(), uttt.O, 'A1 circle win');
	t.equal(board.toString(), '', 'no win');

	// B0 grid
	//   |   | o
	//   |   | o
	// x | x | x
	board.B0.C0 = uttt.X;
	board.B0.A2 = uttt.O;
	board.B0.C1 = uttt.X;
	board.B0.B2 = uttt.O;
	board.B0.C2 = uttt.X;
	t.equal(board.B0.toString(), uttt.X, 'B0 cross win');
	t.equal(board.toString(), '', 'no win');

	// C0 grid
	// x | o |
	//   | o |
	// x | o |
	board.C0.A1 = uttt.O;
	board.C0.A0 = uttt.X;
	board.C0.B1 = uttt.O;
	board.C0.C0 = uttt.X;
	board.C0.C1 = uttt.O;
	t.equal(board.C0.toString(), uttt.O, 'C0 circle win');
	t.equal(board.toString(), '', 'no win');

	// B1 grid
	// o |   | x
	//   |   | x
	// o |   | x
	board.B1.A2 = uttt.X;
	board.B1.A0 = uttt.O;
	board.B1.B2 = uttt.X;
	board.B1.C0 = uttt.O;
	board.B1.C2 = uttt.X;
	t.equal(board.B1.toString(), uttt.X, 'B1 cross win');
	t.equal(board.toString(), '', 'no win');

	// B2 grid
	// x |   | x
	// o | o | o
	//   |   |
	board.B2.B0 = uttt.O;
	board.B2.A0 = uttt.X;
	board.B2.B1 = uttt.O;
	board.B2.A2 = uttt.X;
	board.B2.B2 = uttt.O;
	t.equal(board.B2.toString(), uttt.O, 'B2 circle win');
	t.equal(board.toString(), '', 'no win');

	// C2 grid
	// x | x | x
	//   |   |
	// o |   | o
	board.C2.A0 = uttt.X;
	board.C2.C2 = uttt.O;
	board.C2.A1 = uttt.X;
	board.C2.C0 = uttt.O;
	board.C2.A2 = uttt.X;
	t.equal(board.C2.toString(), uttt.X, 'C2 cross win');
	t.equal(board.toString(), uttt.X, 'cross win');

	t.end();
});
