
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25
const SERPIENTE = [
  { x: (canvas.width/2)/TAMANIO_CELDA, y: (canvas.height/2)/TAMANIO_CELDA},
  { x: ((canvas.width/2)/TAMANIO_CELDA)+1, y: (canvas.height/2)/TAMANIO_CELDA},
  { x: ((canvas.width/2)/TAMANIO_CELDA)+2, y: (canvas.height/2)/TAMANIO_CELDA},
  { x: ((canvas.width/2)/TAMANIO_CELDA)+2, y: (canvas.height/2)/TAMANIO_CELDA+1}
]

function pintarSerpiente(){
  let i
  for(i = 0; i < SERPIENTE.length; i++){
    let elemento = SERPIENTE[i]
    // Cuerpo
    pintarParte("#8a2b06",elemento.x,elemento.y)
    if(i==SERPIENTE.length-1){
      // Cabeza
      pintarParte("#5EF527",elemento.x,elemento.y)
    }
  }
}

function dibujarTablero(){
  for(let i = 0; i < canvas.width; i+=TAMANIO_CELDA){
    ctx.strokeStyle = "#5EF527"
    ctx.beginPath()
    ctx.moveTo(i,0)
    ctx.lineTo(i,canvas.height)
    ctx.stroke()
  }
  for(let i = 0; i < canvas.height; i+=TAMANIO_CELDA){
    ctx.strokeStyle = "#5EF527"
    ctx.beginPath()
    ctx.moveTo(0,i)
    ctx.lineTo(canvas.width,i)
    ctx.stroke()
  }
}

// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas()
  dibujarTablero()
  pintarSerpiente()
}

function pintarParte(color,lineaX,lineaY){
  let valorX = lineaX * TAMANIO_CELDA
  let valorY = lineaY * TAMANIO_CELDA
  ctx.fillStyle = color
  ctx.fillRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA)
  ctx.strokeStyle = "black"
  ctx.strokeRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA)
}


