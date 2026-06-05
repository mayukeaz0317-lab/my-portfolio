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


    let lastFocusedElement = null;

    function closeModal() {

        $('#worksModal').removeClass('is-open');

        $('body').removeClass('is-fixed');

        // 背景を再度操作可能にする
        $('#mainContent').removeAttr('inert');

        // 元いた要素へフォーカスを戻す
        if (lastFocusedElement) {
            $(lastFocusedElement).trigger('focus');
        }

    }

    function openModal(title, label, description, url) {

        $('.modal__title').text(title);

        $('.modal__label').text(label);

        $('.modal__description').text(description);

        $('.modal__link').attr('href', url);

        $('#worksModal').addClass('is-open');

        $('body').addClass('is-fixed');

        // 背景を操作不可にする
        $('#mainContent').attr('inert', '');

    }

    $('.works__card').on('click', function () {

        // フォーカス復帰用
        lastFocusedElement = this;

        const title = $(this).data('title');
        const label = $(this).data('label');
        const description = $(this).data('description');
        const url = $(this).data('url');

        openModal(
            title,
            label,
            description,
            url
        );

    });

    $('.modal__close').on('click', function () {
        closeModal();
    });

    $('#worksModal').on('click', function (e) {

        if ($(e.target).is('#worksModal')) {
            closeModal();
        }

    });

    $(document).on('keydown', function (e) {

        if (e.key !== 'Escape') return;

        const isOpen =
            $('#worksModal').hasClass('is-open');

        if (!isOpen) return;

        closeModal();

    });

    /**
     * Focus Trap
     */
    $(document).on('keydown', function (e) {

        const isOpen =
            $('#worksModal').hasClass('is-open');

        if (!isOpen) return;

        if (e.key !== 'Tab') return;

        const focusableElements = [
            $('.modal__close').get(0),
            $('.modal__link').get(0)
        ];

        const currentIndex =
            focusableElements.indexOf(document.activeElement);

        if (currentIndex === -1) return;

        e.preventDefault();

        let nextIndex;

        if (e.shiftKey) {

            nextIndex =
                currentIndex === 0
                    ? focusableElements.length - 1
                    : currentIndex - 1;

        } else {

            nextIndex =
                currentIndex === focusableElements.length - 1
                    ? 0
                    : currentIndex + 1;

        }

        focusableElements[nextIndex].focus();




    });
});