/*
소셜 내보내기 참고
페북, 트윗 http://dev.epiloum.net/916
페북, 트윗 https://kipid.tistory.com/entry/Sharing-URI-through-SNS
카톡(&인스타)..? https://citynetc.tistory.com/155
*/
const url = 'https://hwayoungyoon.github.io/my-major-test-duksung';
const title = '[전공테스트] 나에게 맞는 전공은? with DUKSUNG ';
const hash = '%23my_major_test_duksung %23my_major_test %23나에게_맞는_전공테스트 %23전공테스트 ';

const fb = () => {
    window.open('https://www.facebook.com/sharer/sharer.php?u='
        + url + '&t=' + title + '' + hash,
        'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    return false;
}
const tw = () => {
    let name = document.querySelector('.result').innerHTML;
    switch (name) {
        case '표범': 
        case '유니콘':
            name += '이에요! ';
            break;
        default:
            name += '이에요! ';
    }
    window.open('https://twitter.com/intent/tweet?text='
        + title + '%0A' + '나에게 맞는 전공은 '+ name + '' + hash + '%0A' + url, 
        'twittersharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    return false;
}
const nv = () => {
    window.open('http://share.naver.com/web/shareView.nhn?url='
        + url + '&title=' + title, 
        'naversharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    return false;
}
