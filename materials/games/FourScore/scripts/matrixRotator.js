"use strict";

const rotateMatrix45 = matrix => {
  const diagonalLength = matrix.length + matrix[0].length - 1;
  const rotatedMatrix = [];
  for (let i = 0; i < diagonalLength; ++i) {
    rotatedMatrix.push([]);
  }
  for (let j = 0; j < matrix[0].length; ++j) {
    for (let i = 0; i < matrix.length; ++i) {
      rotatedMatrix[i + j].push(matrix[i][j]);
    }
  }
  return rotatedMatrix;
};

const rotateMatrixNegative45 = matrix => {
  //reverse each inner array
  const newMatrix = reverseMatrix(matrix); 
  const rotatedMatrix = rotateMatrix45(newMatrix);
  return rotatedMatrix;
};

const reverseMatrix = matrix => {
  const newMatrix = [];
  matrix.forEach(row => {
    const newRow = Array.from(row);
    newRow.reverse();
    newMatrix.push(newRow);    
  });
  return newMatrix;
};

const printMatrix = matrix => {
  for (let i = 0; i < matrix.length; i++) {
    if (Array.isArray(matrix)[i]) {
      printMatrix(matrix[i]);
    } else {
      console.log(matrix[i]);
    }
  }
};

/* const rotateMatrix45 = matrix => {
  const newMatrix = new Array(matrix.length);
  for (let i = 0; i < matrix.length; i++) {
    const row = new Array(matrix.length);
    row.fill(null);
    newMatrix[i] = row;
  }
  console.log(newMatrix);

  // output main diagonal and above
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix.length; j++) {
      console.log(i,j);
    }
  }
  // output below main diagonal
  console.log('below');
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 0; j + 1 < matrix.length; j++) {
      if (j < i ) {
        console.log(j,i);
      }
    }
  }
}; */

let matrix2x2 = [
  [1,0],
  [0,1]];

/* 
  0,0 -> 0,1 : x+0, y+1
  0,1 -> 1,1 : x+1, y+0
  1,0 -> 0,0 : x-1, y-0
  1,1 -> 1,0 : x-0, y+1
*/

let matrix3x3 = [
  [1,0,0],
  [0,1,0],
  [0,0,1]];

/* 
// target
[0,1,0],
[0,1,0],
[0,1,0]
*/  

let matrix4x4 = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]];

/* 
  0,0 -> 0,1
  0,1 -> 0,2
  0,2 -> 1,2
  1,0 -> 0,0
  1,1 -> 1,1
  1,2 -> 2,2
  2,0 -> 1,0
  2,1 -> 2,0
  2,2 -> 2,1
*/



/* 

if col == row then we're on a main diagonal

[4,2] 
diff = Math.abs()

*/


/* 
const projectToMinY = (point, max) => {
  const newPoint = [...point];
  while (newPoint[0] < max && newPoint[1] > 0) {
    newPoint[0]++;
    newPoint[1]--;
  }
  return newPoint;
};

const projectToMaxY = (point,max) => {
  const newPoint = [...point];
  while (newPoint[0] < max && newPoint[1] < max) {
    newPoint[0]++;
    newPoint[1]++;
  }
  return newPoint;
}; 
*/