var canvas;
var fps=60;
var ctx;

var anchoF = 50;
var altoF=50;

var muro ='#222222';
var camino='#3b3735';
var tierra='#784e3b';


var escenario = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,1,1,1,1,0,0],
    [0,0,1,0,0,1,0,1,0,0],
    [0,0,1,1,1,1,0,0,0,0],
    [0,0,0,1,0,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,0],
    [0,1,0,1,0,0,0,0,1,0],
    [0,1,1,1,0,0,0,0,1,0],
    [0,1,0,1,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,1,0]
]


function borrarCanvas(){//al re establecer el tamaño de canvas se elimina toso el contenido
    canvas.width =500;
    canvas.height = 500;
}
var corredor = function(x,y){
    this.x = x;
    this.y = y;
    this.aux;
    this.aux=0;
    this.dibujar = function(){
        ctx.fillStyle ='#ff2600';
        ctx.fillRect(this.x*anchoF, this.y*altoF, anchoF,altoF);
    }
    this.margenes = function(x,y){
       
        if(escenario[y][x]==0)
            return false;
        return true;
    }
    this.up= function(){
        this.aux =this.y;
        if(this.margenes(this.x,this.y-1))
            this.y--;
        }
    this.down = function(){
        if(this.margenes(this.x,this.y+1))
            this.y++;
    }
    this.left= function(){
        if(this.margenes(this.x-1,this.y))
            this.x--;
    }
    this.right= function(){
        if(this.margenes(this.x+1,this.y))
            this.x++;
    }
}
function dibujarEscenario(){
    var color;
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            if(escenario[j][i]==0){
                color=muro;
            }else if(escenario[j][i]==1){
                color = camino;
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
        console.log(e.keyCode);
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