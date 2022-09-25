import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerChangeDialogComponent } from './layer-change-dialog.component';

describe('LayerChangeDialogComponent', () => {
  let component: LayerChangeDialogComponent;
  let fixture: ComponentFixture<LayerChangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerChangeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayerChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
