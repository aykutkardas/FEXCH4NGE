var app = {}

app.name = "app";
app.Board = new GameBoard(app);
app.Control = new GameControl(app);
app.Positioner = new GamePositioner(app);

Board = app.Board;
Control = app.Control;
Positioner = app.Positioner;


Board.createBoard({
    x: 5,
    y: 5,
    typeSize: 5,
    target: "body",
    item: {
        width: 50,
        height: 50
    }
});
