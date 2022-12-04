import { TodoService } from '../todo.service';
import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../app.models';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() public item?: TodoItem;
  @Input() public inputMode = false;

  public newTodoTitle = '';

  public get completedClass() {
    if (this.item == null) return '';
    return this.item.isCompleted ? 'completed' : '';
  }

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {}

  public addTodo() {
    this.todoService.addTodo(this.newTodoTitle);
    this.newTodoTitle = '';
  }
}
