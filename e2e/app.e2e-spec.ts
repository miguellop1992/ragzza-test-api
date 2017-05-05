import { RagzzaTestApiPage } from './app.po';

describe('ragzza-test-api App', () => {
  let page: RagzzaTestApiPage;

  beforeEach(() => {
    page = new RagzzaTestApiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
