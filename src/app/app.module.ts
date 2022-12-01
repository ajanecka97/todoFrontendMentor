import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';

@NgModule({
  declarations: [AppComponent, TodoItemComponent, TodoListFooterComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
