img="";
status = "";
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(600,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(600,400);
    video.hide();
}

function start() {
    objectDetected = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status - detecting objects";
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
}

function gotResult(error,results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video,0,0,600,400);

    if(status = true) {
        objectDetector.detect(video,gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="Status - Object Detected";
            r = random(255)
            g = random(255)
            b = random(255)
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+ " " + percent + "%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }

    //fill("black");
    //text("dog",50,75);
    //noFill();
    //rect(30,50,250,400);
    //fill("black");
    //text("cat",300,75);
    //noFill();
    //rect(280,50,250,400);
    //fill("black");
    //text("bowl",250,275);
    //noFill();
    //rect(230,50,250,400);
}