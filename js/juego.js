var canvas;
var fps=60;
var ctx;

var anchoF = 25;
var altoF=25;

var muro ='#222222';
var camino='#3b3735';
var llave='#bceb00';
var puerta ="#2f346e"


var escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
    [0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,1,0,0,0,0],
    [0,0,5,0,0,0,1,0,0,1,1,1,1,0,0,1,1,1,1,0],
    [0,1,2,1,1,0,1,0,0,1,0,1,0,0,0,1,0,0,1,0],
    [0,1,0,0,1,1,1,0,0,0,0,1,1,1,0,1,0,0,5,0],
    [0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,2,1,1,1,0,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]


function borrarCanvas(){//al re establecer el tamaño de canvas se elimina toso el contenido
    canvas.width =500;
    canvas.height = 250;
}
var corredor = function(x,y){
    this.x = x;
    this.y = y;
    this.llave =false;

    this.dibujar = function(){
        ctx.fillStyle ='#ff2600';
        ctx.fillRect(this.x*anchoF, this.y*altoF, anchoF,altoF);
        
    }
    this.margenes = function(x,y){
       
        if(escenario[y][x]==0)
            return false;
        return true;
    }
    this.getKey= function(){
        console.log('x:'+this.x+' y:'+this.y+' escenario:'+escenario[y][x]);
        if(escenario[this.y][this.x]==5){
            escenario[this.y][this.x]=1;
            this.llave = true;
        }
        this.win();
    }
    this.win = function(){
        if(escenario[this.y][this.x]==2 && this.llave ==true){
            escenario[6][18]=5;
            this.llave=false;
            this.x=1;
            this.y=1;
            console.log(escenario);
        }
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

function dibujarEscenario(){
    var color;
    for(var i=0;i<20;i++){
        for(var j=0;j<10;j++){
            if(escenario[j][i]==0){
                color=muro;
            }else if(escenario[j][i]==1){
                color = camino;
            }else if(escenario[j][i]==5){
                color=llave;
            }else if(escenario[j][i]==2){
                color = puerta;
            }
            ctx.fillStyle = color;
            ctx.fillRect(i*anchoF, j*altoF,anchoF, altoF);
        }

    }
}

var conejo = new corredor(1,1);



function inicializacion(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
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
   dibujarEscenario();
   conejo.dibujar();
   

}