let lines = [];
let circles = [];
let triangles = [];
let squares = [];
//let pentagons = [];
//let hexagons = [];

function preload() {
  for (let i = 0; i < 100; i++) {
    let index = nf(i + 1, 3, 0);
    lines[i] = loadImage(`data/line${index}.png`);
    circles[i] = loadImage(`data/circle${index}.png`);
    triangles[i] = loadImage(`data/triangle${index}.png`);
    squares[i] = loadImage(`data/square${index}.png`);
//    pentagons[i] = loadImage(`data/pentagon${index}.png`);
//    hexagons[i] = loadImage(`data/hexagon${index}.png`);
  }
}

let shapeClassifier;

function SetupCNN(){
  let options = {
    inputs: [128, 128, 4],
    task: 'imageClassification',
    debug: true
  };
  shapeClassifier = ml5.neuralNetwork(options);
  
  for (let i = 0; i < circles.length; i++) {
    shapeClassifier.addData({ image: lines[i] }, { label: 'line' });
    shapeClassifier.addData({ image: circles[i] }, { label: 'circle' });
    shapeClassifier.addData({ image: triangles[i] }, { label: 'triangle' });
    shapeClassifier.addData({ image: squares[i] }, { label: 'square' });
//    shapeClassifier.addData({ image: pentagons[i] }, { label: 'pentagon' });
//    shapeClassifier.addData({ image: hexagons[i] }, { label: 'hexagon' });
  }
}

function OnTraningDone() {
  console.log('Done!');
  shapeClassifier.save();
}

function setup() {
  createCanvas(400, 400);

  SetupCNN();
  
  shapeClassifier.normalizeData();
  shapeClassifier.train({ epochs: 100 }, OnTraningDone);
}