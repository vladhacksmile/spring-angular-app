import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { ToastService } from '../services/toast.service';
import { TableService } from '../services/table.service';
import {AreaService} from "../services/area.service";
import { PointRequest } from '../requests/PointRequest';
import { PointResponse } from '../responses/PointResponse';

@Component({
  selector: 'app-user',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  response: PointResponse[] = [];
  form: any = {};
  info: any;

  @ViewChild('graphCanvas', { static: false }) canvas!: ElementRef;
  ctx!: CanvasRenderingContext2D;

  constructor(public areaService: AreaService, public toastService: ToastService, private token: TokenStorageService, private userService: TableService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername()
    };
    this.userService.getPoints().subscribe(
      data => {
        this.response = data;
        for (let request of this.response) {
          let pointX = 130 + (request.x * 80) / request.r;
          let pointY = 130 - (request.y * 80) / request.r;
          this.drawPoint(pointX, pointY, request.belong);
        }
      },
      error => {
        if(!error.ok)
          this.showDanger("Невозможно обработать запрос! Сервер недоступен!")
        else
          this.showDanger(`${error.status}: ${error.error.message}`);
      }
    );
  }

  ngAfterViewInit() {
    this.ctx = <CanvasRenderingContext2D> this.canvas.nativeElement.getContext("2d");
    this.drawGraph();
  }

  showStandard(message: string) {
    this.toastService.show(message);
  }

  showSuccess(message: string) {
    this.toastService.show(message, { classname: 'bg-success text-light', delay: 5000 });
  }

  showDanger(message: string) {
    this.toastService.show(message, { classname: 'bg-danger text-light', delay: 5000 });
  }

  drawGraph() {
    // Нарисуем круг
    this.ctx.beginPath();
    this.ctx.moveTo(130, 130);
    this.ctx.lineTo(130, 130 + Math.sin(0));
    this.ctx.arc(130, 130, 40, Math.PI, - Math.PI / 2);
    this.ctx.closePath();
    this.ctx.strokeStyle = "#0badea";
    this.ctx.fillStyle = "#0badea";
    this.ctx.stroke();
    this.ctx.fill();

    // Нарисуем треугольник
    this.ctx.beginPath();
    this.ctx.moveTo(130, 130);
    this.ctx.lineTo(210, 130);
    this.ctx.lineTo(130, 175);
    this.ctx.closePath();
    this.ctx.strokeStyle = '#0badea';
    this.ctx.stroke();
    this.ctx.fillStyle = "#0badea";
    this.ctx.fill();

    // Нарисуем прямоугольник
    this.ctx.fillRect(130, 50, 80, 80);

    this.ctx.beginPath();

    // Ось X (линии)
    this.ctx.moveTo(0, 130);
    this.ctx.lineTo(260, 130);

    // Ось Y (линии)
    this.ctx.moveTo(130, 0);
    this.ctx.lineTo(130, 260);

    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();

    this.ctx.font = "18px Arial";
    this.ctx.fillStyle = "#000"

    /* Треугольники к осям */

    // Первый треугольник
    this.ctx.beginPath();
    this.ctx.moveTo(0, 130);
    this.ctx.lineTo(5, 135);
    this.ctx.lineTo(5, 125);
    this.ctx.fill();

    // Второй треугольник
    this.ctx.beginPath();
    this.ctx.moveTo(130, 0);
    this.ctx.lineTo(135, 5);
    this.ctx.lineTo(125, 5);
    this.ctx.fill();

    // Третий треугольник
    this.ctx.beginPath();
    this.ctx.moveTo(260, 130);
    this.ctx.lineTo(255, 125);
    this.ctx.lineTo(255, 135);
    this.ctx.fill();

    // Четвертый треугольник
    this.ctx.beginPath();
    this.ctx.moveTo(130, 260);
    this.ctx.lineTo(125, 255);
    this.ctx.lineTo(135, 255);
    this.ctx.fill();

    // Ось X (координаты)
    this.ctx.fillText("R/2", 170, 128);
    this.ctx.fillText("R", 210, 128);

    this.ctx.fillText("-R/2", 90, 128);
    this.ctx.fillText("-R", 50, 128);

    // Ось Y (координаты)
    this.ctx.fillText("R/2", 133, 80);
    this.ctx.fillText("R", 133, 40);

    this.ctx.fillText("-R/2", 133, 180);
    this.ctx.fillText("-R", 133, 220);
  }

  drawPoint(posX: number, posY: number, belong: boolean) {
    this.ctx.beginPath();
    this.ctx.moveTo(posX, posY);
    this.ctx.arc(posX, posY, 3,0, 360);
    this.ctx.closePath();
    this.ctx.fillStyle = belong ? "#61f200" : "#ff0000";
    this.ctx.fill();
  }

  sendCanvasPoint(e: MouseEvent) {
    if(this.form.r) {
      if(this.form.r < 1) {
        this.showDanger("Радиус должен быть положительным числом!");
        return;
      }
      let cordX = ((e.offsetX < 130 ? (130 - e.offsetX) * -1 : e.offsetX - 130) / 80) * this.form.r;
      let cordY = ((e.offsetY > 130 ? (e.offsetY - 130) * -1 : 130 - e.offsetY) / 80) * this.form.r;
      this.userService.addPoint(new PointRequest(cordX, cordY, this.form.r)).subscribe(
        data => {
          this.showSuccess("Точка (" + data.x + "; " + data.y + ") проверена! Результат: " + (data.belong ? "принадлежит" : "не принадлежит"));
          this.response.push(data);
          let pointX = 130 + (data.x * 80) / data.r;
          let pointY = 130 - (data.y * 80) / data.r;
          this.drawPoint(pointX, pointY, data.belong);
        },
        error => {
          if(!error.ok)
            this.showDanger("Невозможно обработать запрос! Сервер недоступен!")
          else
            this.showDanger(`${error.status}: ${error.error.message}`);
        }
      );
    } else {
      this.showDanger("Выберите радиус!");
    }
  }

  onSubmit() {
    if(this.form.x >= -5 && this.form.x <= 5 && this.form.y >= -5 && this.form.y <= 5 && this.form.r) {
      if(this.form.r < 1) {
        this.showDanger("Радиус должен быть положительным числом!");
        return;
      } else if(this.form.r > 0 && this.form.r <= 5) {
      this.userService.addPoint(new PointRequest(this.form.x, this.form.y, this.form.r)).subscribe(
        data => {
          this.showSuccess("Точка (" + data.x + "; " + data.y + ") проверена! Результат: " + (data.belong ? "принадлежит" : "не принадлежит"));
          this.response.push(data);
          let pointX = 130 + (data.x * 80) / data.r;
          let pointY = 130 - (data.y * 80) / data.r;
          this.drawPoint(pointX, pointY, data.belong);
        },
        error => {
          if(!error.ok)
            this.showDanger("Невозможно обработать запрос! Сервер недоступен!")
          else
            this.showDanger(`${error.status}: ${error.error.message}`);
        }
      );
        } else {
          this.showDanger("Радиус должен быть не больше 5!");
        }
    } else {
      this.showDanger("Заполните поля формы!");
    }
  }

  clearGraph() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  redrawGraph() {
    this.clearGraph();
    this.drawGraph();
  }

  onClearPoints() {
    this.userService.clearPoints().subscribe(
      data => {
        this.showStandard(data.message);
        this.response = [];
        this.redrawGraph();
      },
      error => {
        if(!error.ok)
          this.showDanger("Невозможно обработать запрос! Сервер недоступен!")
        else
          this.showDanger(`${error.status}: ${error.error.message}`);
      }
    )
  }

  radiusChange(e: any) {
    this.redrawGraph();
    let r = e.target.value;
    for (let request of this.response) {
      let pointX = 130 + (request.x * 80) / r;
      let pointY = 130 - (request.y * 80) / r;
      this.drawPoint(pointX, pointY, (this.areaService.isBelong(request.x, request.y, r)));
    }
  }
}
