import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  public message: string[] = [];

  constructor() {
    //constructor is empty
  }

  log(message: string) {
    this.message.push(message);
  }
}
