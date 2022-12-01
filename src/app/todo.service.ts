import { TodoFilter, TodoItem } from './app.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos$: Observable<TodoItem[]>;
  public activeTodosCount$: Observable<number>;
  public activeFilter$: Observable<TodoFilter>;

  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  private filterSubject = new BehaviorSubject<TodoFilter>(TodoFilter.All);

  constructor(localStorageService: LocalStorageService) {
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
    this.activeTodosCount$ = this.todosSubject.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.activeFilter$ = this.filterSubject.asObservable();

    this.todosSubject.next(localStorageService.get('todos') || []);

    this.todos$.subscribe((todos) => {
      localStorageService.set('todos', todos);
    });
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

  public clearCompleted() {
    const todos = this.todosSubject.getValue();
    this.todosSubject.next(todos.filter((t) => !t.isCompleted));
  }

  public setFilter(filter: TodoFilter) {
    this.filterSubject.next(filter);
  }
}
