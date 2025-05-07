import { bouncingBalls } from "./bouncing.js";
import { pendulum } from "./pendulum.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const select = document.getElementById("animation-select");
const controls = document.getElementById("controls");

const ballCountSlider = document.getElementById("ball-count");
const ballCountDisplay = document.getElementById("ball-count-display");

const velocitySlider = document.getElementById("velocity");
const velocityDisplay = document.getElementById("velocity-display");

const musicToggle = document.getElementById("music-toggle");
const music = document.getElementById("background-music");

let animation;
let current = null;

// Ensure music plays only if user interacted (for browser autoplay policies)
window.addEventListener("click", () => {
  if (music.paused && musicToggle.checked) {
    music.play();
  }
}, { once: true });

// Toggle music on/off
musicToggle.addEventListener("change", () => {
  if (musicToggle.checked) {
    music.play();
  } else {
    music.pause();
  }
});

// Update ball count display and re-initialize
ballCountSlider.addEventListener("input", () => {
  ballCountDisplay.textContent = ballCountSlider.value;
  if (current === "bouncing") {
    bouncingBalls.init(ctx, canvas, parseInt(ballCountSlider.value), parseFloat(velocitySlider.value));
  } else if (current === "pendulum") {
    pendulum.init(ctx, canvas, parseInt(ballCountSlider.value));
  }
});


// Update velocity display and re-initialize
velocitySlider.addEventListener("input", () => {
  velocityDisplay.textContent = velocitySlider.value;
  if (current === "bouncing") {
    bouncingBalls.init(ctx, canvas, parseInt(ballCountSlider.value), parseFloat(velocitySlider.value));
  }
});

// Handle animation mode switching
select.addEventListener("change", () => {
  cancelAnimationFrame(animation);
  current = select.value;

  if (current === "bouncing") {
    controls.style.display = "block";
    velocitySlider.parentElement.style.display = "block";
    bouncingBalls.init(ctx, canvas, parseInt(ballCountSlider.value), parseFloat(velocitySlider.value));
  } else {
    controls.style.display = "block";
    velocitySlider.parentElement.style.display = "none"; // Hide velocity slider for pendulum
    pendulum.init(ctx, canvas, parseInt(ballCountSlider.value));
  }

  animate();
});


function animate() {
  if (current === "bouncing") {
    bouncingBalls.draw();
  } else if (current === "pendulum") {
    pendulum.draw();
  }
  animation = requestAnimationFrame(animate);
}

// Initial setup
current = select.value;
controls.style.display = "block";
if (current === "bouncing") {
  velocitySlider.parentElement.style.display = "block";
  bouncingBalls.init(ctx, canvas, parseInt(ballCountSlider.value), parseFloat(velocitySlider.value));
} else {
  velocitySlider.parentElement.style.display = "none";
  pendulum.init(ctx, canvas, parseInt(ballCountSlider.value));
}
animate();
