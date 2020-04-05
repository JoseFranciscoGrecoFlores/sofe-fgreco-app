import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async model() {
    const model = new Object();
    let content = await fetch('http://api.coronastatistics.live/all');
    model.globalCases = await content.json();
    content = await fetch('http://api.coronastatistics.live/countries');
    model.countries = await content.json();
    model.globalCases.critical = model.countries.reduce((a, b) => a + (b.critical || 0), 0);
    return model;
  }
}

