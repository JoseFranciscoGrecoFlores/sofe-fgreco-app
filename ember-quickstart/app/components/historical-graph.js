import Component from '@glimmer/component';
import { action } from '@ember/object';
import Chart from 'chart.js/dist/Chart.js';

export default class HistoricalGraphComponent extends Component {
  canvas;
  chart;

  @action
  createHistoricalGraph(element) {
    this.canvas = element;

    const chartOptions = Chart.defaults.line;
    this.changeAxisToLinear(chartOptions.scales.yAxes[0]);

    this.displayGraphForData(element, chartOptions);
  }

  getDatasets() {
    const dataPerDay = this.getDataPerDay();

    const dataSets = [
      {
        label: "Deaths",
        data: dataPerDay.map(x => x[1].deaths),
        fill: false,
        borderColor: 'red'
      },
      {
        label: "Cases",
        data: dataPerDay.map(x => x[1].cases),
        fill: false,
        borderColor: 'blue'
      },
      {
        label: "Recovered",
        data: dataPerDay.map(x => x[1].recovered),
        fill: false,
        borderColor: 'green'
      }
    ];

    return dataSets;
  }

  getLabels() {
    const dataPerDay = this.getDataPerDay();

    return dataPerDay.map(x => x[0]);
  }

  @action
  changeAxisScale() {
    const yAxis = this.chart.options.scales.yAxes[0];
    if(yAxis.type == 'logarithmic')
      this.changeAxisToLinear(yAxis);
    else
      this.changeAxisToLogarithmic(yAxis);

    this.displayGraphForData(this.canvas, this.chart.options);
  }

  displayGraphForData(element, chartOptions) {
    const dataSets = this.getDatasets();
    const labels = this.getLabels();

    if (this.chart != null)
      this.chart.destroy();
    this.chart = new Chart(element, {
      type: 'line',
      data: {
        labels: labels,
        datasets: dataSets,
      },
      options: chartOptions
    });
  }

  changeAxisToLinear(axis) {
    axis.type = 'linear';

    axis.ticks = {
      callback: (value, index, values) => value
    }
  }

  changeAxisToLogarithmic(axis) {
    axis.type = 'logarithmic';

    axis.ticks = {
      callback: (value, index, values) => {
        if (value === 1000000) return "1M";
        if (value === 100000) return "100K";
        if (value === 10000) return "10K";
        if (value === 1000) return "1K";
        if (value === 100) return "100";
        if (value === 10) return "10";
        if (value === 0) return "0";
        return null;
      }
    }
  }

  getDataPerDay() {
    const dateToData = {};
    const allTimelines = this.args.timeline.map(x => x.timeline).flat();
    allTimelines.forEach(x => {
      if (dateToData[x.date] == null)
        dateToData[x.date] = { cases:0, deaths:0, recovered:0 };
      dateToData[x.date].cases += x.cases;
      dateToData[x.date].deaths += x.deaths;
      dateToData[x.date].recovered += x.recovered;
    });

    return Object.entries(dateToData);
  }
}
