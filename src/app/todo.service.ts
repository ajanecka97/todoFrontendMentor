import { TodoFilter, TodoItem } from './app.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos$: Observable<TodoItem[]>;
  public activeTodosCount$: Observable<number>;
  public activeFilter$: Observable<TodoFilter>;

  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  private filterSubject = new BehaviorSubject<TodoFilter>(TodoFilter.All);

  private nextId: number;

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

    this.nextId =
      this.todosSubject
        .getValue()
        .reduce((acc, current) => (acc > current.id ? acc : current.id), 0) + 1;
  }

  public addTodo(todoTitle: string) {
    const todos = this.todosSubject.getValue();
    this.todosSubject.next([
      ...todos,
      {
        id: this.nextId++,
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

  public moveItem(event: CdkDragDrop<string[]>) {
    const todos = this.todosSubject.getValue();
    moveItemInArray(todos, event.previousIndex, event.currentIndex);
    this.todosSubject.next(todos);
  }

  public clearCompleted() {
    const todos = this.todosSubject.getValue();
    this.todosSubject.next(todos.filter((t) => !t.isCompleted));
  }

  public setFilter(filter: TodoFilter) {
    this.filterSubject.next(filter);
  }
}
