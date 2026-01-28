document.addEventListener("DOMContentLoaded", () => {
  fetch("data/datos.json")
    .then(res => res.json())
    .then(data => {
      cargarTitulos(data);
      cargarParametros(data.parametros);
      cargarMateriales(data.materiales);
      configurarWhatsapp(data.info.proyecto);
    })
    .catch(err => console.error("Error cargando datos:", err));
});

function cargarTitulos(data) {
  const tituloProyecto = document.getElementById("tituloProyecto");
  if (tituloProyecto) {
    tituloProyecto.textContent = data.info.proyecto || "";
  }
}

function cargarParametros(parametros) {
  const tbody = document.querySelector("#tablaParametros tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  parametros.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.caracteristica}</td>
      <td>${p.valor}</td>
    `;
    tbody.appendChild(tr);
  });
}

function cargarMateriales(materiales) {
  const tbody = document.querySelector("#tablaMateriales tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  materiales.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.material}</td>
      <td>${m.resistencia} kg/cm²</td>
    `;
    tbody.appendChild(tr);
  });
}

function configurarWhatsapp(proyecto) {
  const btn = document.getElementById("btnWhatsapp");
  if (!btn) return;

  const mensaje = encodeURIComponent(
    `Hola, quisiera información sobre el proyecto: ${proyecto}`
  );

  btn.href = `https://wa.me/573115589669?text=${mensaje}`;
}

