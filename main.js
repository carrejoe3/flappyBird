let

canvas,
ctx,
width,
height,
fgpos = 0,
frames = 0,
score = 0,
best = 0,
currentState,
states = {
    Splash: 0,
    Game: 1,
    Score: 2
},
bird = {},
pipes = {};

function main() {
    canvas = document.createElement("canvas");

    width = window.innerWidth;
    height = window.innerHeight;

    if(width >= 500) {
        width = 320;
        height = 480;
        canvas.style.border = "1px solid #000";
    }

    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);

    let img = new Image();
    img.src = "res/sheet.png";
    img.onload = function() {
        initSprites(this);
        ctx.fillStyle = s_bg.color;
        run();
    }
}

function run() {
    var loop = function() {
        update();
        render();
        window.requestAnimationFrame(loop, canvas);
    }
    window.requestAnimationFrame(loop, canvas);
}

function update() {
    frames++;
    fgpos = (fgpos - 2) % 14;
}

function render() {
    ctx.fillRect(0, 0, width, height);

    s_bg.draw(ctx, 0, height - s_bg.height);
    s_bg.draw(ctx, s_bg.width, height - s_bg.height);

    s_fg.draw(ctx, fgpos, height - s_fg.height)
    s_fg.draw(ctx, fgpos + s_fg.width, height - s_fg.height)
}

main();