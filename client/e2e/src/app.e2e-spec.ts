import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title in header', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('Bowling scoreboard');
  });
});
