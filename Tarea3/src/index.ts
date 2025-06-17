import { canvasLocal } from './canvasLocal.js';
// Inicialización del QR
const canvas = document.getElementById('qrinfo') as HTMLCanvasElement;
new canvasLocal(canvas);