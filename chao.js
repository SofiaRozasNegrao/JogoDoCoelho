class Chao{
    constructor(x,y,largura,altura){
        let opcoes={isStatic:true}
        this.corpo=Bodies.rectangle(x,y,largura,altura,opcoes)
        this.largura=largura
        this.altura=altura
        World.add(mundo,this.corpo)
    }

    desenhar(){
        fill(148,127,146)
        rectMode(CENTER)
        rect(this.corpo.position.x,this.corpo.position.y,this.largura,this.altura)
    }
}