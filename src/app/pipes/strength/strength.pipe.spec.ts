import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe: StrengthPipe;
  beforeAll(() => {
    pipe = new StrengthPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display weak if 5 is passed', () => {
    expect(pipe.transform(5)).toBe('5 (weak)');
  });

  it('should display strong if 11 is passed', () => {
    expect(pipe.transform(11)).toBe('11 (strong)');
  });

  it('should display weak if 50 is passed', () => {
    expect(pipe.transform(50)).toBe('50 (strongest)');
  });

});
