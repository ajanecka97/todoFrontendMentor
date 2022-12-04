import { TodoService } from './todo.service';
import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todoFrontendMentor';

  constructor(public todoService: TodoService) {}

  drop(event: CdkDragDrop<string[]>) {
    this.todoService.moveItem(event);
  }
}
