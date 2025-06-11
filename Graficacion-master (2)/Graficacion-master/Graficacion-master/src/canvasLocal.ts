
export class CanvasLocal {
  //atributos
  protected graphics: CanvasRenderingContext2D;
  protected rWidth:number;
  protected rHeight:number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  
      
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    this.graphics = g;
    this.rWidth = 6;// sistema de cordenadas logicas
    this.rHeight= 4;// *********MEDIDAS LOGICAS*************
    this.maxX = canvas.width - 1; // obtiene el tamaño del canvas en pixeles
    this.maxY = canvas.height - 1; // ****************MEDIDAS EN PIXELES*************
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    // calcula el tamaño del PIXEL LOGICO dividiendo el tamaño por el tamaño en pixeles
    this.centerX = this.maxX/2;// calcula el centro del canvas en pixeles
    this.centerY = this.maxY/2;// se usa para el graficador de funciones
  }

  iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
  /* convierte una cordenada logica */
  iY(y: number): number{ return Math.round(this.centerY - y / this.pixelSize); }
  
  drawLine(x1: number, y1: number, x2: number, y2:number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }

  /*fx(x:number):number {
    return Math.sin(x*2.5);
  }*/


  paint() {
    

    /*this.drawLine(100, 100, 300, 100);//Linea de arriba
    this.drawLine(300, 100, 300, 300);//Linea derecha
    this.drawLine(300, 300, 100, 300);//Linea de abajo
    this.drawLine(100, 300, 100, 100);//Linea de la Izquierda*/

    /* this.drawLine(100.5,100, 500,100.5);
    this.drawLine(500, 100, 300, 400);
    this.drawLine(300, 400, 100,100);
    this.drawLine(300, 400, 100,100);*/

   /* this.drawLine(this.iX(-3), this.iY(0), this.iX(3), this.iY(0)); // DIBUJA LOS EJES X e Y
    this.drawLine(this.iX(0), this.iY(2), this.iX(0), this.iY(-2)); */


    //dibuja la cuadricula
    /*this.graphics.strokeStyle = 'lightgray';
    for (let x = -3; x <= 3; x+=0.25){
      this.drawLine(this.iX(x), this.iY(-2), this.iX(x), this.iY(2));
    }
    for (let y = -2; y <= 2; y+=0.25){
      this.drawLine(this.iX(-3), this.iY(y), this.iX(3), this.iY(y));
    }
      //DIBUJA LA CUADRICULA DEL PLANO
      */

    
    /*
    //dibuja las divisiones
    this.graphics.strokeStyle = 'black';
    for (let x = -3; x <= 3; x++){
      this.drawLine(this.iX(x), this.iY(-0.1), this.iX(x), this.iY(0.1));
      this.graphics.strokeText(x+"", this.iX(x-0.1), this.iY(-0.2));
    }
    for (let y = -2; y <= 2; y++){
      this.drawLine(this.iX(-0.1), this.iY(y), this.iX(0.1), this.iY(y));
    }
    this.graphics.strokeText("X", this.iX(2.9), this.iY(0.2));
    this.graphics.strokeText("Y", this.iX(-0.2), this.iY(1.8));
    */

    /*
    //dibujar la funcion
    this.graphics.strokeStyle = 'red';
    let paso: number = 0.1;
    for (let x = -3; x <= 3; x+=paso){
      this.drawLine(this.iX(x), this.iY(this.fx(x)), this.iX(x+paso), this.iY(this.fx(x+paso)));
    }
      // -TERMINA DE DIBUJAR LA FUNCION SEGUN G
    this.graphics.strokeStyle = 'red';
    this.drawLine(this.iX(0), this.iY(0), this.iX(2), this.iY(0));
    this.drawLine(this.iX(2), this.iY(0), this.iX(1), this.iY(1.5));
    this.drawLine(this.iX(1), this.iY(1.5), this.iX(0), this.iY(0));
    */


    //this.drawLine(320, 40, 480, 400);
    //this.drawLine(320, 40, 140, 400);
    //this.drawLine(140, 400, 480, 400);

    
   /* // SE EMPIEZA EL DIBUJO DEL TRIANGULO FRACTALES
    let lado = 1; //tamaño base del triangulo
    let side = 0.95 * lado; //lado ajustado
    let sideHalf = 0.5 * side; // MITAD del lado
    let xCenter = 320; // centro del canvas
    let yCenter = 240; // *****************
      
    let h = sideHalf * Math.sqrt(3); // altura del triangulo
    let xA, yA, xB, yB, xC, yC, // variables que ayudan a almacenar los lados del triangulo
    xA1, yA1, xB1, yB1, xC1, yC1, p, q;
    q = 0.05; // define factores de reduccion
    p = 1 - q; // **************************
    xA = xCenter - sideHalf;
    yA = yCenter - 0.5 * h;
    xB = xCenter + sideHalf;
    yB = yA;
    xC = xCenter;
    yC = yCenter + 0.5 * h; 


    
    //GENERACION DE ESTRUCTURA FRACTAL
   

    for (let m = 0; m < 4; m++){
      for (let n = 0; n < 4; n++){
        xA = 1+n*lado - sideHalf;
        yA = 1+m*lado - 0.5 * h;
        xB = 1+n*lado+ sideHalf;
        yB = yA;
        xC = 1+n*lado;
        yC = 1+m*lado + 0.5 * h; 
        for (let i = 0; i < 20; i++){
          this.drawLine(this.iX(xA), this.iY(yA), this.iX(xB), this.iY(yB));
          this.drawLine(this.iX(xB), this.iY(yB), this.iX(xC), this.iY(yC));
          this.drawLine(this.iX(xC), this.iY(yC), this.iX(xA), this.iY(yA));
          xA1 = p * xA + q * xB;
          yA1 = p * yA + q * yB;
          xB1 = p * xB + q * xC;
          yB1 = p * yB + q * yC;
          xC1 = p * xC + q * xA;
          yC1 = p * yC + q * yA;
          xA = xA1; xB = xB1; xC = xC1;
          yA = yA1; yB = yB1; yC = yC1;
        }
      }
    }

     for (let i = 0; i < 50; i++){
        this.drawLine(xA, yA, xB, yB);
        this.drawLine(xB, yB, xC, yC);
        this.drawLine(xC, yC, xA, yA);
        xA1 = p * xA + q * xB;
        yA1 = p * yA + q * yB;
        xB1 = p * xB + q * xC;
        yB1 = p * yB + q * yC;
        xC1 = p * xC + q * xA;
        yC1 = p * yC + q * yA;
        xA = xA1; xB = xB1; xC = xC1;
        yA = yA1; yB = yB1; yC = yC1;
    } 
    
  }*/
    let side = 3;
    let sideHalf = 0.5 * side;
    // Cambiamos las coordenadas para formar un cuadrado en lugar de un triángulo
    let xA = -sideHalf, yA = -sideHalf; // Vértice A (esquina superior izquierda)
    let xB = sideHalf, yB = -sideHalf;  // Vértice B (esquina superior derecha)
    let xC = sideHalf, yC = sideHalf;   // Vértice C (esquina inferior derecha)
    let xD = -sideHalf, yD = sideHalf;  // Vértice D (esquina inferior izquierda) 
    let p = 0.95, q = 1 - p;

    for (let i = 0; i < 50; i++) {
      // Dibujamos las cuatro líneas del cuadrado
      this.drawLine(this.iX(xA), this.iY(yA), this.iX(xB), this.iY(yB)); // Línea superior
      this.drawLine(this.iX(xB), this.iY(yB), this.iX(xC), this.iY(yC)); // Línea derecha
      this.drawLine(this.iX(xC), this.iY(yC), this.iX(xD), this.iY(yD)); // Línea inferior 
      this.drawLine(this.iX(xD), this.iY(yD), this.iX(xA), this.iY(yA)); // Línea izquierda

      // Actualizamos las coordenadas de los vértices para el siguiente cuadro
      let xA1 = p * xA + q * xB;
      let yA1 = p * yA + q * yB;
      let xB1 = p * xB + q * xC;
      let yB1 = p * yB + q * yC;
      let xC1 = p * xC + q * xD; 
      let yC1 = p * yC + q * yD; 
      let xD1 = p * xD + q * xA; 
      let yD1 = p * yD + q * yA; 

      // Asignamos las nuevas coordenadas
      xA = xA1; xB = xB1; xC = xC1; xD = xD1; 
      yA = yA1; yB = yB1; yC = yC1; yD = yD1;
    }
  }
  }


