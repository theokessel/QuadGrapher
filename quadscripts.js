//Javascript for drawing and calculating quadratics 2017
var a, b, c, context, w, h, k = 10;
var zoom = 30;
var w = canvas.width;
var h = canvas.height;

function init() {
    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");
    w = canvas.width = 600;
    h = canvas.height = 400;
    console.log('canvas is loaded into context', w);
    canvasOffset = $("#mycanvas").offset();
    offsetX = Math.round(canvasOffset.left),
        offsetY = Math.round(canvasOffset.top);
    canvas.addEventListener("mousemove", doMouseMove, false);
} // close init

function QF() {
    // getting values to do quadratic formula
    a = $("#linA").val();
    b = $("#linB").val();
    c = $("#constant").val();
    var discriminant = (b ** 2) - (4 * a * c);
    var other_part = -b;
    var bottom_part = 2 * a;
    if (discriminant < 0) {
        var quadForm_answer1 = "Your Answer Is Undefined";
        var quadForm_answer2 = "Your Answer Is Undefined";
        $("#quadformanswer").text(quadForm_answer1);
        $("#quadformanswer2").text(quadForm_answer2);
    } else {
        quadForm_answer1 = (other_part + Math.sqrt(discriminant)) / bottom_part;
        quadForm_answer2 = (other_part - Math.sqrt(discriminant)) / bottom_part;
        console.log(quadForm_answer1);
        console.log(quadForm_answer2);
        // var answer = (-b+((b**2)-(4*a*c))/(2*a);
        // console.log(answer)
        console.log(a, b, c);
        $("#quadformanswer").text(quadForm_answer1);
        $("#quadformanswer2").text(quadForm_answer2);

        function drawXints() {
            ctx.fillStyle = "red"
            ctx.beginPath();
            ctx.arc((w / 2) + (quadForm_answer1 * zoom), (h / 2), 6, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc((w / 2) + (quadForm_answer2 * zoom), (h / 2), 6, 0, 2 * Math.PI);
            ctx.fill();
        }
        drawXints();

    }

    results();
    graphpaper();
    vertLineGrapher();
    horizLineGrapher();
    vertLineGrapher2();
    horizLineGrapher2();
    graphQuad();
} // close QF

function results() {
    // finding vertext and displaying symline and yint results
    vX = -(b * 1) / (2 * a);
    vY = a * Math.pow(vX, 2) + b * vX + c * 1;
    $("#vertex").text("Vertex is at (" + vX + "," + vY + ")");
    $("#yInt").text("The Y Intercept is at (0," + c + ")");
    $("#correspondingPoint").text("(" + 2 * vX + "," + c + ")");
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc((w / 2) + (vX * zoom), (h / 2) - (vY * zoom), 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc((w / 2), (h / 2) - (c * zoom), 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ff0000"
    ctx.setLineDash([7, 3]);
    ctx.beginPath();
    ctx.moveTo((w / 2) + (vX * zoom), 5);
    ctx.lineTo((w / 2) + (vX * zoom), h + 5)
    ctx.stroke();
} // close results()

function graphpaper() {
    // the x and y axis drawn
    ctx.setLineDash([0]);
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
}

function vertLineGrapher() {
    // ctx.stokeStyle = "rgba(0,255,0,.5)";
    var vlX = w / 2;
    var vlY = 0;
    ctx.fillStyle = "#000000";
    ctx.fillRect(295, 195, 10, 10);
    while (vlX < w) {
        vlX = vlX + zoom;
        ctx.fillRect(vlX, vlY, 2, h);
    }
}

function vertLineGrapher2() {
    var vlX2 = w / 2;
    var vlY2 = 0;
    ctx.fillStyle = "#000000";
    ctx.fillRect(295, 195, 10, 10);
    while (vlX2 > 0) {
        vlX2 = vlX2 - zoom;
        ctx.fillRect(vlX2, vlY2, 2, h);
        console.log("verline2")
    }
}

function horizLineGrapher() {
    var hlX = 0;
    var hlY = h / 2;
    ctx.fillStyle = "#000000";
    while (hlY < 400) {
        hlY = hlY + zoom;
        ctx.fillRect(hlX, hlY, w, 2);
    }
}

function horizLineGrapher2() {
    var hlX2 = 0;
    var hlY2 = h / 2;
    ctx.fillStyle = "#000000";
    while (hlY2 > 0) {
        hlY2 = hlY2 - zoom;
        ctx.fillRect(hlX2, hlY2, w, 2);
        console.log("horizline2")
    }
}

function zoomIn() {
    zoom = zoom + 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("zoom", zoom)
}

function zoomOut() {
    zoom = zoom - 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("zoom", zoom)
}

function graphQuad() {
    for (var i = 0; i < w; i++) {
        x = (w / 2 - i) / zoom;
        y = c * 1 + b * x + a * Math.pow(x, 2);
        nx = (w / 2 - (i + 1)) / zoom;
        ny = c * 1 + b * nx + a * Math.pow(nx, 2);
        // console.log(x, y, nx, ny)
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "Red";
        ctx.moveTo((w / 2) + (x * zoom), (h / 2) - (y * zoom));
        ctx.lineTo((w / 2) + (nx * zoom), (h / 2) - (ny * zoom));
        ctx.stroke();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graphpaper();
    vertLineGrapher();
    horizLineGrapher();
    vertLineGrapher2();
    horizLineGrapher2();
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graphpaper();
    vertLineGrapher();
    horizLineGrapher();
    vertLineGrapher2();
    horizLineGrapher2();
    graphQuad();
    results();
}

// function clickCounter() {
//   var timesClicked = 0;
//   timesClicked = timesClicked + 1;
//   console.log("times clicked", timesClicked);
// }


function doMouseMove(event) {
    redrawCanvas();
    // always know where ther mouse is located
    mouseX = event.clientX - offsetX;
    mouseY = event.clientY - offsetY;
    pointX = (mouseX - (w / 2)) / zoom;
    pointY = a * Math.pow(pointX, 2) + b * pointX + c * 1;
    pointX = pointX.toFixed(2);
    pointY = pointY.toFixed(2);
    //console.log(mouseX, mouseY, pointX, pointY, offsetY, offsetX);
    ctx.beginPath();
    ctx.arc(mouseX, (h / 2) - (pointY * zoom), 5, 0, 2 * Math.PI);
    ctx.fill();
    $("#pointOnGraph").text("Point on the curve: (" + pointX + "," + pointY + ")");
} // end doMouseMove