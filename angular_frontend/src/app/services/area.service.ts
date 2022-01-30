import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor() { }

  public isRectangleTrigger(x : number, y : number, r: number): boolean {
    return x <= r  && x >= 0 && y <= r && y >= 0;
  }

  public isCircleTrigger(x : number, y : number, r: number): boolean {
      return (Math.pow(x, 2) + Math.pow(y, 2)) <= ((Math.pow(r, 2))) / 4 && (x <= 0) && (y >= 0);
  }

  public isTriangleTrigger(x : number, y : number, r: number): boolean {
    return x >= 0 && y <= 0 && (r + r / 10 - x >= -2 * y);
  }

  public isBelong(x : number, y : number, r: number): boolean {
    return this.isRectangleTrigger(x, y, r) || this.isCircleTrigger(x, y, r) || this.isTriangleTrigger(x, y, r);
  }

}
