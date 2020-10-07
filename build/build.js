var img;
var painting;
var displayW;
var displayH;
var absImgRatio;
var margin = 50;
var bPlay = false;
var minRadius;
var maxRadius;
function startPainting() {
    frameCount = 0;
    bPlay = true;
    background(5);
    var imgRatio = img.width / img.height;
    if (imgRatio > 1) {
        painting = createGraphics(2000, 2000 / imgRatio);
        img.resize(1000 * imgRatio, 1000);
        absImgRatio = imgRatio;
    }
    else {
        painting = createGraphics(2000 * imgRatio, 2000);
        img.resize(1000, 1000 / imgRatio);
        absImgRatio = 1 / imgRatio;
    }
    painting.background(255);
    var winRatio = width / height;
    if (imgRatio < winRatio) {
        displayW = height * imgRatio - margin * 2;
        displayH = height - margin * 2;
    }
    else {
        displayW = width - margin * 2;
        displayH = width / imgRatio - margin * 2;
    }
    var smallerSide = min(img.width, img.height);
    maxRadius = smallerSide * 0.4;
    minRadius = smallerSide * 0.003;
}
function welcome() {
    background(5);
    fill(255);
    noStroke();
    textSize(24);
    textAlign(CENTER, CENTER);
    text;
    text('Drag an image file onto the canvas\nYou can later press S to download the result', width / 2, height / 2);
}
function onImageUploaded(file) {
    if (file.type === 'image') {
        img = loadImage(file.data, startPainting);
    }
}
function setup() {
    createCanvas(windowWidth, windowHeight).drop(onImageUploaded);
    welcome();
}
function draw() {
    if (bPlay) {
        var nbIterPerFrame = 50;
        for (var _ = 0; _ < nbIterPerFrame; ++_) {
            var s = nbIterPerFrame * frameCount / absImgRatio;
            if (s > 40000) {
                bPlay = false;
            }
            var t = 1 / (1 + s / 1000);
            var x = random(img.width);
            var y = random(img.height);
            var alpha_1 = pow(t, 0.5) * 255;
            var myCol = color(img.get(x, y)[0], img.get(x, y)[1], img.get(x, y)[2], alpha_1);
            painting.fill(myCol);
            painting.noStroke();
            var radius = lerp(minRadius, maxRadius, t);
            painting.ellipse(map(x, 0, img.width, 0, painting.width), map(y, 0, img.height, 0, painting.height), radius);
        }
        fill(255);
        noStroke();
        rectMode(CENTER);
        rect(width / 2, height / 2, displayW + margin / 2, displayH + margin / 2);
        imageMode(CENTER);
        image(painting, width / 2, height / 2, displayW, displayH);
    }
}
function windowResized() {
}
function keyPressed() {
    if (key == 's') {
        painting.save();
    }
}
//# sourceMappingURL=../sketch/sketch/build.js.map