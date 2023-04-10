import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

describe('Http client testing module', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let testUrl = '/data';
  type Data = {
    name: string;
  };
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should call test url with get req', (done) => {
    const testData: Data = { name: 'Prashant test dev' };
    httpClient.get<Data>(testUrl).subscribe((data) => {
      expect(data).toEqual(testData)
      done();
    });
    const req = httpTestingController.expectOne(testUrl);
    req.flush(testData);
    expect(req.request.method).toBe('GET');
  });

  it('should call test url req multiple times', () => {
    const testData: Data[] = [{ name: 'BINA test dev' }, { name: 'Prashant test dev' }];
    httpClient.get<Data[]>(testUrl).subscribe((data: Data[]) => {
      expect(data.length).toBe(0);
    });
    httpClient.get<Data[]>(testUrl).subscribe((data: Data[]) => {
      expect(data.length).toBe(1);
    });
    httpClient.get<Data[]>(testUrl).subscribe((data: Data[]) => {
      expect(data.length).toBe(2);
    });
    const req = httpTestingController.match(testUrl);
    expect(req.length).toBe(3);

    req[0].flush([]);
    req[1].flush([testData[0]]);
    req[2].flush(testData);
  });
});
