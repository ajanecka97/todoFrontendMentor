import { TodoFilter, TodoItem } from './app.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos$: Observable<TodoItem[]>;

  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  private filterSubject = new BehaviorSubject<TodoFilter>(TodoFilter.All);

  constructor() {
    this.todos$ = combineLatest([this.todosSubject, this.filterSubject]).pipe(
      map(([todos, filter]) => {
        switch (filter) {
          case TodoFilter.Active:
            return todos.filter((todo) => !todo.isCompleted);
          case TodoFilter.Completed:
            return todos.filter((todo) => todo.isCompleted);
          default:
            return todos;
        }
      })
    );
  }

  public addTodo(todoTitle: string) {
    const todos = this.todosSubject.getValue();
    this.todosSubject.next([
      ...todos,
      {
        id: todos.length + 1,
        title: todoTitle,
        isCompleted: false,
      },
    ]);
  }

  public removeTodo(todo: TodoItem) {
    const todos = this.todosSubject.getValue();
    this.todosSubject.next(todos.filter((t) => t.id !== todo.id));
  }

  public toggleTodo(todo: TodoItem) {
    const todos = this.todosSubject.getValue();
    this.todosSubject.next(
      todos.map((t) =>
        t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  }

  public setFilter(filter: TodoFilter) {
    this.filterSubject.next(filter);
  }
}
