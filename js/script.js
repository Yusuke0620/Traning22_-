/*-------------------------------------------
ハンバーガーメニュー
スライドメニュー
-------------------------------------------*/
// ハンバーガクリックしたら.open追加
const hamburger = document.querySelector('.hamburger');  //ハンバーガーアイコン
const slide     = document.querySelector('.slide');      //スライドメニュー
const blackMask = document.querySelector('.black-mask'); //黒背景
const body = document.querySelector('body');
// スライドアニメーション
const options = {
    duration: 500,
    easing: 'ease',
    fill: 'forwards',
};

//
hamburger.addEventListener('click', () => {
    // もしopenが追加されていなければ、追加してslideアニメーションも実施する
    if (!body.classList.contains('open')) {
        body.classList.add('open');
        slide.animate({opacity: [0, 1]}, options);

    // 追加されていれば、削除してslideアニメーションも実施する
    /*
     これをしないとハンバーガメニューをクリックして消すときの挙動がおかしくなる
     具体的にはopacity0→1が効いてしまい、消える→出現→ゆっくり消える
    */
    } else {
        body.classList.remove('open');
        slide.animate({opacity: [1, 0]}, options);
    }
});

// blackMaskをクリックしたら元に戻る(ハンバーガーアイコンも戻る挙動)
blackMask.addEventListener('click', () => {
    body.classList.remove('open');
    slide.animate({opacity: [1, 0]}, options);
});


/*-------------------------------------------
FEATUREホバーアニメーション
-------------------------------------------*/
// ①grid-itemが監視範囲内に入ると
// ②imgが20px下から浮き上がりながら出現する
const images = document.querySelectorAll('.grid-item img');
images.forEach((image) => {
    image.addEventListener('click', () => {
        console.log('クリック');
    })

})

const showFeature = (entries) => {
    const keyframes = {
        opacity: [0, 1],
        translate: ['0 -20px', '0 0'],
    };
    entries[0].target.animate(keyframes, 1000);
};









/*-------------------------------------------
スムーススクロール
-------------------------------------------*/




/*-------------------------------------------
PICK UPカルーセル
-------------------------------------------*/





