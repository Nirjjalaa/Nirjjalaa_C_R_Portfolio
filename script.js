const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 240;
const images = [];
let imagesLoaded = 0;
let currentFrameIndex = 0;

// Generate image path (001, 002, 003...)
function currentFrame(index) {
    const number = String(index + 1).padStart(3, '0');
    return `frames/ezgif-frame-${number}.jpg`;
}

// Preload all images
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);

    img.onload = () => {
        imagesLoaded++;

        // Draw first frame once first image loads
        if (imagesLoaded === 1) {
            render(0);
        }
    };

    images.push(img);
}

// Render function
function render(index) {
    const img = images[index];

    // Prevent drawing if image not loaded
    if (!img || !img.complete) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
    );

    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    context.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
    );
}

// Scroll animation
window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;

    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    if (frameIndex !== currentFrameIndex) {
        currentFrameIndex = frameIndex;
        requestAnimationFrame(() => render(frameIndex));
    }
});

// Resize handling
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render(currentFrameIndex);
});
