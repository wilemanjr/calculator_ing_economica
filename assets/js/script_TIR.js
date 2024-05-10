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
        const fieldInversionInicial = form.querySelector("#field_inversionInicial").value;
        const fieldFlujoEfectivo = form.querySelector("#field_flujoEfectivo").value;
        const fieldI = form.querySelector("#field_i").value;
        const interestType = document.getElementById("interest-type").value;
        const fieldN = form.querySelector("#field_n").value;

        const tir = calcularTIR(fieldInversionInicial, fieldFlujoEfectivo, fieldI, interestType, fieldN);
        showResult(e, "TIR", resultContainer, tir);
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

    const calcularTIR = (inversionInicial, flujoEfectivo, interes, tipoInteres, periodos) => {
        // Convertir la tasa de interés a mensual si es anual
        const tasaInteres = tipoInteres === "anual" ? interes / 12 / 100 : interes / 100;
    
        // Definir la función de flujo de efectivo neto (FEN)
        const FEN = (tir) => {
            let sum = -inversionInicial; // Inicializar con la inversión inicial
            for (let i = 0; i < periodos; i++) {
                sum += flujoEfectivo / Math.pow(1 + tir, i + 1);
            }
            return sum;
        };
    
        // Definir la derivada de la función de flujo de efectivo neto (FEN)
        const derivadaFEN = (tir) => {
            let sum = 0;
            for (let i = 0; i < periodos; i++) {
                sum -= (i + 1) * flujoEfectivo / Math.pow(1 + tir, i + 2);
            }
            return sum;
        };
    
        // Establecer valores iniciales para el cálculo de la TIR
        let tirEstimada = 0.1; // Estimación inicial de la TIR
        const tolerancia = 0.0001; // Tolerancia para la convergencia
        let error = 1;
    
        // Iterar hasta alcanzar la tolerancia deseada
        while (Math.abs(error) > tolerancia) {
            const FENValor = FEN(tirEstimada);
            const derivadaFENValor = derivadaFEN(tirEstimada);
    
            // Calcular la nueva estimación de la TIR usando el método de Newton-Raphson
            const nuevaTIR = tirEstimada - (FENValor / derivadaFENValor);
    
            // Calcular el error relativo entre la estimación actual y la nueva
            error = (nuevaTIR - tirEstimada) / nuevaTIR;
    
            // Actualizar la estimación de la TIR
            tirEstimada = nuevaTIR;
        }
    
         // Retornar la TIR calculada como un porcentaje
         return (tirEstimada * 100).toFixed(2) + "%"; 
    };
    
})();
