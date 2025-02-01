import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

const solveBoard = (r, c, grid, signs) => {
  if (r === grid.length)
    return true;
  else if (c === grid[0].length)
    return solveBoard(r + 1, 0, grid, signs);
  else if (grid[r][c].symbol)
    return solveBoard(r, c + 1, grid, signs);
  else {
    for (let i = 1; i < 3; i++) {
      if (valid(r, c, i, grid, signs)) {
        grid[r][c].symbol = i;

        if (solveBoard(r, c + 1, grid, signs))
          return true;          

        grid[r][c].symbol = 0;
      }
    }
  }
  return false;
}

// manually check we can but the value here
const valid = (r, c, value, grid, signs) => {
  // check for 3 consecutive symbols in row
  if (
    (c > 0 && c < grid[0].length - 1 && value === grid[r][c + 1].symbol && value === grid[r][c - 1].symbol) ||
    (c >= 2 && value === grid[r][c - 1].symbol && value === grid[r][c - 2].symbol) ||
    (c <= grid[0].length - 3 && value === grid[r][c + 1].symbol && value === grid[r][c + 2].symbol)
  )
    return false;
  // check for 3 consecutive symbols in col
  if (
    (r > 0 && r < grid.length - 1 && value === grid[r + 1][c].symbol && value === grid[r - 1][c].symbol) ||
    (r >= 2 && value === grid[r - 1][c].symbol && value === grid[r - 2][c].symbol) ||
    (r <= grid.length - 3 && value === grid[r + 1][c].symbol && value === grid[r + 2][c].symbol)
  )
    return false;
  // check less than 3 in row
  let inRow = 0;
  for (let row = 0; row < grid.length; row++) {
    if (grid[row][c].symbol === value)
      inRow++;

    if (inRow >= 3)
      return false;
  }
  // check less than 3 in col
  let inCol = 0;
  for (let col = 0; col < grid[0].length; col++) {
    if (grid[r][col].symbol === value)
      inCol++;

    if (inCol >= 3)
      return false;
  }
  // check if it adheres to all signage
  if (
    (signs[r][c].top === 1 && grid[r - 1][c].symbol && grid[r - 1][c].symbol !== value) ||
    (signs[r][c].top === 2 && grid[r - 1][c].symbol === value)
  )
    return false;

  if (
    (signs[r][c].bottom === 1 && grid[r + 1][c].symbol && grid[r + 1][c].symbol !== value) ||
    (signs[r][c].bottom === 2 && grid[r + 1][c].symbol === value)
  )
    return false;

  if (
    (signs[r][c].left === 1 && grid[r][c - 1].symbol && grid[r][c - 1].symbol !== value) ||
    (signs[r][c].left === 2 && grid[r][c - 1].symbol === value)
  )
    return false;

  if (
    (signs[r][c].right === 1 && grid[r][c + 1].symbol && grid[r][c + 1].symbol !== value) ||
    (signs[r][c].right === 2 && grid[r][c + 1].symbol === value)
  )
    return false;

  return true;
}

const cleanCoords = (coords) => {
  const coordsStr = new Set(coords.map(JSON.stringify));
  const cleaned = [];

  for (const coord of coordsStr)
    cleaned.push([parseInt(coord[1]), parseInt(coord[3])]);

  return cleaned;
}

const isSolveable = (grid, signs) => {  // SO MANY CASES!!!!
  let solveObj = {
    solveable: true,
    culprits: [],
  }
  // more than 3 in row check + account for equal symbols
  for (let r = 0; r < grid.length; r++) {
    let suns = [];
    let moons = [];
		for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c].symbol) {
        let symbolArr = grid[r][c].symbol === 1 ? suns : moons;
        symbolArr.push([r, c]);
        
        if (signs[r][c].left === 1 && grid[r][c - 1].symbol === 0)
          symbolArr.push([r, c - 1]);  

        if (signs[r][c].right === 1 && grid[r][c + 1].symbol === 0)
          symbolArr.push([r, c + 1]);
      }
    }
    if (suns.length > 3) {
      solveObj.solveable = false;
      solveObj.culprits = [...solveObj.culprits, ...suns];
    }
    if (moons.length > 3) {
      solveObj.solveable = false;
      solveObj.culprits = [...solveObj.culprits, ...moons];
    }
  }

  // more than 3 in col check
  for (let c = 0; c < signs.length; c++) {
    let suns = [];
    let moons = [];
		for (let r = 0; r < signs[0].length; r++) {
      if (grid[r][c].symbol) {
        let symbolArr = grid[r][c].symbol === 1 ? suns : moons;
        symbolArr.push([r, c]);
        
        if (signs[r][c].top === 1 && grid[r - 1][c].symbol === 0) // don't needs to bounds check!
          symbolArr.push([r - 1, c]);  

        if (signs[r][c].bottom === 1 && grid[r + 1][c].symbol === 0)
          symbolArr.push([r + 1, c]);
      }
    }
    if (suns.length > 3) {
      solveObj.solveable = false;
      solveObj.culprits = [...solveObj.culprits, ...suns];
    }
    if (moons.length > 3) {
      solveObj.solveable = false;
      solveObj.culprits = [...solveObj.culprits, ...moons];
    }
  }

	//2 = sign check
	for (let r = 0; r < signs.length; r++) {
		for (let c = 0; c < signs[0].length; c++) {
			if (
				c < signs[0].length - 2 &&
				signs[r][c].right === 1 &&
				signs[r][c + 1].right === 1
			) {
        solveObj.solveable = false;
        solveObj.culprits = [...solveObj.culprits, ...[[r, c], [r, c + 1], [r, c + 2]]];
      }

			if (
				r < signs[0].length - 2 &&
				signs[r][c].bottom === 1 &&
				signs[r + 1][c].bottom === 1
			) {
        solveObj.solveable = false;
        solveObj.culprits = [...solveObj.culprits, ...[[r, c], [r + 1, c], [r + 2, c]]];
      }
		}
	}

	// symbol check (3 in a row)
	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[0].length; c++) {
			if (
        grid[r][c].symbol &&
				grid[r][c].symbol === (r ? grid[r - 1][c].symbol : -1) &&
				grid[r][c].symbol === (r < grid.length - 1 ? grid[r + 1][c].symbol : -1)
			) {
        solveObj.solveable = false;
        solveObj.culprits = [...solveObj.culprits, ...[[r - 1, c], [r, c], [r + 1, c]]];
      }

			if (
        grid[r][c].symbol &&
				grid[r][c].symbol === (c ? grid[r][c - 1].symbol : -1) &&
				grid[r][c].symbol === (c < grid[0].length - 1 ? grid[r][c + 1].symbol : -1)
			) {
        solveObj.solveable = false;
        solveObj.culprits = [...solveObj.culprits, ...[[r, c - 1], [r, c], [r, c + 1]]];
      }
		}
	}

  // 2 symbol and 1 = sign check
  for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c].symbol) {
        if (
          (signs[r][c].top === 1 && 
            grid[r][c].symbol === (r < grid.length - 1 ? grid[r + 1][c].symbol : -1)) ||
          (signs[r][c].bottom === 1 && 
            grid[r][c].symbol === (r ? grid[r - 1][c].symbol : -1))
        ) {
          solveObj.solveable = false;
          solveObj.culprits = [...solveObj.culprits, ...[[r - 1, c], [r, c], [r + 1, c]]];
        }
        
        if (
          (signs[r][c].left === 1 && 
            grid[r][c].symbol === (c < grid[0].length - 1 ? grid[r][c + 1].symbol : -1)) ||
          (signs[r][c].right === 1 && 
            grid[r][c].symbol === (c ? grid[r][c - 1].symbol : -1))
        ) {
          solveObj.solveable = false;
          solveObj.culprits = [...solveObj.culprits, ...[[r, c - 1], [r, c], [r, c + 1]]];
        }
      } else {
        // case where middle square is empty and has equal sign on bottom or top
        if (
          (r && r < grid.length - 1) &&
          (signs[r][c].top === 1 || signs[r][c].bottom === 1) &&
          (grid[r - 1][c].symbol === grid[r + 1][c].symbol) &&
          (grid[r - 1][c].symbol)          
        ) {
          solveObj.solveable = false;
          solveObj.culprits = [...solveObj.culprits, ...[[r - 1, c], [r, c], [r + 1, c]]];
        }
        
        if (
          (c && c < grid[0].length - 1) &&
          (signs[r][c].left === 1 || signs[r][c].right === 1) &&
          (grid[r][c - 1].symbol === grid[r][c + 1].symbol) &&
          (grid[r][c - 1].symbol)          
        ) {
          solveObj.solveable = false;
          solveObj.culprits = [...solveObj.culprits, ...[[r, c - 1], [r, c], [r, c + 1]]];
        }
      }      
    }
  }

  // check to see if signs are being followed
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      // right neighbor
      if (signs[r][c].right && grid[r][c].symbol && grid[r][c + 1].symbol) {
        if (
          (signs[r][c].right === 1 && grid[r][c].symbol !== grid[r][c + 1].symbol) ||
          (signs[r][c].right === 2 && grid[r][c].symbol === grid[r][c + 1].symbol)
        ) {
          solveObj.solveable = false;
          solveObj.culprits = [...solveObj.culprits, ...[[r, c], [r, c + 1]]];
        }    
      }   
      // bottom neighbor
      if (signs[r][c].bottom && grid[r][c].symbol && grid[r + 1][c].symbol) {
        if (
          (signs[r][c].bottom === 1 && grid[r][c].symbol !== grid[r + 1][c].symbol) ||
          (signs[r][c].bottom === 2 && grid[r][c].symbol === grid[r + 1][c].symbol)
        ) {
          solveObj.solveable = false;
          solveObj.culprits = [...solveObj.culprits, ...[[r, c], [r + 1, c]]];
        }
      }
    }
  }
	return solveObj;
};

function SolveButton({ grid, setGrid, signs }) {
  const [canBeSolved, setCanBeSolved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const effectRef = useRef(false);

  useEffect(() => {
    if (effectRef.current) {
      effectRef.current = false;
      return; // Skip execution if the effect was triggered by itself
    }
    
    const { solveable, culprits } = isSolveable(grid, signs);
    setCanBeSolved(!solveable);
    const newGrid = grid.map((row) => [...row]);

    for (let r = 0; r < grid.length; r++) 
      for (let c = 0; c < grid[0].length; c++) 
        newGrid[r][c] = {...newGrid[r][c], error: false}

    if (!solveable) {
      const coords = cleanCoords(culprits);
      for (const coord of coords) {
        const [r, c] = coord;
        newGrid[r][c] = {...newGrid[r][c], error: true};
      }
    }

    effectRef.current = true; // Mark that the grid update is from this effect
    setGrid(newGrid);
  }, [grid, signs, setGrid]);

	const handleSolve = () => {
    let gridCopy = grid.map((row) => [...row]); // this will be mutated
    if (solveBoard(0, 0, gridCopy, signs))
      setGrid(gridCopy);
    else {
      setShowModal(true);
      console.log("somehow you inputted an unsolveable board");
      console.table(grid.map(row => row.map(obj => obj.symbol)));
    }
	};

	return (
    <div>
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal}/>}
      <button
        onClick={handleSolve}
        className="inline-flex h-16 items-center justify-center rounded-md bg-neutral-950 px-8 font-semibold text-xl text-neutral-50 shadow-xl shadow-neutral-500/20 transition active:scale-95 mt-6"
        disabled={canBeSolved}
      >
        Solve
      </button>
    </div>
	);
}

export default SolveButton;