import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverUsersComponent } from './popover-users.component';

describe('PopoverUsersComponent', () => {
  let component: PopoverUsersComponent;
  let fixture: ComponentFixture<PopoverUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
