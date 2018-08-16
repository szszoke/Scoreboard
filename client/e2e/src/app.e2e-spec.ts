import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display title in header', () => {
    expect(page.getHeaderText()).toEqual('Bowling scoreboard');
  });

  it('should display total score', () => {
    expect(page.getTotalScore().isPresent()).toBeTruthy();
  });

  it('should display 10 scoreboard frames', () => {
    expect(page.getScoreboardFrames().count()).toBe(10);
  });

  it('should display 11 buttons for inputting scores', () => {
    expect(page.getScoreInputButtons().count()).toBe(11);
  });

  it('should display new game button', () => {
    expect(page.getNewGameButton().isPresent()).toBeTruthy();
  });

  describe('initially', () => {
    it('should not display game over message', () => {
      expect(page.getGameOverMessage().isPresent()).toBeFalsy();
    });
  });

  describe('first frame', () => {
    it('should contain nothing', async () => {
      const frameContent = await page.getFrameContent(0);

      expect(frameContent.first).toBeUndefined();
      expect(frameContent.second).toBeUndefined();
      expect(frameContent.score).toBeUndefined();
    });
  });

  describe('strike button clicked', () => {
    it('should display score in first frame', async () => {
      const button = page.getScoreInputButton(10);
      button.click();
      const frameContent = await page.getFrameContent(0);
      expect(frameContent.first).toBe(10);
      expect(frameContent.second).toBeFalsy();
    });

    it('should display total score in the bottom of first frame', async () => {
      const button = page.getScoreInputButton(10);
      button.click();
      const frameContent = await page.getFrameContent(0);
      expect(frameContent.score).toBe(10);
    });

    it('should update total score on the top of the page', async () => {
      const button = page.getScoreInputButton(10);
      button.click();
      const frameContent = await page.getTotalScoreValue();
      expect(frameContent).toBe(10);
    });
  });

  describe('full game', () => {
    it('should display game over message', async () => {
      const button = page.getScoreInputButton(10);

      for (let i = 0; i < 12; ++i) {
        await button.click();
      }

      expect(page.getGameOverMessage().isPresent()).toBeTruthy();
    });

    it('clicking new game hides the game over message', async () => {
      const button = page.getScoreInputButton(10);

      for (let i = 0; i < 12; ++i) {
        await button.click();
      }

      await page.getNewGameButton().click();

      expect(page.getGameOverMessage().isPresent()).toBeFalsy();
    });
  });

  describe('when rolling', () => {
    it('should change the active frame', async () => {
      const button = page.getScoreInputButton(10);
      for (let i = 0; i < 10; ++i) {
        const frameIndex = page.getFrameIndex(i);
        const className = await frameIndex.getAttribute('class');
        expect(className).toContain('active');
        await button.click();
      }
    });

    describe('strikes', () => {
      it('should update the score based on the next frames', async () => {
        const scores = [10, 20, 30];
        const button = page.getScoreInputButton(10);
        for (let i = 0; i < 3; ++i) {
          await button.click();
          const { score } = await page.getFrameContent(0);
          expect(score).toBe(scores[i]);
        }
      });
    });

    describe('spares', () => {
      it('should update the score based on the next frames', async () => {
        const scores = [10, 13];
        for (let i = 0; i < 2; ++i) {
          await page.getScoreInputButton(3).click();
          await page.getScoreInputButton(7).click();
          const { score } = await page.getFrameContent(0);
          expect(score).toBe(scores[i]);
        }
      });
    });
  });

  describe('when rolling a spare', () => {
    it('should disable some inputs after the first roll', async () => {
      await page.getScoreInputButton(5).click();

      for (let i = 0; i <= 5; ++i) {
        const button = page.getScoreInputButton(i);
        const enabled = await button.isEnabled();
        expect(enabled).toBeTruthy();
      }

      for (let i = 6; i <= 10; ++i) {
        const button = page.getScoreInputButton(i);
        const enabled = await button.isEnabled();
        expect(enabled).toBeFalsy();
      }
    });
  });
});
