var app = {}

app.name = "app";
app.Board = new GameBoard(app);
app.Control = new GameControl(app);
app.Positioner = new GamePositioner(app);
app.Simulation = new GameSimulation(app);


Board = app.Board;
Control = app.Control;
Positioner = app.Positioner;
Simulation = app.Simulation;

Board.createBoard({
    x: 6,
    y: 6,
    typeSize: 4,
    target: "body",
    item: {
        width: 50,
        height: 50
    }
});
