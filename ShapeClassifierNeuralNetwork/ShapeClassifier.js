let shapeClassifier;
let canvas;

let inputImage;
let clearButton;

let resultDiv1;
let resultDiv2;
let resultDiv3;

function setup() {
    pixelDensity(1);
    canvas = createCanvas(400,400);
    background(255);
    
    clearButton = createButton('clear');
    clearButton.mousePressed(function() {
    background(255);
    });
    
    resultDiv1 = createDiv('loading model');
    resultDiv2 = createDiv('loading model');
    resultDiv3 = createDiv('loading model');

    inputImage = createGraphics(128,128);
    let options = {
        inputs: [128, 128, 4],
        task: 'imageClassification',
      };
    shapeClassifier = ml5.neuralNetwork(options);

    const modelData = {
        model: 'model/model.json',
        metadata: 'model/model_meta.json',
        weights: 'model/model.weights.bin'
    }

    shapeClassifier.load(modelData, OnModelLoaded);
}

function OnModelLoaded(){
    console.log("Model Loaded!");
    classifyImage();
}

function OnClassificationDone(err, results){
    if(err) {
        console.error(err);
        return;
    }

    let confidence1 = nf(100 * results[0].confidence, 2, 0);
    let confidence2 = nf(100 * results[1].confidence, 2, 0);
    let confidence3 = nf(100 * results[2].confidence, 2, 0);

    resultDiv1.html(`${results[0].label} ${confidence1}%`);
    resultDiv2.html(`${results[1].label} ${confidence2}%`);
    resultDiv3.html(`${results[2].label} ${confidence3}%`);

    classifyImage();
}

function draw () {
    if(mouseIsPressed) {
        strokeWeight(16);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function classifyImage(){
    inputImage.copy(canvas,0,0,400,400,0,0,128,128);
    shapeClassifier.classify({image : inputImage}, OnClassificationDone);
}