import { Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  intervalId?: any;

  constructor(private localStorageService: LocalStorageService, private changeDetector: ChangeDetectorRef,) { }

  ngAfterViewInit(): void {
    let pointsArrayValue = this.localStorageService.getItem(POINTS_ARRAY_KEY)
    pointsArrayValue && (this.pointsArray = JSON.parse(pointsArrayValue));
    this.changeDetector.detectChanges();
    if (this.canvasElem) {
      this.canvasElem.nativeElement.width = 500;
      this.canvasElem.nativeElement.height = 500;
      this.context = this.canvasElem?.nativeElement.getContext('2d');
      this.drawMissionPoints();

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
    this.changeDetector.detectChanges();
  }

  drawMissionAnimation(index: number) {
      this.drawPath(index, this.pointsArray[index].x, this.pointsArray[index].y, this.pointsArray[index+1].x, this.pointsArray[index+1].y);
      this.changeDetector.detectChanges();
  }

  drawPath(index: number,startX: number, startY: number, endX: number, endY: number) {
    let drawX = startX;
    let drawY = startY;    
     this.intervalId = setInterval(() => {
      if (drawX >= endX && drawY >= endY) {
        clearInterval(this.intervalId);
      }
      this.context?.clearRect(0, 0, 500, 500);
      this.drawMissionPoints();
      this.drawCircle(drawX % 500, drawY % 500);
      drawX < endX && drawX++;
      drawY < endY && drawY++;
    }, 25);    
    if (index < this.pointsArray.length-2) {
      this.drawMissionAnimation(index+1);
    }
  }

  drawCircle(x: any, y: any) {
    if (this.context) {
      this.context.beginPath();
      this.context.arc(x, y, 5, 0, 2 * Math.PI);
      this.context.fillStyle = "#e0544c";
      this.context.fill();
    }
  }

  stopDrawing() {
    clearInterval(this.intervalId);
  }

  startDrawing() {
    this.drawMissionAnimation(0);
    this.changeDetector.detectChanges();
  }
}
