import { Component } from '@angular/core';
import { TodoItem } from './app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todoFrontendMentor';

  public items: TodoItem[] = [
    { id: 1, title: 'item 1', isCompleted: false },
    { id: 2, title: 'item 2', isCompleted: false },
    { id: 3, title: 'item 3', isCompleted: true },
  ];
}
