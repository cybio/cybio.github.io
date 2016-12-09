window.onload = function () {
    var button = document.getElementById("preview");
    button.onclick = previewHandle;

    makeImage();
};

function previewHandle() {
    var canvas = document.getElementById("can");
    var context = canvas.getContext("2d");

    fillBackgroundColor(canvas, context);

    var selectObj = document.getElementById("shape");
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;

    if (shape == "squares") {
        for (var i = 0; i < 20; i++) {
            drawSquare(canvas, context);
        }
    } else if (shape == "circles") {
        for (var i = 0; i < 20; i++) {
            drawCircle(canvas, context);
        }
    } else if (shape == "face") {
        drawFace(canvas, context);
    }

    drawText(canvas, context);
    drawBird(canvas, context);
}

function drawSquare(canvas, context) {
    var w = Math.floor(Math.random() * 25 + 5);
    var x = Math.floor(Math.random() * (canvas.width - 15));
    var y = Math.floor(Math.random() * (canvas.height - 15));

    context.fillStyle = "lightblue";
    context.fillRect(x, y, w, w);
}

function drawCircle(canvas, context) {
    var r = Math.floor(Math.random() * 27 + 3);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    context.beginPath();
    context.arc(x, y, r, 0, degreesToRadians(360), true);

    context.fillStyle = "lightblue";
    context.fill();
}

function drawText(canvas, context) {
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;

    context.fillStyle = fgColor;
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    context.fillText("I saw this tweet", 20, 40);

    selectObj = document.getElementById("tweets");
    index = selectObj.selectedIndex;
    var tweet = selectObj[index].value;
    context.font = "italic 1.2em serif";
    context.fillText(tweet, 30, 100);

    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    context.fillText("and all I got was this lousy t-shirt!", canvas.width - 20, canvas.height - 40);
}

function drawBird(canvas, context) {
    var tweetBird = new Image();
    tweetBird.src = "tweetBird.png";
    tweetBird.onload = function () {
        context.drawImage(tweetBird, 20, 120, 70, 70);
    };
}

function drawFace(canvas, context) {
    context.beginPath();
    context.arc(300, 300, 200, 0, degreesToRadians(360), true);
    context.fillStyle = "#ffc";
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(200, 250, 25, 0, degreesToRadians(360), true);
    context.stroke();

    context.beginPath();
    context.arc(400, 250, 25, 0, degreesToRadians(360), true);
    context.stroke();

    context.beginPath();
    context.moveTo(300, 300);
    context.lineTo(300, 350);
    context.stroke();

    context.beginPath();
    context.arc(300, 350, 75, degreesToRadians(20), degreesToRadians(160), false);
    context.stroke();
}

function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var bgColor = selectObj[index].value;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function updateTweets(tweets) {
    var tweetsSelection = document.getElementById("tweets");

    for (var i = 0; i < tweets.length; i++) {
        var tweet = tweets[i];
        var option = document.createElement("option");
        option.text = tweet.text;
        option.value = tweet.text.replace("\"", "'");
        tweetsSelection.options.add(option);
    }

    tweetsSelection.selectedIndex = 0;
}

function makeImage() {
    var canvas = document.getElementById("can");
    canvas.onclick = function () {
        window.location = canvas.toDataURL('image/png');
    };
}

















