import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CountriesListComponent extends Component {
  @tracked sortedList;

  constructor(owner, args) {
    super(owner, args);

    this.orderByField("country");
  }

  @action
  orderBy(params) {
    this.orderByField(params.target.value);
  }

  orderByField(orderBy) {
    const countries = this.args.countries;

    if (orderBy === "country")
      countries.sort((a, b) => a.country.localeCompare(b.country));
    else
      countries.sort((a, b) => b[orderBy] - a[orderBy]);

    this.sortedList = countries;
  }
}
