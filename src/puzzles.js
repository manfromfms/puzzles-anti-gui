const fs = require('fs')

class Puzzle {
    constructor() {

    }
}

const loadPuzzles = (path) => {
    var array = []

    const puzzlesList = require(path)

    for(let i in puzzlesList) {
        const puzzle = puzzlesList[i]

        const p = new Puzzle()

        p.id = puzzle.id
        p.info = puzzle.info
        p.moves = puzzle.moves
        p.fen = puzzle.fen

        array.push(p)
    }

    return array
}

const findPuzzleById = (puzzles, id) => {
    for(let i in puzzles) {
        if(puzzles[i].id === id) return puzzles[i]
    }

    return false
}

const getPuzzlesIDs = puzzles => {
    const array = []

    for(let i in puzzles) {
        array.push(puzzles[i].id)
    }

    return array
}

module.exports = {
    loadPuzzles: loadPuzzles,
    findPuzzleById: findPuzzleById,
    getPuzzlesIDs: getPuzzlesIDs,
    Puzzle: Puzzle,
}