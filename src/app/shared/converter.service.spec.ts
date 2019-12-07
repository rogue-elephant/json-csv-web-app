/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConverterService } from './converter.service';

describe('Service: Converter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConverterService]
    });
  });

  it('should ...', inject([ConverterService], (service: ConverterService) => {
    expect(service).toBeTruthy();
  }));
});
