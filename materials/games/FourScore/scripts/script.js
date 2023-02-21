'use strict';

const game = {
  players: [
    {
      name: 'Josh',
    },
    {
      name: 'Han',
    },
  ],
  currentPlayer: 0,
  tiles: [],
  setup() {
    $('.column').on('click', e => {
      const column = e.target;
      console.log(column);
      const columnId = $(column).data('column');
      console.log('col:', columnId);
      const rowId = $(column).children().length;
      console.log('row:', rowId);
      const tileDiv = `<div class="tile 
        player-${game.currentPlayer}" 
        data-col="${columnId}"
        data-row="${rowId}"></div>`;
      //console.log(tileDiv);
      $(column).append(tileDiv);
      game.tiles[columnId][rowId] = game.currentPlayer;
      game.checkForWin(columnId, rowId);
      game.currentPlayer = (game.currentPlayer + 1) % 2;
    });
    // initialize an empty 2-dimensional Array filled with nulls
    for (let i = 0; i < 7; i++) {
      const rows = new Array(7);
      rows.fill(null);
      game.tiles[i] = rows;
    }
  },
  checkForWin(col, row) {
    // console.log(game.tiles);
    // console.log('win check. player:',game.currentPlayer,'from:', col, row);
    const tileCount = $('.tile').length;
    if (tileCount >= 7) {
      // min number of tiles for a horizontal or vertical win
      //check column, passing the current column
      this.checkColumn(col);
      //check row, passing the current row
      this.checkRow(row);
    }
    if (tileCount >= 10) {
      //check diagonal, passing both col and row
      this.checkDiagonal(col, row);
    }
  },
  checkColumn(col) {
    console.log('col check', game.currentPlayer, col);
    // first, check if the player has 4 tiles in this column
    const playerTiles = $(`.tile[data-col="${col}"]`).filter(
      `.player-${game.currentPlayer}`
    );
    //console.log(playerTiles);
    // no win possible if player has less than 4 in this column, so return false
    if (playerTiles.length < 4) {
      return false;
    } else {
      // if they do have 4 tiles, loop through the rows and update a counter for each subsequent tile that the player owns.  as soon as the counter reaches 4, they've won
      let contiguousTiles = 0;
      for (let i = 0; i < 7; i++) {
        if (game.tiles[col][i] === game.currentPlayer) {
          contiguousTiles++;
          if (contiguousTiles === 4) {
            console.log(`Player ${game.currentPlayer} wins!`);
            return true;
          }
        } else {
          contiguousTiles = 0;
        }
      }
    }
  },
  checkRow(row) {
    console.log('row check', game.currentPlayer, row);
    //same as col, but now the row index remains the same and we iterate column from 0 through 6
    const playerTiles = $(`.tile[data-row="${row}"]`).filter(
      `.player-${game.currentPlayer}`
    );
    if (playerTiles.length < 4) {
      return false;
    } else {
      let contiguousTiles = 0;
      for (let i = 0; i < 7; i++) {
        if (game.tiles[i][row] === game.currentPlayer) {
          contiguousTiles++;
          if (contiguousTiles === 4) {
            console.log(`Player ${game.currentPlayer} wins!`);
            console.log(`reverse through columms from ${i} in row ${row}`);
            return true;
          }
        } else {
          contiguousTiles = 0;
        }
      }
    }
  },
  checkDiagonal(col, row) {
    // this will be the tricky one
    // however, starting from the position that the tile was just added there are only 2 diagonals that need to be checked...
    console.log(
      'diagonal check',
      'player:',
      game.currentPlayer,
      'col:',
      col,
      'row:',
      row
    );
    const minY = utils.projectToMinY([col, row], this.tiles.length - 1);
    console.log('minY', minY);
    let contiguousTiles = 0;
    while (minY[0] >= 0 && minY[1] <= this.tiles.length - 1) {
      if (this.tiles[minY[0]][minY[1]] == game.currentPlayer) {
        contiguousTiles++;
        if (contiguousTiles === 4) {
          console.log(
            `Player ${game.currentPlayer} wins with a downward diagonal!`
          );
          return true;
        }
      } else {
        contiguousTiles = 0;
      }
      minY[0] -= 1;
      minY[1] += 1;
    }

    const maxY = utils.projectToMaxY([col, row], this.tiles.length - 1);
    console.log('maxY', maxY);
    contiguousTiles = 0;
    while (maxY[0] >= 0 && maxY[1] >= 0) {
      if (this.tiles[maxY[0]][maxY[1]] == game.currentPlayer) {
        contiguousTiles++;
        if (contiguousTiles === 4) {
          console.log(
            `Player ${game.currentPlayer} wins with an upward diagonal!!`
          );
          return true;
        }
      } else {
        contiguousTiles = 0;
      }
      maxY[0] -= 1;
      maxY[1] -= 1;
    }
  },
};

const utils = {
  projectToMinY: (point, max) => {
    const newPoint = [...point];
    while (newPoint[0] < max && newPoint[1] > 0) {
      newPoint[0]++;
      newPoint[1]--;
    }
    return newPoint;
  },
  projectToMaxY: (point, max) => {
    const newPoint = [...point];
    while (newPoint[0] < max && newPoint[1] < max) {
      newPoint[0]++;
      newPoint[1]++;
    }
    return newPoint;
  },
};

$(game.setup());

/* 
// in a square grid with dimensions n we can find the number of possible contiguous diagonals of length m:
let calcPossibilities = (n, m) => {
    let totalPossibilities = 0;
    if (n < m) {
        return 0;
    } else if (n === m) {
        return 2;
    } else {
        let centered = 2 * (n - m + 1);
        console.log('cenetered',centered);
        let offCenter = 0;
        for (let i = (centered / 2) - 1; i > 0; i--) {
            offCenter += i;
            console.log('off',i,offCenter);
        }
        return centered + (4 * offCenter);
    }
}

// after doing it the hard way above... I started plugging in numbers:
// if the grid is equal to the target length the number of possibilities is 2
// if the grid is 1 wider than the target length the number of possibilities is 8
// if the grid is 2 wider than the target length the number of possibilities is 18
// if the grid is 3 wider than the target length the number of possibilities is 32...

// math brain go!
2 x (1 squared)  = 2
2 x (2 squared)  = 8
2 x (3 squared)  = 18

let calcPossibilities = (n, m) => {
    let totalPossibilities = 0;
    if (n < m) {
        return 0;
    } else {
      return 2*(n - m + 1 )**2
    }
}
*/

/* 
// (Top Left -> Bottom Right)
// x increases, y increases

// centered 
[
  [0,0],[1,1],[2,2],[3,3],
  [1,1],[2,2],[3,3],[4,4],
  [2,2],[3,3],[4,4],[5,5]
]

// offcenter above 
[
  [1,0],[2,1],[3,2],[4,3],
  [2,0],[3,1],[4,2],[5,3],
  [2,1],[3,2],[4,3],[5,4]
  
]

// offcenter below 
[
  [0,1],[1,2],[2,3],[3,4],
  [0,2],[1,3],[2,4],[3,5],
  [1,2],[2,3],[3,4],[4,5]
  
]

// (Bottom Left -> Top Right)
// x increases, y decreases
//centered 
[
  [0,5],[1,4],[2,3],[3,2],
  [1,4],[2,3],[3,2],[4,1],
  [2,3],[3,2],[4,1],[5,0]
]

// offcenter above 
[
  [0,4],[1,3],[2,2],[3,1],
  [0,3],[1,2],[2,1],[3,0],
  [1,3],[2,2],[3,1],[4,0]
]

// offcenter below 
[
  [1,5],[2,4],[3,3],[4,2],
  [2,4],[3,3],[4,2],[5,1]
  [2,5],[3,4],[4,3],[5,2]
]



*/
