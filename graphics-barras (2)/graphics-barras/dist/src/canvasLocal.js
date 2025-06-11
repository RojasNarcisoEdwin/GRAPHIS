export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 12;
        this.rHeight = 8;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 12;
        this.centerY = this.maxY / 8 * 7;
    }

    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }

    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }

    barra(x, y, alt, color) {
        // Configurar el estilo para el relleno con sombra azul
        this.graphics.shadowColor = 'rgb(238, 255, 0)';
        this.graphics.shadowBlur = 15;
        this.graphics.shadowOffsetX = 0;
        this.graphics.shadowOffsetY = 0;
        
        this.graphics.fillStyle = color;
        this.graphics.strokeStyle = 'black';
        this.graphics.lineWidth = 2.5;

        // Comenzar el trazado de la barra
        this.graphics.beginPath();
        this.graphics.moveTo(this.iX(x), this.iY(0));
        this.graphics.lineTo(this.iX(x - 0.5), this.iY(0.5));
        this.graphics.lineTo(this.iX(x - 0.5), this.iY(y + alt));
        this.graphics.lineTo(this.iX(x), this.iY(y + alt - 0.5));
        this.graphics.lineTo(this.iX(x + 0.5), this.iY(y + alt));
        this.graphics.lineTo(this.iX(x + 0.5), this.iY(0.5));
        this.graphics.lineTo(this.iX(x), this.iY(0));
        this.graphics.closePath();

        // Rellenar y dibujar borde
        this.graphics.fill();
        this.graphics.stroke();

        // Resetear sombra para otros elementos
        this.graphics.shadowColor = 'transparent';

        // Línea vertical en el centro de la barra
        this.graphics.strokeStyle = 'black';
        this.graphics.lineWidth = 2;
        this.drawLine(
            this.iX(x), 
            this.iY(-0.001),
            this.iX(x), 
            this.iY(y + alt - 0.5)
        );

        // Restaurar grosor para las sombras
        this.graphics.lineWidth = 1;
        
        // Sombras/proyecciones con tono azul
        this.graphics.strokeStyle = 'rgba(234, 0, 255, 0.97)';
        this.drawLine(this.iX(x - 0.5), this.iY(y + alt), this.iX(x - 0.5), this.iY(this.rHeight - 2));
        this.drawLine(this.iX(x), this.iY(y + alt - 0.5), this.iX(x), this.iY(this.rHeight - 2.5));
        this.drawLine(this.iX(x + 0.5), this.iY(y + alt), this.iX(x + 0.5), this.iY(this.rHeight - 2));
        
        // Base 3D con efecto azul
        this.graphics.strokeStyle = 'rgb(255, 0, 255)';
        this.drawLine(this.iX(x - 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 1.5));
        this.drawLine(this.iX(x + 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 1.5));
        this.drawLine(this.iX(x - 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 2.5));
        this.drawLine(this.iX(x + 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 2.5));
    }

    paint() {
        let h = [10, 55, 20, 25, 66];
        let maxEsc = this.maxH(h);
        let colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
        
        // Fondo con gradiente azul claro
        let gradient = this.graphics.createLinearGradient(0, 0, 0, this.maxY);
        gradient.addColorStop(0, '#f0f8ff');  // Azul muy claro
        //gradient.addColorStop(1, '#e6f2ff');  // Azul claro
        this.graphics.fillStyle = gradient;
        this.graphics.fillRect(0, 0, this.maxX + 1, this.maxY + 1);
        
        // Dibujar ejes con sombra azul
        this.graphics.shadowColor = 'rgba(0, 100, 255, 0.2)';
        this.graphics.shadowBlur = 5;
        this.graphics.strokeStyle = 'black';
        this.graphics.lineWidth = 1.5;
        this.drawLine(this.iX(0), this.iY(0), this.iX(9), this.iY(0));
        this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(8));
        this.graphics.shadowColor = 'transparent';
        
        // Dibujar barras
        let i = 0;
        for (let x = 1; x < 10; x += (8.1 / h.length)) {
            if (i < h.length) {
                this.barra(x, 0, h[i] * (this.rHeight - 2) / maxEsc, colors[i]);
                
                // Texto con sombra azul
                this.graphics.shadowColor = 'rgba(12, 255, 255, 0.79)';
                this.graphics.shadowBlur = 8;
                this.graphics.font = '35px Arial';
                this.graphics.textAlign = 'center';
                this.graphics.fillStyle = 'black';
                this.graphics.fillText(h[i].toString(), this.iX(x), this.iY(-0.8));
                this.graphics.shadowColor = 'transparent';
                
                i++;
            }
        }
    }

    maxH(h) {
        let max = h[0];
        for (let i = 1; i < h.length; i++) {
            if (max < h[i]) max = h[i];
        }
        return Math.ceil(max / 10) * 10;
    }
}