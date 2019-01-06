import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkingComponent } from './linking.component';

describe('LinkingComponent', () => {
  let component: LinkingComponent;
  let fixture: ComponentFixture<LinkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
