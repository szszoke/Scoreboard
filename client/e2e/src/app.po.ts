import { browser, by, element } from 'protractor';
import { IFrameWithScore } from '@app/scoreboard.service';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeaderText() {
    return element(by.css('app-root header')).getText();
  }

  getScoreboardFrames() {
    return element.all(by.tagName('app-scoreboard-frame'));
  }

  getScoreInputButtons() {
    return element.all(by.css('app-scoreboard-input .input'));
  }

  getScoreInputButton(index: number) {
    return this.getScoreInputButtons().get(index);
  }

  getNewGameButton() {
    return element(by.cssContainingText('button', 'New game'));
  }

  getTotalScore() {
    return element(by.css('app-scoreboard>h1'));
  }

  getGameOverMessage() {
    return element(by.css('.game-over'));
  }

  async getTotalScoreValue(): Promise<number> {
    const totalScoreText = await this.getTotalScore().getText();
    const match = totalScoreText.match(/(Total score: )(\d+)/);

    return Promise.resolve(+match[2]);
  }

  getFrameIndex(index: number) {
    return this.getScoreboardFrames()
      .get(index)
      .element(by.css('.frame-index'));
  }

  async getFrameContent(index: number): Promise<IFrameWithScore> {
    const frame = this.getScoreboardFrames().get(index);

    const firstRollText = await frame.element(by.css('.first-roll')).getText();
    const secondRollText = await frame
      .element(by.css('.second-roll'))
      .getText();
    const thirdRoll = frame.element(by.css('.third-roll'));
    const thirdRollText = (await thirdRoll.isPresent())
      ? await thirdRoll.getText()
      : undefined;
    const totalScoreText = await frame
      .element(by.css('.total-score'))
      .getText();

    return Promise.resolve({
      first: firstRollText ? +firstRollText : undefined,
      second: secondRollText ? +secondRollText : undefined,
      third: thirdRollText ? +thirdRollText : undefined,
      score: totalScoreText ? +totalScoreText : undefined,
      index,
    });
  }
}
