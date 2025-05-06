// utils.js
export function rotate(x, y, sin, cos, reverse = false) {
  return reverse
    ? { x: x * cos + y * sin, y: y * cos - x * sin }
    : { x: x * cos - y * sin, y: y * cos + x * sin };
}
