(function () {
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");

  const menu = document.querySelector(".menu");
  const items = [...menu.children];

  items.forEach((item) => {
    item.addEventListener("click", () => {
      openForm(item);
    });
  });

  const openForm = (item) => {
    changeStep(2);

    // Ocultar todas las opciones anteriores
    const allForms = document.querySelectorAll(".step-2 .container");
    allForms.forEach((form) => {
      form.classList.remove("simulator__show");
    });

    // Mostrar la opción seleccionada
    const form = document.getElementById(`simulator_${item.id}`);
    const btn = form.querySelector("button");
    const resultContainer = form.parentElement.querySelector(".result");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const fieldVP = form.querySelector("#field_vp") || null;
      const fieldI = form.querySelector("#field_i") || null;
      const fieldN = form.querySelector("#field_n") || null;
      const timeFormat = document.getElementById("time-format").value;

      let result;

      switch (item.id) {
        case "am":
          result = calculator.amortizacion(
            fieldVP.value,
            fieldI.value,
            fieldN.value,
            timeFormat
          );
          break;
      }

      showResult(e, item.id, resultContainer, result);
    });

    form.parentElement.classList.add("simulator__show");

    const returnBtn = form.querySelector(".btn-return");

    returnBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resetForm(form); // Llamar a la función resetForm para limpiar el formulario
      changeStep(1);
    });
  };

  const changeStep = (numberNextStep) => {
    const previewStep = document.querySelector(".step__show");
    const nextStep = document.querySelector(`.step-${numberNextStep}`);

    previewStep.classList.remove("step__show");
    nextStep.classList.add("step__show");
  };

  const showResult = (event, id, container, result) => {
    event.preventDefault();
    container.classList.add("result__show");
    container.innerText = `${id.toUpperCase()} = $${result}`;
  };

  const resetForm = (form) => {
    // Obtener todos los campos de entrada del formulario
    const inputs = form.querySelectorAll("input");

    // Restablecer el valor de cada campo de entrada a su valor predeterminado (vacío)
    inputs.forEach((input) => {
      input.value = "";
    });

    // Ocultar el contenedor de resultados
    form.parentElement
      .querySelector(".result")
      .classList.remove("result__show");
  };

  class Calculator {
    amortizacion(vp, i, n, timeFormat) {
      const interestRate = i / 100 / 12; // Convertir la tasa de interés a decimal y a tasa periódica mensual
      const totalPeriods =
        timeFormat === "anios"
          ? n * 12 // Convertir años a meses
          : timeFormat === "meses"
          ? n // Mantener meses
          : Math.round(n * (365 / 12)); // Convertir días a meses (asumiendo 30 días por mes)

      // Calcular la cuota de amortización
      const numerator = vp * interestRate * Math.pow(1 + interestRate, totalPeriods);
      const denominator = Math.pow(1 + interestRate, totalPeriods) - 1;
      const cuota = numerator / denominator;
      return cuota.toFixed(2);
    }
  }

  const calculator = new Calculator();

  document
    .getElementById("tooltipBtn")
    .addEventListener("mouseover", function () {
      document.getElementById("tooltip").style.display = "block";
    });

  document
    .getElementById("tooltipBtn")
    .addEventListener("mouseout", function () {
      document.getElementById("tooltip").style.display = "none";
    });
})();
