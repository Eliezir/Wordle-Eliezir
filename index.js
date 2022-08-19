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


function changeEventListener(type){
activeRow.forEach(cel =>{
cel.addEventListener("click",function(e){
    var removeFocus = document.getElementsByClassName("letter-focus")
    if(removeFocus[0].id == this.id){}
    else{
        console.log(removeFocus[0])
        removeFocus[0].classList.remove("letter-focus");
        document.getElementById(this.id).classList.add("letter-focus");
        console.log(activeRow.findIndex(myFunction))
        function myFunction(){
            return this;
        }
    }
})
})
}

changeEventListener("teste");


