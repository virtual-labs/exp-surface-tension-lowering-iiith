let TotalDrops = 0;

// disable onclick of all components except of spoon and detergent
if(document.getElementById("detergent")){
    document.getElementById("detergent").style.pointerEvents = 'none';
}


// This function moves the powder particels 
// it chooses one position from an array for each powder particle
// and then removes that position from that array so that it is not used again.
function dropPowder(){
    let positions = ['0vw','1vw','2vw','3vw','4vw','-1vw','-2vw','-3vw','-4vw','-5vw','-6vw']
    for(let i=1;i<=6;i++){
        let value = Math.floor(Math.random()*positions.length);
        let moveValue = positions[value];
        positions.splice(value,1);
        let a = anime.timeline({
            targets:"#dot"+String(i),
            opacity:1
        }).add({
            duration:'1000',
            translateX:moveValue,
            translateY:'9vw',
            easing:'linear'
        });
    }
}

// This function moves the powder down after detergent is added.
function movePowder(){
    let Dropoffsets = document.getElementById('drop').getBoundingClientRect();
    let Dropleft = Dropoffsets.left;
    for(let i=1;i<=6;i++){
        let offsets = document.getElementById('dot'+String(i)).getBoundingClientRect();
        let left = offsets.left;
        let width = offsets.width;
        let change = Dropleft < left - width ? '1vw' : '-1vw';
        let a = anime.timeline({
            duration:'1000',
            targets:"#dot"+String(i),
            easing:'linear',
        })
        a.add({
            translateX:{
                value:'+='+change
            }
        }).add({
            translateY:'12vw',
            opacity:0.6,
        });
    }
}

// This function moves the needle down after detergent is added.
function moveNeedleDown(){
    let a = anime({
        targets:"#needle",
        duration:1000,
        easing:'linear',
        translateY:'1vw',
        opacity:0.5
    });
}

// This function moves the detergent drop after the detergent bottle reaches 
// position above the beaker
function moveDrop(experimentNumber){
    document.getElementById("drop").style.opacity = 1;
    if(experimentNumber===1 || experimentNumber ===3){
        document.getElementById("videoMessage").style.display = 'block';
        document.getElementById("videos").style.display = 'block';
    }
    let a = anime.timeline({
        targets:"#drop",
        easing:'linear'
    });
    a.add({
        duration:'1',
        rotateZ:'45'
    });
    a.add({
        duration:1000,
        translateY:'7.5vw',
        translateX:'7.5vw',
        opacity:0.4
    });
    a.add({
        targets:"#drop",
        opacity:0
    }).add({
        begin:function(a){
            if(experimentNumber===1 || (experimentNumber===3 && TotalDrops===3))
                movePowder();
            else if(experimentNumber===2){
                moveNeedleDown();
            }
        },
    }).add({
        targets:"#drop",
        duration:1,
        translateY:'0vw',
        translateX:'0vw'
    });
}

// This function moves the talcum powder bottle from bottom left(table)
//  to top right(above beaker)
function moveTalcum(){
    let detergent = document.getElementById("detergent");
    let talcum = document.getElementById("talcum");
    let procedureMessage = document.getElementById("procedureMessage");
    
    talcum.style.pointerEvents = 'none';
    
    let a = anime.timeline({
        targets:"#talcum",
        duration:800,
        easing:'linear'
    });
    a.add({
        translateX:'-27vw',
        translateY:'-10vw'
    }).add({
        rotateZ:'-100'
    }).add({
        duration:150,
        translateX:'-26vw',
        translateY:'-11vw',
        complete: function(a){
            dropPowder();
        }
    }).add({
        duration:150,
        translateX:'-28vw',
        translateY:'-9vw'
    }).add({
        duration:150,
        translateX:'-26vw',
        translateY:'-11vw'
    }).add({
        duration:150,
        translateX:'-28vw',
        translateY:'-9vw'
    }).add({
        duration:150,
        translateX:'-26vw',
        translateY:'-11vw'
    }).add({
        rotateZ:'0',
        translateX:'0vw',
        translateY:'0vw'
    });
    
    setTimeout(()=>{
        procedureMessage.innerHTML = "Add detergent to the solution by clicking on it.";
    },2500);
    detergent.style.pointerEvents = 'auto';
}

// This function moves the needle from the table to the surface of the water.
function moveNeedle(){
    let needle = document.getElementById("needle");
    let procedureMessage = document.getElementById("procedureMessage");
    let detergent = document.getElementById("detergent");

    needle.style.pointerEvents = 'none';

    let a = anime.timeline({
        targets:"#needle",
        duration:1000,
        easing:'linear'
    });
    a.add({
        translateX:'-31vw',
        translateY:'-10vw'
    }).add({
        translateY:'-2vw',
    });

    setTimeout(()=>{
        procedureMessage.innerHTML = "Add detergent to the solution by clicking on it.";
    },2000);

    detergent.style.pointerEvents = 'auto';
}

// This function moves the detergent bottle from bottom left(table) 
//to top right(above beaker)
function moveDetergent(experimentNumber){
    let detergent = document.getElementById("detergent");
    let procedureMessage = document.getElementById("procedureMessage");
    let instructions = document.getElementById("instructions");
    
    TotalDrops++;
    
    let a = anime.timeline({
        targets:"#detergent",
        duration:1000,
        easing:'linear'
    });
    a.add({
        translateX:'-17vw',
        translateY:'-12vw'
    }).add({
        rotateZ:-100
    }).add({
        begin:function(a){
            moveDrop(experimentNumber)
        },
        duration:500
    }).add({
        rotateZ:0,
    }).add({
        translateY:0,
        translateX:0
    });

    if(experimentNumber===1 || (experimentNumber===3 && TotalDrops === 3) ){
        setTimeout(()=>{
            procedureMessage.innerHTML = "See that the particles move down. Watch the molecular view below.";
            instructions.innerHTML = "Observations:";
        },3000);
        detergent.style.pointerEvents = 'none';
    }else if(experimentNumber === 2){
        setTimeout(()=>{
            procedureMessage.innerHTML = "See the needle moves down.";
            instructions.innerHTML = "Observations:";
        },3000);
        detergent.style.pointerEvents = 'none';
    }else if(TotalDrops !== 3){
        setTimeout(()=>{
            procedureMessage.innerHTML = "Add some more detergent. Watch the molecular view below.";
        },3000);
    }
}