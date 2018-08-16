import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardFrameComponent } from './scoreboard-frame.component';
import { By } from '@angular/platform-browser';

describe('ScoreboardFrameComponent', () => {
  let component: ScoreboardFrameComponent;
  let fixture: ComponentFixture<ScoreboardFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreboardFrameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when frame is set', () => {
    beforeEach(() => {
      component.frame = {
        first: 1,
        second: 2,
        score: 3,
        index: 0,
      };
      fixture.detectChanges();
    });

    it('should render frame index', () => {
      expect(fixture.debugElement.query(By.css('.frame-index'))).toBeTruthy();
    });

    it('frame index should contain 1', () => {
      expect(
        fixture.debugElement.query(By.css('.frame-index')).nativeElement
          .textContent,
      ).toEqual('1');
    });

    describe('frame is not active', () => {
      beforeEach(() => {
        component.active = false;
        fixture.detectChanges();
      });

      it(`should not have 'active' css class appended to frame index`, () => {
        expect(
          fixture.debugElement.query(By.css('.frame-index.active')),
        ).toBeFalsy();
      });
    });

    describe('frame is active', () => {
      beforeEach(() => {
        component.active = true;
        fixture.detectChanges();
      });

      it(`should have 'active' css class appended to frame index`, () => {
        expect(
          fixture.debugElement.query(By.css('.frame-index.active')),
        ).toBeTruthy();
      });
    });

    it('should render first roll', () => {
      expect(fixture.debugElement.query(By.css('.first-roll'))).toBeTruthy();
    });

    it('should render second roll', () => {
      expect(fixture.debugElement.query(By.css('.second-roll'))).toBeTruthy();
    });

    it('should render total score', () => {
      expect(fixture.debugElement.query(By.css('.total-score'))).toBeTruthy();
    });

    describe('not the tenth', () => {
      beforeEach(() => {
        component.tenth = false;
        fixture.detectChanges();
      });

      it('should not render third roll', () => {
        expect(fixture.debugElement.query(By.css('.third-roll'))).toBeFalsy();
      });
    });

    describe('the tenth', () => {
      beforeEach(() => {
        component.frame = {
          first: 1,
          second: 9,
          third: 3,
          score: 13,
          index: 9,
        };
        component.tenth = true;
        fixture.detectChanges();
      });

      it('should render third roll', () => {
        expect(fixture.debugElement.query(By.css('.third-roll'))).toBeTruthy();
      });

      it(`should have 'tenth' appended to host`, () => {
        expect(fixture.debugElement.nativeElement.className).toContain(
          'tenth',
        );
      });

      it('total score should contain', () => {
        expect(
          fixture.debugElement.query(By.css('.third-roll')).nativeElement
            .textContent,
        ).toEqual('3');
      });
    });
  });
});
