let t=null, run=false;
let remain=0;

const inHour=document.getElementById("inHour");
const inMin=document.getElementById("inMin");
const inSec=document.getElementById("inSec");

const display=document.getElementById("display");
const startBtn=document.getElementById("startBtn");
const pauseBtn=document.getElementById("pauseBtn");
const resetBtn=document.getElementById("resetBtn");

const pad=n=>n.toString().padStart(2,"0");

function show(){
    let x=remain;
    if(x<0)x=0;

    const h=Math.floor(x/360000);
    const m=Math.floor(x%360000/6000);
    const s=Math.floor(x%6000/100);
    const cs=x%100;

    display.textContent=
        pad(h)+":"+pad(m)+":"+pad(s)+":"+pad(cs);
}

function loadInput(){
    const h=+inHour.value||0;
    const m=+inMin.value||0;
    const s=+inSec.value||0;
    remain=h*360000+m*6000+s*100;
    show();
}

function tick(){
    remain--;
    show();

    if(remain<=0){
        clearInterval(t);
        run=false;
        startBtn.disabled=false;
        pauseBtn.disabled=true;
    }
}

startBtn.onclick=()=>{
    loadInput();
    if(remain<=0)return;

    t=setInterval(tick,10);
    run=true;

    startBtn.disabled=true;
    pauseBtn.disabled=false;

    inHour.disabled=true;
    inMin.disabled=true;
    inSec.disabled=true;
};

pauseBtn.onclick=()=>{
    if(!run)return;
    clearInterval(t);
    run=false;
    startBtn.disabled=false;
    pauseBtn.disabled=true;
};

resetBtn.onclick=()=>{
    clearInterval(t);
    run=false;

    inHour.disabled=false;
    inMin.disabled=false;
    inSec.disabled=false;

    startBtn.disabled=false;
    pauseBtn.disabled=true;

    loadInput();
};

inHour.oninput=loadInput;
inMin.oninput=loadInput;
inSec.oninput=loadInput;

loadInput();
