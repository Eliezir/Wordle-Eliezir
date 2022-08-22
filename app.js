const tiles = document.querySelector(".tile-container");
const games = []

const rows = 6;
const columns = 5;
var activeRowIndex = 0;
var activeCol = 0;
var termo = "TERMO"



/* Cria o tabuleiro para jogo */
function CreateGame(modo){
for (let i = 0; i < modo; i-=-1){
var gameSet = i;    
games[i] = document.createElement("div");
for(let rowIndex = 0; rowIndex < rows; rowIndex++) {
const tileRow = document.createElement("div");
tileRow.setAttribute("id","game"+gameSet+"row" + rowIndex);
tileRow.setAttribute("class","tile-row");
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


/* define a linha da rodada */
function setRow(row){
for(let col = 0; col < columns; col ++){
    var active_columns = document.getElementById("game0row"+row+"column"+col)
    active_columns.classList.toggle("typing")
}}

/* define a tecla em foco */
function letterFocus(x){
if(x > -1){  
activeRow = document.querySelectorAll(".typing");
activeRow[x].classList.toggle("letter-focus")}
}




function changeKey(type){
    var emptyTiles = activeRow.length;
    if(activeCol > -1)letterFocus(activeCol);
    if(type =="backward"){
    activeCol--;
    if(activeCol<0)activeCol = emptyTiles-1;}
    else if(type =="forward"){
        activeCol++;
        if(activeCol>emptyTiles-1)activeCol=0;   
    }
    letterFocus(activeCol);
}

/* event listeners do teclado*/
document.addEventListener("keydown", function (event) {
   /*  mover entre as teclas com o teclado  */

switch(event.key){
    case "ArrowRight":   
        changeKey("forward")
    break;
    case "ArrowLeft":
        changeKey("backward")
    break;
    case "Backspace":
    if(activeCol ==-1)
    {
        activeRow[4].classList.toggle("letter-focus")
        activeCol = 4;
    }

    var activeCell = document.getElementsByClassName("letter-focus");
    if(activeCell[0].childNodes.length == 0 && activeCol > 0)
    {
        activeRow[activeCol].classList.toggle("letter-focus");
        activeCol--;
        activeRow[activeCol].classList.toggle("letter-focus");
        var activeCell = document.getElementsByClassName("letter-focus");
    }
    activeCell[0].innerHTML ="";
    break;
    case "Enter":
    var palavra = "";
    for(var x = 0 ; x < columns ; x++){
        palavra+= activeRow[x].innerHTML;
    }
    /* aqui tem q checar se a palavra está certa, se ela existe pra caso seja errada rodar o if  */
    if(palavra.length == 5)
    {
        for(var x = 0; x < 5; x++){
            if(palavra[x] == termo[x]){
                activeRow[x].classList.add("right")
            }
            else if(termo.includes(palavra[x])){
                activeRow[x].classList.add("displaced")
            }
        }
        console.log(palavra)
        letterFocus(activeCol);
        setRow(activeRowIndex);
        activeCol = 0;
        changeEventListener("remove");
        activeRowIndex ++;
        setRow(activeRowIndex);
        letterFocus(activeCol);
        changeEventListener("add");
    }

    break;

}

var key = event.key.toUpperCase();
if( key.length == 1 && key.charCodeAt() >=65 &&  key.charCodeAt()  <= 90  && activeCol > -1){
    var filled = 0;
    var activeCell = document.getElementsByClassName("letter-focus");
    activeCell[0].innerHTML =key;
    changeKey("forward");
    if(activeCell[0].innerHTML != ""){
        while(activeCell[0].innerHTML != "" && filled < 4){
            filled ++;
            changeKey("forward")
        }
        if(filled == 4){
            letterFocus(activeCol);
            activeCol = -1;
        }
    }
}

});

/* event listeners para mover entre as teclas com o mouse */
function changeEventListener(type){
activeRow.forEach(cel =>{
if(type == "add"){
cel.addEventListener("click",function handleClick(e){
    var removeFocus = document.getElementsByClassName("letter-focus")
        if(removeFocus[0].id == this.id){}
        else    {
            removeFocus[0].classList.remove("letter-focus");
            document.getElementById(this.id).classList.add("letter-focus");
            var name = this.id;
            name = name.slice(-1)
            activeCol = parseInt(name)
                }
        });
    }
else if(type =="remove")
    cel.replaceWith(cel.cloneNode(true));

})
}




setRow(activeRowIndex);
letterFocus(activeCol);
changeEventListener("add");
