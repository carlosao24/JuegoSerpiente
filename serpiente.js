
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25

function dibujarTableroX(){
  for(let i = 0; i < canvas.width; i+=TAMANIO_CELDA){
    ctx.strokeStyle = "#5EF527"
    ctx.beginPath()
    ctx.moveTo(i,0)
    ctx.lineTo(i,canvas.height)
    ctx.stroke()
  }
}

function  dibujarTableroY(){
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
  dibujarTableroX()
  dibujarTableroY()
  pintarParte(5,1)
  pintarParte(10,2)
  pintarParte((canvas.height-TAMANIO_CELDA)/TAMANIO_CELDA, (canvas.width-TAMANIO_CELDA)/TAMANIO_CELDA);
  pintarParte((canvas.height-TAMANIO_CELDA)/TAMANIO_CELDA, (canvas.height/2)/TAMANIO_CELDA)
  pintarParte(0,(canvas.width-TAMANIO_CELDA)/TAMANIO_CELDA)
  pintarParte((canvas.height - TAMANIO_CELDA) / TAMANIO_CELDA, 0);
}

function pintarParte(lineaX,lineaY){
  let valorX = lineaX * TAMANIO_CELDA
  let valorY = lineaY * TAMANIO_CELDA
  ctx.fillStyle = "#5EF527"
  ctx.fillRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA)
  ctx.strokeStyle = "black"
  ctx.strokeRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA)
}


