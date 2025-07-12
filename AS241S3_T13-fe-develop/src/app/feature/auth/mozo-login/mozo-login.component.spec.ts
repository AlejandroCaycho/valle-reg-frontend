import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MozoLoginComponent } from './mozo-login.component';

describe('MozoLoginComponent', () => {
  let component: MozoLoginComponent;
  let fixture: ComponentFixture<MozoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MozoLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MozoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
