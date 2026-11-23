# Pet Shop Premium

Sistema para tienda de alimento balanceado y accesorios para mascotas. Funciona como aplicación (PWA): se instala en el celular o la computadora y abre sin internet.

## Funciones

- **Inventario** por categorías (Perros, Gatos, Otras mascotas, Snacks, Accesorios, Antipulgas), con foto, precio y stock en kilos y sacos.
- **Venta por kilo, medio saco y saco**: el stock se guarda en kilos y cada forma de venta descuenta lo que lleva.
- **Venta rápida**: buscar o escanear, cobrar en efectivo o QR, cálculo del cambio.
- **Aviso de stock bajo** en Inventario y Reportes.
- **Reportes** de hoy, semana y mes, con exportación a Excel (CSV).
- **Cierre de caja** con arqueo y PDF del cierre.

## Publicar en GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
3. En un par de minutos queda en `https://favian-paniagua.github.io/PetShop/`.

## Actualizar la app

Al cambiar cualquier archivo, sube el número de `VERSION` en `sw.js` (por ejemplo `petshop-v2`) para que los equipos que ya la instalaron reciban la versión nueva.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La aplicación completa |
| `manifest.webmanifest` | Nombre, colores e íconos para instalarla |
| `sw.js` | Guarda la app para que funcione sin internet |
| `icons/` | Íconos de la app |
| `img/productos/` | Fotos de los productos, por código (`P-001.webp`, …) |

## Notas

- Los datos (productos, ventas, fotos subidas) se guardan en el navegador de cada equipo. Para compartirlos entre celular y computadora hace falta el servidor en la nube.
- Las ventas de los últimos 30 días son de ejemplo, para que los reportes tengan números.
