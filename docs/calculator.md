# Bread Calculators

Use these calculators to scale formulas from total flour weight. Both calculators use baker's percentages, but they serve different dough systems.

<div class="bread-calculator-guide">
  <article class="bread-calculator-guide__card">
    <p class="bread-calculator__eyebrow">Use This For</p>
    <h2>Sourdough</h2>
    <p>
      Choose the sourdough calculator when your dough is leavened by an active starter and no commercial yeast is added.
      It separates starter flour and starter water from the final mix so you can build the dough accurately.
    </p>
  </article>

  <article class="bread-calculator-guide__card">
    <p class="bread-calculator__eyebrow">Use This For</p>
    <h2>Commercial yeast</h2>
    <p>
      Choose the yeast calculator when the dough is raised with baker's yeast instead of starter. This version assumes a
      straight dough with instant yeast added directly to the bowl.
    </p>
  </article>
</div>

## Sourdough Calculator

This calculator is for naturally leavened dough only. It assumes **no commercial yeast** and uses baker's percentages throughout.

<div class="bread-calculator" data-bread-calculator data-calculator-type="sourdough">
  <section class="bread-calculator__intro">
    <p class="bread-calculator__eyebrow">Bench Formula</p>
    <h2>Scale a sourdough loaf from total flour</h2>
    <p>
      Enter the total flour in the full formula, choose up to three flour splits, then set hydration,
      salt, starter percentage, and starter hydration. The calculator separates what lives inside the
      starter from what still needs to go into the mixing bowl.
    </p>
  </section>

  <section class="bread-calculator__panel bread-calculator__panel--inputs">
    <div class="bread-calculator__grid bread-calculator__grid--top">
      <label class="bread-calculator__field">
        <span>Total flour</span>
        <div class="bread-calculator__input-wrap">
          <input data-field="total-flour" type="number" min="1" step="1" value="1000" inputmode="decimal" />
          <small>g</small>
        </div>
      </label>

      <label class="bread-calculator__field">
        <span>Hydration</span>
        <div class="bread-calculator__input-wrap">
          <input data-field="hydration" type="number" min="0" step="0.1" value="75" inputmode="decimal" />
          <small>%</small>
        </div>
      </label>

      <label class="bread-calculator__field">
        <span>Salt</span>
        <div class="bread-calculator__input-wrap">
          <input data-field="salt" type="number" min="0" step="0.1" value="2" inputmode="decimal" />
          <small>%</small>
        </div>
      </label>

      <label class="bread-calculator__field">
        <span>Starter</span>
        <div class="bread-calculator__input-wrap">
          <input data-field="starter-percent" type="number" min="0" step="0.1" value="5" inputmode="decimal" />
          <small>% of flour</small>
        </div>
      </label>

      <label class="bread-calculator__field">
        <span>Starter hydration</span>
        <div class="bread-calculator__input-wrap">
          <input data-field="starter-hydration" type="number" min="0" step="0.1" value="100" inputmode="decimal" />
          <small>%</small>
        </div>
      </label>

      <label class="bread-calculator__field">
        <span>Starter flour comes from</span>
        <div class="bread-calculator__input-wrap">
          <select data-field="starter-flour-source">
            <option value="0">White</option>
            <option value="1">Wholemeal</option>
            <option value="2">Rye</option>
          </select>
        </div>
      </label>
    </div>

    <div class="bread-calculator__flours">
      <div class="bread-calculator__flour-header">
        <h3>Flour blend</h3>
        <p>The three flour percentages must add to 100%.</p>
      </div>

      <div class="bread-calculator__flour-table" role="group" aria-label="Flour blend inputs">
        <div class="bread-calculator__flour-row bread-calculator__flour-row--head" aria-hidden="true">
          <span>Flour</span>
          <span>Percentage</span>
        </div>

        <div class="bread-calculator__flour-row">
          <label class="bread-calculator__field">
            <span class="bread-calculator__sr-only">First flour name</span>
            <input data-field="flour-name" type="text" value="White" />
          </label>
          <label class="bread-calculator__field bread-calculator__field--percent">
            <span class="bread-calculator__sr-only">First flour percentage</span>
            <div class="bread-calculator__input-wrap">
              <input data-field="flour-percent" type="number" min="0" max="100" step="0.1" value="100" inputmode="decimal" />
              <small>%</small>
            </div>
          </label>
        </div>

        <div class="bread-calculator__flour-row">
          <label class="bread-calculator__field">
            <span class="bread-calculator__sr-only">Second flour name</span>
            <input data-field="flour-name" type="text" value="Wholemeal" />
          </label>
          <label class="bread-calculator__field bread-calculator__field--percent">
            <span class="bread-calculator__sr-only">Second flour percentage</span>
            <div class="bread-calculator__input-wrap">
              <input data-field="flour-percent" type="number" min="0" max="100" step="0.1" value="0" inputmode="decimal" />
              <small>%</small>
            </div>
          </label>
        </div>

        <div class="bread-calculator__flour-row">
          <label class="bread-calculator__field">
            <span class="bread-calculator__sr-only">Third flour name</span>
            <input data-field="flour-name" type="text" value="Rye" />
          </label>
          <label class="bread-calculator__field bread-calculator__field--percent">
            <span class="bread-calculator__sr-only">Third flour percentage</span>
            <div class="bread-calculator__input-wrap">
              <input data-field="flour-percent" type="number" min="0" max="100" step="0.1" value="0" inputmode="decimal" />
              <small>%</small>
            </div>
          </label>
        </div>
      </div>
    </div>

    <p class="bread-calculator__status" data-calculator-status aria-live="polite"></p>
  </section>

  <section class="bread-calculator__panel bread-calculator__panel--results">
    <div class="bread-calculator__summary" data-calculator-summary></div>

    <div class="bread-calculator__results-grid">
      <article class="bread-calculator__card">
        <h3>Starter accounting</h3>
        <dl class="bread-calculator__metrics" data-starter-metrics></dl>
      </article>

      <article class="bread-calculator__card">
        <h3>Mixing bowl additions</h3>
        <dl class="bread-calculator__metrics" data-final-metrics></dl>
      </article>
    </div>

    <article class="bread-calculator__card bread-calculator__card--table">
      <div class="bread-calculator__flour-header">
        <h3>Flour breakdown</h3>
        <p>Total formula flour and flour still to add after accounting for the starter.</p>
      </div>
      <div class="bread-calculator__table-wrap">
        <table>
          <thead>
            <tr>
              <th>Flour</th>
              <th>Share</th>
              <th>Total formula flour</th>
              <th>Add to bowl</th>
            </tr>
          </thead>
          <tbody data-flour-results></tbody>
        </table>
      </div>
    </article>
  </section>
</div>

The sourdough calculator follows the same logic as your spreadsheet: starter flour and starter water are separated out first, then the remaining flour and water are shown as the final mix additions.

## Commercial Yeast Calculator

This calculator is for doughs leavened with baker's yeast rather than sourdough starter. Use it for straight doughs where all flour and water go directly into the final mix.

<div class="bread-calculator" data-bread-calculator data-calculator-type="yeast">
  <section class="bread-calculator__intro bread-calculator__intro--yeast">
    <p class="bread-calculator__eyebrow">Straight Dough</p>
    <h2>Scale a commercial-yeast loaf from total flour</h2>
    <p>
      Enter the total flour, choose your flour blend, then set hydration, salt, and instant yeast.
      This version assumes there is no sourdough starter in the dough, so every ingredient shown goes straight into the bowl.
    </p>
  </section>

  <section class="bread-calculator__panel bread-calculator__panel--inputs">
    <div class="bread-calculator__grid bread-calculator__grid--top">
      <label class="bread-calculator__field">
        <span>Total flour</span>
        <div class="bread-calculator__input-wrap">
          <input data-field="total-flour" type="number" min="1" step="1" value="1000" inputmode="decimal" />
          <small>g</small>
        </div>
      </label>

      <label class="bread-calculator__field">
        <span>Hydration</span>
        <div class="bread-calculator__input-wrap">
          <input data-field="hydration" type="number" min="0" step="0.1" value="68" inputmode="decimal" />
          <small>%</small>
        </div>
      </label>

      <label class="bread-calculator__field">
        <span>Salt</span>
        <div class="bread-calculator__input-wrap">
          <input data-field="salt" type="number" min="0" step="0.1" value="2" inputmode="decimal" />
          <small>%</small>
        </div>
      </label>

      <label class="bread-calculator__field">
        <span>Instant yeast</span>
        <div class="bread-calculator__input-wrap">
          <input data-field="yeast-percent" type="number" min="0" step="0.01" value="0.2" inputmode="decimal" />
          <small>%</small>
        </div>
      </label>
    </div>

    <div class="bread-calculator__flours">
      <div class="bread-calculator__flour-header">
        <h3>Flour blend</h3>
        <p>The three flour percentages must add to 100%.</p>
      </div>

      <div class="bread-calculator__flour-table" role="group" aria-label="Yeast dough flour blend inputs">
        <div class="bread-calculator__flour-row bread-calculator__flour-row--head" aria-hidden="true">
          <span>Flour</span>
          <span>Percentage</span>
        </div>

        <div class="bread-calculator__flour-row">
          <label class="bread-calculator__field">
            <span class="bread-calculator__sr-only">First flour name</span>
            <input data-field="flour-name" type="text" value="White" />
          </label>
          <label class="bread-calculator__field bread-calculator__field--percent">
            <span class="bread-calculator__sr-only">First flour percentage</span>
            <div class="bread-calculator__input-wrap">
              <input data-field="flour-percent" type="number" min="0" max="100" step="0.1" value="100" inputmode="decimal" />
              <small>%</small>
            </div>
          </label>
        </div>

        <div class="bread-calculator__flour-row">
          <label class="bread-calculator__field">
            <span class="bread-calculator__sr-only">Second flour name</span>
            <input data-field="flour-name" type="text" value="Wholemeal" />
          </label>
          <label class="bread-calculator__field bread-calculator__field--percent">
            <span class="bread-calculator__sr-only">Second flour percentage</span>
            <div class="bread-calculator__input-wrap">
              <input data-field="flour-percent" type="number" min="0" max="100" step="0.1" value="0" inputmode="decimal" />
              <small>%</small>
            </div>
          </label>
        </div>

        <div class="bread-calculator__flour-row">
          <label class="bread-calculator__field">
            <span class="bread-calculator__sr-only">Third flour name</span>
            <input data-field="flour-name" type="text" value="Rye" />
          </label>
          <label class="bread-calculator__field bread-calculator__field--percent">
            <span class="bread-calculator__sr-only">Third flour percentage</span>
            <div class="bread-calculator__input-wrap">
              <input data-field="flour-percent" type="number" min="0" max="100" step="0.1" value="0" inputmode="decimal" />
              <small>%</small>
            </div>
          </label>
        </div>
      </div>
    </div>

    <p class="bread-calculator__status" data-calculator-status aria-live="polite"></p>
  </section>

  <section class="bread-calculator__panel bread-calculator__panel--results">
    <div class="bread-calculator__summary" data-calculator-summary></div>

    <div class="bread-calculator__results-grid">
      <article class="bread-calculator__card">
        <h3>Mixing bowl additions</h3>
        <dl class="bread-calculator__metrics" data-final-metrics></dl>
      </article>

      <article class="bread-calculator__card">
        <h3>Formula notes</h3>
        <dl class="bread-calculator__metrics" data-extra-metrics></dl>
      </article>
    </div>

    <article class="bread-calculator__card bread-calculator__card--table">
      <div class="bread-calculator__flour-header">
        <h3>Flour breakdown</h3>
        <p>In a straight dough, all of the flour shown here goes directly into the final mix.</p>
      </div>
      <div class="bread-calculator__table-wrap">
        <table>
          <thead>
            <tr>
              <th>Flour</th>
              <th>Share</th>
              <th>Total formula flour</th>
              <th>Add to bowl</th>
            </tr>
          </thead>
          <tbody data-flour-results></tbody>
        </table>
      </div>
    </article>
  </section>
</div>

This yeast calculator assumes **instant yeast in a straight dough**. If you later want poolish, biga, fresh yeast, or active dry yeast conversions, that should be a separate version so the formulas stay explicit.