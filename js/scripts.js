var Game = {
  marks: ["X", "O"],

  create: function() {
    var game = Object.create(Game);
    game.initialize();
    return game
  },

  initialize: function() {
    this.players = [];
  },

  start: function() {
    this.createPlayers();
    this.createBoard();
  },

  createPlayers: function() {
    game = this;
    this.marks.forEach(function(mark) {
      var player = Player.create(mark);
      player.game = this;
      game.players.push(player);
    });
  },

  createBoard: function() {
    this.board = Board.create();
    this.board.game = this;
  },

  currentPlayer: function() {
    return this.players[0];
  },

  hasWinner: function() {
    // some code to determine the winner
    return false;
  },

  nextTurn: function() {
    var nextPlayer = this.players.pop();
    this.players.unshift(nextPlayer);
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
    this.assignWinningGroups()
  },

  createSpaces: function() {
    for (var x=0; x<=2; x++) {
      for (var y=0; y<=2; y++) {
        var space = Space.create(x, y);
        space.board = this;
        this.spaces.push(space);
      }
    }
  },

  assignWinningGroups: function() {
    this.column0 =
    this.column1 =
    this.column2 = 
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
    this.markedBy = null;
  }
}

$(function() {
  var newGame = Game.create();
  newGame.start();

  $(".square").each(function(index) {
    console.log("looping over square #" + String(index));
    $(this).on('click', function() {
      space = newGame.board.spaces[index];
      newGame.currentPlayer().markSpace(space);
      $(this).children(".content").text(space.markedBy.mark);
      if (newGame.hasWinner()) {
        alert("Winner!")
      } else {
        newGame.nextTurn();
      }
    });
  });
});
