var express = require('express');
var app = express();
const fs = require('fs')

const { loadPuzzles, findPuzzleById, getPuzzlesIDs } = require("./src/puzzles")
const puzzles = loadPuzzles(__dirname + '/data/puzzles/puzzles.json')


// Main page
app.get('/', function (req, res) {
    res.send('Hello World!')
})


// Puzzle page
app.get('/puzzle/:id', (req, res) => {
    res.sendFile(__dirname + '/client/puzzle/index.html')
})


// Global stuff
app.get('/global/url_tools.js', (req, res) => {
    res.sendFile(__dirname + '/client/global/url_tools.js')
}).get('/global/Chess.js', (req, res) => {
    res.sendFile(__dirname + '/client/global/Chess.js')
})


// API
app.get('/api/v1.0/puzzle', (req, res) => {
    const puzzle = findPuzzleById(puzzles, req.query.id)

    if(!puzzle) return res.json({error: "no such puzzle"})

    res.json({
        id: puzzle.id,
        info: puzzle.info,
        fen: puzzle.fen,
        moves: Object.keys(puzzle.moves)
    })
}).get('/api/v1.0/puzzles-list', (req, res) => {
    res.json(getPuzzlesIDs(puzzles))
})


// CM-chessboard and everything else
app.use((req, res, next) => {
    if(fs.existsSync(__dirname + '/client/cm-chessboard/' + req.originalUrl)) return res.sendFile(__dirname + '/client/cm-chessboard/' + req.originalUrl)

    res.status(404)
    res.send('No matching page/file found')
})


// Init server
var server = app.listen(3000, function () {
    var port = server.address().port
    console.log(`Listening on ${port}`)
})
