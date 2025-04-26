let started=false;
let gameSeq=[];
let userSeq=[];
let level=0;
let btns=["pink","green","blue","orange"]
let highestScore=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false)
    {
        started=true;
        levelUp();
    }
});

let allBtns= document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}

function levelUp()
{
    userSeq=[];
    level=level+1
    h2.innerText=`Level ${level}`;
    let rndInx=Math.floor(Math.random()*3);
    let rndColor=btns[rndInx];
    gameSeq.push(rndColor);
    btnflash(document.querySelector(`.${rndColor}`));
}

function btnflash(btn)
{
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function btnPress()
{
    if(level!=0)
        btnflash(this);

   userSeq.push(this.getAttribute("id"));

   checkMatch(userSeq.length-1);

    
}

function checkMatch(index)
{
    if(gameSeq[index]==userSeq[index])
    {
        console.log("match");
        if(gameSeq.length==userSeq.length)
        {
            setTimeout(() => {
                levelUp();               
            }, 1000);
        }
           
    }
    else
    {
        if(highestScore<level)
            highestScore=level;
        h2.innerHTML=`Game Over.Your Score was ${level}.Highest Score ${highestScore}.<br>Press any key to start`;
        reset();
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor="white";
        }, 1000);
    }
}

function reset()
{
    level=0;
    userSeq=[];
    gameSeq=[];
    started=false;
}
