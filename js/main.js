import { bouncingBalls } from "./bouncing.js";
import { pendulum } from "./pendulum.js";
import { complex } from "./complex.js";

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

const length1Slider = document.getElementById("length1");
const length2Slider = document.getElementById("length2");
const speed1Slider = document.getElementById("speed1");
const speed2Slider = document.getElementById("speed2");

const length1Display = document.getElementById("length1-display");
const length2Display = document.getElementById("length2-display");
const speed1Display = document.getElementById("speed1-display");
const speed2Display = document.getElementById("speed2-display");

const complexControls = document.getElementById("complex-controls");
const changeColorBtn = document.getElementById("change-color");

let animation;
let current = null;

window.addEventListener("click", () => {
  if (music.paused && musicToggle.checked) {
    music.play();
  }
}, { once: true });

musicToggle.addEventListener("change", () => {
  if (musicToggle.checked) {
    music.play();
  } else {
    music.pause();
  }
});

ballCountSlider.addEventListener("input", () => {
  ballCountDisplay.textContent = ballCountSlider.value;
  if (current === "bouncing") {
    bouncingBalls.init(ctx, canvas, parseInt(ballCountSlider.value), parseFloat(velocitySlider.value));
  } else if (current === "pendulum") {
    pendulum.init(ctx, canvas, parseInt(ballCountSlider.value));
  }
});

velocitySlider.addEventListener("input", () => {
  velocityDisplay.textContent = velocitySlider.value;
  if (current === "bouncing") {
    bouncingBalls.init(ctx, canvas, parseInt(ballCountSlider.value), parseFloat(velocitySlider.value));
  }
});

select.addEventListener("change", () => {
  cancelAnimationFrame(animation);
  current = select.value;

  if (current === "bouncing") {
    controls.style.display = "block";
    velocitySlider.parentElement.style.display = "block";
    complexControls.style.display = "none";
    bouncingBalls.init(ctx, canvas, parseInt(ballCountSlider.value), parseFloat(velocitySlider.value));
  } else if (current === "pendulum") {
    controls.style.display = "block";
    velocitySlider.parentElement.style.display = "none";
    complexControls.style.display = "none";
    pendulum.init(ctx, canvas, parseInt(ballCountSlider.value));
  } else if (current === "complex") {
    controls.style.display = "none";
    complexControls.style.display = "block";
    complex.init(ctx, canvas);
    updateComplexParams();
  }

  animate();
});

function updateComplexParams() {
  const params = {
    length1: parseInt(length1Slider.value),
    length2: parseInt(length2Slider.value),
    speed1: parseFloat(speed1Slider.value),
    speed2: parseFloat(speed2Slider.value),
  };
  complex.setParams(params);
}

[length1Slider, length2Slider, speed1Slider, speed2Slider].forEach(slider => {
  slider.addEventListener("input", () => {
    length1Display.textContent = length1Slider.value;
    length2Display.textContent = length2Slider.value;
    speed1Display.textContent = speed1Slider.value;
    speed2Display.textContent = speed2Slider.value;
    updateComplexParams();
  });
});

changeColorBtn.addEventListener("click", () => {
  complex.changeColor();
});

function animate() {
  if (current === "bouncing") {
    bouncingBalls.draw();
  } else if (current === "pendulum") {
    pendulum.draw();
  } else if (current === "complex") {
    complex.draw();
  }
  animation = requestAnimationFrame(animate);
}

current = select.value;
if (current === "bouncing") {
  controls.style.display = "block";
  velocitySlider.parentElement.style.display = "block";
  complexControls.style.display = "none";
  bouncingBalls.init(ctx, canvas, parseInt(ballCountSlider.value), parseFloat(velocitySlider.value));
} else if (current === "pendulum") {
  controls.style.display = "block";
  velocitySlider.parentElement.style.display = "none";
  complexControls.style.display = "none";
  pendulum.init(ctx, canvas, parseInt(ballCountSlider.value));
} else if (current === "complex") {
  controls.style.display = "none";
  complexControls.style.display = "block";
  complex.init(ctx, canvas);
  updateComplexParams();
}
animate();
