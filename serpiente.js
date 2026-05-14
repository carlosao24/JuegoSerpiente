
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
let intervaloSerpiente
let direccionActual = "arriba"
let puntaje = 0
let nivel = "Nivel 1"
let velocidad = 800
let juegoFinalizado = false
const SONIDO_COMER = new Audio("audio/comer.wav")
const SONIDO_GAMEOVER = new Audio("audio/gamer-over.mp3")

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
  verificarColisionBorde()
  if(juegoFinalizado == false){
    let resultado = atrapaComida()
    if(resultado == true){
      puntaje +=1
      document.getElementById("puntaje").innerText = puntaje
      let cola = SERPIENTE[SERPIENTE.length -1]
      let nuevaCola = {x: cola.x, y: cola.y}
      SERPIENTE.push(nuevaCola)
      generarComida()
    }
    verificarNivel()
  }
  dibujarTodo()
}

function verificarNivel(){
  if(puntaje >= 5 && puntaje < 10){
    verificarColisionBorde()
    if(puntaje ==5){
      nivel = "Nivel 2"
      document.getElementById("estado").innerText = nivel
    }
    clearInterval(intervaloSerpiente)
    velocidad = 450
    iniciarJuego()
  }else if(puntaje >= 10 && puntaje < 15){
    verificarColisionBorde()
    if(puntaje == 10){
      nivel = "Nivel 3"
      document.getElementById("estado").innerText = nivel
    }
    clearInterval(intervaloSerpiente)
    velocidad = 300
    iniciarJuego()
  }else if(puntaje >= 15 && puntaje < 20){
    verificarColisionBorde()
    if(puntaje == 15){
      nivel = "Nivel 4"
      document.getElementById("estado").innerText = nivel
    }
    clearInterval(intervaloSerpiente)
    velocidad = 150
    iniciarJuego()
  }else if(puntaje >= 20){
    verificarColisionBorde()
    if(puntaje == 20){
      nivel = "Nivel 5"
      document.getElementById("estado").innerText = nivel
    }
    clearInterval(intervaloSerpiente)
    velocidad = 50
    iniciarJuego()
  }
}

function cambiarDireccion(nuevaDireccion){
  direccionActual = nuevaDireccion
}
function iniciarJuego(){
  document.getElementById("descripcion").innerText = "Pon a prueba tus habilidades en el clasico Juego de la Serpiente"
  document.getElementById("estado").innerText = nivel
  if(juegoFinalizado == true){
    return
  }
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
    SONIDO_COMER.currentTime = 0; 
    SONIDO_COMER.play();
    return true
  }else{
    return false
  }
}

function reiniciarJuego(){
  puntaje = 0
  SERPIENTE.length = 0
  SERPIENTE[0] = { x: 5, y: 3 }
  SERPIENTE[1] = { x: 5, y: 4 }
  SERPIENTE[2] = { x: 5, y: 5 }
  SERPIENTE[3] = { x: 5, y: 6 }
  direccionActual = "arriba"
  generarComida()
  habilitarBoton()
  juegoFinalizado = false
  document.getElementById("descripcion").innerText = "Estas listo para el desafio"
  dibujarTodo()
}

function deshabilitarBoton(){
  let arriba = document.getElementById("arriba")
  arriba.disabled = true
  let izquierda = document.getElementById("izquierda")
  izquierda.disabled = true
  let pausa = document.getElementById("pausa")
  pausa.disabled = true
  let derecha = document.getElementById("derecha")
  derecha.disabled = true
  let abajo = document.getElementById("abajo")
  abajo.disabled = true
  let iniciar = document.getElementById("iniciar")
  iniciar.disabled = true
}

function habilitarBoton(){
  let arriba = document.getElementById("arriba")
  arriba.disabled = false
  let izquierda = document.getElementById("izquierda")
  izquierda.disabled = false
  let pausa = document.getElementById("pausa")
  pausa.disabled = false
  let derecha = document.getElementById("derecha")
  derecha.disabled = false
  let abajo = document.getElementById("abajo")
  abajo.disabled = false
  let iniciar = document.getElementById("iniciar")
  iniciar.disabled = false
}

function verificarColisionBorde(){
  let cabeza = SERPIENTE[0]
  if( cabeza.x < 0 || cabeza.x >= canvas.width/TAMANIO_CELDA || cabeza.y < 0 || cabeza.y >= canvas.height/TAMANIO_CELDA){
    SONIDO_GAMEOVER.currentTime = 0; 
    SONIDO_GAMEOVER.play();
    document.getElementById("estado").innerText = "Game Over"
    pausarJuego()
    document.getElementById("descripcion").innerText = "Mejor suerte la proxima vez"
    juegoFinalizado = true
    deshabilitarBoton()
  }
}
