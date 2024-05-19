function knightTravails (origin, dest) {
  const isInReach = (pt1, pt2) => {
    //check if pt2 is in reach for pt1
    //[2,5], [0,6]
    const possibleMoves = [
      [1,2], [1,-2], [-1,2], [-1,-2], [2,1], [2,-1], [-2,1], [-2,-1] 
    ];
    for (const move of possibleMoves) {
      if (pt1[0] + move[0] === pt2[0] && pt1[1] + move[1] === pt2[1]) {
        return true;
      }
    }
    //there is no reach
    return false;
  }
  const getNeighbours = (pt) => {
    const possibleMoves = [
      [1,2], [1,-2], [-1,2], [-1,-2], [2,1], [2,-1], [-2,1], [-2,-1] 
    ];
    const neighbours = [];
    for (move of possibleMoves) {
      const possibleNeighb = [pt[0] + move[0], pt[1]+move[1]];
      if (possibleNeighb[0] <= 7 && possibleNeighb[0] >=0 &&
         possibleNeighb[1] <=7 && possibleNeighb[1] >=0) {
        neighbours.push(possibleNeighb);
      }
    }
    return neighbours;
  }
  function checkIfPointIsOccupied (pt) {
    const row = pt[0];
    if (occupiedPoints[row] && occupiedPoints[row].indexOf(pt[1]) != -1) {
        return true;
    } else {
        return false;
    }
  }
  const relativePts = [];
  const solutionMoves = [];
  const occupiedPoints = [];
  //occupiedPoints is like [  [0,1,2,3] , [3,4,7]  ] first index defines row
  if (!occupiedPoints[dest[0]]) occupiedPoints[dest[0]] = [];
  occupiedPoints[dest[0]].push(dest[1]);
//   const destNeigh = getNeighbours(dest);
  relativePts.push([
    {
      loc: dest,
      lastLoc: null
    }
  ]);
  let levelIndex = 0;
  let solution;
  while (true) {
    relativePts.push([]);
    let pointIndex = 0;
    for (point of relativePts[levelIndex]) {
      if (isInReach(point.loc, origin)) {
        solution = [levelIndex, pointIndex];
        break;
      }
      let neighbours = getNeighbours(point.loc);
      for (neigh of neighbours) {
        if (!checkIfPointIsOccupied(neigh)) {
            relativePts[levelIndex + 1].push (
                {
                    lastLoc: [levelIndex, pointIndex], 
                    loc: neigh
                }
            );
            // console.log(relativePts);
            if (!occupiedPoints[neigh[0]]) occupiedPoints[neigh[0]] = [];
            occupiedPoints[neigh[0]].push(neigh[1]);
        }
      }
      pointIndex ++;
    }
    if (solution) {
        // console.log(relativePts);
        break;
    }
    levelIndex ++;
  }
//   console.log(occupiedPoints);
//   console.log(solution);
  let nowLoc = solution;
  solutionMoves.push(origin);
  while (true) {
    let nowMove = relativePts[nowLoc[0]][nowLoc[1]];
    // console.log(nowMove);
    solutionMoves.push(nowMove.loc);
    if (nowLoc[0] !== 0) {
        nowLoc = nowMove.lastLoc;
    } else {
        break;
    }
  }
  //to show in console
  console.log(`=> You made it in ${solutionMoves.length-1} moves!  Here's your path:`);
  for (move of solutionMoves) {
    console.log(`  [${move}]`);
  }

  return solutionMoves;
}