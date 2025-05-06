import { rotate } from "./utils.js";

export const bouncingBalls = {
  balls: [],
  canvas: null,
  ctx: null,

  init(ctx, canvas, count = 10) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.balls = [];

    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 10;
      this.balls.push({
        x: Math.random() * (canvas.width - 2 * radius) + radius,
        y: Math.random() * (canvas.height - 2 * radius) + radius,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        radius,
        mass: radius, // Let's set mass proportional to radius for more realistic collisions
      });
    }
  },

  draw() {
    const ctx = this.ctx;
    const canvas = this.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move balls
    for (const b of this.balls) {
      b.x += b.dx;
      b.y += b.dy;

      // Wall collision detection
      if (b.x - b.radius < 0) {
        b.x = b.radius;
        b.dx *= -1;
      }
      if (b.x + b.radius > canvas.width) {
        b.x = canvas.width - b.radius;
        b.dx *= -1;
      }
      if (b.y - b.radius < 0) {
        b.y = b.radius;
        b.dy *= -1;
      }
      if (b.y + b.radius > canvas.height) {
        b.y = canvas.height - b.radius;
        b.dy *= -1;
      }
    }

    // Ball-ball collisions
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        const b1 = this.balls[i];
        const b2 = this.balls[j];

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distance = Math.hypot(dx, dy);
        const minDist = b1.radius + b2.radius;

        if (distance < minDist) {
          // Move balls so they're just touching
          const overlap = 0.5 * (minDist - distance);
          const offsetX = (dx / distance) * overlap;
          const offsetY = (dy / distance) * overlap;

          b1.x -= offsetX;
          b1.y -= offsetY;
          b2.x += offsetX;
          b2.y += offsetY;

          // Collision response
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          // Rotate velocities to collision axis
          const v1 = rotate(b1.dx, b1.dy, sin, cos, true);
          const v2 = rotate(b2.dx, b2.dy, sin, cos, true);

          // 1D elastic collision
          const v1xAfter = (v1.x * (b1.mass - b2.mass) + 2 * b2.mass * v2.x) / (b1.mass + b2.mass);
          const v2xAfter = (v2.x * (b2.mass - b1.mass) + 2 * b1.mass * v1.x) / (b1.mass + b2.mass);

          // Keep y velocities
          const v1Final = { x: v1xAfter, y: v1.y };
          const v2Final = { x: v2xAfter, y: v2.y };

          // Rotate velocities back
          const v1Rotated = rotate(v1Final.x, v1Final.y, sin, cos, false);
          const v2Rotated = rotate(v2Final.x, v2Final.y, sin, cos, false);

          b1.dx = v1Rotated.x;
          b1.dy = v1Rotated.y;
          b2.dx = v2Rotated.x;
          b2.dy = v2Rotated.y;
        }
      }
    }

    // Draw balls
    for (const b of this.balls) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = "cyan";
      ctx.fill();
      ctx.closePath();
    }
  }
};
