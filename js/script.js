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
// ③閾値は80％ threshold

const images = document.querySelectorAll('.grid-item img'); // img取得
const observerOptions = {
    threshold: 0.8,  // 80%通過時にトリガー
    opacity: [0, 1],
};
// 監視対象が範囲内に現れたら実行する動作
const showImages = (entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.animate(
                {
                    opacity: [0, 1],
                    translate: ['0 20px', '0 0'],
                },
                {
                    duration: 1500,
                    easing: 'ease',
                    fill: 'forwards',
                }
            );
            // 一度表示されたら監視をやめる
            obs.unobserve(entry.target);
        }
    });
};
// 監視ロボ
const imagesObserver = new IntersectionObserver(showImages, observerOptions);
//監視対象
images.forEach((image) => {
    imagesObserver.observe(image);
});

/*-------------------------------------------
スムーススクロール
-------------------------------------------*/
// scroll-behavior
document.querySelectorAll('.slide-top a').forEach(anchor => {
    anchor.addEventListener('click', function(e) { // アロー関数から通常の関数に変更
        e.preventDefault();

        const targetID = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetID);

        window.scroll({
            top: targetElement.offsetTop,
            behavior: 'smooth',
        });

        body.classList.remove('open');
        slide.animate({opacity: [1, 0]}, options);
    });
});

/*-------------------------------------------
PICK UPカルーセル
-------------------------------------------*/
const carousel= document.querySelector('.carousel');
//ユーザーがマウスボタンを押下しているかどうかを示す。falseはドラッグが開始されていない状態
let isPressedDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isPressedDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing'
    carousel.style.scrollBehavior = 'auto'; // スムーズスクロールを無効化
});

carousel.addEventListener('mousemove', (e) => {
    if (!isPressedDown) return;
    e.preventDefault(); //テキスト選択などのデフォルト動作を防止
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 3; //ドラッグの移動距離を3倍にしてスクロール速度を上げる
    carousel.scrollLeft = scrollLeft - walk;
});

carousel.addEventListener('mouseup', () => {
    isPressedDown = false;
    carousel.style.cursor = 'grab';
    carousel.style.scrollBehavior = 'smooth';
});