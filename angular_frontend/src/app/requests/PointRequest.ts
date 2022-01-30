export class PointRequest {
  x: number;
  y: number;
  r: number;
  time: number;

  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.time = Date.now();
  }
}
