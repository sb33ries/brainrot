export const complex = (() => {
    let ctx, canvas;
  
    let theta1 = 0;
    let theta2 = 0;
  
    let length1 = 120;
    let length2 = 60;
    let speed1 = 0.008;
    let speed2 = 0.021;
  
    const trail = [];
    const maxTrailLength = 2000;
  
    let traceColor = "cyan";
  
    function randomPrettyColor() {
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 100%, 65%)`;
    }
  
    function setParams(params) {
      length1 = params.length1;
      length2 = params.length2;
      speed1 = params.speed1;
      speed2 = params.speed2;
    }
  
    function changeColor() {
      traceColor = randomPrettyColor();
    }
  
    function init(c, canv) {
      ctx = c;
      canvas = canv;
      theta1 = 0;
      theta2 = 0;
      trail.length = 0;
  
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  
    function draw() {
      theta1 += speed1;
      theta2 += speed2;
  
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
  
      const x1 = cx + length1 * Math.cos(theta1);
      const y1 = cy + length1 * Math.sin(theta1);
  
      const x2 = x1 + length2 * Math.cos(theta2);
      const y2 = y1 + length2 * Math.sin(theta2);
  
      trail.push({ x: x2, y: y2 });
      if (trail.length > maxTrailLength) trail.shift();
  
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      drawArm(cx, cy, x1, y1, "white");
      drawArm(x1, y1, x2, y2, "deepskyblue");
  
      drawTrail(traceColor);
      drawGlowPoint(x2, y2, traceColor);
    }
  
    function drawArm(x0, y0, x1, y1, color) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  
    function drawTrail(color) {
      if (trail.length < 2) return;
  
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  
    function drawGlowPoint(x, y, color) {
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  
    return { init, draw, setParams, changeColor };
  })();
  