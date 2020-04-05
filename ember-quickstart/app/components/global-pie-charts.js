import Component from '@glimmer/component';
import { action } from '@ember/object';
import Chart from 'chart.js/dist/Chart.js';

//TODO: Add others 
export default class GlobalPieChartsComponent extends Component {
  @action
  onDeathChartCreated(element) {
    this.displayChartForAttribute(element, "deaths", [
      'rgba(255, 0, 0, 1)',
      'rgba(255, 0, 0, 0.9)',
      'rgba(255, 0, 0, 0.8)',
      'rgba(255, 0, 0, 0.7)',
      'rgba(255, 0, 0, 0.6)',
      'rgba(255, 0, 0, 0.5)',
      'rgba(255, 0, 0, 0.4)',
      'rgba(255, 0, 0, 0.3)',
      'rgba(255, 0, 0, 0.2)',
      'rgba(255, 0, 0, 0.1)',
    ]);
  }

  @action
  onCasesChartCreated(element) {
    this.displayChartForAttribute(element, "cases", [
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 255, 0.9)',
      'rgba(0, 0, 255, 0.8)',
      'rgba(0, 0, 255, 0.7)',
      'rgba(0, 0, 255, 0.6)',
      'rgba(0, 0, 255, 0.5)',
      'rgba(0, 0, 255, 0.4)',
      'rgba(0, 0, 255, 0.3)',
      'rgba(0, 0, 255, 0.2)',
      'rgba(0, 0, 255, 0.1)',
    ]);
  }

  @action
  onRecoveredChartCreated(element) {
    this.displayChartForAttribute(element, "recovered", [
      'rgba(0, 100, 0, 1)',
      'rgba(0, 100, 0, 0.9)',
      'rgba(0, 100, 0, 0.8)',
      'rgba(0, 100, 0, 0.7)',
      'rgba(0, 100, 0, 0.6)',
      'rgba(0, 100, 0, 0.5)',
      'rgba(0, 100, 0, 0.4)',
      'rgba(0, 100, 0, 0.3)',
      'rgba(0, 100, 0, 0.2)',
      'rgba(0, 100, 0, 0.1)',
    ]);
  }

  displayChartForAttribute(element, attributeName, backgroundColors) {
    const countries = this.args.countries;
    countries.sort((a, b) => b[attributeName] - a[attributeName]);

    this.displayChartForData(element,
      countries.slice(0, 10).map(x => x.country),
      countries.slice(0, 10).map(x => x[attributeName]),
      backgroundColors);;
  }

  displayChartForData(element, labels, data, backgroundColors) {
    const chartOptions = Chart.defaults.pie;
    chartOptions.legend = false;

    const chart = new Chart(element, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors
        }]
      },
      options: chartOptions
    });
  }
}
