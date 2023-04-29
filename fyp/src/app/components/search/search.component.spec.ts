import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('SearchFoundComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Pennatula';
    input.dispatchEvent(new Event('input'));

    const req = httpTestingController.expectOne('/api/organism?genus=Pennatula');
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush({
      id: 1,
      phylum: "Cnidaria",
      class: "Anthozoa",
      order: "Scleractinia",
      family: "Acroporidae",
      genus: "Acropora"
    });

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();

    const searchButton = fixture.nativeElement.querySelector('#search_button');
    searchButton.dispatchEvent(new Event('click'));
    expect(fixture.nativeElement.querySelector('.genus').textContent).toBe('Pennatula');
  })
});
