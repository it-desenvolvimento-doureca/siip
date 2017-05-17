import { SiipPage } from './app.po';

describe('siip App', () => {
  let page: SiipPage;

  beforeEach(() => {
    page = new SiipPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
