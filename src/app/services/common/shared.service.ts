import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private idSource = new BehaviorSubject<string>(null);
  currentId = this.idSource.asObservable();

  changeId(id: string) {
    this.idSource.next(id);
  }
}
