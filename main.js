var canvas, video, poseNet, nariz;

let narizURL = './nariz/nariz4.png';
const narizLado = 120;

var noseX = 100;
var noseY = 100;

setButtons();

function preload() {
    nariz = loadImage(narizURL);
}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center()
    // camera
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    imageMode(CENTER);
    // poseNet
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, width / 2, height / 2, width, height)
    //nariz
    image(nariz, noseX, noseY, narizLado, narizLado)
}

function takeSnapshot() {
    save('ibagem.png');
}

function modelLoaded() {
    console.log("PoseNet Inicializado")
}

function gotPoses(results) {
    if (results.length > 0) {
        // console.log(results);
        // console.log(results[0].pose.nose.x);
        // console.log(results[0].pose.nose.y);
        // console.log(results[0].pose.nose.y);
        
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
    }
}

function setButtons() {
    const divBotao = document.getElementById("divNarizes");
    for (let i = 1; i <= 6; i++) {
        const url = './nariz/nariz' + i + '.png';
        const botao = document.createElement("button");
        botao.id = 'nariz' + i
        botao.style.background = "url(" + url + ")"
        botao.style.backgroundSize = "cover"
        botao.style.width = '80px'
        botao.style.height = '80px'
        botao.className = "btn mx-1"
        botao.setAttribute("onclick", "changeNose(this.id)")
        divBotao.appendChild(botao);
    }
}

function changeNose(nariz) {
    narizURL = './nariz/' + nariz + '.png';
    preload();
}