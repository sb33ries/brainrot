import { bouncingBalls } from "./bouncing.js";
import { pendulum } from "./pendulum.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

const select = document.getElementById("animation-select");
const controls = document.getElementById("controls");
const slider = document.getElementById("ball-count");
const countDisplay = document.getElementById("ball-count-display");

let animation;
let current = null;

slider.addEventListener("input", () => {
  countDisplay.textContent = slider.value;
  if (current === "bouncing") {
    bouncingBalls.init(ctx, canvas, parseInt(slider.value));
  }
});

select.addEventListener("change", () => {
  cancelAnimationFrame(animation);
  current = select.value;

  if (current === "bouncing") {
    controls.style.display = "block";
    bouncingBalls.init(ctx, canvas, parseInt(slider.value));
  } else {
    controls.style.display = "none";
    pendulum.init(ctx, canvas);
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

// Start initial animation
current = select.value;
controls.style.display = current === "bouncing" ? "block" : "none";
bouncingBalls.init(ctx, canvas, parseInt(slider.value));
animate();
