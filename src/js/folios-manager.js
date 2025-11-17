/**
 * Gestor de Folios - Historial y Exportación
 * Archivo auxiliar para gestionar el registro de folios generados
 */

/**
 * Obtener historial de folios desde localStorage
 */
function obtenerHistorialFolios() {
  return JSON.parse(localStorage.getItem('historial_folios') || '[]');
}

/**
 * Descargar historial de folios como archivo TXT
 */
function descargarHistorialFolios() {
  const historial = obtenerHistorialFolios();
  
  if (historial.length === 0) {
    alert('No hay folios registrados aún.');
    return;
  }

  // Crear contenido del archivo
  let contenido = '===== HISTORIAL DE FOLIOS GENERADOS =====\n';
  contenido += `Fecha de generación: ${new Date().toLocaleString('es-MX')}\n`;
  contenido += `Total de pedidos: ${historial.length}\n`;
  contenido += '=' .repeat(50) + '\n\n';

  historial.forEach((registro, index) => {
    contenido += `${index + 1}. Folio: ${registro.folio}\n`;
    contenido += `   Nombre: ${registro.nombre}\n`;
    contenido += `   Email: ${registro.email}\n`;
    contenido += `   Teléfono: ${registro.telefono}\n`;
    contenido += `   Total: $${registro.total} MXN\n`;
    contenido += `   Fecha: ${registro.fecha}\n`;
    contenido += '-' .repeat(50) + '\n\n';
  });

  // Crear blob y descargar
  const blob = new Blob([contenido], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `folios_${new Date().toISOString().slice(0,10)}.txt`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);

  console.log('✓ Archivo de folios descargado:', a.download);
}

/**
 * Mostrar historial en consola (para debugging)
 */
function mostrarHistorialEnConsola() {
  const historial = obtenerHistorialFolios();
  console.table(historial);
}

/**
 * Limpiar historial (uso administrativo)
 */
function limpiarHistorialFolios() {
  if (confirm('¿Estás seguro de que deseas eliminar todo el historial de folios?')) {
    localStorage.removeItem('historial_folios');
    alert('✓ Historial eliminado.');
  }
}

/**
 * Obtener estadísticas de folios
 */
function obtenerEstadisticasFolios() {
  const historial = obtenerHistorialFolios();
  
  if (historial.length === 0) {
    return {
      total: 0,
      totalVentas: 0,
      mensaje: 'Sin datos'
    };
  }

  const totalVentas = historial.reduce((suma, reg) => {
    const monto = parseFloat(reg.total) || 0;
    return suma + monto;
  }, 0);

  return {
    total: historial.length,
    totalVentas: totalVentas.toFixed(2),
    ultimoFolio: historial[historial.length - 1].folio,
    primerFolio: historial[0].folio
  };
}

// Exportar funciones para uso global
window.FoliosManager = {
  obtenerHistorial: obtenerHistorialFolios,
  descargar: descargarHistorialFolios,
  mostrarEnConsola: mostrarHistorialEnConsola,
  limpiar: limpiarHistorialFolios,
  estadisticas: obtenerEstadisticasFolios
};

// Log al cargar
console.log('✓ Folios Manager cargado. Usa window.FoliosManager.descargar() para descargar historial.');
