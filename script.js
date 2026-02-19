const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 240;
const images = [];
const imageSeq = {
    frame: 0
};

// Generate image path with 3-digit format (001, 002, ...)
function currentFrame(index) {
    const number = String(index + 1).padStart(3, '0');
    return `frames/ezgif-frame-${number}.jpg`;
}

// Preload images
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Draw image on canvas
function drawImage(img) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
    );

    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    context.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
    );
}

// Initial render
images[0].onload = () => {
    drawImage(images[0]);
};

// Scroll animation
window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;

    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {
        drawImage(images[frameIndex]);
    });
});

// Responsive resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

