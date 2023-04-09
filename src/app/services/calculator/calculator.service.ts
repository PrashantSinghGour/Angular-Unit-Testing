import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private loggerService: LoggerService) {
    //constructor is empty
  }

  add(n1: number, n2: number) {
    const result = n1 + n2;
    this.loggerService.log('Add method is called.')
    return result;
  }

  subtract(n1: number, n2: number) {
    const result = n1 - n2;
    this.loggerService.log('Subtract method is called.')
    return result;
  }
}
