import { WeatherWidgetPage } from './app.po';

describe('weather-widget App', () => {
  let page: WeatherWidgetPage;

  beforeEach(() => {
    page = new WeatherWidgetPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
