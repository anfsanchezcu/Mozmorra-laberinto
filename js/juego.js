var canvas;
var fps=40;
var ctx;
var tileMap = new Image();
var musica = new Howl({
    src:['music/01.mp3'],
    loop:true
})
var sonidoM = new Howl({
    src:['sounds/efecto1.wav'],
    loop:false
})
var sonidoP = new Howl({
    src:['sounds/efecto2.wav'],
    loop:false
})
var sonidoK= new Howl({
    src:['sounds/efecto3.wav'],
    loop:false
})

var conejo;
var enemigos = [];

var anchoE=20;
var altoE=10;

var anchoF = 25;
var altoF=25;

var muro ='#222222';
var camino='#3b3735';
var llave='#bceb00';
var puerta ="#2f346e"
var win ="#9534eb";
var camara;
var camara2;
var escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
    [0,0,2,0,0,2,0,0,0,2,0,0,0,0,0,2,0,0,0,0],
    [0,0,2,0,0,2,2,0,0,2,0,0,0,0,2,2,0,0,0,0],
    [0,0,2,0,0,0,2,0,0,2,2,2,2,0,0,2,2,2,2,0],
    [0,2,2,2,2,0,2,0,0,2,0,2,0,0,0,2,0,0,2,0],
    [0,2,0,0,2,2,2,0,0,0,0,2,2,2,0,2,0,0,3,0],
    [0,2,2,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0],
    [0,0,2,2,0,0,0,0,2,2,2,2,0,2,2,2,2,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
var objCamara =function(x,y,sizeX,sizeY,posX,posY){
    this.x= x;
    this.y= y;
    this.sizeX =sizeX;
    this.sizeY = sizeY;
    this.posX=posX;
    this.posY =posY;
    this.dibuja= function(){
        for(var i =this.y; i<(this.sizeY+this.y) ;i++){
            for(var j=this.x; j<(sizeX+this.x) ; j++){
                var cuadro=escenario[i][j];
                ctx.drawImage(tileMap,cuadro*32,0,32,32,(j-this.x+posX)*anchoF,altoF*(i-this.y+posY),anchoF,altoF)
    
            }
        }
    }
}



function borrarCanvas(){//al re establecer el tamaño de canvas se elimina toso el contenido
    canvas.width =500;
    canvas.height = 250;
}
var corredor = function(x,y){
    this.x = x;
    this.y = y;
    this.llave =false;

    this.dibujar = function(){
        ctx.drawImage(tileMap,1*32,1*32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
    }
    this.margenes = function(x,y){
       
        if(escenario[y][x]==0)
            return false;
        return true;
    }
    this.getKey= function(){
        //console.log('x:'+this.x+' y:'+this.y+' escenario:'+escenario[y][x]);
        if(escenario[this.y][this.x]==3){
            sonidoK.play();
            escenario[this.y][this.x]=2;
            this.llave = true;
        }
        this.win();
    }
    this.fullWin=function(){
        for(i=0;i<10;i++){
            for(j=0;j<20;j++)
                escenario[i][j]=10;
        }
    }
    this.win = function(){
        if(escenario[this.y][this.x]==1 && this.llave ==true){
            sonidoK.play();
            escenario[6][18]=5;
            this.llave=false;
            this.x=1;
            this.y=1;
            this.fullWin();
        }
    }
    this.colisionEnemigo=function(x,y){
        console.log("conejo x: "+ this.x+ " y: "+this.y +"--- X: "+x+" Y:"+y)
        if(this.x == x && this.y == y){
         this.muere();
        }
    }
    this.muere = function(){
        sonidoM.play();
        this.x =1;
        this.y =1;
        escenario[6][18]=3;
    }
    this.up= function(){
        if(this.margenes(this.x,this.y-1)){
            this.y--;
            this.getKey();
        }
    }
    this.down = function(){
        if(this.margenes(this.x,this.y+1)){
            this.y++;
            this.getKey();
        }
    }
    this.left= function(){
        if(this.margenes(this.x-1,this.y)){
            this.x--;
            this.getKey();
        }
    }
    this.right= function(){
        if(this.margenes(this.x+1,this.y)){
            this.x++;
            this.getKey();
        }
    }
    
}

var enemigo = function(x,y){
    this.x=x;
    this.y=y;
    this.delay = 10;
    this.time=this.delay;
    this.direccion = Math.floor(Math.random()*4);
    this.dibujar=function(){
        ctx.drawImage(tileMap,0,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
        //console.log("ya deberia esstae dibujado");
    }
    this.mover =function(){
        
        if(this.direccion == 0 && this.colision(this.x,this.y-1)==false){
            this.y--;
        }else if(this.direccion == 1 && this.colision(this.x,this.y+1)==false){
            this.y++;
        }else if(this.direccion == 2 && this.colision(this.x-1,this.y)==false){
            this.x--;
        }else if(this.direccion == 3 && this.colision(this.x+1,this.y)==false){
            this.x++;
        }
        this.direccion = Math.floor(Math.random()*4);
        
    }
    this.colision = function(x,y){
        if (escenario[y][x]==0)
            return true;
        return false;
    }
    this.activar = function(){
        conejo.colisionEnemigo(this.x , this.y);
        if(this.time<=0){
            this.time =this.delay;
            this.mover();
        }else{
            this.time--;
        }
    }
}

function dibujarEscenario(){
    var color;
    for(var i=0;i<10;i++){
        for(var j=0;j<20;j++){
            /* if(escenario[i][j]==0){
                color=muro;
            }else if(escenario[i][j]==1){
                color = camino;
            }else if(escenario[i][j]==5){
                color=llave;
            }else if(escenario[i][j]==2){
                color = puerta;
            }else if(escenario[i][j]==10){
                color=win;
            }
            ctx.fillStyle = color;
            ctx.fillRect(i*anchoF, j*altoF,anchoF, altoF); */
            var cuadro=escenario[i][j];
            ctx.drawImage(tileMap,cuadro*32,0,32,32,j*anchoF,altoF*i,anchoF,altoF);// parmetro: imagen, en x desde donde empieza, en y desde donde empieza,dimencion x,dimencion y,donde poner x,donde poner y
        }

    }
}




function inicializacion(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    tileMap.src='img/tilemap.png';

    conejo = new corredor(1,1);
    enemigos =[];

    enemigos.push(new enemigo(1,3));
    enemigos.push(new enemigo(15,2));
    enemigos.push(new enemigo(10,9));

    camara = new objCamara(2,2,5,5,1,1);
    camara2 = new objCamara(5,5,4,4,10,5);
    musica.play();

    setInterval(()=>main(), 1000/fps);
    document.addEventListener('keydown',function(e){
        //console.log(e.keyCode);
        if(e.keyCode==37){conejo.left(); }
        else if(e.keyCode==38){conejo.up();    }
        else if(e.keyCode==39){conejo.right(); }
        else if(e.keyCode==40){conejo.down();  }
       
    }
    )
}
function main(){
    
   borrarCanvas();
   //camara.dibuja();
   dibujarEscenario();
   //camara2.dibuja();
   conejo.dibujar();
  
   for(var i =0 ; i<3;i++){
       enemigos[i].dibujar();
       enemigos[i].activar();
   }
   
   

}