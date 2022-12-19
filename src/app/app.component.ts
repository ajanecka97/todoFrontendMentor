import { TodoService } from './services/todo.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todoFrontendMentor';

  constructor(public todoService: TodoService) {}
  ngOnInit(): void {
    document.body.setAttribute('data-theme', 'light');
  }

  drop(event: CdkDragDrop<string[]>) {
    this.todoService.moveItem(event);
  }
}
