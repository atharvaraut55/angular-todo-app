import { Component, OnInit } from '@angular/core';
import { ResTodo, Todo } from './Todo';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  getData: Todo[] = [];
  newTask: string = '';
  formValue!: FormGroup;
  isDataLoaded = true;

  constructor(private Api: ApiService, private formBL: FormBuilder,
    private router: Router) { }


  reloadPage(): void {
    window.location.reload();
  }

  addTask(value: any) {
    this.newTask = value;
    if (this.newTask.trim() !== '') {


      const newTodoItem: Todo = {
        id: Date.now().toString(),
        task: this.newTask,
        completed: false
      }
      // alert("Society Member Added Successfully");

      this.Api.postdata(newTodoItem).subscribe(res => {
        this.formValue.reset();
        console.log(res)
        // confirm("task is added")
        // alert("Task is added");
      });

      this.reloadPage();
    }
  }


  async todoTask() {
    (await this.Api.getTask()).subscribe((res: any) => {
      this.getData = res
    })
  }


  
  ngOnInit(): void {

    this.formValue = this.formBL.group({
      newTask: ['']
    })

    this.todoTask();
    // this.reloadPage();
  }

  toggleTask(id: string, data: Todo[]) {
    for (let datas of data) {
      if (id == datas.id) {
        datas.completed = !datas.completed;
        this.Api.toggle(id, datas).subscribe(res => {
          console.log("Response inside toggle task function " + res)
        })
        break;
      }
    }
    console.log(data)
  }


  deleteTask(id: string) {
    this.Api.deleteTask(id).subscribe(res => {
      this.formValue.reset();
      alert("Task is Deleted");
      this.formValue.reset();
      this.reloadPage();
    })

  }


}
