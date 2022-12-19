import { TodoFilter } from './../app.models';
import { TodoService } from '../services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list-footer',
  templateUrl: './todo-list-footer.component.html',
  styleUrls: ['./todo-list-footer.component.scss'],
})
export class TodoListFooterComponent implements OnInit {
  public todoFilter = TodoFilter;
  constructor(public todoService: TodoService) {}

  ngOnInit(): void {}
}
