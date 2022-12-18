import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { ThemableDirective } from './themable.directive';

@NgModule({
  declarations: [AppComponent, TodoItemComponent, TodoListFooterComponent, ThemeSwitcherComponent, ThemableDirective],
  imports: [BrowserModule, FormsModule, NgScrollbarModule, DragDropModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
