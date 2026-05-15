$(function () {
    $('.header__hamburger').on('click', function () {
        console.log('click')
        $(this).toggleClass('active')
        $('.header__menu ul').toggleClass('open');
    });
    const $inner = $('.fv__inner');
    const speed = 1000;    // アニメーション速度
    const interval = 4000; // 次のスライドまでの待ち時間
    let isAnimating = false;

    function moveSlide() {
        if (isAnimating) return;
        isAnimating = true;

        // 1. transformで左へスライド（GPU加速）
        $inner.css({
            transition: `transform ${speed}ms ease-in-out`,
            transform: 'translateX(-50%)' // 200%幅の半分移動
        });

        // 2. アニメーションが完全に終わった瞬間に発火
        $inner.one('transitionend', function () {
            // transitionを一時的に切り、位置を0に戻しつつ要素を末尾へ移動
            $(this).css({
                transition: 'none',
                transform: 'translateX(0)'
            }).append($(this).children('.fv__item').first());
            isAnimating = false;
        });
    }

    // タイマーセット
    setInterval(moveSlide, interval);
})
