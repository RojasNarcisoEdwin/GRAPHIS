export class CanvasLocal {
  protected graphics: CanvasRenderingContext2D;
  protected rWidth = 12;
  protected rHeight = 8;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;

  //** Paleta de colores vibrantes para las barras
  coloresRGB: string[] = [
    "#FF6384", // Rosa
    "#36A2EB", // Azul
    "#FFCE56", // Amarillo
    "#4BC0C0", // Turquesa
    "#9966FF", // Morado
    "#FF9F40"  // Naranja
  ];

  constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.graphics = g;
    this.maxX = canvas.width - 1;
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX / 12;
    this.centerY = (this.maxY / 8) * 7;
  }

  //** Convierte coordenadas del mundo real a píxeles
  iX(x: number): number { return Math.round(this.centerX + x / this.pixelSize); }
  iY(y: number): number { return Math.round(this.centerY - y / this.pixelSize); }

  //** Dibuja línea con flecha en el extremo
  drawLine(x1: number, y1: number, x2: number, y2: number, withArrow: boolean = false) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    
    if (withArrow) {
      const headLength = 10;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      this.graphics.lineTo(
        x2 - headLength * Math.cos(angle - Math.PI / 6),
        y2 - headLength * Math.sin(angle - Math.PI / 6)
      );
      this.graphics.moveTo(x2, y2);
      this.graphics.lineTo(
        x2 - headLength * Math.cos(angle + Math.PI / 6),
        y2 - headLength * Math.sin(angle + Math.PI / 6)
      );
    }
    
    this.graphics.stroke();
  }

  //** Dibuja romboide para efecto 3D
  drawRomboide(x1: number, y1: number, x2: number, y2: number,
               x3: number, y3: number, x4: number, y4: number,
               color: string) {
    this.graphics.fillStyle = color;
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.lineTo(x3, y3);
    this.graphics.lineTo(x4, y4);
    this.graphics.closePath();
    this.graphics.stroke();
    this.graphics.fill();
  }

  //** Convierte porcentaje a coordenadas Y del gráfico
  porcen(y: number): number {
    return Math.max(0, Math.min(y, 100)) * 6 / 100;
  }

  //** Genera un color aleatorio de la paleta
  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.coloresRGB.length);
    return this.coloresRGB[randomIndex];
  }

  //** Dibuja texto debajo de cada barra
  drawBarLabel(text: string, x: number, y: number) {
    this.graphics.fillStyle = "#333";
    this.graphics.font = "12px Arial";
    this.graphics.textAlign = "center";
    this.graphics.fillText(text, x, y);
  }

  //** Configuración simplificada de barras
  setupBars(): number {
    const input = prompt("¿Cuántas barras deseas (1-6)?") || "3";
    return Math.max(1, Math.min(6, parseInt(input) || 3));
  }

  //** Dibuja una barra completa con etiquetas
  drawBar(x: number, porcentaje: number, color: string, index: number): void {
    const y = this.porcen(porcentaje);
    const colorClaro = this.Random_Color(color, 0.8);
    const colorFuerte = this.Random_Color(color, 1.0);

    // Dibuja la barra 3D
    this.coloreado(x, y, colorClaro, colorFuerte);

    // Etiqueta de barra (Barra 1, Barra 2...)
    const labelY = this.iY(0) + 20;
    this.drawBarLabel(`Barra ${index + 1}`, this.iX(x), labelY);

    // Porcentaje debajo de la etiqueta
    const percentY = labelY + 15;
    this.drawBarLabel(`${porcentaje}%`, this.iX(x), percentY);
  }

  //** Método original para el efecto 3D
  coloreado(x: number, y: number, colorIzq: string, colorDer: string): void {
    const z = 0.5;
    const decorativo = "rgba(255, 255, 255, 0.99)";

    this.drawRomboide(
      this.iX(x - z), this.iY(7 - z),
      this.iX(x),     this.iY(7),
      this.iX(x + z), this.iY(7 - z),
      this.iX(x),     this.iY(6.3 - z),
      decorativo
    );

    this.drawRomboide(
      this.iX(x - z), this.iY(7 - z),
      this.iX(x),     this.iY(6.3 - z),
      this.iX(x),     this.iY(0),
      this.iX(x - z), this.iY(z),
      decorativo
    );

    this.drawRomboide(
      this.iX(x + z), this.iY(7 - z),
      this.iX(x),     this.iY(6.3 - z),
      this.iX(x),     this.iY(0),
      this.iX(x + z), this.iY(z),
      decorativo
    );

    this.drawRomboide(
      this.iX(x - z), this.iY(y + z),
      this.iX(x),     this.iY(y),
      this.iX(x),     this.iY(0),
      this.iX(x - z), this.iY(z),
      colorIzq
    );

    this.drawRomboide(
      this.iX(x + z), this.iY(y + z),
      this.iX(x),     this.iY(y),
      this.iX(x),     this.iY(0),
      this.iX(x + z), this.iY(z),
      colorDer
    );
  }

  Random_Color(hex: string, alpha: number): string {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  paint(): void {
    // Configurar y dibujar barras
    const numBarras = this.setupBars();
    let x = 1.5;
    
    for (let i = 0; i < numBarras; i++) {
      const porcentaje = Math.floor(Math.random() * 100) + 1; // 1-100%
      const color = this.getRandomColor();
      this.drawBar(x, porcentaje, color, i);
      x += 1.5;
    }
  }
}