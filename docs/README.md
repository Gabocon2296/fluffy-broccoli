# 🌞 Landing Page - Kit de Lámparas Solares 100 LED

Landing page profesional con sistema de compra integrado (Mercado Pago + Paga al Recibir).

## 📁 Estructura del Proyecto

```
www-main/
├── index.html                      (Página principal - Landing)
├── checkout.html                   (Página de checkout)
├── gracias.html                    (Página de confirmación)
├── css/
│   └── style.css                  (Estilos CSS)
├── js/
│   ├── script.js                  (Lógica principal)
│   ├── municipios.js              (Base datos: estados/ciudades)
│   └── recaudo_checker.js         (✨ NUEVO: Verificación de cobertura)
├── img/                           (Imágenes)
├── vid/                           (Videos)
└── 📚 Documentación
    ├── ESTADO_PROYECTO.md         (Estado actual del proyecto)
    ├── RESUMEN_IMPLEMENTACION.md  (Resumen técnico)
    ├── TEST_PAGA_AL_RECIBIR.md    (Códigos para pruebas)
    └── GUIA_INTEGRACION_CSV.md    (Cómo integrar CSV completo)
```

## ✨ Funcionalidades Principales

### 1. Sistema de Compra Dual
- **Pagar Ahora** → Mercado Pago (pago en línea)
- **Paga al Recibir** → Formspree (cash on delivery)

### 2. Verificación de Cobertura "Paga al Recibir"
- Base de datos de ~1,500 códigos postales (expandible a 31,800+)
- Verificación en tiempo real
- Botón dinámico: verde (con cobertura) / oculto (sin cobertura)
- Indicador visual del estado

### 3. Formulario Inteligente
- Selector de Estado → Carga dinámicamente Ciudades
- Validación de Código Postal (5 dígitos)
- Cálculo automático de precio con descuento
- Integración con Formspree para pedidos

## 🚀 Cómo Usar

### Modo Desarrollo (Local)
```bash
# 1. Abre index.html en navegador
# 2. Prueba los formularios
# 3. Consola (F12) muestra logs de sistema
```

### Verificación de Cobertura - Pruebas

**CPs válidos (con cobertura):**
- `01000` (CDMX)
- `44000` (Guadalajara)
- `64000` (Monterrey)
- `77000` (Cancún)

**CPs inválidos (sin cobertura):**
- `12345`, `99999`, `00000`

## 🔧 Configuración Necesaria

### 1. Formspree Integration
En `js/script.js` línea ~17:
```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```
**Reemplaza `YOUR_FORM_ID` con tu ID real** (obtén en formspree.io)

### 2. Integrar CSV Completo (+31,800 CPs)
Sigue: `GUIA_INTEGRACION_CSV.md`

Pasos resumidos:
1. Obtén archivo CSV con códigos postales
2. Extrae códigos únicos
3. Formatea para JavaScript
4. Actualiza `js/recaudo_checker.js`

## 📊 Estadísticas del Sistema

| Métrica | Valor |
|---------|-------|
| Códigos Postales Actuales | ~1,500 |
| Códigos Objetivo | ~31,800 |
| Cobertura Geográfica | 32 Estados de México |
| Tiempo Búsqueda | O(1) - Instantáneo |
| Tamaño de Archivo | ~50 KB |
| Compatibilidad | Todos navegadores |

## 🎯 Flujo de Usuario

```
Usuario
   ↓
Ingresa Cantidad
   ↓
Ingresa Nombre, Teléfono, Dirección
   ↓
Selecciona Estado → Carga Ciudades
   ↓
Selecciona Ciudad
   ↓
Ingresa Código Postal (5 dígitos)
   ↓
┌─ Sistema verifica cobertura ─┐
│                               │
├─ CON COBERTURA:              │
│   Botón verde "PAGA AL RECIBIR"
│   → Click → Formspree
│   → Pedido guardado
│
└─ SIN COBERTURA:
    Botón oculto
    Usuario usa "Pagar Ahora"
    → Mercado Pago
    → Pago en línea
```

## 📚 Documentación Disponible

| Archivo | Contenido |
|---------|----------|
| `ESTADO_PROYECTO.md` | Estado actual, métricas, checklist |
| `RESUMEN_IMPLEMENTACION.md` | Resumen técnico detallado |
| `TEST_PAGA_AL_RECIBIR.md` | Códigos para pruebas, ejemplos |
| `GUIA_INTEGRACION_CSV.md` | Paso a paso para integrar 31,800 CPs |

## 🔐 Seguridad

- ✅ Validación en cliente (JavaScript)
- ✅ Validación en servidor (Formspree)
- ✅ Sin exposición de datos sensibles
- ✅ Códigos postales públicos (no datos privados)
- ✅ Integración segura con Mercado Pago

## 🌐 Navegadores Soportados

- ✅ Chrome/Chromium (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navegadores móviles

## 🐛 Solución de Problemas

### "El botón 'Paga al Recibir' no aparece"
1. Verifica que el CP tenga exactamente 5 dígitos
2. Usa CPs de prueba: 01000, 44000, 64000, 77000
3. Abre consola (F12) y ejecuta: `verificarCoberturaPagoAlRecibir('01000')`

### "Error: CODIGOS_POSTALES_RECAUDO is not defined"
1. Verifica que `js/recaudo_checker.js` existe
2. Verifica que se carga ANTES que `js/script.js` en `index.html`
3. Recarga la página (Ctrl+Shift+R)

### "Formspree no recibe el formulario"
1. Verifica que `FORMSPREE_ENDPOINT` sea correcto
2. Comprueba tu email de Formspree
3. Abre consola (F12) para ver errores

## 📞 Próximos Pasos

1. **Inmediato:**
   - [ ] Configura Formspree con tu ID real
   - [ ] Prueba sistema con CPs de ejemplo

2. **Corto Plazo:**
   - [ ] Integra CSV completo (31,800+ CPs)
   - [ ] Prueba en navegadores diferentes

3. **Largo Plazo:**
   - [ ] Analytics de conversiones
   - [ ] Estadísticas por método de pago
   - [ ] Integración con software de logística

## 📝 Versión

**Versión 2.0** - Sistema "Paga al Recibir" implementado
- ✅ Verificación de cobertura postal
- ✅ Botón dinámico
- ✅ Integración Formspree
- ✅ Base datos de municipios

**Actualizaciones Recientes (Sesión Actual):**
- ✨ Archivo `js/recaudo_checker.js` creado
- ✨ ~1,500 códigos postales agregados
- ✨ Sistema de verificación en tiempo real
- ✨ Documentación completa (4 archivos .md)

## 🤝 Soporte

Consulta la documentación en los archivos `.md` incluidos:
- Errores técnicos → `ESTADO_PROYECTO.md`
- Cómo integrar CSV → `GUIA_INTEGRACION_CSV.md`
- Códigos para probar → `TEST_PAGA_AL_RECIBIR.md`
- Detalles técnicos → `RESUMEN_IMPLEMENTACION.md`

---

**¡Listo para vender! 🚀**