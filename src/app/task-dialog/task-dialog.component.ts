import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.less']
})
export class TaskDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl(''),
      color: new FormControl('')
    })
  }

  public save(){
    this.dialogRef.close(this.form.value);
  }

  public close(): void{
    this.dialogRef.close();
  }

}
