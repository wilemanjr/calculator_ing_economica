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
        const fieldA = form.querySelector("#field_a") || null;
        const fieldI = form.querySelector("#field_i") || null;
        const fieldN = form.querySelector("#field_n") || null;
        const fieldG = form.querySelector("#field_g") || null;
        const fieldVF = form.querySelector("#field_vf") || null; // Corregido aquí
        const timeFormat = document.getElementById("time-format").value;
  
        let result;
  
        switch (item.id) {
          case "vf":
            result = calculator.valorFuturo(
              fieldA.value,
              fieldI.value,
              fieldN.value,
              timeFormat,
              fieldG.value
            );
            break;
          case "vp":
            result = calculator.valorPresente(
              fieldA.value,
              fieldI.value,
              fieldN.value,
              timeFormat,
              fieldG.value
            );
            break;
          case "avf":
            result = calculator.anualidadVF(
              fieldVF.value, // Corregido aquí
              fieldI.value,
              fieldN.value,
              timeFormat,
              fieldG.value
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
      valorFuturo(a, i, n, timeFormat, g) {
        const interestRate = i / 100; // Convertir la tasa de interés a decimal
        const totalPeriods =
          timeFormat === "anios"
            ? n
            : timeFormat === "meses"
            ? n / 12
            : n / 365; // Convertir el número de periodos según el formato de tiempo
    
        // Calcular el valor futuro
        const vf =
          a *
            (Math.pow(1 + interestRate, totalPeriods) - 1) /
            interestRate +
          g *
            totalPeriods *
            Math.pow(1 + interestRate, totalPeriods);
        return vf.toFixed(2);
      }
    
      valorPresente(a, i, n, timeFormat, g) {
        const interestRate = i / 100; // Convertir la tasa de interés a decimal
        const totalPeriods =
          timeFormat === "anios"
            ? n
            : timeFormat === "meses"
            ? n / 12
            : n / 365; // Convertir el número de periodos según el formato de tiempo
    
        // Calcular el valor presente
        const vp =
          a *
            (1 - Math.pow(1 + interestRate, -totalPeriods)) /
            interestRate +
          g *
            (1 - Math.pow(1 + interestRate, -totalPeriods)) /
            interestRate /
            (1 + interestRate);
        return vp.toFixed(2);
      }
    
      anualidadVF(vf, i, n, timeFormat, g) {
        const interestRate = i / 100; // Convertir la tasa de interés a decimal
        const totalPeriods =
          timeFormat === "anios"
            ? n
            : timeFormat === "meses"
            ? n / 12
            : n / 365; // Convertir el número de periodos según el formato de tiempo
    
        // Calcular la anualidad con valor futuro
        const avf =
          (vf -
            g *
              totalPeriods *
              (Math.pow(1 + interestRate, totalPeriods) - 1) /
              interestRate) /
          ((Math.pow(1 + interestRate, totalPeriods) - 1) / interestRate);
        return avf.toFixed(2);
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
