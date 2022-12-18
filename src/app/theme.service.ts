import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public currentTheme$: Observable<string>;

  private currentThemeSubject = new BehaviorSubject<string>('light');

  constructor() {
    this.currentTheme$ = this.currentThemeSubject.asObservable();

    const theme = localStorage.getItem('theme');
    this.currentThemeSubject.next(theme || 'light');

    this.currentTheme$.subscribe((theme) => {
      localStorage.setItem('theme', theme);
      document.body.setAttribute('data-theme', theme);
    });
  }

  public toggleTheme(): void {
    const currentTheme = this.currentThemeSubject.getValue();
    if (currentTheme === 'light') {
      this.currentThemeSubject.next('dark');
    } else {
      this.currentThemeSubject.next('light');
    }
  }
}
