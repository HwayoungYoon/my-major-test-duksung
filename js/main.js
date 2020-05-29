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

const calcScore = () => {
    let point = 0;
    for (let i = 0; i < ENDPOINT; i++) {
        point += qnaList[i].a[select[i]].score;
    }
    return point;
}

const sortResult = (point) => {
    let num = 0;
    if (point < 115) {
        num = 0;
    } else if (point < 129) {
        num = 1;
    } else if (point < 143) {
        num = 2;
    } else if (point < 157) {
        num = 3;
    } else if (point < 171) {
        num = 4;
    } else if (point < 185) {
        num = 5;
    } else if (point < 200) {
        num = 6;
    } else if (point < 250) {
        num = 7;
    } else if (point < 300) {
        num = 8;
    } else if (point < 334) {
        num = 9;
    } else if (point < 367) {
        num = 10;
    } else if (point < 400) {
        num = 11;
    } else if (point < 420) {
        num = 12;
    } else if (point < 440) {
        num = 13;
    } else if (point < 460) {
        num = 14;
    } else if (point < 480) {
        num = 15;
    } else if (point < 500) {
        num = 16;
    } else if (point < 534) {
        num = 17;
    } else if (point < 567) {
        num = 18;
    } else if (point < 600) {
        num = 19;
    } else if (point < 650) {
        num = 20;
    } else if (point < 700) {
        num = 21;
    } else if (point < 725) {
        num = 22;
    } else if (point < 750) {
        num = 23;
    } else if (point < 775) {
        num = 24;
    } else if (point < 800) {
        num = 25;
    } else if (point < 850) {
        num = 26;
    } else if (point < 900) {
        num = 27;
    } else if (point < 934) {
        num = 28;
    } else if (point < 967) {
        num = 29;
    } else if (point < 1000) {
        num = 30;
    } else if (point < 1100) {
        num = 31;
    } else if (point < 1150) {
        num = 32;
    } else if (point < 1200) {
        num = 33;
    } else if (point < 1225) {
        num = 34;
    } else if (point < 1250) {
        num = 35;
    } else if (point < 1275) {
        num = 36;
    } else {
        num = 37;
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
    const res_point = document.querySelector('.point');
    const pin = document.querySelector('.pin');
    const img_url = 'img/image-' + grade + '.png';
    const res_img = document.createElement('img');
    const res_img_div = document.querySelector('.art');
    const animal = document.querySelector('.result');
    const desc = document.querySelector('.res');

    pTitle.innerHTML = u_name.value + ' 님에게 맞는 전공은';
    //res_point.innerHTML = point + '점';
    pin.style.marginLeft = infoList[grade].mLeft;
/*     res_img.src = img_url;
    res_img.alt = infoList[grade].name;
    res_img.title = infoList[grade].name;
    res_img_div.appendChild(res_img); */
    animal.innerHTML = infoList[grade].name;
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
