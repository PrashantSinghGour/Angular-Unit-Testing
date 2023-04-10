import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from '../logger/logger.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let mockLoggerService: LoggerService;
  beforeEach(() => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [CalculatorService,
        {
          provide: LoggerService,
          useValue: mockLoggerService
        }
      ]
    });
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add 2 numbers using', () => {
    const result = service.add(2, 3);
    expect(result).toBe(5);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
    expect(mockLoggerService.log).toHaveBeenCalledOnceWith('Add method is called.');
    // const spy = spyOn(service, 'add').and.callThrough();
    // service.add(2, 3);
    // expect(spy).toHaveBeenCalled();
    // expect(spy).toHaveBeenCalledWith(2, 3);
    // expect(spy(2, 4)).toBe(6);
  });

  it('should subtract 2 numbers', () => {
    const result = service.subtract(2, 3);
    expect(result).toBe(-1);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
    expect(mockLoggerService.log).toHaveBeenCalledOnceWith('Subtract method is called.');
    // const spy = spyOn(service, 'subtract').and.callThrough();
    // service.subtract(2, 3);
    // expect(spy).toHaveBeenCalled();
    // expect(spy).toHaveBeenCalledWith(2, 3);
    // expect(spy(2, 4)).toBe(-2);
  });
});
