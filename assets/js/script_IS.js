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
      const fieldIS = form.querySelector("#field_I") || null;
      const fieldVf = form.querySelector("#field_vf") || null;
      const fieldVp = form.querySelector("#field_vp") || null;
      const fieldI = form.querySelector("#field_i") || null;
      const fieldN = form.querySelector("#field_n") || null;

      const interestType = document.getElementById("interest-type").value;
      const timeFormat = document.getElementById("time-format").value;

      let result;

      switch (item.id) {
        case "I":
          result = calculator.I(
            fieldVp.value,
            fieldI.value,
            fieldN.value,
            interestType,
            timeFormat,
          );
          break;
        case "vf":
          result = calculator.vf(
            fieldVp.value,
            fieldI.value,
            fieldN.value,
            interestType,
            timeFormat,
          );
          break;
        case "vp":
          result = calculator.vp(
            fieldVf.value,
            fieldI.value,
            fieldN.value,
            interestType,
            timeFormat,
          );
          break;
        case "i":
          result = calculator.i(
            fieldVf.value,
            fieldVp.value,
            fieldN.value,
            interestType,
            timeFormat,
          );
          break;
        case "n":
          result = calculator.n(
            fieldVf.value,
            fieldVp.value,
            fieldI.value,
            interestType,
            timeFormat,
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
    container.innerText = `${id.toUpperCase()} = ${result}`;
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
    I(vp, i, n, interestType, timeFormat) {
      const interestRate = interestType === "anual" ? i / 100 : i / 100 / 12;
      let totalPeriods;

      if (timeFormat === "anios") {
        totalPeriods = n;
      } else if (timeFormat === "meses") {
        totalPeriods = n / 12;
      } else if (timeFormat === "dias") {
        totalPeriods = n / 365;
      }

      const I = vp * (interestRate * totalPeriods);
      return I.toFixed(2);
    }

    vf(vp, i, n, interestType, timeFormat) {
      const interestRate = interestType === "anual" ? i / 100 : i / 100 / 12;
      let totalPeriods;

      if (timeFormat === "anios") {
        totalPeriods = n;
      } else if (timeFormat === "meses") {
        totalPeriods = n / 12;
      } else if (timeFormat === "dias") {
        totalPeriods = n / 365;
      }

      const vf = vp * (1 + interestRate * totalPeriods);
      return vf.toFixed(2);
    }

    vp(vf, i, n, interestType, timeFormat) {
      const interestRate = interestType === "anual" ? i / 100 : i / 100 / 12;
      let totalPeriods;

      if (timeFormat === "anios") {
        totalPeriods = n;
      } else if (timeFormat === "meses") {
        totalPeriods = n / 12;
      } else if (timeFormat === "dias") {
        totalPeriods = n / 365;
      }

      const vp = vf / (1 + interestRate * totalPeriods);
      return vp.toFixed(2);
    }

    i(vf, vp, n, interestType, timeFormat) {
      const interestRate =
        interestType === "anual"
          ? (vf / vp - 1) * 100
          : (vf / vp - 1) * 100 * 12;
      return interestRate.toFixed(2);
    }

    n(vf, vp, i, interestType, timeFormat) {
      const interestRate = interestType === "anual" ? i / 100 : i / 100 / 12;
      let totalPeriods;

      if (timeFormat === "anios") {
        totalPeriods = Math.log(vf / vp) / Math.log(1 + interestRate);
      } else if (timeFormat === "meses") {
        totalPeriods = (Math.log(vf / vp) / Math.log(1 + interestRate)) * 12;
      } else if (timeFormat === "dias") {
        totalPeriods = (Math.log(vf / vp) / Math.log(1 + interestRate)) * 365;
      }

      return totalPeriods.toFixed(2);
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
