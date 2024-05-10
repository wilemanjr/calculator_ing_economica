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
      const fieldRenta = form.querySelector("#field_renta");
      const fieldVP = form.querySelector("#field_vp") || null;
      const fieldVF = form.querySelector("#field_vf") || null;
      const fieldI = form.querySelector("#field_i") || null;
      const fieldN = form.querySelector("#field_n") || null;
      const interestType = document.getElementById("interest-type").value;
      const capitalizationType = document.getElementById(
        "capitalization-type",
      ).value;
      const timeFormat = document.getElementById("time-format").value;

      let result;

      switch (item.id) {
        case "vf":
          result = calculator.vf(
            fieldRenta.value,
            fieldI.value,
            fieldN.value,
            interestType,
            capitalizationType,
            timeFormat,
          );
          break;
        case "vp":
          result = calculator.vp(
            fieldRenta.value,
            fieldI.value,
            fieldN.value,
            interestType,
            capitalizationType,
            timeFormat,
          );
          break;
        case "i":
          result = calculator.i(
            fieldRenta.value,
            fieldVP.value,
            fieldN.value,
            interestType,
            capitalizationType,
            timeFormat,
          );
          break;
        case "n":
          result = calculator.n(
            fieldRenta.value,
            fieldVP.value,
            fieldI.value,
            interestType,
            capitalizationType,
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
    vf(renta, i, n, interestType, capitalizationType, timeFormat) {
      let interestRate;
      let totalPeriods;

      // Convertir la tasa de interés a mensual si la capitalización es mensual
      interestRate =
        capitalizationType === "mensual"
          ? interestType === "anual"
            ? i / 12 / 100
            : i / 100
          : interestType === "anual"
            ? i / 100
            : i / 100 / 12;

      // Convertir el número de períodos según el formato de tiempo
      if (timeFormat === "anios") {
        totalPeriods = n * (capitalizationType === "mensual" ? 12 : 1);
      } else if (timeFormat === "meses") {
        totalPeriods = n;
      } else if (timeFormat === "dias") {
        totalPeriods = n / 30; // Asumiendo 30 días por mes
      }

      // Calcular el valor futuro
      let vf = 0;
      for (let period = 1; period <= totalPeriods; period++) {
        vf += renta * (1 + interestRate) ** period;
      }
      return vf.toFixed(2);
    }

    vp(renta, i, n, interestType, capitalizationType, timeFormat) {
      let interestRate;
      let totalPeriods;

      // Convertir la tasa de interés a mensual si la capitalización es mensual
      interestRate =
        capitalizationType === "mensual"
          ? interestType === "anual"
            ? i / 12 / 100
            : i / 100
          : interestType === "anual"
            ? i / 100
            : i / 100 / 12;

      // Convertir el número de períodos según el formato de tiempo
      if (timeFormat === "anios") {
        totalPeriods = n * (capitalizationType === "mensual" ? 12 : 1);
      } else if (timeFormat === "meses") {
        totalPeriods = n;
      } else if (timeFormat === "dias") {
        totalPeriods = n / 30; // Asumiendo 30 días por mes
      }

      // Calcular el valor presente
      let vp = 0;
      for (let period = 1; period <= totalPeriods; period++) {
        vp += renta / (1 + interestRate) ** period;
      }
      return vp.toFixed(2);
    }

    i(renta, vp, n, interestType, capitalizationType, timeFormat) {
      let totalPeriods;
      let interestRate = 0;

      // Convertir la tasa de interés a mensual si la capitalización es mensual
      interestRate =
        capitalizationType === "mensual"
          ? interestType === "anual"
            ? i / 12 / 100
            : i / 100
          : interestType === "anual"
            ? i / 100
            : i / 100 / 12;

      // Convertir el número de períodos según el formato de tiempo
      if (timeFormat === "anios") {
        totalPeriods = n * (capitalizationType === "mensual" ? 12 : 1);
      } else if (timeFormat === "meses") {
        totalPeriods = n;
      } else if (timeFormat === "dias") {
        totalPeriods = n / 30; // Asumiendo 30 días por mes
      }

      // Calcular la tasa de interés
      let i = 0;
      for (let period = 1; period <= totalPeriods; period++) {
        i += renta * ((1 + interestRate) ** period - 1);
      }
      return (i * 100).toFixed(2);
    }

    n(renta, vp, i, interestType, capitalizationType, timeFormat) {
      let interestRate;
      let totalPeriods;

      // Convertir la tasa de interés a mensual si la capitalización es mensual
      interestRate =
        capitalizationType === "mensual"
          ? interestType === "anual"
            ? i / 12 / 100
            : i / 100
          : interestType === "anual"
            ? i / 100
            : i / 100 / 12;

      // Convertir el número de períodos según el formato de tiempo
      if (timeFormat === "anios") {
        totalPeriods = n * (capitalizationType === "mensual" ? 12 : 1);
      } else if (timeFormat === "meses") {
        totalPeriods = n;
      } else if (timeFormat === "dias") {
        totalPeriods = n / 30; // Asumiendo 30 días por mes
      }

      // Calcular el total de periodos
      let totalN = 0;
      for (let period = 1; period <= totalPeriods; period++) {
        totalN +=
          Math.log(1 + interestRate) / Math.log(1 + interestRate - renta / vp);
      }
      return totalN.toFixed(2);
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
