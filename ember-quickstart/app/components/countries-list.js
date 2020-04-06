import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CountriesListComponent extends Component {
  @tracked listToDisplay;
  @tracked pagesToDisplay;
  pagesToDisplayCount = 10;
  itemsPerPage = 10;
  pageSelected = 1;
  orderBy;
  pages;

  get itemsStartIndex() {
     return(this.pageSelected - 1) * this.itemsPerPage;
  }

  constructor(owner, args) {
    super(owner, args);
    this.orderBy = "country";

    this.listToDisplay = this.getItemsToDisplay();
    this.pages = [];
    for (let i = 1; i <= Math.ceil(this.args.countries.length / this.itemsPerPage); i++) {
      this.pages.push(i);
    }

    this.updatePagesToDisplay();
  }

  @action
  onPageSelected(page) {
    this.pageSelected = page;
    this.listToDisplay = this.getItemsToDisplay();
    this.updatePagesToDisplay();
  }

  updatePagesToDisplay() {
    const start = Math.max(0, this.pageSelected - this.pagesToDisplayCount / 2);
    let nearbyPages = this.pages.slice(start, start + this.pagesToDisplayCount);
    this.pagesToDisplay = nearbyPages.map(x => ({ value: x, active: x === this.pageSelected}));
  }

  @action
  onChangedOrderCriteria(params) {
    this.orderBy = params.target.value;
    this.listToDisplay = this.getItemsToDisplay();
  }

  getItemsToDisplay() {
    return this.orderByField(this.orderBy).slice(this.itemsStartIndex, this.itemsStartIndex + this.itemsPerPage);
  }

  orderByField(orderBy) {
    const countries = this.args.countries;

    if (orderBy === "country")
      countries.sort((a, b) => a.country.localeCompare(b.country));
    else
      countries.sort((a, b) => b[orderBy] - a[orderBy]);

    return countries;
  }
}
