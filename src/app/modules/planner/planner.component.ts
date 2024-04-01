import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const ELEMENT_DATA = [
  {id: 1, name: 'name1', x: 1, y: 1},
  {id: 1, name: 'name2', x: 1, y: 1},
  {id: 1, name: 'name3', x: 1, y: 1},
  {id: 1, name: 'name4', x: 1, y: 1},
];


@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.css'
})
export class PlannerComponent {
  displayedColumns: string[] = ['id', 'name', 'x', 'y'];
  dataSource = ELEMENT_DATA;
  pointForm = new FormGroup({
    name: new FormControl('', Validators.required),
    x: new FormControl('', Validators.required),
    y: new FormControl('', Validators.required)
  })

  onAdd = () => {
    console.log(this.pointForm.controls.name.value);
    console.log(this.pointForm.controls.x.value);
    console.log(this.pointForm.controls.y.value);
  }
}
