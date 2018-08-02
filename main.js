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
bird = {
    x: 60,
    y: 0,
    frame: 0,
    velocity: 0,
    animation: [0, 1, 2, 1],
    rotation: 0,
    gravity: 0.25,
    _jump: 4.6,
    radius: 12,

    jump: function() {
        this.velocity = -this._jump;
    },

    update: function() {
        let n = splashState()? 10: 5;
        this.frame += frames % n === 0? 1: 0;
        this.frame %= this.animation.length;

        if(splashState()) {
            this.y = height - 280 + 5*Math.cos(frames/10);
            this.rotation = 0;
        } else {
            this.velocity += this.gravity;
            this.y += this.velocity;

            if(this.y >= height - s_fg.height - 10) {
                this.y = height - s_fg.height - 10;
                if(gameState()) {
                    currentState = states.Score;
                }
                this.velocity = this._jump;
            }

            if(this.velocity >= this._jump) {
                this.frame = 1;
                this.rotation = Math.min(Math.PI/2, this.rotation + 0.3);
            } else {
                this.rotation = -0.3;
            }
        }
    },

    draw: function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        let n = this.animation[this.frame];
        s_bird[n].draw(ctx, -s_bird[n].width/2, -s_bird[n].height/2);

        //hitbox debugging
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        // ctx.fill();

        ctx.restore();
    }
},
pipes = {

    _pipes: [],

    reset: function() {
        this._pipes = [];
    },

    update: function() {
        if(frames % 100 === 0) {
            //randomly set the y position of the pipes
            let _y = height - (s_pipeSouth.height + s_fg.height + 120 + 200 * Math.random());
            this._pipes.push({
                x: 500,
                y: _y,
                width: s_pipeSouth.width,
                height: s_pipeSouth.height
            });
        }
        for(let i = 0, len = this._pipes.length; i < len; i++) {
            let p = this._pipes[i];

            if(i === 0) {
                let cx = Math.min(Math.max(bird.x, p.x), p.x + p.width);
                let cy1 = Math.min(Math.max(bird.y, p.y), p.y + p.height);
                let cy2 = Math.min(Math.max(bird.y, p.y + p.height + 80), p.y + 2 * p.height + 80);

                let dx = bird.x -cx;
                let dy1 = bird.y - cy1;
                let dy2 = bird.y - cy2;

                let d1 = dx * dx + dy1 * dy1;
                let d2 = dx * dx + dy2 * dy2;

                let r = bird.radius * bird.radius;

                if(r > d1 || r > d2) {
                    currentState = states.Score;
                }
            }

            p.x -= 2;
            if(p.x < -p.width) {
                this._pipes.splice(i, 1);
                i--;
                len--;
            }
        }
    },

    draw: function(ctx) {
        for(let i = 0, len = this._pipes.length; i < len; i++) {
            let p = this._pipes[i];
            s_pipeSouth.draw(ctx, p.x, p.y);
            s_pipeNorth.draw(ctx, p.x, p.y + 80 + p.height);
        }
    }
};

function onPress(evt) {
    switch(currentState) {
        case states.Splash:
            currentState = states.Game;
            bird.jump();
            break;
        case states.Game:
            bird.jump();
            break;
        case states.Score:
            break;
    }
}

function main() {
    canvas = document.createElement("canvas");

    width = window.innerWidth;
    height = window.innerHeight;

    let evt = "touchstart";

    if(width >= 500) {
        width = 320;
        height = 480;
        canvas.style.border = "1px solid #000";
        evt = "mousedown";
    }

    document.addEventListener(evt, onPress);

    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    currentState = states.Splash;

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

    if(!scoreState()) {
        fgpos = (fgpos - 2) % 14;
    }

    if(gameState()) {
        pipes.update();
    }

    bird.update();
}

function render() {
    ctx.fillRect(0, 0, width, height);

    s_bg.draw(ctx, 0, height - s_bg.height);
    s_bg.draw(ctx, s_bg.width, height - s_bg.height);

    pipes.draw(ctx);
    bird.draw(ctx);

    s_fg.draw(ctx, fgpos, height - s_fg.height);
    s_fg.draw(ctx, fgpos + s_fg.width, height - s_fg.height);

    let width2 = width/2;

    if(splashState()) {
        s_splash.draw(ctx, width2 - s_splash.width/2, height - 300);
        s_text.GetReady.draw(ctx, width2 - s_text.GetReady.width/2, height - 380);
    }
}

main();