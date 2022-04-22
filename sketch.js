const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let mundo;

let chao
let corda, corda2,corda3
let fruta, imagemFruta
let link
let imagemFundo
let coelho, imagemCoelho,coelhoTriste, coelhoComendo, coelhoPiscando
let somDeFundo, somTriste, somComendo, somCorda, somAr
let balao
let mudo
let botao,botao2,botao3
let canW, canH

function preload(){
  imagemFundo=loadImage('background.png')
  imagemFruta=loadImage('melon.png')
  imagemCoelho=loadImage('Rabbit-01.png')
  coelhoTriste=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  coelhoComendo=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  coelhoPiscando=loadAnimation("Rabbit2.png","blink_2.png","blink_3.png")

  somDeFundo=loadSound("sound1.mp3")
  somTriste=loadSound("sad.wav")
  somComendo=loadSound("eating_sound.mp3")
  somCorda=loadSound("rope_cut.mp3")
  somAr=loadSound("air.wav")

  coelhoPiscando.playing=true
  coelhoTriste.playing=true
  coelhoComendo.playing=true

  coelhoComendo.looping=false
  coelhoTriste.looping=false
}

function setup(){
  let ehTelefone=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(ehTelefone){
    canW=displayWidth
    canH=displayHeight
    createCanvas(displayWidth+80,displayHeight);
  }else{
    canW=windowWidth
    canH=windowHeight
    createCanvas(windowWidth,windowHeight);
  }

  frameRate(80)

  motor = Engine.create();
  mundo = motor.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  textSize(50)

  chao=new Chao(canW/2,canH,canW,5)

  corda=new Rope(8,{x:40,y:30})
  corda2=new Rope(7,{x:370,y:40})
  corda3=new Rope(4,{x:400,y:225})

  let frutaOpcoes={density:0.001}
  fruta=Bodies.circle(300,300,15,frutaOpcoes)

  Composite.add(corda.body,fruta)

  link=new Link(corda,fruta)
  link2=new Link(corda2,fruta)
  link3=new Link(corda3,fruta)

  coelhoPiscando.frameDelay=20
  coelhoTriste.frameDelay=20
  coelhoComendo.frameDelay=20

  coelho=createSprite(170,canH-80)
  coelho.addAnimation("comendo",coelhoComendo)
  coelho.addAnimation("triste",coelhoTriste)
  coelho.addAnimation("piscando",coelhoPiscando)
  coelho.changeAnimation("piscando")
  coelho.scale=0.2

  botao=createImg('cut_btn.png')
  botao.position(30,20)
  botao.size(50,50)
  botao.mouseClicked(soltar)

  botao2=createImg('cut_btn.png')
  botao2.position(340,35)
  botao2.size(50,50)
  botao2.mouseClicked(soltar2)

  botao3=createImg('cut_btn.png')
  botao3.position(360,200)
  botao3.size(50,50)
  botao3.mouseClicked(soltar3)


  balao=createImg('balloon.png')
  balao.position(10,250)
  balao.size(150,100)
  balao.mouseClicked(soproDoAr)

  mudo=createImg('mute.png')
  mudo.position(450,20)
  mudo.size(50,50)
  mudo.mouseClicked(mutar)

  somDeFundo.play()
  somDeFundo.setVolume(0.02)
}

function draw(){
  background(51);
  image(imagemFundo,0,0,canW+80,canH)

  Engine.update(motor);

  chao.desenhar()
  corda.desenhar()
  corda2.desenhar()
  corda3.desenhar()

  push()

  if(fruta!=null){
  image(imagemFruta,fruta.position.x,fruta.position.y,60,60)
}
  pop()

  if(colidir(fruta,coelho)){
    somComendo.play()
    somComendo.setVolume(0.02)
    coelho.changeAnimation("comendo")
  }

  if(fruta!=null && fruta.position.y >= 650){
    somDeFundo.stop()
    somTriste.play()
    somTriste.setVolume(0.02)
    coelho.changeAnimation("triste")
    fruta=null
  }

  drawSprites()
}

function soltar(){
somCorda.play()
link.remover()
link=null
corda.quebrar()
}

function soltar2(){
somCorda.play()
link2.remover()
link2=null
corda2.quebrar()
}

function soltar3(){
somCorda.play()
link3.remover()
link3=null
corda3.quebrar()
}

function colidir(corpo,sprite){
  if(corpo !=null){
    var distancia=dist(corpo.position.x, corpo.position.y, sprite.position.x, sprite.position.y)
    if (distancia<=80) {
      World.remove(mundo,corpo)
      corpo=null
      return true
    } else {
      return false
    }
  }
}

function soproDoAr(){
  Body.applyForce(fruta,{x:0,y:0}, {x:0.01,y:0})
  somAr.play()
}

function mutar(){
  if(somDeFundo.isPlaying()){
    somDeFundo.stop()
  }else{
    somDeFundo.play()
  }
}