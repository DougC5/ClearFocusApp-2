import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TodoService } from './todos.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  enteredValue = '';
  private mode = 'create';
  private postId: string;
  todo: Todo;

  onAddToDo(form: NgForm) {
    if (form.value.toDoInput <= 0) {
      return;
    }
    if (this.mode === 'create'){
      this.todoService.addTodo(form.value.toDoInput);
    } else{
      this.todoService.updateTodo(
        this.postId,
        form.value.toDoInput
      );
    }
    
    form.resetForm();
  }

  constructor(public todoService: TodoService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('todoId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('todoId');
        this.todo = this.todoService.getTodo(this.postId);

      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

}
