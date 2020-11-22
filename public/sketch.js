let socket = io();
let myColor = "white";
let myImage;

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

function newPlayer(newPlayerColor) {
  console.log(newPlayerColor);

  push();
  fill("white");
  rectMode(CENTER);
  noStroke();
  rect(width / 2, height * 17 / 18, width, 50);
  textSize(15);
  textFont("Helvetica")
  textAlign(CENTER);
  fill(newPlayerColor);
  text("New player joined:  " + newPlayerColor, width / 2, height * 17 / 18);
  pop();

}

function setColor(assignedColor) {
  myColor = assignedColor;
}

function newConnection() {
  console.log("your id: " + socket.id)
}

function drawOtherMouse(data) {

  push();
  stroke(data.color);
  strokeWeight(3)
  line(data.x, data.y, data.x2, data.y2);
  pop();

}

function preload() {
  // sfondo
  myImage = loadImage("./assets/images/sfondo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function mouseDragged() {
  push();
  stroke(myColor);
  strokeWeight(3)
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
  //cerate the message
  let message = {
    x: mouseX,
    y: mouseY,
    x2: pmouseX,
    y2: pmouseY,
    color: myColor,
  };
  //sent to the server
  socket.emit("mouse", message);
}

function draw() {
  // sfondo
  imageMode(CENTER);
  image(myImage, windowWidth / 2, windowHeight / 2, myImage.width / 4, myImage.height / 4);

  push();
  textSize(20);
  textFont("Helvetica")
  textAlign(CENTER);
  textStyle(ITALIC);
  fill("black");
  noStroke()
  text("Complete the black lines by creating sketches or adding details to the other players' ones", width / 2, height / 21);
  pop();

  push();
  textSize(15);
  textFont("Helvetica")
  textAlign(CENTER);
  textStyle(ITALIC);
  fill("black");
  noStroke()
  text("Drag your mouse to draw", width / 2, height * 2 / 21);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
