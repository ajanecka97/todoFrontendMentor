import { ThemeService } from './theme.service';
import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appThemable]',
})
export class ThemableDirective implements OnDestroy {
  private themeSubscription: Subscription;
  constructor(themeService: ThemeService, private el: ElementRef) {
    this.themeSubscription = themeService.currentTheme$.subscribe((theme) => {
      this.el.nativeElement.setAttribute('data-theme', theme);
    });
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
