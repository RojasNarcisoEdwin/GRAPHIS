export class canvasLocal {
    constructor(superficie) {
        this.superficie = superficie;
        this.dibujador = superficie.getContext('2d');
        //* Establecer dimensiones cuadradas basadas en el menor de los dos lados
        const dimension = Math.min(superficie.width, superficie.height);
        superficie.width = dimension;
        superficie.height = dimension;
        //* Calcular el tamaño de cada celda (píxel del QR)
        this.medidaCelda = Math.floor(dimension / 25); //* Usar Math.floor para evitar decimales
        //* Deshabilitar suavizado para obtener bordes nítidos
        this.dibujador.imageSmoothingEnabled = false;
        //* Solicitar texto al usuario para codificar en el QR
        const contenido = window.prompt('Texto para codificar en QR:', '');
        if (contenido) {
            this.construirCodigo(contenido);
        }
    }
    //* Método para dibujar una celda individual en el QR
    marcarCelda(ejeX, ejeY, relleno) {
        //* Establecer color según si debe estar relleno o no
        this.dibujador.fillStyle = relleno ? '#000000' : '#FFFFFF';
        //* Dibujar el rectángulo con bordes nítidos (usando Math.floor y Math.ceil)
        this.dibujador.fillRect(Math.floor(ejeX * this.medidaCelda), Math.floor(ejeY * this.medidaCelda), Math.ceil(this.medidaCelda), Math.ceil(this.medidaCelda));
    }
    //* Método para establecer los patrones de alineación del QR
    establecerPatrones() {
        //* Definir el patrón de los marcadores de posición
        const patron = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        //* Posiciones de los tres marcadores principales
        const posiciones = [{ x: 0, y: 0 }, { x: 0, y: 18 }, { x: 18, y: 0 }];
        //* Aplicar el patrón en cada posición
        posiciones.forEach(pos => {
            this.aplicarPatron(pos.x, pos.y, patron);
        });
        //* Dibujar líneas de sincronización (patrón de timing)
        for (let p = 8; p < 17; p++) {
            this.marcarCelda(p, 6, p % 2 === 0);
            this.marcarCelda(6, p, p % 2 === 0);
        }
        //* Patrón de alineación adicional (para versiones mayores de QR)
        this.aplicarPatron(18, 18, [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1]
        ]);
    }
    //* Método para aplicar un patrón en una posición específica
    aplicarPatron(desplazX, desplazY, forma) {
        //* Iterar sobre cada fila del patrón
        forma.forEach((fila, fy) => {
            //* Iterar sobre cada columna del patrón
            fila.forEach((valor, fx) => {
                //* Dibujar la celda correspondiente
                this.marcarCelda(desplazX + fx, desplazY + fy, valor === 1);
            });
        });
    }
    //* Método principal para construir el código QR
    construirCodigo(info) {
        //* Limpiar el canvas antes de comenzar
        this.dibujador.clearRect(0, 0, this.superficie.width, this.superficie.height);
        //* Dibujar los patrones de posición y sincronización
        this.establecerPatrones();
        //* Convertir el texto en una secuencia de bits
        const bitsDatos = Array.from(info)
            .flatMap(c => c.charCodeAt(0).toString(2).padStart(8, '0').split(''));
        //* Variable para llevar el índice del bit actual
        let bitIndex = 0;
        //* Recorrer todas las celdas del QR (25x25)
        for (let cy = 0; cy < 25; cy++) {
            for (let cx = 0; cx < 25; cx++) {
                //* Solo procesar celdas que no estén en zonas protegidas
                if (!this.enZonaProtegida(cx, cy)) {
                    //* Usar el bit correspondiente o un valor aleatorio si se acabaron los bits
                    const estado = bitIndex < bitsDatos.length
                        ? bitsDatos[bitIndex] === '1'
                        : Math.random() > 0.7;
                    this.marcarCelda(cx, cy, estado);
                    bitIndex++;
                }
            }
        }
    }
    //* Método para verificar si una celda está en zona protegida
    enZonaProtegida(x, y) {
        //* Coordenadas de los patrones de alineación principales
        const patrones = [
            { x1: 0, y1: 0, x2: 6, y2: 6 }, //* Superior izquierdo
            { x1: 0, y1: 18, x2: 6, y2: 24 }, //* Inferior izquierdo
            { x1: 18, y1: 0, x2: 24, y2: 6 }, //* Superior derecho
            { x1: 18, y1: 18, x2: 24, y2: 24 } //* Inferior derecho (nuevo patrón añadido)
        ];
        //* Verificar si está dentro de algún patrón de alineación
        const enPatron = patrones.some(p => x >= p.x1 && x <= p.x2 && y >= p.y1 && y <= p.y2);
        //* Verificar si está en las líneas de sincronización
        const enLinea = (x === 6 && y >= 0 && y < 25) ||
            (y === 6 && x >= 0 && x < 25);
        return enPatron || enLinea;
    }
}
//* Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    //* Obtener referencia al elemento canvas
    const contenedorQR = document.querySelector('qrinfo');
    //* Crear nueva instancia de la clase canvasLocal
    new canvasLocal(contenedorQR);
});
