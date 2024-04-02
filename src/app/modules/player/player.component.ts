import { Component, ElementRef, ViewChild } from '@angular/core';
import { Point } from '../../shared/types';
import { LocalStorageService } from '../../services/local-storage.service';
import { POINTS_ARRAY_KEY } from '../../shared/constants';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  @ViewChild('playerCanvas')
  canvasElem: ElementRef<HTMLCanvasElement> | undefined;
  pointsArray: Point[] = [];
  context: CanvasRenderingContext2D | undefined | null;

  constructor(private localStorageService: LocalStorageService) { }

  ngAfterViewInit(): void {
    let pointsArrayValue = this.localStorageService.getItem(POINTS_ARRAY_KEY)
    pointsArrayValue && (this.pointsArray = JSON.parse(pointsArrayValue));
    if (this.canvasElem) {
      this.canvasElem.nativeElement.width = 500;
      this.canvasElem.nativeElement.height = 500;
      this.context = this.canvasElem?.nativeElement.getContext('2d');
      this.drawMissionPoints();
      // this.drawMissionAnimation();
    }
  }

  drawMissionPoints(): void {
    if (this.context) {
      this.context.fillStyle = '#e0544c';
      this.context.font = "bold 15px Arial";
      this.pointsArray.forEach((point: Point) => {
        this.context?.fillText(`(${point.id})`, point.x, point.y);
      })
    }
  }

  drawMissionAnimation() {
    for (let i = 0; i < this.pointsArray.length-1; i++) {
      this.drawPath(this.pointsArray[i].x, this.pointsArray[i].y, this.pointsArray[i+1].x, this.pointsArray[i+1].y);
    }
  }

  drawPath(startX: number, startY: number, endX: number, endY: number) {
    let drawX = startX;
    let drawY = startY;    
    let intervalId = setInterval(() => {
      if (drawX >= endX && drawY >= endY) {
        clearInterval(intervalId);
      }
      this.context?.clearRect(0, 0, 500, 500);
      this.drawMissionPoints();
      this.drawCircle(drawX % 500, drawY % 500);
      drawX < endX && drawX++;
      drawY < endY && drawY++;
    }, 25);    
  }

  drawCircle(x: any, y: any) {
    if (this.context) {
      this.context.beginPath();
      this.context.arc(x, y, 10, 0, 2 * Math.PI);
      this.context.fillStyle = "#e0544c";
      this.context.fill();
    }
  }
}
