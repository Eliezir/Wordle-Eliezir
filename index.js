var Word = require('@andsfonseca/palavras-pt-br').Word;

let valid = Word.checkValid("risão")


console.log(valid)


function checkWord(word){
    let valid = Word.checkValid(word);
    return valid;
}

let randomWord = Word.getRandomWord()
console.log(randomWord)



