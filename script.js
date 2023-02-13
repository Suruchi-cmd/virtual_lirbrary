var canvas = document.querySelector("canvas");

canvas.height = innerHeight;
canvas.width = 0.5 * innerWidth;
canvas.style = "background: url('shelf.jpg')";
formbox = document.querySelector(".formbox");
var c = canvas.getContext("2d");
console.log(formbox);

const numTotalShelf = 3;
const shelfHeight = canvas.height / (numTotalShelf + 0.75);
const shelfWidth = canvas.width;
const barHeight = (canvas.height - shelfHeight * numTotalShelf) / numTotalShelf;

function createShelf() {
  c.fillStyle = "yellow";
  for (var i = 0; i < numTotalShelf; i++) {
    y_position = getShelfStartingPosition(i);
    c.fillRect(0, y_position, shelfWidth, shelfHeight);
  }
}

function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function getShelfStartingPosition(shelfNumber) {
  return shelfNumber * (shelfHeight + barHeight);
}

function getRndColor() {
  var r = Math.floor(getRandomNumber(60, 255)),
    g = Math.floor(getRandomNumber(60, 255)),
    b = Math.floor(getRandomNumber(60, 255));
  return "rgba(" + r + "," + g + "," + b + ",5)";
}

class Book {
  constructor(name, authorName, width, height, shelfNum) {
    this.name = name;
    this.authorName = authorName;
    this.width = width;
    this.height = height;
    this.shelfNum = shelfNum;
  }

  getBookXandY(bookNum, bookArray) {
    var position = { x: 0, y: 0 };
    position.y =
      getShelfStartingPosition(this.shelfNum) + (shelfHeight - this.height);
    if (bookNum != 0) {
      for (var i = 0; i < bookArray.length; i++) {
        position.x += bookArray[i].width;
      }
    }
    this.position = position;
    return position;
  }
  create(bookNum, bookArray) {
    c.fillStyle = getRndColor();
    var pose = this.getBookXandY(bookNum, bookArray);
    c.fillRect(pose.x, pose.y, this.width, this.height);
    c.fillStyle = "rgba(0,0,0,50)";
    c.save();
    c.translate(pose.x + this.width / 2, pose.y + this.height);
    c.rotate(-Math.PI / 2);
    var font = this.width / 3;
    if (this.name.length > 10) {
      font = this.width / 4;
    }
    c.font = font + "px serif";
    c.fillText(this.name, 0, 0, this.height);
    c.restore();
  }
}

var bookArray = [];
let booksRead = [
  {
    name: "IT ENDS WITH US",
    author: "Coleen Grover",
  },
  {
    name: "Sapiens",
    author: "Yuval Noah Harari",
  },
  {
    name: "Siddhartha",
    author: "Herman Hesse",
  },
  {
    name: "Everything is Fcuked",
    author: "Mark Manson",
  },
];

let booksToRead = [
  {
    name: "The Mountain is You",
    author: "Coleen Grover",
  },
  {
    name: "Homo Deus",
    author: "Yuval Noah Harari",
  },
  {
    name: "Men without Women",
    author: "Murakami",
  },
];
var i = 0;
var bookArray2 = [];

createShelf();

// ADD MORE BOOKS

function createAddmore(shelfNum) {
  var pose = { x: 0, y: 0 };
  referenceY = getShelfStartingPosition(shelfNum);
  pose.y = referenceY + 0.5 * shelfHeight;
  pose.x = shelfWidth - shelfHeight / 1.5;
  c.fillStyle = "rgba(0,0,0,50)";
  c.font = shelfHeight / 4 + "px sherif";
  c.fillText("Add more", pose.x, pose.y + shelfHeight / 4, shelfHeight / 2);
  return pose;
}

booksRead.forEach((aBook) => {
  bookHeight = getRandomNumber(0.6 * shelfHeight, 0.8 * shelfHeight);
  //   multiplier = shelfWidth
  bookWidth = 0.07 * shelfWidth;
  var book = new Book(aBook.name, aBook.author, bookWidth, bookHeight, 0);

  book.create(i, bookArray);
  bookArray.push(book);
  i += 1;
});

var i = 0;
booksToRead.forEach((aBook) => {
  bookHeight = getRandomNumber(0.6 * shelfHeight, 0.8 * shelfHeight);
  //   multiplier = shelfWidth
  bookWidth = 0.07 * shelfWidth;
  var book = new Book(aBook.name, aBook.author, bookWidth, bookHeight, 1);

  book.create(i, bookArray2);
  bookArray2.push(book);
  i += 1;
});

positionAddmore = createAddmore(0);

//Function to get the mouse position
function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect) {
  return (
    pos.x > rect.x &&
    pos.x < rect.x + rect.width &&
    pos.y < rect.y + rect.height &&
    pos.y > rect.y
  );
}

var book = bookArray[0];
//The rectangle should have x,y,width,height properties
var rect = {
  x: positionAddmore.x,
  y: positionAddmore.y,
  width: shelfHeight / 2,
  height: shelfHeight / 2,
};
//Binding the click event on the canvas
canvas.addEventListener(
  "click",
  function (evt) {
    var mousePos = getMousePos(canvas, evt);

    if (isInside(mousePos, rect)) {
      formbox.style.display = "block";
    } else {
      alert("clicked outside rect");
    }
  },
  false
);
