export class PointResponse {
  x: number;
  y: number;
  r: number;
  belong: boolean;
  executionTime: any;
  executionDate: any;

  constructor(executionDate: any, executionTime: any, x: number, y: number, r: number, belong: boolean) {
    this.executionDate = executionDate;
    this.executionTime = executionTime;
    this.x = x;
    this.y = y;
    this.r = r;
    this.belong = belong;
  }
}
