import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have no message in the beginning', () => {
    const messageCount = service.message.length;
    expect(messageCount).toEqual(0);
  });

  it('should add the message on log is called', () => {
    service.log('Testing log');
    const messageCount = service.message.length;
    expect(messageCount).toEqual(1);
  });

  it('should remove the all message once clear is called', () => {
    service.log('Testing log');
    service.clear();
    const messageCount = service.message.length;
    expect(messageCount).toEqual(0);
  });
});
