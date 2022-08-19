const tiles = document.querySelector(".tile-container");
const games = []

const rows = 6;
const columns = 5;
var activeRow = 0;
var activeCol = 0;

function CreateGame(modo){
for (let i = 0; i < modo; i-=-1){
    var gameSet = i;    
    games[i] = document.createElement("div");
for(let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const tileRow = document.createElement("div");
    tileRow.setAttribute("id","game"+gameSet+"row" + rowIndex)
    for(let columnIndex = 0; columnIndex < columns; columnIndex++) {
        const tileColumn = document.createElement("div");
        tileColumn.setAttribute("id","game"+gameSet+"row"+rowIndex+"column"+columnIndex);
        tileColumn.setAttribute("class","tile-column");
        tileRow.append(tileColumn);
    }
    games[i].append(tileRow);
    tiles.append(games[i]);
}}}
CreateGame(1);

    for(let col = 0; col < columns; col ++){
        var active_columns = document.getElementById("game0row0column"+col)
        active_columns.classList.toggle("typing")
}


function letterFocus(x){
    activeRow = document.querySelectorAll(".typing");
    activeRow[x].classList.toggle("letter-focus")
}

letterFocus(activeCol);


document.addEventListener("keydown", function (event) {
    var emptyTiles = activeRow.length;
    console.log(emptyTiles);
    switch(event.key){
        case "ArrowRight":
        letterFocus(activeCol);
        activeCol++;
        if(activeCol>emptyTiles-1)activeCol=0;   
        letterFocus(activeCol);
        break;
        case "ArrowLeft":
        letterFocus(activeCol);
        activeCol--;
        if(activeCol<0)activeCol = emptyTiles-1;
        letterFocus(activeCol);
        break;
    }
  
});

for(var index in activeRow){
    var collumnIndex = activeRow[index];
    console.log(activeRow[index])
    /* collumnIndex.addEventListener("click",function(event){
    console.log(event)
    }) */
    document.getElementById("game0row0column4").addEventListener("click",function(event){
        console.log(event)
    })
}

