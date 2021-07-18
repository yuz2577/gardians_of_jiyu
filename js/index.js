window.onload = function() {
    let gaoPhoto = document.querySelectorAll('.gaoPhoto'),
        gaoPhotoWrap = document.querySelector('#gaoPhotoWrap'),
        clickDiv = document.querySelector('#whenClickDIV'),
        mainLogo = document.querySelector('#logo'),
        close = document.querySelector('#close'),
        mouseBox = document.querySelector('#mouseBox'),
        mouseCursor = document.querySelector('#mouseCursor'),
        mouseName = document.querySelector('#mouseName'),
        blackBg = document.querySelector('#blackBg'),
        leftName = document.querySelector('#leftName'),
        rightName = document.querySelector('#rightName'),
        profileQu = document.querySelector('#profileQu'),
        goGame = document.querySelector('#goGame'),
        section = document.querySelector('section'),
        gameBgWrap = document.querySelector('#gameBgWrap'),
        goToTop = document.querySelector('#goToTop'),
        bgWrap = document.querySelector('#bgWrap'),
        goToTop2 = document.querySelector('.gotoTop2'),
        rule = document.querySelector('#rule'),
        ruleBook = document.querySelector('.rulebook'),
        ruleBookClose = document.querySelector('#ruleClose')

    let score = document.querySelector('#score'),
        startBtn = document.querySelector('#startBtn'),
        gameArea = document.querySelector('#gameArea'),
        messageArea = document.querySelector('.messageArea');

    console.log(gaoPhoto.length);
    clickSaturate = true;



    function startClickTimer() {
    let clickSaturate =  setTimeout(() => {
        blackBg.style.opacity = '.5';
        blackBg.style.zIndex = '100';
        close.style.opacity = '1'
        console.log('zz');
        clickSaturate = true;
        // console.log(clickSaturate)
        if(clickSaturate == true) { setTimeout(() => {
            leftName.style.left = '10vw';
            rightName.style.left = '40vw';
            profileQu.style.top = '80vh';
            goGame.style.opacity = '1'
            console.log('zzzzz')
        },500)}
    },1000)};

    
    goGame.addEventListener('mousedown', () => {
        goGame.style.transition = 'none'
        goGame.style.backgroundColor = 'rgb(66, 213, 221)';
        section.scrollIntoView({behavior:'smooth'});
        mouseName.innerHTML = '0'
    })

    goGame.addEventListener('mouseup', () => {
        goGame.style.transition = 'none'
        goGame.style.backgroundColor = '#78F8FF';
    })

    if (clickDiv.style.opacity == '0') {
        blackBg.style.zIndex = '0';
        blackBg.style.opacity = '0';
        console.log('zz')
    }
    
    
    for(let i=0; i<gaoPhoto.length; i++) {
        gaoPhoto[i].addEventListener('mouseenter',function(event) {
            i==0 ? mouseName.innerHTML = 'GROOT' : '';
            i==1 ? mouseName.innerHTML = 'ROCKET' : '';
            i==2 ? mouseName.innerHTML = 'STARLORD': '';
            i==3 ? mouseName.innerHTML = 'GAMORA' :'';
            i==4 ? mouseName.innerHTML = 'DRAX' : '';
        })
    }


    close.addEventListener('mouseenter',() =>{
        mouseCursor.classList.add('mouseEnter')
    })

    close.addEventListener('mouseout',() =>{
        mouseCursor.classList.remove('mouseEnter')
    })

    startBtn.addEventListener('mouseenter',() => {
        mouseCursor.classList.add('mouseEnter');
    })
    startBtn.addEventListener('mouseout',() => {
        mouseCursor.classList.remove('mouseEnter');
    })

    goToTop.addEventListener('mouseenter',() => {
        mouseCursor.classList.add('mouseEnter')
    })
    goToTop.addEventListener('mouseout',() => {
        mouseCursor.classList.remove('mouseEnter')
    })
    goToTop.addEventListener('click', () => {
        bgWrap.scrollIntoView({behavior:'smooth'})
    })


    rule.addEventListener('mouseenter',() => {
        mouseCursor.classList.add('mouseEnter')
    })
    rule.addEventListener('mouseout',() => {
        mouseCursor.classList.remove('mouseEnter')
    })
    rule.addEventListener('click',() =>{
        ruleBook.classList.remove('hide')
    })

    ruleBook.addEventListener('mouseover',()=>{
        mouseCursor.classList.add('mouseColor')
    })
    ruleBook.addEventListener('mouseleave',()=>{
        mouseCursor.classList.remove('mouseColor')
    })


    ruleBookClose.addEventListener('click',() => {
        ruleBook.classList.add('hide')
    })
    ruleBookClose.addEventListener('mouseenter',() => {
        mouseCursor.classList.add('mouseEnter')
    })
    ruleBookClose.addEventListener('mouseout',() => {
        mouseCursor.classList.remove('mouseEnter')
    })
    


    goToTop2.addEventListener('click',() =>{
        bgWrap.scrollIntoView({behavior:'smooth'})
    })
    

    goGame.addEventListener('mousedown',() => {
        mouseCursor.classList.add('mouseEnter');
    })
    goGame.addEventListener('mouseenter',() => {
        mouseCursor.classList.add('mouseEnter');
    })
    goGame.addEventListener('mouseup',() => {
        mouseCursor.classList.remove('mouseEnter');
    })
    goGame.addEventListener('mouseout',() => {
        mouseCursor.classList.remove('mouseEnter');
    })

    section.addEventListener('mouseenter',() =>{
        mouseCursor.classList.remove('mouseenter');
        mouseName.innerHTML = ''
    })
    //마우스마우스//
    let mouseX = 0, mouseY= 0, x = 0, y = 0
    // console.log(mouseCursor);
    window.addEventListener("mousemove",function(event) {
        x=event.pageX;
        y=event.pageY;
    })
    cursorMoves();
    function cursorMoves() {
        mouseX += (x - mouseX) * 1;
        mouseY += (y - mouseY) * 1;

        requestAnimationFrame(cursorMoves);
        mouseBox.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
    window.addEventListener('mousedown',() => {
        mouseCursor.style.animation = 'clicks .5s';
        mouseName.innerHTML = ''

    })
    window.addEventListener('mouseup',() => {
        mouseCursor.style.animation = 'none'
    })
    


/////////////게임게임/////////////

startBtn.addEventListener('click',start);
messageArea.addEventListener('click',start);
document.addEventListener('keydown', keyboardOn);
document.addEventListener('keyup',keyboardOff);



let keys = {}; //키입력상태 저장


let player = {
        x:0, y:0, speed:2, score:0, inPlay: false
    }

let pipe = {
    startPos : 0, 
    spaceBetweenRow: 0, 
    spaceBetweenCol: 0, 
    pipeCount: 20
}

let powerUpClass = {
    startPos: 0,
    spaceBetweenRow:0,
    spaceBetweenCol: 0,
    powerUpCount: 20
}

let shoots = {
    x:0, y: 0, speed: 20, inPlay: false, size: 1.1
}

let gameBg = {
    x:0, inPlay: false
}

function start() {
    let gamer = document.createElement('div');
    gamer.classList.add('gamer');
    document.querySelector('#gameArea').appendChild(gamer);
    let shootDiv = document.createElement('div');
        shootDiv.setAttribute('class','shootDiv');
        gamer.appendChild(shootDiv);

    shoots.size = 1.1

    if (leftName.innerHTML === 'GROOT') {
        gamer.style.backgroundImage ="url('img/ingameGroot0.png')";
        gamer.style.width ='80px'
        gamer.style.height = '200px';
    }
    if (leftName.innerHTML === 'ROCKET') {
        gamer.style.backgroundImage ="url('img/ingameRocket1.png')";
        gamer.style.width = '100px';
        gamer.style.height = '100px';
    }
    if (leftName.innerHTML === 'STAR-LORD') {
        gamer.style.backgroundImage ="url('img/ingameStarlord0.png')";
        gamer.style.width = '130px'
        gamer.style.height='180px'
    }
    if (leftName.innerHTML === 'GAMORA') {
        gamer.style.backgroundImage = "url('img/ingameGamora.png')";
        gamer.style.width= '100px'
        gamer.style.height='200px'
    }
    if (leftName.innerHTML === 'Destroyer') {
        gamer.style.backgroundImage ="url('img/ingameDrax0.png')";
        gamer.style.width= '130px'
        gamer.style.height='200px'
    }
    
    player.inPlay = true;
    gameBg.inPlay = true;
    player.score = 0;
    gameArea.innerHTML = '';

    goToTop2.classList.add('hide');
    rule.classList.add('hide');

    messageArea.classList.add('hide');
    startBtn.classList.add('hide');
    goToTop.classList.add('hide');

    gamer.setAttribute('class', 'gamer');
    gameArea.appendChild(gamer);
    

    pipe.startPos = 0;
    pipe.spaceBetweenRow = 150;
    pipe.pipeCount = Math.floor(gameArea.offsetWidth / pipe.spaceBetweenRow)
    for (let i=0; i<pipe.pipeCount; i++) {
        makePipe(pipe.startPos * pipe.spaceBetweenRow);
        pipe.startPos++;
    }

    powerUpClass.startPos = 0;
    powerUpClass.spaceBetweenRow = 900;
    powerUpClass.pipeCount = Math.floor(gameArea.offsetWidth / powerUpClass.spaceBetweenRow);
    for (let i=0; i<powerUpClass.powerUpCount; i++) {
        makePowerUp(powerUpClass.startPos * powerUpClass.spaceBetweenRow);
        powerUpClass.startPos++;
    }

    window.requestAnimationFrame(playGame);
    player.x = gamer.offsetLeft; //offsetLeft는 버드의 left값을 의미
    player.y = gamer.offsetTop;

    // gameBg.x = gameBgWrap.offsetLeft;
    // gameBg.x = 0;
    // console.log(gameBg.x);

    console.log('✨✨✨✨✨✨✨✨✨✨✨✨')

}

function makePowerUp(powerUpPos) {
    let totalHeight = gameArea.offsetHeight,
        totalWidth = gameArea.offsetWidth,
        powerUp = document.createElement('div'); //위쪽파이프
    powerUp.classList.add('powerUp');
    powerUp.height = Math.floor(Math.random()*350);
    powerUp.style.height = '50px'
    powerUp.style.left = totalWidth + powerUpPos + 'px';
    powerUp.x = totalWidth + powerUpPos;
    powerUp.style.top = Math.floor(Math.random()*1000) + 'px';
    powerUp.style.backgroundImage = "url('img/powerUp.png')";

    gameArea.appendChild(powerUp);
}

function makePipe(pipePos) { //
    // console.log(pipe) 
    let totalHeight = gameArea.offsetHeight,
        totalWidth = gameArea.offsetWidth,
        pipeUp = document.createElement('div'); //위쪽파이프
        // console.log(pipePos);
    pipeUp.classList.add('pipe');
    pipeUp.height = Math.floor(Math.random()*350);
    pipeUp.style.height = '50px'
    pipeUp.style.left = totalWidth + pipePos + 'px';
    pipeUp.x = totalWidth + pipePos;
    pipeUp.style.top = Math.floor(Math.random()*1000) + 'px';
    pipeUp.style.backgroundImage = "url('img/spaceShip.png')";

    gameArea.appendChild(pipeUp);



    // let pipeDown = document.createElement('div');
    // pipeDown.classList.add('pipe');
    // pipeDown.style.height = totalHeight - pipeUp.height - pipe.spaceBetweenCol +'px';
    // pipeDown.style.left = totalWidth + pipePos + 'px';
    // pipeDown.x = totalWidth + pipePos;
    // pipeDown.style.bottom = '0px';
    // pipeDown.style.backgroundColor = 'yellow'

    // gameArea.appendChild(pipeDown);
}   

function movePipes(gamer) {
    let pipes = document.querySelectorAll('.pipe');
    let counter = 0;
    pipes.forEach(function(item) { //item에 들어있는 각각의 pipes
        item.x -= player.speed*2;
        // console.log(player)
        if (player.score >= 5000) {
            item.x -= player.speed*1.1;
        }
        if (player.score >= 10000) {
            item.x -= player.speed*1.3;
        }
        if (player.score >= 15000) {
            item.x -= player.speed*1.5;
        }
        item.style.left = `${item.x}px`;
        if(item.x < 0) {
            item.parentElement.removeChild(item);
            //파이프의 부모요소로 가서, 부모요소의 removeChild를 이용하여 자기자신(item)삭제
            counter ++;
        }

        if (isCollide(item, gamer)) {
            playGameOver();
           }
    });
    for(let i=0; i<counter/2; i++) {
        makePipe(0);
    }
}
function movePowerUp(gamer) {
    let powerUps = document.querySelectorAll('.powerUp');
    let counters = 0;
    powerUps.forEach(function(items) { //item에 들어있는 각각의 pipes들
    items.x -= player.speed*2;
    if (player.score >= 500) {
        items.x -= player.speed*2.05;
    }
    if (player.score >= 10000) {
        items.x -= player.speed*2.2;
    }
    if (player.score >= 15000) {
        items.x -= player.speed*2.3;
    }
    items.style.left = `${items.x}px`;
    // console.log(items.style.left)
    if(items.x < 0) {
        items.parentElement.removeChild(items);
        counters ++;
    }
    if(powerUpGet(items, gamer)) {
        powerUpgrade(0);
    }
})
}

function isCollide(pipe, gamer) {
    let pipeRect = pipe.getBoundingClientRect();
    let gamerRect = gamer.getBoundingClientRect();
    return (
        pipeRect.bottom > gamerRect.top &&
        pipeRect.top < gamerRect.bottom &&
        pipeRect.left < gamerRect.right &&
        pipeRect.right > gamerRect.left
    );
//    console.log(gamerRect)
}

function powerUpGet(powerUpClass, gamer) {
    let powerUpRect = powerUpClass.getBoundingClientRect();
    let gamerRect = gamer.getBoundingClientRect();
    // console.log(powerUpClass);
    return (
        powerUpRect.bottom > gamerRect.top &&
        powerUpRect.top < gamerRect.bottom &&
        powerUpRect.left < gamerRect.right &&
        powerUpRect.right > gamerRect.left
    )
}

function playGame(){
    if (player.inPlay == true) {
        player.score++;
        score.innerText = `SCORE : ${player.score}`;
        gameBg.x -= .09;
        gameBgWrap.style.left = `${gameBg.x}vw`;
        let gamer = document.querySelector('.gamer');

        let move = false;
        movePipes(gamer);
        if(player.score >= 5000) {
            movePowerUp(gamer);
        };

        
        if (keys.ArrowLeft == true && player.x > 0) {
            player.x -= player.speed *3;
            move = true;
        }
        if (keys.ArrowRight == true && player.x < gameArea.offsetWidth -gamer.offsetWidth) {
            player.x += player.speed * 2;
            move = true; 
        }
        if (keys.ArrowUp == true && player.y > 0) {
            player.y -= player.speed * 4;
            move = true;
        } 
        if (keys.ArrowDown == true && player. y < gameArea.offsetHeight - gamer.offsetHeight) {
            player.y += player.speed * 2;
            move = true;
        }
    
        if (keys.Space == true) {
            let shootDiv = document.createElement('div');
            let gamer = document.querySelector('.gamer');
            shootDiv.setAttribute('class','shootDiv');
            gamer.appendChild(shootDiv);
       
            shoots.x = shootDiv.offsetLeft;
            // console.log(shoots.x)
  
            shootDiv.style.display = 'block'
            // console.log(shoots.x)

            if (leftName.innerHTML === 'GROOT') {
                gamer.style.backgroundImage ="url('img/ingameGroot1.png')";
            }
            if (leftName.innerHTML === 'ROCKET') {
                gamer.style.backgroundImage ="url('img/ingameRocket0.png')";
                gamer.style.width = '100px';
                gamer.style.height = '100px';
                shootDiv.style.top = '40%'
            }
            if (leftName.innerHTML === 'STAR-LORD') {
                gamer.style.backgroundImage ="url('img/ingameStarlord1.png')";
            }
            if (leftName.innerHTML === 'GAMORA') {
                gamer.style.backgroundImage = "url('img/ingameGamora1.png')";
                shootDiv.style.top = '68%'
            }
            if (leftName.innerHTML === 'Destroyer') {
                gamer.style.backgroundImage ="url('img/ingameDrax1.png')";
                shootDiv.style.top = '50%'
            }
        }

        if (keys.Space == false) {
            let shootDiv = document.querySelector('.shootDiv')
            let pipes = document.querySelectorAll('.pipe')
            let counter = 0;
            pipes.forEach(function(item) { //item에 들어있는 각각의 pipes들
                if (noPipes(item, shootDiv)) {
                    shoots.x = 0
                }
            });

                      
            if (leftName.innerHTML === 'GROOT') {
                gamer.style.backgroundImage ="url('img/ingameGroot0.png')";
                gamer.style.backgroundRepeat = 'no-repeat';
            }
            if (leftName.innerHTML === 'ROCKET') {
                gamer.style.backgroundImage ="url('img/ingameRocket1.png')";
                gamer.style.width = '100px';
                gamer.style.height = '100px';
            }
            if (leftName.innerHTML === 'STAR-LORD') {
                gamer.style.backgroundImage ="url('img/ingameStarlord0.png')";
            }
            if (leftName.innerHTML === 'GAMORA') {
                gamer.style.backgroundImage = "url('img/ingameGamora.png')";
            }
            if (leftName.innerHTML === 'Destroyer') {
                gamer.style.backgroundImage ="url('img/ingameDrax0.png')";
            }
            // let shootDivRect = shootDiv.getBoundingClientRect();
            // console.log(pipeRect)


        }


        player.y += player.speed * 1.5;
    
        if(player.y > gameArea.offsetHeight-100) {
            playGameOver();
            gameBg.x = 0;
        }
        
        gamer.style.left = `${player.x}px`
        gamer.style.top = `${player.y}px`
        window.requestAnimationFrame(playGame);

        const shootDiv = document.querySelector('.shootDiv')
        shoots.x += shoots.speed;
        shootDiv.style.left = `${shoots.x}px`;

        let {x} = shootDiv.getBoundingClientRect();
        // console.log(x)

    }
    
    
}
// function noPipes(pipe, shootDiv) {
//     let pipeRect = pipe.getBoundingClientRect();
//     // console.log(pipeRect.left +'파이프파이프파이프🔥🥚🥚')
//     let shootRect = shootDiv.getBoundingClientRect();
//     // console.log(shootRect.x + '슛슛슛슛슈슛슛슈슈슈슛슛🐱‍👤🐱‍👤🐱‍👤')
//         if (pipeRect.top < shootRect.y && pipeRect.bottom > shootRect.y) {
//             // console.log('fdfdf')
//             if ( pipeRect.left < shootRect.right && pipeRect.right > shootRect.left) {
//                     pipe.style.display = 'none';
//                     console.log('dd'); 
//                     shoots.x = 0;     
//                     player.score += 500;  
//         }
//     }

    
// }

function playGameOver() {
    player.inPlay = false;
    messageArea.classList.remove('hide');
    goToTop2.classList.remove('hide');

    messageArea.innerHTML = `
    Your score is <p> ${player.score} </p>
    <br>
    <span> RESTART : ClICK HERE. </span>
    `
}

function powerUpgrade() {
    let shootDiv = document.querySelector('.shootDiv');
    let powerUp = document.querySelector('.powerUp')
    shootDiv.style.transform = `scale(${shoots.size})`
    if(shoots.size >= 2.2) {
        shoots.size=2.0;
    }
    if(shoots.size <  2.2) {
        shoots.size += 0.15
    }
    console.log(shoots.size)
    powerUp.parentElement.removeChild(powerUp);;
}

function noPipes(pipe, shootDiv) {
    let pipeRect = pipe.getBoundingClientRect();
    // console.log(pipeRect.left +'파이프파이프파이프🔥🥚🥚')
    let shootRects = shootDiv.getBoundingClientRect();
    // console.log(shootRect.x + '슛슛슛슛슈슛슛슈슈슈슛슛🐱‍👤🐱‍👤🐱‍👤')
        if (pipeRect.top < shootRects.y && pipeRect.bottom > shootRects.y) {
            // console.log('fdfdf')
            if ( pipeRect.left < shootRects.right && pipeRect.right > shootRects.left) {
                    pipe.style.display = 'none';
                    console.log('dd'); 
                    shoots.x = 0;     
                    player.score += 500;  
        }
    }
}
function keyboardOn(e) {
    // console.log('on');
    keys[e.code] = true;
    // console.log(keys)
}

function keyboardOff(e) {
    // console.log('off')
    keys[e.code] = false;
}


for(let i=0; i<gaoPhoto.length; i++) {
    gaoPhoto[i].addEventListener('click',function(event) {
        clickDiv.style.zIndex = '90';
        function closeFc() {close.addEventListener('click',() => {
            clickDiv.style.opacity='0';
            close.style.opacity = '0'
            blackBg.style.opacity = '0';
            blackBg.style.zIndex = '0';
            console.log('zzz');
            clickDiv.style.zIndex = '0';
            leftName.style.left = '-100vw';
            rightName.style.left = '100vw';
            profileQu.style.top = '150vh';
            goGame.style.opacity = '0'
        })}

        function clearSaturate() {blackBg.style.zIndex = '0'}
        if (i==0) {
            clickDiv.style.backgroundImage = 'url(img/groot.png)';
            startClickTimer();
            closeFc();
            leftName.innerHTML = 'GROOT'
            rightName.innerHTML = 'GROOT'
        }
        if (i==1) {
            clickDiv.style.backgroundImage = 'url(img/rocket.png)';
            startClickTimer();
            closeFc();
            leftName.innerHTML = 'ROCKET'
            rightName.innerHTML = 'RACCOON'
            profileQu.innerHTML =`"Well, Now I'm Standing. Happy?<br> We're All Standing Now. <br> Bunch Of Jackasses Standing In A Circle."`
        }
        if (i==2) {
            clickDiv.style.backgroundImage = 'url(img/starlord1.png)';
            startClickTimer(); closeFc()
            leftName.innerHTML = 'STAR-LORD'
            rightName.innerHTML = 'QUILL'
            profileQu.innerHTML =`"You Said It Yourself, B****.<br> We're The Guardians Of The Galaxy." `
        }
        if (i==3) {
            clickDiv.style.backgroundImage = 'url(img/gamora.png)';
            startClickTimer(); closeFc()
            leftName.innerHTML = 'GAMORA'
            rightName.innerHTML = 'ZEN'
            profileQu.innerHTML =`"I Have Lived Most Of My Life Surrounded By Enemies. <br> I Will Be Grateful To Die Among My Friends."`
        }
        if (i==4) {
            clickDiv.style.backgroundImage = 'url(img/drax.png)';
            startClickTimer(); closeFc();
            leftName.innerHTML = 'Destroyer'
            rightName.innerHTML = 'Drax'
            profileQu.innerHTML =`"What If Someone Does Something Irksome, <br> And I Decide To Remove His Spine?" `
        }


        console.log(i);
        mainLogo.style.opacity = '0'
        clickDiv.style.opacity = '1';

    })
}
//총알발사 연습
}  