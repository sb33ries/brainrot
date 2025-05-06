export const pendulum = {
    angle: Math.PI / 4,
    length: 160,
    origin: { x: 300, y: 50 },
    aVel: 0,
    aAcc: 0,
    damping: 0.995,
    gravity: 0.5,

    init(ctx, canvas) {
      this.ctx = ctx;
      this.canvas = canvas;
    },

    draw() {
      const ctx = this.ctx;

      this.aAcc = (-1 * this.gravity / this.length) * Math.sin(this.angle);
      this.aVel += this.aAcc;
      this.aVel *= this.damping;
      this.angle += this.aVel;

      const x = this.origin.x + this.length * Math.sin(this.angle);
      const y = this.origin.y + this.length * Math.cos(this.angle);

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      ctx.beginPath();
      ctx.moveTo(this.origin.x, this.origin.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = "lime";
      ctx.fill();
      ctx.closePath();
    }
  };
  