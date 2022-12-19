import { ThemeService } from '../services/theme.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  public buttonIcon = '../../assets/icon-sun.svg';
  constructor(public themeService: ThemeService) {
    this.themeService.currentTheme$.subscribe((theme: string) => {
      this.buttonIcon =
        theme === 'dark'
          ? '../../assets/icon-sun.svg'
          : '../../assets/icon-moon.svg';
    });
  }
}
