import { MappoNg2Page } from './app.po';

describe('mappo-ng2 App', () => {
  let page: MappoNg2Page;

  beforeEach(() => {
    page = new MappoNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
