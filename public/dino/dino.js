// pretty self explanatory function tbh
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// this function exists because im too lazy to manually declare the src for every image
function new_image(source) {
    img = new Image();
    img.src = `assets/imgs/${source}`;
    return img;
}

// this function exists because writing a .onload for EVERY SINGLE IMAGE would be ugly af code
// it also returns the x and y position in an array
function draw(ctx, img, x, y, width = img.width, height = img.height) {
    img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
    }
    return [x, y];
}

// returns an object with the positions of every img given
function groundAnimation(ctx, groundPosition, ...imgs) {
    ctx.clearRect(-96, 132, 1596, 98)
    for (let i = 1; i <= 3; i++) {
        ctx.drawImage(imgs[i - 1], groundPosition[0] + (798 * (i - 1)), 132)
    }
    return groundPosition[0] - 1
}

function dino_game() {
    // game config
    gameConfig = {
        speed: 10,
        fps: 60
    };

    // setting up canvas context
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = window.innerWidth;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");

    // loading images
    imgs = [new_image("dino.png"),new_image("ground.png"), new_image("ground.png"), new_image("ground.png")];

    // drawing
    dinoPos = draw(ctx, imgs[0], 185, 0); // dino
    groundOnePos = draw(ctx, imgs[1], -96, 132); // ground 1
    console.log(groundOnePos)
    draw(ctx, imgs[2], groundOnePos[0] + 798, 132); // ground 2, we add 798 because it starts further to the left 
    draw(ctx, imgs[3], groundOnePos[0] + (798 * 2), 132); // ground 3, we double 798 because it starts even further left

    // ground animation
    setInterval(() => {
        groundOnePos[0] = groundAnimation(ctx, groundOnePos, imgs[1], imgs[2], imgs[3])}, // please list the images from first to last
        1000 / gameConfig.fps // since setInterval is in milliseconds, we do 1000 / fps to run it fps times per sec
    );
}