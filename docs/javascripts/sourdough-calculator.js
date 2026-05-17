document.addEventListener("DOMContentLoaded", () => {
  const roots = document.querySelectorAll("[data-bread-calculator]");

  if (roots.length === 0) {
    return;
  }

  const formatGrams = (value) => `${Math.round(value * 10) / 10} g`;
  const formatPercent = (value) => `${Math.round(value * 10) / 10}%`;
  const parseNumber = (element) => Number.parseFloat(element.value || "0");
  const escapeHtml = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const renderMetrics = (container, entries) => {
    if (!container) {
      return;
    }

    container.innerHTML = entries
      .map(
        (entry) =>
          `<div><dt>${escapeHtml(entry.label)}</dt><dd>${escapeHtml(entry.value)}</dd></div>`,
      )
      .join("");
  };

  const clearOutputs = (view) => {
    view.summary.innerHTML = "";
    view.finalMetrics.innerHTML = "";
    view.flourResults.innerHTML = "";

    if (view.starterMetrics) {
      view.starterMetrics.innerHTML = "";
    }

    if (view.extraMetrics) {
      view.extraMetrics.innerHTML = "";
    }
  };

  const getSharedState = (fields) => {
    const totalFlour = parseNumber(fields.totalFlour);
    const hydration = parseNumber(fields.hydration);
    const salt = parseNumber(fields.salt);
    const flourPercents = fields.flourPercents.map(parseNumber);
    const flourNames = fields.flourNames.map((input, index) => {
      const value = input.value.trim();
      return value || `Flour ${index + 1}`;
    });

    return {
      totalFlour,
      hydration,
      salt,
      flourPercents,
      flourNames,
      percentTotal: flourPercents.reduce((sum, value) => sum + value, 0),
    };
  };

  const validateSharedState = (state, view) => {
    if (state.totalFlour <= 0) {
      view.status.textContent = "Enter a total flour weight greater than 0 g.";
      clearOutputs(view);
      return false;
    }

    if (state.hydration < 0 || state.salt < 0) {
      view.status.textContent = "Percentages cannot be negative.";
      clearOutputs(view);
      return false;
    }

    if (state.flourPercents.some((value) => value < 0)) {
      view.status.textContent = "Flour percentages cannot be negative.";
      clearOutputs(view);
      return false;
    }

    if (Math.abs(state.percentTotal - 100) > 0.01) {
      view.status.textContent = `Flour percentages must add to 100%. Current total: ${formatPercent(state.percentTotal)}.`;
      clearOutputs(view);
      return false;
    }

    return true;
  };

  const renderSummary = (view, entries) => {
    view.summary.innerHTML = entries
      .map(
        (entry) =>
          `<div class="bread-calculator__summary-card"><span>${escapeHtml(entry.label)}</span><strong>${escapeHtml(entry.value)}</strong></div>`,
      )
      .join("");
  };

  const renderFlourTable = (view, rows) => {
    view.flourResults.innerHTML = rows
      .map(
        (row) => `<tr>
          <td>${escapeHtml(row.name)}</td>
          <td>${escapeHtml(formatPercent(row.percent))}</td>
          <td>${escapeHtml(formatGrams(row.totalFormulaFlour))}</td>
          <td>${escapeHtml(formatGrams(row.addToBowl))}</td>
        </tr>`,
      )
      .join("");
  };

  const updateStarterFlourOptions = (fields, flourNames) => {
    if (!fields.starterFlourSource) {
      return;
    }

    const selectedValue = fields.starterFlourSource.value;
    fields.starterFlourSource.innerHTML = flourNames
      .map(
        (name, index) => `<option value="${index}">${escapeHtml(name)}</option>`,
      )
      .join("");

    fields.starterFlourSource.value = flourNames[selectedValue] ? selectedValue : "0";
  };

  const initCalculator = (root) => {
    const type = root.dataset.calculatorType;
    const fields = {
      totalFlour: root.querySelector('[data-field="total-flour"]'),
      hydration: root.querySelector('[data-field="hydration"]'),
      salt: root.querySelector('[data-field="salt"]'),
      starterPercent: root.querySelector('[data-field="starter-percent"]'),
      starterHydration: root.querySelector('[data-field="starter-hydration"]'),
      starterFlourSource: root.querySelector('[data-field="starter-flour-source"]'),
      yeastPercent: root.querySelector('[data-field="yeast-percent"]'),
      flourNames: Array.from(root.querySelectorAll('[data-field="flour-name"]')),
      flourPercents: Array.from(root.querySelectorAll('[data-field="flour-percent"]')),
    };
    const view = {
      status: root.querySelector("[data-calculator-status]"),
      summary: root.querySelector("[data-calculator-summary]"),
      starterMetrics: root.querySelector("[data-starter-metrics]"),
      finalMetrics: root.querySelector("[data-final-metrics]"),
      extraMetrics: root.querySelector("[data-extra-metrics]"),
      flourResults: root.querySelector("[data-flour-results]"),
    };

    const update = () => {
      const state = getSharedState(fields);
      updateStarterFlourOptions(fields, state.flourNames);

      if (!validateSharedState(state, view)) {
        return;
      }

      if (type === "sourdough") {
        const starterPercent = parseNumber(fields.starterPercent);
        const starterHydration = parseNumber(fields.starterHydration);
        const starterSourceIndex = Number.parseInt(fields.starterFlourSource.value, 10) || 0;

        if (starterPercent < 0 || starterHydration < 0) {
          view.status.textContent = "Percentages cannot be negative.";
          clearOutputs(view);
          return;
        }

        const starterWeight = state.totalFlour * (starterPercent / 100);
        const starterFlour = starterWeight / (1 + starterHydration / 100);
        const starterWater = starterWeight - starterFlour;
        const totalWater = state.totalFlour * (state.hydration / 100);
        const saltWeight = state.totalFlour * (state.salt / 100);
        const remainingFlour = state.totalFlour - starterFlour;
        const remainingWater = totalWater - starterWater;
        const sourceFormulaFlour = state.totalFlour * (state.flourPercents[starterSourceIndex] / 100);

        if (starterFlour - sourceFormulaFlour > 0.01) {
          view.status.textContent = `The selected starter flour source does not contain enough flour. Increase ${state.flourNames[starterSourceIndex]} or pick a different source.`;
          clearOutputs(view);
          return;
        }

        const totalDoughWeight = remainingFlour + remainingWater + saltWeight + starterWeight;

        view.status.textContent = "Formula is balanced.";

        renderSummary(view, [
          { label: "Total dough", value: formatGrams(totalDoughWeight) },
          { label: "Total water", value: formatGrams(totalWater) },
          { label: "Starter build used", value: formatGrams(starterWeight) },
          { label: "Salt", value: formatGrams(saltWeight) },
        ]);

        renderMetrics(view.starterMetrics, [
          { label: "Starter weight", value: formatGrams(starterWeight) },
          { label: "Flour from starter", value: formatGrams(starterFlour) },
          { label: "Water from starter", value: formatGrams(starterWater) },
          { label: "Starter hydration", value: formatPercent(starterHydration) },
          { label: "Starter flour source", value: state.flourNames[starterSourceIndex] },
        ]);

        renderMetrics(view.finalMetrics, [
          { label: "Remaining flour", value: formatGrams(remainingFlour) },
          { label: "Remaining water", value: formatGrams(remainingWater) },
          { label: "Salt to add", value: formatGrams(saltWeight) },
          { label: "Overall hydration", value: formatPercent(state.hydration) },
        ]);

        renderFlourTable(
          view,
          state.flourPercents.map((percent, index) => {
            const totalFormulaFlour = state.totalFlour * (percent / 100);
            const starterFlourShare = index === starterSourceIndex ? starterFlour : 0;

            return {
              name: state.flourNames[index],
              percent,
              totalFormulaFlour,
              addToBowl: totalFormulaFlour - starterFlourShare,
            };
          }),
        );

        renderMetrics(view.extraMetrics, []);
        return;
      }

      const yeastPercent = parseNumber(fields.yeastPercent);

      if (yeastPercent < 0) {
        view.status.textContent = "Percentages cannot be negative.";
        clearOutputs(view);
        return;
      }

      const totalWater = state.totalFlour * (state.hydration / 100);
      const saltWeight = state.totalFlour * (state.salt / 100);
      const yeastWeight = state.totalFlour * (yeastPercent / 100);
      const totalDoughWeight = state.totalFlour + totalWater + saltWeight + yeastWeight;

      view.status.textContent = "Formula is balanced.";

      renderSummary(view, [
        { label: "Total dough", value: formatGrams(totalDoughWeight) },
        { label: "Total water", value: formatGrams(totalWater) },
        { label: "Salt", value: formatGrams(saltWeight) },
        { label: "Instant yeast", value: formatGrams(yeastWeight) },
      ]);

      renderMetrics(view.finalMetrics, [
        { label: "Flour to add", value: formatGrams(state.totalFlour) },
        { label: "Water to add", value: formatGrams(totalWater) },
        { label: "Salt to add", value: formatGrams(saltWeight) },
        { label: "Yeast to add", value: formatGrams(yeastWeight) },
      ]);

      renderMetrics(view.extraMetrics, [
        { label: "Yeast type", value: "Instant yeast" },
        { label: "Leavening system", value: "Commercial yeast only" },
        { label: "Overall hydration", value: formatPercent(state.hydration) },
        { label: "Salt percentage", value: formatPercent(state.salt) },
      ]);

      if (view.starterMetrics) {
        view.starterMetrics.innerHTML = "";
      }

      renderFlourTable(
        view,
        state.flourPercents.map((percent, index) => ({
          name: state.flourNames[index],
          percent,
          totalFormulaFlour: state.totalFlour * (percent / 100),
          addToBowl: state.totalFlour * (percent / 100),
        })),
      );
    };

    [
      fields.totalFlour,
      fields.hydration,
      fields.salt,
      fields.starterPercent,
      fields.starterHydration,
      fields.starterFlourSource,
      fields.yeastPercent,
      ...fields.flourNames,
      ...fields.flourPercents,
    ]
      .filter(Boolean)
      .forEach((field) => {
        field.addEventListener("input", update);
        field.addEventListener("change", update);
      });

    update();
  };

  roots.forEach(initCalculator);
});