var Game = {
  marks: ["X", "O"],

  create: function() {
    var game = Object.create(Game);
    game.initialize();
    return game
  }

  initialize: function() {
    this.players: []
  },

  start: function() {
    this.createPlayers();
    this.createBoard();
  },

  createPlayers: function() {
    this.marks.forEach(function(mark) {
      var player = Player.create(mark);
      player.game = this;
      this.players.push(player);
    });
  },

  createBoard: function() {
    var board = Board.create();
    board.game = this;
  },

  currentPlayer: function() {
    this.players[0];
  },

  hasWinner: function() {
    // some code to determine the winner
  }
}

var Player = {
  create: function(mark) {
    var player = Object.create(Player);
    player.initialize(mark);
    return player;
  },

  initialize: function(mark) {
    this.mark = mark;
  },

  markSpace: function(space) {
    space.markedBy = this;
  }
}

var Board = {
  create: function() {
    var board = Object.create(Board);
    board.initialize();
    return board;
  },

  initialize: function() {
    this.spaces = [];
    this.createSpaces();
  },

  createSpaces: function() {
    for (var x=0; x<=2; x++) {
      for (var y=0; y<=2; y++) {
        var space = Space.create(x, y);
        space.board = this;
        this.spaces.push(space);
      }
    }
  }
}

var Space = {
  create: function(x, y) {
    var space = Object.create(Space);
    space.initialize(x, y);
    return space;
  },

  initialize: function(x, y) {
    this.x_coord = x;
    this.y_coord = y;
  }
}

$(function() {
  var newGame = Game.create();
  newGame.start();
  newGame.board.spaces.forEach(function(space) {
    // render some html for the space
    // bind click event for marking this space
    $(this).on('click', function() {
      space.markBy(newGame.currentPlayer());
      if (newGame.hasWinner()) {
        alert("Winner!")
      } else {
        newGame.nextTurn();
      }
    });
  });
});
