document.getElementById("simple").addEventListener("click", function () {
  window.location.href = "assets/html/interes_simple.html";
});
document.getElementById("compuesto").addEventListener("click", function () {
  window.location.href = "assets/html/interes_compuesto.html";
});
document.getElementById("anualidad").addEventListener("click", function () {
  window.location.href = "assets/html/anualidad.html";
});
document.getElementById("gradientes").addEventListener("click", function () {
  window.location.href = "assets/html/gradientes.html";
});
document.getElementById("amortizacion").addEventListener("click", function () {
  window.location.href = "assets/html/amortizacion.html";
});
document.getElementById("tir").addEventListener("click", function () {
  window.location.href = "assets/html/tir.html";
});

// Función para mostrar el tooltip
document
  .getElementById("tooltipBtn")
  .addEventListener("mouseover", function () {
    document.getElementById("tooltip").style.display = "block";
  });

document.getElementById("tooltipBtn").addEventListener("mouseout", function () {
  document.getElementById("tooltip").style.display = "none";
});
