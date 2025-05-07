export const pendulum = {
  pendulums: [],
  numPendulums: 10,
  length: 160,
  origin: { x: 300, y: 60 },
  time: 0,

  init(ctx, canvas, count = 10) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.origin.x = canvas.width / 2;
    this.numPendulums = count;
    this.time = 0;
  
    this.pendulums = Array.from({ length: this.numPendulums }, (_, i) => ({
      frequency: 0.03 + i * 0.001,
      initialAngle: Math.PI / 4,
      color: `hsl(${(i * 360) / this.numPendulums}, 80%, 60%)`
    }));
  },
  

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.pendulums.forEach((p, i) => {
      const angle = p.initialAngle * Math.cos(p.frequency * this.time);
      const x = this.origin.x + this.length * Math.sin(angle);
      const y = this.origin.y + this.length * Math.cos(angle);

      // Rod
      ctx.beginPath();
      ctx.moveTo(this.origin.x, this.origin.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Ball
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;
    });

    this.time += 1; // Time steps for animation
  }
};
