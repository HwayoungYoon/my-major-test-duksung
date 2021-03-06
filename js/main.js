const header = document.getElementById('header');
const footer = document.getElementById('footer');
const qna = document.getElementById('qna');
const u_name = document.querySelector('input[type=text]');
const wrap = document.getElementById('wrap');
const tabletMQL = window.matchMedia("all and (min-width: 768px)");
const pcMQL = window.matchMedia("all and (min-width: 1024px)");
const ENDPOINT = 10;
const select = [];
let qIdx = -1;

const goTo = (dest) => {
    let elem;
    let elemTop;
    if (dest === 'artist') {
        elem = document.getElementById('intro-box');
    } else {
        elem = document.getElementById('share-box');
    }
    elemTop = window.pageYOffset + elem.getBoundingClientRect().top;
    if (pcMQL.matches) {
        elemTop -= 150;
    } else if (tabletMQL.matches) {
        elemTop -= 115;
    } else {
        elemTop -= 60;
    }
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: elemTop
    });
}
const goArtist = () => goTo('artist');
const goShare = () => goTo('share');

const copy = () => {
    const tmp = document.createElement('textarea');
    document.body.appendChild(tmp);
    tmp.value = url;
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
}

/* 결과 계산식 */
const calcScore = () => {
    let point = 0;
    for (let i = 0; i < ENDPOINT; i++) {
        point += qnaList[i].a[select[i]].score;
    }
    return point;
}

/* 계산식 결과 이용한 분류 */
const sortResult = (point) => {
    let num = 0;
    if (point == 110) {
        num = 0;
    } else if (point == 120) {
        num = 1;
    } else if (point == 130) {
        num = 2;
    } else if (point == 140) {
        num = 3;
    } else if (point == 150) {
        num = 4;
    } else if (point == 160) {
        num = 5;
    } else if (point == 170) {
        num = 6;
    } else if (point < 235) {
        num = 7;
    } else if (point < 275) {
        num = 8;
    } else if (point < 325) {
        num = 9;
    } else if (point == 330) {
        num = 10;
    } else if (point < 355) {
        num = 11;
    } else if (point == 360) {
        num = 12;
    } else if (point == 370) {
        num = 13;
    } else if (point == 410 || point == 430 || point == 470) {
        num = 14;
    } else if (point == 420 || point == 440 || point == 450 || point == 460) {
        num = 15;
    } else if (point == 510 || point == 520 || point == 530 || point == 560) {
        num = 16;
    } else if (point == 540 || point == 550 || point == 570) {
        num = 17;
    } else if (point == 610 || point == 640 || point == 660) {
        num = 18;
    } else if (point == 620 || point == 670) {
        num = 19;
    } else if (point == 630 || point == 650) {
        num = 20;
    } else if (point == 710 || point == 720 || point == 740 || point == 760) {
        num = 21;
    } else if (point == 730 || point == 750 || point == 770) {
        num = 22;
    } else if (point == 810 || point == 860) {
        num = 23;
    } else if (point == 820 || point == 870) {
        num = 24;
    } else if (point == 830) {
        num = 25;
    } else if (point == 840 || point == 850) {
        num = 26;
    } else if (point == 910 || point == 940) {
        num = 27;
    } else if (point == 920 || point == 960) {
        num = 28;
    } else if (point == 930 || point == 950 || point == 970) {
        num = 29;
    } else if (point < 1035) {
        num = 30;
    } else if (point < 1075) {
        num = 31;
    } else if (point == 1110 || point == 1170) {
        num = 32;
    } else if (point < 1135) {
        num = 33;
    } else if (point < 1155) {
        num = 34;
    } else if (point == 1160) {
        num = 35;
    } else {
        num = 36;
    }
    return num;
}

const goResult = () => {
    if (pcMQL.matches) {
        console.log('PC');
        wrap.style.marginTop = '150px';
    } else if (tabletMQL.matches) {
        console.log('tablet');
        wrap.style.marginTop = '115px';
    } 

    const result = document.getElementById('result');
    const point = calcScore();
    const grade = sortResult(point);
    const pTitle = document.querySelector('.p');
    const img_url = 'img/duksae/image-' + grade + '.jpg';
    const res_img = document.createElement('img');
    const res_img_div = document.querySelector('.art');
    const major = document.querySelector('.result');
    const desc = document.querySelector('.res');

    pTitle.innerHTML = u_name.value + ' 님에게 맞는 전공은';
    res_img.src = img_url;
    res_img.alt = infoList[grade].name;
    res_img.title = infoList[grade].name;
    res_img_div.appendChild(res_img);
    major.innerHTML = infoList[grade].name;
    desc.innerHTML = infoList[grade].desc;

    setTimeout(() => {
        header.style.display = 'block';
        footer.style.display = 'block';
        result.style.display = 'block';
        header.style.animation = 
            'fade-in 0.3s forwards';
        footer.style.animation = 
            'fade-in 0.3s forwards';
        result.style.animation = 
            'going-up 0.5s, '+
            'fade-in 0.5s forwards';
    }, 600);
    
}

const end = () => {
    qna.style.animation ='';
    const interval = setInterval(() => {
        qna.style.opacity -= 0.1;
        qna.style.transform = 'translateY(-1px)';
    }, 50);
    setTimeout(() => clearTimeout(interval), 500);
    setTimeout(() => qna.style.display = 'none', 500);    
    setTimeout(() => {
        const calc = document.getElementById('calc');
        calc.style.display = 'block';
        calc.style.animation =
            'going-up 0.5s forwards, '+
            'fade-in 0.5s forwards';
    }, 700);
    setTimeout(() => {
        calc.style.animation ='';
        calc.style.animation = 
            'going-left 0.4s forwards, '+
            'fade-out 0.4s forwards';
        setTimeout(() => {
            calc.style.display = 'none';
            goResult();
        }, 400);
    }, 9000);
}

const addAnswer = (answerTxt, idx) => {
    const answer = document.createElement('button');
    const a = document.querySelector('.answer');
    answer.className += 'a box';
    answer.innerHTML = answerTxt;
    answer.addEventListener('click', () => {
        const parent = answer.parentNode;
        const children = parent.childNodes;
        for (let i in children) {
            children[i].disabled = true;
        }
        parent.classList.add('fade-out-5-4');
        setTimeout(() => {
            select[qIdx] = idx; 
            a.innerHTML = '';
            parent.classList.remove('fade-out-5-4');
            goNext();
        }, 800);
    });

    setTimeout(() => answer.style.animation = 
        'going-down 0.25s forwards, fade-in 0.25s forwards', 50);
    a.appendChild(answer);
}


const goNext = () => {
    if (qIdx++ === qnaList.length - 1) {
        end();
        return;
    }
    
    const status = document.querySelector('.status');
    const qNum = qnaList[qIdx];
    const q = document.querySelector('.q');

    status.style.width = (ENDPOINT * (qIdx+1))+'%';
    q.innerHTML = qNum.q;
    qna.style.animation = 
        'fade-in 0.3s ease-in-out 0.4s forwards, '+
        'going-down 0.3s ease-in-out 0.4s forwards';
        
    setTimeout(() => {
        const endIdx = qNum.a.length-1;
        for (let i in qNum.a) {
            addAnswer(qNum.a[i].answer, i);
        }
        qna.style.opacity = 1;
    }, 700);
}

const begin = () => {
    const welcome = document.getElementById('welcome');
    header.style.animation = 
        'going-up 0.4s forwards, '+
        'fade-out 0.4s forwards';
    footer.style.animation = 
        'going-down 0.4s forwards, '+
        'fade-out 0.4s forwards';
    setTimeout(() => welcome.style.animation = 
        'going-up 0.4s ease-in-out forwards, '+
        'fade-out 0.4s ease-in-out forwards', 500);
    setTimeout(() => {
        header.style.display = 'none';
        footer.style.display = 'none';
        welcome.style.display = 'none';
        qna.style.display = 'block';
        if (pcMQL.matches) {
            console.log('PC');
            wrap.style.marginTop = '50px';
        } else if (tabletMQL.matches) {
            console.log('tablet');
            wrap.style.marginTop = '30px';
        } 
        goNext();
    }, 1000);
}

const load = () => {
    const msg = document.querySelector('.check-name');
    const start_btn = document.querySelector('.start');

    u_name.addEventListener('blur', () => {
        try {
            if (u_name.value.length < 1) {
                throw '이름을 입력해 주세요.';
            } 
            msg.innerHTML = '';
        } catch(err) {
            msg.innerHTML = err;
        }
    });
    
    start_btn.addEventListener('click', () => {
        try {
            if (u_name.value.length < 1) {
                throw '이름을 입력해 주세요.';
            }
            msg.innerHTML = '';
            start_btn.disabled = true;
            begin();
        } catch(err) {
            msg.innerHTML = err;
        }
    });
    
}

window.onload = load();
