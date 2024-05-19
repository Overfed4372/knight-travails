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
  const relativePts = [];
  const allValidMoves = [];
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
        if (neigh !== point.loc) {
            relativePts[levelIndex + 1].push (
                {
                    lastLoc: [levelIndex, pointIndex], 
                    loc: neigh
                }
            );
        }
      }
      pointIndex ++;
    }
    if (solution) {
        console.log(relativePts);
        break;
    }
    levelIndex ++;
  }
  console.log(solution);
  let nowLoc = solution;
  while (true) {
    let nowMove = relativePts[nowLoc[0]][nowLoc[1]];
    console.log(nowMove);
    allValidMoves.push(nowMove.loc);
    if (nowLoc[0] !== 0) {
        nowLoc = nowMove.lastLoc;
    } else {
        break;
    }
  }
  return allValidMoves;
}