let t=null, run=false;
let h=0,m=0,s=0,cs=0,lap=1;

const display=document.getElementById("display");
const startBtn=document.getElementById("startBtn");
const lapBtn=document.getElementById("lapBtn");
const resetBtn=document.getElementById("resetBtn");
const lapsBox=document.getElementById("laps");

const pad=n=>n.toString().padStart(2,"0");

function show(){
    display.textContent=
        pad(h)+":"+pad(m)+":"+pad(s)+":"+pad(cs);
}

function tick(){
    cs++;
    if(cs==100){cs=0;s++}
    if(s==60){s=0;m++}
    if(m==60){m=0;h++}
    show();
}

startBtn.onclick=()=>{
    if(!run){
        t=setInterval(tick,10);
        run=true;
        startBtn.textContent="Stop";
        startBtn.className="stop";
        lapBtn.disabled=false;
    }else{
        clearInterval(t);
        run=false;
        startBtn.textContent="Start";
        startBtn.className="start";
    }
};

lapBtn.onclick=()=>{
    const d=document.createElement("div");
    d.textContent="Lap "+lap+" : "+display.textContent;
    lapsBox.prepend(d);
    lap++;
};

resetBtn.onclick=()=>{
    clearInterval(t);
    run=false;
    h=m=s=cs=0;
    lap=1;
    lapsBox.innerHTML="";
    show();
    startBtn.textContent="Start";
    startBtn.className="start";
    lapBtn.disabled=true;
};

show();
