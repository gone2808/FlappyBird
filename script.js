window.onload=()=>{

    var cvs,ctx,w,h;
    cvs = document.getElementById("canvas"); ctx = cvs.getContext("2d");
    cvs.width=w=innerWidth;
    cvs.height=h=innerHeight;
    
    var gap=150,
    d=null,
    speed=2,up=45;
    let bX=w/4,
    bY=h/3,
    gravity=2.5,
    score=0;
    var pipe = [];
    pipe[0] = {
        x : cvs.width,
        y : 0
    };
    var fly = new Audio();
    var scor = new Audio();
    fly.src = "https://www.dropbox.com/s/uns14g47ielmj41/fly.mp3?dl=1";
    scor.src = "https://www.dropbox.com/s/skqwsfa0p1kqfra/score.mp3?dl=1";
    
    function loadImages(sources, callback){
        let nb = 0;
        let loaded = 0;
        let imgs = {};   
        for(let i in sources){
           nb++;
           imgs[i] = new Image();
           imgs[i].src = sources[i];
           imgs[i].onload = function(){
           loaded++;
           if(loaded == nb){          
               callback(imgs);
                                 
           }    
           }    
         }                                                                                                                        }
    
    
    function r(){
        score=0;speed=2;up=45;
        pipe=[];
        bX=w/4;
        bY=h/3;
        pipe[0] ={
         x :cvs.width,y:0
        };
    }
    function draw(){
        
        ctx.drawImage(image.bg,0,0,w,h);
            
        for(let i = 0; i < pipe.length; i++){
            d=image.pipeNorth.height+gap;
            ctx.drawImage(image.pipeNorth,pipe[i].x,pipe[i].y);
            ctx.drawImage(image.pipeSouth,pipe[i].x,pipe[i].y+d);
                 
            pipe[i].x-=speed;
            
           if(pipe[i].x==bX){
                score++;
                pipe.push({
                    x :w,
                    y : Math.floor(Math.random()*image.pipeNorth.height)-image.pipeNorth.height
                }); 
                scor.play();
                
            }     
            if( bX + image.bird.width >= pipe[i].x && bX <= pipe[i].x + image.pipeNorth.width && (bY <= pipe[i].y + image.pipeNorth.height || bY+image.bird.height >= pipe[i].y+d) || bY + image.bird.height >=h-image.fg.height){
         r()}
            if(pipe.length>2){
             pipe.splice(0,1);  
          }
                    
         }
          
        ctx.drawImage(image.fg,0,h-image.fg.height,w,h-image.fg.height);
        
        ctx.drawImage(image.bird,bX,bY);
         
        ctx.font = "50px sans-serif";
        ctx.fillText(`${score}`,w/2-25,50);
        bY += gravity;
            
        requestAnimationFrame(draw);
        
    }
    
    function moveUp(){bY-=up;fly.play();}
    let s={
        bird:"https://www.dropbox.com/s/581pdkc2wyw12z5/bird.png?dl=1",
        bg:"https://www.dropbox.com/s/iwcel8aylo4glds/bg.png?dl=1",
        fg:"https://www.dropbox.com/s/cx3uvubndz2rf8p/fg.png?dl=1",
        pipeNorth:"https://www.dropbox.com/s/yrbd0492up01m3e/pipeNorth.png?dl=1",
        pipeSouth:"https://www.dropbox.com/s/t25lz4qe8wf6g0h/pipeSouth.png?dl=1"
    }
    let image={};
    loadImages(s,function(img){
        image=img;
        draw();
        
    });
        document.addEventListener("keydown",moveUp);
        
        document.addEventListener("click",moveUp);
    }