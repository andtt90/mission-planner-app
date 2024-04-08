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
  stopDraw = false;
  image = new Image();

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
    this.image.src = '../../../assets/images/robot-24.png';
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

  drawMissionAnimation(index: any) {
    let drawInProgress = false;
    let higherX = this.pointsArray[index].x <= this.pointsArray[index+1].x;
    let higherY = this.pointsArray[index].y <= this.pointsArray[index+1].y;
    let lowerX = this.pointsArray[index].x >= this.pointsArray[index+1].x;
    let lowerY = this.pointsArray[index].y >= this.pointsArray[index+1].y;
    while (!drawInProgress) {
      drawInProgress = true;
      let drawX = this.pointsArray[index].x;
      let drawY = this.pointsArray[index].y;
      let intervalId = setInterval(() => {
        if (higherX && higherY && drawX >= this.pointsArray[index + 1].x && drawY >= this.pointsArray[index + 1].y) {
          clearInterval(intervalId);
          index++;
          drawInProgress = false;
          if (index < this.pointsArray.length - 1) {
            this.drawMissionAnimation(index);
          }
        }

        if (!this.stopDraw) {
          this.context?.clearRect(0, 0, 500, 500);
          this.drawMissionPoints();
          this.image && this.context?.drawImage(this.image, drawX % 500, drawY % 500, 30, 30);
          higherX && drawX < this.pointsArray[index + 1].x && drawX++;
          higherY && drawY < this.pointsArray[index + 1].y && drawY++;
        }

        if (lowerX && lowerY && drawX <= this.pointsArray[index + 1].x && drawY <= this.pointsArray[index + 1].y) {
          clearInterval(intervalId);
          index++;
          drawInProgress = false;
          if (index < this.pointsArray.length - 1) {
            this.drawMissionAnimation(index);
          }
        }

        if (!this.stopDraw) {
          this.context?.clearRect(0, 0, 500, 500);
          this.drawMissionPoints();          
          this.image && this.context?.drawImage(this.image, drawX % 500, drawY % 500, 30, 30);
          lowerX && drawX > this.pointsArray[index + 1].x && drawX--;
          lowerY && drawY > this.pointsArray[index + 1].y && drawY--;
        }
      }, 20);
    }
  }

  stopDrawing() {
    this.stopDraw = true;
  }

  startDrawing() {
    if (this.stopDraw) {
      this.stopDraw = false;
    } else {
      this.drawMissionAnimation(0);
    }  
    this.changeDetector.detectChanges();
  }
}
