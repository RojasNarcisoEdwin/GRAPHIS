export class CanvasLocal {
    //**** Variables básicas del canvas
    private ctx: CanvasRenderingContext2D;
    private ancho: number;
    private alto: number;

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx; //**** Contexto de dibujo
        this.ancho = canvas.width;
        this.alto = canvas.height;
    }

    //**** Dibuja línea simple
    private linea(x1: number, y1: number, x2: number, y2: number): void {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    //**** Método principal
    dibujar(): void {
        //**** Configuración inicial
        let tamano = 400;
        let inicioX = (this.ancho - tamano) / 2;
        let inicioY = (this.alto - tamano) / 2;
        let reduccion = 0.03;

        //**** Puntos del cuadrado
        let x1 = inicioX;
        let y1 = inicioY;
        let x2 = inicioX + tamano;
        let y2 = inicioY;
        let x3 = x2;
        let y3 = inicioY + tamano;
        let x4 = x1;
        let y4 = y3;

        //**** Dibujamos 80 cuadrados
        for (let i = 0; i < 80; i++) {
            //**** Lados del cuadrado
            this.linea(x1, y1, x2, y2); //**** Arriba
            this.linea(x2, y2, x3, y3); //**** Derecha
            this.linea(x3, y3, x4, y4); //**** Abajo
            this.linea(x4, y4, x1, y1); //**** Izquierda

            //**** Movemos los puntos
            x1 += (x2 - x1) * reduccion;
            y1 += (y2 - y1) * reduccion;
            x2 += (x3 - x2) * reduccion;
            y2 += (y3 - y2) * reduccion;
            x3 += (x4 - x3) * reduccion;
            y3 += (y4 - y3) * reduccion;
            x4 += (x1 - x4) * reduccion;
            y4 += (y1 - y4) * reduccion;
        }
    }
}