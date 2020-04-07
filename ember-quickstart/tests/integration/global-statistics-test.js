import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | global-statistics', function (hooks) {
  setupRenderingTest(hooks);

  test('should display stats', async function (assert) {
    assert.expect(4);

    this.set('globalData', { cases: 1, deaths: 4, recovered: 10, critical: 5 });

    await render(hbs`<GlobalStatistics @globalData={{this.globalData}} />`);

    assert.dom('[data-test-infections]').hasText("1");
    assert.dom('[data-test-deaths]').hasText("4");
    assert.dom('[data-test-recovered]').hasText("10");
    assert.dom('[data-test-critical]').hasText("5");
  });
});
