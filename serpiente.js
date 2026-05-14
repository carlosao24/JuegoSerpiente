
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
let intervaloSerpiente
let direccionActual = "arriba"
let puntaje = 0
let velocidad = 1000

const TAMANIO_CELDA = 25
const SERPIENTE = [
  { x: 5, y: 3},
  { x: 5, y: 4},
  { x: 5, y: 5},
  { x: 5, y: 6},
]
let comida ={
  comidaX: 10,
  comidaY: 10
}

function pintarSerpiente(){
  let i
  for(i = 0; i < SERPIENTE.length; i++){
    let elemento = SERPIENTE[i]
    i == 0 ? pintarParte("#5EF527",elemento.x,elemento.y) : pintarParte("#8a2b06",elemento.x,elemento.y)
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
  pintarComida()
}

function pintarParte(color,lineaX,lineaY){
  let valorX = lineaX * TAMANIO_CELDA
  let valorY = lineaY * TAMANIO_CELDA
  ctx.fillStyle = color
  ctx.fillRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA)
  ctx.strokeStyle = "black"
  ctx.strokeRect(valorX,valorY,TAMANIO_CELDA,TAMANIO_CELDA)
}

function moverDerecha(){
  let cabezaActual = SERPIENTE[0]
  let nuevaCabeza = {
    x: cabezaActual.x +1, 
    y: cabezaActual.y
  }

  // Agrega al inicio 
  SERPIENTE.unshift(nuevaCabeza)
  // Elimina el ultimo
  SERPIENTE.pop()

}
function moverIzquierda(){
  let cabezaActual = SERPIENTE[0]
  let nuevaCabeza = {
    x: cabezaActual.x -1, 
    y: cabezaActual.y
  }

  // Agrega al inicio 
  SERPIENTE.unshift(nuevaCabeza)
  // Elimina el ultimo
  SERPIENTE.pop()

}
function moverArriba(){
  let cabezaActual = SERPIENTE[0]
  let nuevaCabeza = {
    x: cabezaActual.x, 
    y: cabezaActual.y -1
  }

  // Agrega al inicio 
  SERPIENTE.unshift(nuevaCabeza)
  // Elimina el ultimo
  SERPIENTE.pop()

}
function moverAbajo(){
  let cabezaActual = SERPIENTE[0]
  let nuevaCabeza = {
    x: cabezaActual.x, 
    y: cabezaActual.y +1
  }

  // Agrega al inicio 
  SERPIENTE.unshift(nuevaCabeza)
  // Elimina el ultimo
  SERPIENTE.pop()

}

function moverSerpiente(){
  if(direccionActual == "derecha"){
    moverDerecha()
  }
  if(direccionActual == "izquierda"){
    moverIzquierda()
  }
  if(direccionActual == "arriba"){
    moverArriba()
  }
  if(direccionActual == "abajo"){
    moverAbajo()
  }
  let resultado = atrapaComida()
  if(resultado == true){
    puntaje +=1
    document.getElementById("puntaje").innerText = puntaje
    let cola = SERPIENTE[SERPIENTE.length -1]
    let nuevaCola = {x: cola.x, y: cola.y}
    SERPIENTE.push(nuevaCola)
    generarComida()
  }
  dibujarTodo()
}

function cambiarDireccion(nuevaDireccion){
  direccionActual = nuevaDireccion
}
function iniciarJuego(){
intervaloSerpiente = setInterval(moverSerpiente,velocidad)
}
function pausarJuego(){
  clearInterval(intervaloSerpiente)
}

function generarComida(){
  let lineasVerticales = canvas.width/TAMANIO_CELDA
  comida.comidaX = Math.floor(Math.random()*lineasVerticales)

  let lineasHorizontales = canvas.height/TAMANIO_CELDA
  comida.comidaY = Math.floor(Math.random()*lineasHorizontales)
}

function pintarComida(){
  pintarParte("white",comida.comidaX,comida.comidaY)
}

function atrapaComida(){
  if(SERPIENTE[0].x == comida.comidaX && SERPIENTE[0].y == comida.comidaY){
    return true
  }else{
    return false
  }
}

function reiniciarJuego(){
  location.reload()
}

