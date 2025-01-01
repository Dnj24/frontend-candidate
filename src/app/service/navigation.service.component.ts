import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private isNavigateBackSubject = new BehaviorSubject<boolean>(false);
  isNavigateBack$ = this.isNavigateBackSubject.asObservable();

  constructor() {}

  goBack() {
    this.isNavigateBackSubject.next(true);
  }

}