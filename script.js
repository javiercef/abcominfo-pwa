// script.js - Funciones auxiliares globales

// Verificar si la app está instalada como PWA
window.addEventListener('load', () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('App ejecutándose como PWA instalada');
    }
});

// Función para formatear fechas
function formatearFecha(fecha) {
    if (!fecha) return 'N/A';
    try {
        const d = new Date(fecha);
        return d.toLocaleDateString('es-AR');
    } catch {
        return fecha;
    }
}

// Cachear la última actualización
function guardarUltimaActualizacion(nombreArchivo) {
    localStorage.setItem(`ultima_actualizacion_${nombreArchivo}`, new Date().toISOString());
}

function obtenerUltimaActualizacion(nombreArchivo) {
    return localStorage.getItem(`ultima_actualizacion_${nombreArchivo}`);
}