// create the sguares
const grid =document.querySelector('.grid');
const width=8;
squares=[];
let score=0;
//candy colours
const candyColours=[
'url(images/blue-candy.png)',
'url(images/green-candy.png)',
'url(images/orange-candy.png)',
'url(images/purple-candy.png)',
'url(images/red-candy.png)',
'url(images/yellow-candy.png)'
]

//create Board
const createBoard =()=>{
    for(let i=0; i<width*width; i++){
        const square=document.createElement('div');
        grid.appendChild(square)
        square.setAttribute('draggable',true)
        square.setAttribute('id',i)
        let rondom=Math.floor(Math.random()*candyColours.length)
        square.style.backgroundImage=candyColours[rondom]
        squares.push(square)
    }
}
createBoard();
let candyDragged
let candyReplaced
let squareDragged
let squareReplaced
//adding dragging event listeners
squares.forEach(square => square.addEventListener('dragstart',dragStart));
squares.forEach(square => square.addEventListener('dragend',dragEnd));
squares.forEach(square => square.addEventListener('dragover',dragOver));
squares.forEach(square => square.addEventListener('dragenter',dragEnter));
squares.forEach(square => square.addEventListener('dragleave',dragLeave));
squares.forEach(square => square.addEventListener('drop',dragDrop));

//event functions
function dragStart(){
    candyDragged=this.style.backgroundImage
    squareDragged=parseInt(this.id)

}

function dragOver(e){
    e.preventDefault()
}
function dragEnter(e){
    e.preventDefault()
}
function dragEnd(){
    //end
    //valid moves 
let validMoves=[
     squareDragged-1,
     squareDragged-width,
     squareDragged+width,
     squareDragged+1
];

let validMove=validMoves.includes(squareReplaced)
if (squareReplaced&&validMove){
    squareReplaced= null
}else if(squareReplaced&&!validMove){
squares[squareReplaced].style.backgroundImage=candyReplaced
squares[squareDragged].style.backgroundImage=candyDragged
}else squares[squareDragged].style.backgroundImage=candyDragged
}


//checking matches 
//matches for three
function checkRowForThree() {
    for (i = 0; i < 61; i ++) {
      let rowOfThree = [i, i+1, i+2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      const notValid=[6,7,14,15,30,31,38,39,46,47,54,55]
      if(notValid.includes(i))continue

      if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        rowOfThree.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkRowForThree()

  function checkColumnForThree() {
    for (i = 0; i < 47; i ++) {
      let columnOfThree = [i, i+width, i+width*2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 3
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkColumnForThree()
  
//matches of four
function checkRowForFour() {
    for (i = 0; i < 60; i ++) {
      let rowOfFour = [i, i+1, i+2,i+4]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''
      const notValid=[5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
      if(notValid.includes(i))continue

      if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        rowOfFour.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkRowForFour();

  // check match for four
  function checkColumnForFour() {
    for (i = 0; i < 39; i ++) {
      let columnFour = [i, i+width, i+width*2,i+width*3]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if(columnFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        columnFour.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkColumnForFour();
//matches for fives



window.setInterval(()=>{
    moveCandies()
    checkRowForFour(),
    checkColumnForFour(),
    checkRowForThree(),
    checkColumnForThree()
},100)



//matches for dropping candies
function moveCandies() {
  for (i = 0; i < 55; i ++) {
      if(squares[i + width].style.backgroundImage === '') {
          squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
          squares[i].style.backgroundImage = ''
          const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
          const isFirstRow = firstRow.includes(i)
          if (isFirstRow && (squares[i].style.backgroundImage === '')) {
            let randomColor = Math.floor(Math.random() * candyColours.length)
            squares[i].style.backgroundImage = candyColours[randomColor]
          }
      }
  }
}


function dragDrop(){
    candyReplaced=this.style.backgroundImage
    squareReplaced=parseInt(this.id)
    this.style.backgroundImage=candyDragged
    squares[squareDragged].style.backgroundImage=candyReplaced
}


function dragLeave(){
    
}

