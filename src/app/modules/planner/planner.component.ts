import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { Point } from '../../shared/types';
import { POINTS_ARRAY_KEY } from '../../shared/constants';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.css'
})

export class PlannerComponent {
  displayedColumns: string[] = ['id', 'name', 'x', 'y'];
  dataSource: Point[] = [];
  pointForm = new FormGroup({
    name: new FormControl('', Validators.required),
    x: new FormControl('', Validators.required),
    y: new FormControl('', Validators.required)
  })

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getDataSource();
  }

  onAdd = () => {
    this.dataSource.push({
      id: this.getNewPointId(),
      name: this.pointForm.controls.name.value ?? '',
      x: parseInt(this.pointForm.controls.x.value ?? ''),
      y: parseInt(this.pointForm.controls.y.value ?? '')
    })
    this.localStorageService.setItem(POINTS_ARRAY_KEY, JSON.stringify(this.dataSource));
    this.getDataSource();
    this.pointForm.reset();
  }

  getNewPointId = () => {
    let highestId = 0;
    this.dataSource.forEach( (elem: any) => {
      if (elem.id >= highestId) {
        highestId = elem.id;
      }
    })
    return highestId+1;
  }

  getDataSource = () => {
    let pointsArrayValue = this.localStorageService.getItem(POINTS_ARRAY_KEY);
    if (pointsArrayValue) {
      this.dataSource = JSON.parse(pointsArrayValue);
    }
  }
}
