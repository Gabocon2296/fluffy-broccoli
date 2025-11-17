// js/script.js - LANDING PAGE MEJORADA CON FORMSPREE + GRACIAS.HTML
// ==========================================

// CONFIGURACIÓN GENERAL
const OWNER_WHATSAPP = "526693821944";
const PRODUCT_TITLE = "Kit de 4 Lámparas Solares 100 LED 270°";
const PRODUCT_PRICE = 1567.50;
const PROVIDER_PRICE = 330;
const PROFIT_MARGIN = PRODUCT_PRICE - PROVIDER_PRICE;

const basePrice = PRODUCT_PRICE;
const onlineDiscountRate = 0.15;
const shippingCostExpress = 99.00;

// Endpoint de Formspree (configurado)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgvnpvye';

// Links de MercadoPago según cantidad de kits
const MERCADOPAGO_LINKS = {
  1: "https://mpago.li/1tfLfBQ",
  2: "https://mpago.li/21FDGnj",
  3: "https://mpago.li/2JtDwXw",
  5: "https://mpago.li/22Son63",
  10: "https://mpago.li/2H32f1v"
};

// Scripts de Mercado Pago según cantidad de kits (preference IDs)
const MP_SCRIPTS = {
  1: "1057249992-cb791ec2-b74c-494c-89c1-928b23b20a81",
  2: "1057249992-ca8be8ce-bb8a-41e1-acf9-4879468b6dbc",
  3: "1057249992-207d968e-e92a-480f-9619-282de884fa60",
  5: "1057249992-7b74971d-88e3-4a1f-bab6-6d3f9eba04d8",
  10: "1057249992-a085b771-599c-4d35-9448-2727bfc9cf58"
};

// Mapeo de Estados y sus Municipios - CARGADO DESDE municipios.js
// (El objeto ESTADOS_CIUDADES se define en js/municipios.js con la lista completa de todos los municipios)

// Array de reseñas dinámicas (estilo natural mexicano)
const REVIEWS = [
  {
    nombre: "María, Veracruz",
    rating: 5,
    comentario: "Excelentes lámparas, fáciles de instalar.",
    foto: "src/assets/images/miniatura_instalacion_guia.jpg"
  },
  {
    nombre: "Jorge, CDMX",
    rating: 4,
    comentario: "Buen brillo y sensor muy sensible.",
    foto: "src/assets/images/miniatura_checkout_resumen.jpg"
  },
  {
    nombre: "Luisa, Guadalajara",
    rating: 5,
    comentario: "Colocación sencilla y luz potente.",
    foto: "src/assets/images/miniatura_instalacion_guia.jpg"
  },
  {
    nombre: "Carlos, Monterrey",
    rating: 5,
    comentario: "Me sorprendió lo fuerte que alumbra, muy buena calidad.",
    foto: "src/assets/images/set_4_luces_principal.jpg"
  },
  {
    nombre: "Rosa, Guadalajara",
    rating: 5,
    comentario: "Llegó rápido y funciona perfecto, ilumina toda mi cochera.",
    foto: "src/assets/images/miniatura_brillo_modos.jpg"
  },
  {
    nombre: "Pedro, Cancún",
    rating: 4,
    comentario: "Buena durabilidad, resiste bien la humedad y lluvia.",
    foto: "src/assets/images/set_4_luces_principal.jpg"
  },
  {
    nombre: "Sofía, Monterrey",
    rating: 5,
    comentario: "Perfectas para mi jardín, el sensor de movimiento es muy útil.",
    foto: "src/assets/images/miniatura_angulo_270.jpg"
  },
  {
    nombre: "Manuel, Puebla",
    rating: 5,
    comentario: "No esperaba tanta luminosidad, son increíbles. Recomendadas al 100%.",
    foto: "src/assets/images/miniatura_brillo_modos.jpg"
  },
  {
    nombre: "Gabriela, Querétaro",
    rating: 4,
    comentario: "La batería dura mucho tiempo, excelente relación precio-calidad.",
    foto: "src/assets/images/miniatura_angulo_270.jpg"
  },
  {
    nombre: "Raúl, San Luis Potosí",
    rating: 5,
    comentario: "Ya me pidieron que la recomiende. Ilumina muy bien la entrada.",
    foto: "src/assets/images/set_4_luces_principal.jpg"
  }
];

// ==========================================
// FUNCIONES DE PRECIOS Y DESCUENTOS
// ==========================================

function getVolumeDiscount(quantity) {
  if (quantity >= 10) return 0.30;
  if (quantity >= 5) return 0.22;
  if (quantity >= 3) return 0.18;
  return 0.15;
}

function calculatePrice(quantity) {
  const discount = getVolumeDiscount(quantity);
  const pricePerKit = PRODUCT_PRICE * (1 - discount);
  return pricePerKit * quantity;
}

let finalPrice = calculatePrice(1);

// ==========================================
// 1. CONTADOR REGRESIVO 24 HORAS
// ==========================================

(function initCountdown24h() {
  const countdownEl = document.getElementById('countdown-inline');
  if (!countdownEl) return;

  const key = 'offer_end_time_24h';
  let endTime = localStorage.getItem(key);
  
  if (!endTime || isNaN(parseInt(endTime))) {
    endTime = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem(key, endTime);
  } else {
    endTime = parseInt(endTime);
  }

  function updateCountdown() {
    const now = Date.now();
    const distance = endTime - now;

    if (distance <= 0) {
      countdownEl.innerHTML = "¡OFERTA FINALIZADA!";
      localStorage.removeItem(key);
      clearInterval(interval);
      return;
    }

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / 1000 / 60) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    const pad = (n) => String(n).padStart(2, '0');
    countdownEl.innerHTML = `Oferta termina en: ${pad(hours)}h:${pad(minutes)}m:${pad(seconds)}s`;
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
})();

// ==========================================
// 2. STOCK DINÁMICO (12 unidades fijas)
// ==========================================

(function dynamicStock() {
  const stockEl = document.getElementById('stock-units');
  const fillEl = document.getElementById('stock-fill');
  if (!stockEl || !fillEl) return;

  const stock = 12;

  function updateStockUI() {
    stockEl.textContent = stock;
    const percent = Math.max(5, Math.min(100, (stock / 20) * 100));
    fillEl.style.width = percent + '%';
  }

  updateStockUI();
})();

// ==========================================
// 3. VISITAS DINÁMICAS (8-35 personas)
// ==========================================

(function dynamicViewers() {
  const viewersEl = document.getElementById('viewers-count');
  if (!viewersEl) return;

  let currentViewers = Math.floor(Math.random() * 15) + 12;

  function updateViewers() {
    const change = Math.floor(Math.random() * 5) - 2;
    currentViewers = Math.max(8, Math.min(35, currentViewers + change));
    viewersEl.textContent = currentViewers;
  }

  updateViewers();
  setInterval(updateViewers, Math.floor(Math.random() * 7000) + 8000);
})();

// ==========================================
// 4. FECHAS DE ENTREGA DINÁMICAS
// ==========================================

(function setDeliveryDates() {
  const el = document.getElementById('delivery-date-range');
  if (!el) return;

  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 7);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 12);

  const opts = { month: 'short', day: 'numeric' };
  el.textContent = `${minDate.toLocaleDateString('es-MX', opts)} — ${maxDate.toLocaleDateString('es-MX', opts)}`;
})();

// ==========================================
// 5. POPUP FOMO - ÚLTIMAS COMPRAS
// ==========================================

(function fomPopup() {
  const popup = document.getElementById('sale-popup');
  if (!popup) return;

  const names = [
    "Luis C., GDL",
    "Ana P., CDMX",
    "Javier R., MTY",
    "Sofía M., PUE",
    "Carlos D., TIJ",
    "María G., CUN",
    "Roberto H., MON",
    "Catalina V., QRO"
  ];

  function showPopup() {
    const name = names[Math.floor(Math.random() * names.length)];
    const minutesAgo = Math.floor(Math.random() * 12) + 1;

    document.getElementById('sale-name').textContent = name;
    document.getElementById('sale-time').textContent = `hace ${minutesAgo} min`;

    popup.classList.remove('hidden');
    popup.classList.add('animate__animated', 'animate__fadeInUp');

    setTimeout(() => {
      popup.classList.remove('animate__fadeInUp');
      popup.classList.add('animate__fadeOutDown');
      setTimeout(() => {
        popup.classList.add('hidden');
        popup.classList.remove('animate__fadeOutDown');
      }, 500);
    }, 6000);
  }

  document.getElementById('close-sale').addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  setTimeout(() => {
    showPopup();
    setInterval(showPopup, Math.floor(Math.random() * 25000) + 20000);
  }, 10000);
})();

// ==========================================
// 6. ACTUALIZACIÓN DINÁMICA DE PRECIO POR CANTIDAD
// ==========================================

(function dynamicPriceButton() {
  const qtySelect = document.getElementById('qty');
  const submitBtn = document.querySelector('#order-form button[type="submit"]');

  if (!qtySelect || !submitBtn) return;

  function updateButtonPrice() {
    const quantity = parseInt(qtySelect.value) || 1;
    const totalPrice = calculatePrice(quantity);
    const discount = getVolumeDiscount(quantity);
    const discountPercent = Math.round(discount * 100);

    submitBtn.textContent = `¡Paga Ahora - ${discountPercent}% Descuento! $${totalPrice.toFixed(2)} MXN`;
  }

  updateButtonPrice();
  qtySelect.addEventListener('change', updateButtonPrice);
})();

// ==========================================
// 7. GALERÍA DE IMÁGENES - CAMBIAR PRINCIPAL
// ==========================================

(function imageGallery() {
  const mainImg = document.querySelector('img[alt="Video Promocional"]');
  const thumbs = document.querySelectorAll('.thumb');

  if (!mainImg || thumbs.length === 0) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('src');
      if (src) {
        mainImg.src = src;
        mainImg.classList.add('animate__animated', 'animate__fadeIn');
        setTimeout(() => mainImg.classList.remove('animate__animated', 'animate__fadeIn'), 300);
      }
    });
  });
})();

// ==========================================
// 8. FORMULARIO WHATSAPP + FORMSPREE + GRACIAS.HTML
// ==========================================

(function formHandler() {
  const form = document.getElementById('order-form');
  if (!form) return;

  function processOrder(paymentMethod = 'tarjeta') {
    const qty = parseInt(document.getElementById('qty').value);
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const cp = document.getElementById('cp').value.trim();

    if (!name || !phone) {
      alert('Por favor completa tu nombre y teléfono (WhatsApp).');
      return false;
    }

    const pricePerKit = PRODUCT_PRICE;
    const totalBeforeDiscount = pricePerKit * qty;
    const discount = getVolumeDiscount(qty);
    const discountPercent = Math.round(discount * 100);
    const totalAfterDiscount = calculatePrice(qty);
    const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

    const qtyText = qty === 1 ? '1 kit' : qty === 2 ? '2 kits' : qty === 3 ? '3 kits' : qty === 5 ? '5 kits' : '10+ kits';

    // Mensaje simplificado para WhatsApp
    let waMessage = `Hola, acabo de completar mi orden. Producto: ${qtyText}. Total pagado: $${totalAfterDiscount.toFixed(2)}. Mi nombre es ${name}, mi dirección es ${address || 'No proporcionada'}, gracias.`;
    const waLink = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;

    // Guardar en localStorage (para gracias.html)
    const orderData = {
      product: PRODUCT_TITLE,
      qty: qtyText,
      qtyRaw: qty,
      name,
      phone,
      address,
      ciudad,
      cp,
      pricePerKit: pricePerKit.toFixed(2),
      subtotal: totalBeforeDiscount.toFixed(2),
      discountPercent,
      totalDiscount: totalDiscount.toFixed(2),
      total: totalAfterDiscount.toFixed(2),
      paymentMethod,
      ts: Date.now()
    };

    try {
      localStorage.setItem('last_order', JSON.stringify(orderData));
    } catch (e) {
      console.error('Error al guardar en localStorage:', e);
    }

    // Enviar a Formspree en background
    const payload = new FormData();
    payload.append('product', orderData.product);
    payload.append('qty', orderData.qtyRaw);
    payload.append('name', orderData.name);
    payload.append('phone', orderData.phone);
    payload.append('address', orderData.address);
    payload.append('ciudad', orderData.ciudad);
    payload.append('cp', orderData.cp);
    payload.append('total', orderData.total);
    payload.append('paymentMethod', orderData.paymentMethod);

    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: payload,
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      // Ya sea éxito o fallo, abrimos WhatsApp y redirigimos
      window.open(waLink, '_blank');
      setTimeout(() => {
        window.location.href = 'gracias.html';
      }, 500);
    }).catch(err => {
      console.error('Error enviando a Formspree:', err);
      window.open(waLink, '_blank');
      setTimeout(() => {
        window.location.href = 'gracias.html';
      }, 500);
    });

    // UI feedback inmediato
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn ? btn.textContent : '';
    if (btn) {
      btn.textContent = '✓ Procesando...';
      btn.disabled = true;
    }

    return false;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    processOrder('tarjeta');
  });

})();

// ==========================================
// 9. ANIMACIONES DE ENTRADA (fade-up)
// ==========================================

(function initEntranceAnimations() {
  const els = document.querySelectorAll('.fade-up');
  els.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-6');
    el.style.transition = 'opacity 600ms ease, transform 600ms ease';
  });

  window.requestAnimationFrame(() => {
    setTimeout(() => {
      els.forEach(el => {
        el.classList.remove('opacity-0', 'translate-y-6');
        el.classList.add('opacity-100');
        el.style.transform = 'translateY(0)';
      });
    }, 120);
  });
})();

// ==========================================
// FUNCIÓN PARA MERCADO PAGO - REDIRECCIÓN DIRECTA
// ==========================================

function redirectToMercadoPago(qty) {
  // Obtener el link según la cantidad
  const link = MERCADOPAGO_LINKS[qty];
  
  if (!link) {
    alert('Selecciona una cantidad válida');
    return;
  }

  // Redirigir directamente a Mercado Pago
  window.location.href = link;
  mpScript.setAttribute('data-source', 'button');
  
  // Insertar script en el contenedor
  container.appendChild(mpScript);
}

// ==========================================
// FUNCIÓN PARA RENDERIZAR RESEÑAS DINÁMICAS
// ==========================================

function getRandomReviews(array, count = 3) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  const randomReviews = getRandomReviews(REVIEWS, 3);

  container.innerHTML = randomReviews.map(review => {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    return `
      <div class="p-4 bg-slate-50 rounded-xl border-l-4 border-amber-400 animate__animated animate__fadeIn">
        <div class="flex gap-3 items-start">
          <img src="${review.foto}" alt="${review.nombre}" class="h-10 w-10 rounded-full object-cover flex-shrink-0">
          <div class="flex-1">
            <div class="font-semibold text-slate-800 text-sm">${review.nombre}</div>
            <div class="text-amber-400 text-xs">${stars}</div>
            <div class="text-sm text-slate-600 mt-1">"${review.comentario}"</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// 10. SCROLL SUAVE HACIA BOTONES
// ==========================================

function updatePagarAhoraButton() {
  const qtySelect = document.getElementById('qty');
  const btnPagarAhora = document.getElementById('btnPagarAhora');
  
  if (!qtySelect || !btnPagarAhora) return;
  
  const qty = parseInt(qtySelect.value);
  const discount = getVolumeDiscount(qty);
  const totalPrice = calculatePrice(qty);
  const discountPercent = Math.round(discount * 100);
  
  btnPagarAhora.textContent = `¡Paga Ahora - ${discountPercent}% Descuento! $${totalPrice.toFixed(2)} MXN`;
}

document.addEventListener('DOMContentLoaded', function() {
  // Renderizar reseñas dinámicas
  renderReviews();

  const qtySelect = document.getElementById('qty');
  
  // Actualizar botón en la carga inicial
  updatePagarAhoraButton();
  
  // Actualizar botón cuando cambia la cantidad
  if (qtySelect) {
    qtySelect.addEventListener('change', updatePagarAhoraButton);
  }
  
  // Event listener para redirección a MercadoPago
  const btnPagarAhora = document.getElementById('btnPagarAhora');
  if (btnPagarAhora) {
    btnPagarAhora.addEventListener('click', (e) => {
      e.preventDefault();
      const qty = parseInt(document.getElementById('qty').value);
      const link = MERCADOPAGO_LINKS[qty];

      if (!link) {
        alert('Selecciona una cantidad válida');
        return;
      }

      window.location.href = link;
    });
  }

  // Event listener para Mercado Pago - Redirección directa
  const btnMercadoPago = document.getElementById('btnMercadoPago');
  if (btnMercadoPago) {
    btnMercadoPago.addEventListener('click', (e) => {
      e.preventDefault();
      const qty = parseInt(document.getElementById('qty').value);
      redirectToMercadoPago(qty);
    });
  }

  // Event listener para Paga al Recibir - abre modal y auto-rellena
  const btnPagaAlRecibir = document.getElementById('btnPagaAlRecibir');
  if (btnPagaAlRecibir) {
    btnPagaAlRecibir.addEventListener('click', (e) => {
      e.preventDefault();
      const cp = document.getElementById('cp')?.value || '';

      // Validar que el CP esté completo
      if (cp.length !== 5) {
        alert('Ingresa un código postal válido de 5 dígitos');
        return;
      }

      // Verificar cobertura
      if (typeof verificarCoberturaPagoAlRecibir === 'function' && !verificarCoberturaPagoAlRecibir(cp)) {
        alert('Este código postal no tiene cobertura para pago al recibir');
        return;
      }

      // Autorrellenar modal con datos del form principal
      autorrellenarModalPagar();

      // Mostrar modal
      const modal = new bootstrap.Modal(document.getElementById('pagarAlRecibir-Modal'));
      modal.show();
    });
  }

  // ==========================================
  // LÓGICA DE ESTADOS Y CIUDADES DINÁMICAS
  // ==========================================
  
  const estadoSelect = document.getElementById('estado');
  const ciudadSelect = document.getElementById('ciudad');
  const cpInput = document.getElementById('cp');

  // Evento para cargar ciudades cuando cambia el estado
  if (estadoSelect) {
    estadoSelect.addEventListener('change', function() {
      const estadoSeleccionado = this.value;
      ciudadSelect.innerHTML = '<option value="">Selecciona una ciudad</option>';

      if (estadoSeleccionado && ESTADOS_CIUDADES[estadoSeleccionado]) {
        const ciudades = ESTADOS_CIUDADES[estadoSeleccionado];
        ciudades.forEach(ciudad => {
          const option = document.createElement('option');
          option.value = ciudad;
          option.textContent = ciudad;
          ciudadSelect.appendChild(option);
        });
      }
    });
  }

  // Validación para CP: solo números y máximo 5 dígitos + verificación de cobertura
  if (cpInput) {
    cpInput.addEventListener('input', function(e) {
      // Remover cualquier carácter que no sea número
      this.value = this.value.replace(/[^0-9]/g, '');
      
      // Limitar a 5 dígitos
      if (this.value.length > 5) {
        this.value = this.value.slice(0, 5);
      }

      // Verificar cobertura de pago al recibir si el CP está completo
      if (this.value.length === 5) {
        verificarYMostrarCobertura(this.value);
      } else {
        // Deshabilitar el botón si el CP no está completo
        document.getElementById('btnPagaAlRecibir').disabled = true;
        document.getElementById('recaudo-status').classList.add('hidden');
      }
    });
  }

  // Función para verificar cobertura y habilitar/deshabilitar botón
  function verificarYMostrarCobertura(cp) {
    const btnRecaudo = document.getElementById('btnPagaAlRecibir');
    const statusDiv = document.getElementById('recaudo-status');
    
    // Verificar si el CP tiene cobertura (función del archivo recaudo_checker.js)
    if (typeof verificarCoberturaPagoAlRecibir === 'function' && verificarCoberturaPagoAlRecibir(cp)) {
      // Habilitar botón - con cobertura
      btnRecaudo.disabled = false;
      statusDiv.classList.remove('hidden');
      statusDiv.className = 'p-3 rounded-lg text-sm font-semibold flex items-center gap-2 bg-emerald-50 border-2 border-emerald-200 text-emerald-700';
      statusDiv.innerHTML = '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg><span>✓ ¡Envío disponible con pago al recibir en tu zona!</span>';
    } else {
      // Deshabilitar botón - sin cobertura
      btnRecaudo.disabled = true;
      statusDiv.classList.remove('hidden');
      statusDiv.className = 'p-3 rounded-lg text-sm font-semibold flex items-center gap-2 bg-orange-50 border-2 border-orange-200 text-orange-700';
      statusDiv.innerHTML = '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg><span>⚠️ Código postal no tiene cobertura. Usa otro método de pago.</span>';
    }
  }

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

// ============================================
// MÓDULO: PAGAR AL RECIBIR - MODAL CHECKOUT
// ============================================

/**
 * Generar folio progresivo: luzledmx001, luzledmx002, etc.
 */
function generarFolioProgresivo() {
  const prefijo = 'luzledmx';
  const key = 'ultimo_folio_numero';
  
  // Obtener el último número guardado en localStorage
  let ultimoNumero = parseInt(localStorage.getItem(key)) || 0;
  ultimoNumero += 1;
  
  // Guardar el nuevo número para la próxima vez
  localStorage.setItem(key, ultimoNumero);
  
  // Formatear como luzledmx001, luzledmx002, etc (con 3 dígitos)
  const numeroFormateado = String(ultimoNumero).padStart(3, '0');
  const folio = `${prefijo}${numeroFormateado}`;
  
  return folio;
}

/**
 * Autorrellenar formulario del modal con datos del formulario principal
 */
/**
 * Actualizar el resumen de precios en el modal según la cantidad seleccionada
 * Incluye descuentos por volumen y ofertas especiales (Buen Fin, etc.)
 */
function actualizarPreciosModal() {
  const cantidad = parseInt(document.getElementById('modal-cantidad')?.value) || 1;
  const precioUnitario = PRODUCT_PRICE;
  
  // Tiers de descuento por volumen (actualizado)
  let descuentoPorcentaje = 0;
  
  if (cantidad === 1) {
    descuentoPorcentaje = 15;
  } else if (cantidad === 2) {
    descuentoPorcentaje = 18;
  } else if (cantidad === 3) {
    descuentoPorcentaje = 20;
  } else if (cantidad === 5) {
    descuentoPorcentaje = 22;
  } else if (cantidad >= 10) {
    descuentoPorcentaje = 30;
  }
  
  // Calcular subtotal
  const subtotal = precioUnitario * cantidad;
  
  // Calcular descuento
  const montoDescuento = subtotal * (descuentoPorcentaje / 100);
  const totalConDescuento = subtotal - montoDescuento;
  
  // Actualizar UI
  document.getElementById('modal-qty').textContent = cantidad;
  document.getElementById('modal-unit-price').textContent = precioUnitario.toFixed(2);
  document.getElementById('modal-total').textContent = totalConDescuento.toFixed(2);
  
  // Mostrar/ocultar sección de descuento (siempre mostrar si hay descuento)
  const discountSection = document.getElementById('discount-section');
  if (descuentoPorcentaje > 0) {
    document.getElementById('discount-display').classList.remove('d-none');
    document.getElementById('discount-percent').textContent = descuentoPorcentaje;
    document.getElementById('discount-amount').textContent = montoDescuento.toFixed(2);
  } else {
    document.getElementById('discount-display').classList.add('d-none');
  }
  
  // Verificar y mostrar oferta Buen Fin (última semana de Noviembre)
  verificarYMostrarBuenFin();
  
  // Guardar valores en localStorage para usar después
  localStorage.setItem('modal-qty', cantidad);
  localStorage.setItem('modal-total', totalConDescuento.toFixed(2));
  localStorage.setItem('modal-discount-percent', descuentoPorcentaje);
}

/**
 * Verificar si es período Buen Fin y mostrar oferta especial
 */
function verificarYMostrarBuenFin() {
  const hoy = new Date();
  const mes = hoy.getMonth() + 1; // Enero es 1
  const dia = hoy.getDate();
  
  // Buen Fin es últimos 7 días de noviembre (24-30 Nov)
  const esBuenFin = (mes === 11 && dia >= 24) || (mes === 12 && dia <= 2); // Extendido un poco
  
  const buenFinOferta = document.getElementById('buen-fin-offer');
  if (esBuenFin) {
    buenFinOferta.classList.remove('d-none');
  } else {
    buenFinOferta.classList.add('d-none');
  }
}

/**
 * Recolectar datos del formulario del modal (INDEPENDIENTE)
 * No depende de campos en index.html
 */
function recolectarDatosModalPagar() {
  const cantidad = parseInt(document.getElementById('modal-cantidad')?.value) || 1;
  const nombre = document.getElementById('modal-nombre')?.value?.trim() || '';
  const apellido = document.getElementById('modal-apellido')?.value?.trim() || '';
  const telefono = document.getElementById('modal-telefono')?.value?.trim() || '';
  const correo = document.getElementById('modal-correo')?.value?.trim() || '';
  const direccion = document.getElementById('modal-direccion')?.value?.trim() || '';
  const colonia = document.getElementById('modal-colonia')?.value?.trim() || '';
  const ciudad = document.getElementById('modal-ciudad')?.value?.trim() || '';
  const estado = document.getElementById('modal-estado')?.value?.trim() || '';
  const cp = document.getElementById('modal-cp')?.value?.trim() || '';
  const referencias = document.getElementById('modal-referencias')?.value?.trim() || '';
  const precioTotal = document.getElementById('modal-total')?.textContent || '0.00';
  
  const datos = {
    nombre,
    apellido,
    telefono,
    correo,
    direccion,
    referencias,
    colonia,
    ciudad,
    estado,
    postal: cp,
    precioTotal,
    qty: cantidad,
    tipoEnvio: 'Pago al Recibir'
  };
  
  return datos;
}

/**
 * Validar que todos los campos requeridos del modal estén completos
 */
function validarFormularioModalPagar() {
  const nombre = document.getElementById('modal-nombre')?.value?.trim();
  const telefono = document.getElementById('modal-telefono')?.value?.trim();
  const correo = document.getElementById('modal-correo')?.value?.trim();
  const direccion = document.getElementById('modal-direccion')?.value?.trim();
  const ciudad = document.getElementById('modal-ciudad')?.value?.trim();
  const estado = document.getElementById('modal-estado')?.value?.trim();
  const cp = document.getElementById('modal-cp')?.value?.trim();
  const terminos = document.getElementById('modal-terminos')?.checked;
  
  // Validaciones básicas
  if (!nombre || nombre.length < 2) {
    alert('Por favor ingresa un nombre válido (mínimo 2 caracteres)');
    return false;
  }
  
  if (!telefono || !/^\d{10}$/.test(telefono)) {
    alert('Por favor ingresa un teléfono válido (10 dígitos)');
    return false;
  }
  
  if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    alert('Por favor ingresa un correo electrónico válido');
    return false;
  }
  
  if (!direccion || direccion.length < 5) {
    alert('Por favor ingresa una dirección válida');
    return false;
  }
  
  if (!ciudad || ciudad.length < 2) {
    alert('Por favor ingresa una ciudad válida');
    return false;
  }
  
  if (!estado) {
    alert('Por favor selecciona tu estado');
    return false;
  }
  
  if (!cp || !/^\d{5}$/.test(cp)) {
    alert('Por favor ingresa un código postal válido (5 dígitos)');
    return false;
  }
  
  // Validar que CP está en cobertura
  if (!verificarCoberturaPagoAlRecibir(cp)) {
    alert('Lamentablemente tu código postal no está en cobertura para Pago al Recibir. Intenta con otro método de pago.');
    return false;
  }
  
  if (!terminos) {
    alert('Por favor acepta los términos y políticas de envío');
    return false;
  }
  
  return true;
}

function autorrellenarModalPagar() {
  // Esta función ahora solo prepara el modal para ser llenado manualmente
  // Solo genera el folio
  generarFolioProgresivo();
  
  // Inicializar precios
  actualizarPreciosModal();
}

/**
 * Generar mensaje de WhatsApp con los datos del pedido
 */
function generarMensajeWhatsApp(datos, folio) {
  const cantidad = datos.qty || datos.cantidad || 1;
  const mensaje = `📄 *PEDIDO CONTRA ENTREGA*

📋 *Folio de Pedido:* ${folio}
👤 *Nombre Completo:* ${datos.nombre} ${datos.apellido}
📞 *Teléfono:* ${datos.telefono}
📧 *Correo:* ${datos.correo}
📍 *Dirección Completa:* ${datos.direccion}
🏘️ *Colonia:* ${datos.colonia}
🏙️ *Ciudad:* ${datos.ciudad}
🗺️ *Estado:* ${datos.estado}
🏷️ *Código Postal:* ${datos.postal}
📝 *Referencias:* ${datos.referencias || 'Sin referencias'}

📦 *Producto(s) solicitados:* Kit 4 Lámparas Solares 100 LED 270°
🔢 *Cantidad:* ${cantidad} kit(s)

💵 *Total a pagar:* $${datos.precioTotal} MXN
🚚 *Método de Entrega:* ${datos.tipoEnvio}`;
  
  return encodeURIComponent(mensaje);
}

/**
 * Enviar datos a Formspree
 */
async function enviarAFormspree(datosFormulario) {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosFormulario)
    });

    if (response.ok) {
      return true;
    } else {
      console.error('Error en Formspree:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error al enviar a Formspree:', error);
    return false;
  }
}

/**
 * Enviar email de confirmación (servicio externo)
 */
async function enviarEmailConfirmacion(datos, folio) {
  // Puedes usar un servicio como EmailJS o tu propio backend
  // Por ahora, usamos Formspree como fallback
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: datos.correo,
        name: datos.nombre,
        subject: `Confirmación de pedido ${folio}`,
        message: `Tu pedido ha sido confirmado. Folio: ${folio}. Total: $${datos.precioTotal} MXN`
      })
    });
  } catch (error) {
    console.log('Email de confirmación en background');
  }
}

/**
 * Guardar folio en historial (localStorage)
 */
function guardarFolioEnHistorial(folio, datos) {
  const historial = JSON.parse(localStorage.getItem('historial_folios') || '[]');
  
  historial.push({
    folio: folio,
    nombre: datos.nombre,
    email: datos.correo,
    telefono: datos.telefono,
    total: datos.precioTotal,
    fecha: new Date().toLocaleString('es-MX'),
    timestamp: Date.now()
  });
  
  // Guardar máximo 100 folios
  if (historial.length > 100) {
    historial.shift();
  }
  
  localStorage.setItem('historial_folios', JSON.stringify(historial));
  
  // Log en consola para debugging
  console.log('✓ Folio guardado:', folio, datos.nombre);
}

/**
 * Evento: Cuando se abre el modal
 */
const modalPagar = document.getElementById('pagarAlRecibir-Modal');
if (modalPagar) {
  modalPagar.addEventListener('show.bs.modal', function() {
    autorrellenarModalPagar();
  });
}

/**
 * Evento: Click en botón "CONFIRMAR PEDIDO"
 */
document.getElementById('pagarAlRecibir-Btn')?.addEventListener('click', async function() {
  // Validar que el formulario del modal esté completo
  if (!validarFormularioModalPagar()) {
    return;
  }

  // Recolectar datos DEL MODAL (independiente)
  const datos = recolectarDatosModalPagar();

  // Generar folio progresivo
  const folio = generarFolioProgresivo();
  document.getElementById('par-folio').value = folio;

  // Preparar datos para Formspree
  const datosFormulario = {
    ...datos,
    folio: folio,
    metodo_pago: 'Paga al Recibir',
    producto: 'KIT DE 4 LÁMPARAS SOLARES (100 LED)'
  };

  // Mostrar loading
  const btnConfirmar = document.getElementById('pagarAlRecibir-Btn');
  const originalText = btnConfirmar.innerHTML;
  btnConfirmar.disabled = true;
  btnConfirmar.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Procesando...';

  try {
    // 1. Enviar a Formspree
    const enviado = await enviarAFormspree(datosFormulario);

    if (enviado) {
      // 2. Guardar folio en historial (localStorage)
      guardarFolioEnHistorial(folio, datos);

      // 3. Enviar email de confirmación en background
      enviarEmailConfirmacion(datos, folio);

      // 3. Generar link de WhatsApp
      const mensajeWhatsApp = generarMensajeWhatsApp(datos, folio);
      const linkWhatsApp = `https://wa.me/${OWNER_WHATSAPP}?text=${mensajeWhatsApp}`;

      // 3. Abrir WhatsApp en nueva ventana
      window.open(linkWhatsApp, '_blank');

      // 4. Cerrar modal de pagar y mostrar confirmación
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('pagarAlRecibir-Modal'));
      modalInstance.hide();

      // Esperar un poco para que se cierre el modal
      setTimeout(() => {
        // Mostrar modal de confirmación
        document.getElementById('confirmacion-folio').textContent = folio;
        const confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacion-Modal'));
        confirmacionModal.show();

        // Limpiar formulario principal después de confirmación
        document.getElementById('confirmacion-Modal').addEventListener('hidden.bs.modal', () => {
          document.getElementById('order-form')?.reset();
          // Redirigir a página de gracias
          window.location.href = 'gracias.html';
        });
      }, 300);
    } else {
      throw new Error('Error al procesar el pedido');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un error al procesar tu pedido. Por favor intenta de nuevo.');
    btnConfirmar.disabled = false;
    btnConfirmar.innerHTML = originalText;
  }
});

// Evento: Volver al inicio desde confirmación
document.querySelector('#confirmacion-Modal .modal-footer button')?.addEventListener('click', function() {
  window.location.href = 'index.html';
});

// ==========================================
// EVENT LISTENERS DEL MODAL INDEPENDIENTE
// ==========================================

// Actualizar precios cuando cambia la cantidad en el modal
document.getElementById('modal-cantidad')?.addEventListener('change', function() {
  actualizarPreciosModal();
});

// Habilitar/deshabilitar botón según checkbox de términos
document.getElementById('modal-terminos')?.addEventListener('change', function() {
  const btnConfirmar = document.getElementById('pagarAlRecibir-Btn');
  btnConfirmar.disabled = !this.checked;
});

// Mostrar el modal cuando se abre (ejecutar inicialización)
document.getElementById('pagarAlRecibir-Modal')?.addEventListener('show.bs.modal', function() {
  actualizarPreciosModal();
  // Resetear el checkbox y deshabilitar botón
  const checkboxTerminos = document.getElementById('modal-terminos');
  checkboxTerminos.checked = false;
  document.getElementById('pagarAlRecibir-Btn').disabled = true;
});
