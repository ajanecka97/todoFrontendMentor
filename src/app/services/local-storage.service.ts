import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public get(key: string): any {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
