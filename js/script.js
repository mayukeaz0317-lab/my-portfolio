$(function () {
    /**
     * ハンバーガーメニューの開閉（トグル）
     */
    $('.js-menu-toggle').on('click', function () {
        $(this).toggleClass('active')
        const isOpen = $(this).hasClass('active');
        $(this).attr('aria-expanded', isOpen);
       $('.js-menu-target').toggleClass('open', isOpen);
    });
    /**
     * ナビゲーションリンクをクリックした時にメニューを閉じる
     */
    $('.js-global-link').on('click', function () {
        $('.js-menu-toggle').removeClass('active').attr('aria-expanded', false);
        $('.js-menu-target').removeClass('open');
    });
    /**
      * メニュー外（背景）をクリックした時にメニューを閉じる
      */
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.js-menu-toggle, .js-menu-target').length) {
            $('.js-menu-toggle').removeClass('active').attr('aria-expanded', false);
            $('.js-menu-target').removeClass('open');
        }
    });
    /**
     * ファーストビュー（FV）のスライドショー設定
     */
    const $inner = $('.js-fv-inner');
    const speed = 1000;
    const interval = 4000;
    let isAnimating = false;
    function moveSlide() {
        if (isAnimating) return;
        isAnimating = true;

        $inner.css({
            transition: `transform ${speed}ms ease-in-out`,
            transform: 'translateX(-50%)' // 200%幅の半分移動
        });

        $inner.one('transitionend', function () {
            // transitionを一時的に切り、位置を0に戻しつつ要素を末尾へ移動
            $(this).css({
                transition: 'none',
                transform: 'translateX(0)'
            }).append($(this).children('.js-fv-item').first());
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

    function openModal(title, label, points, url, github) {

        $('.js-modal-title').text(title);

        $('.js-modal-label').text(label);

        $('.js-modal-points').html(points);

        $('.js-site-link').attr('href', url);

        if (github) {
            $('.js-github').attr('href', github).show();
        } else {
            $('.js-github').hide();
        }

        $('#worksModal').addClass('is-open');

        $('body').addClass('is-fixed');

        // 背景を操作不可にする
        $('#mainContent').attr('inert', '');
        setTimeout(() => {
            $('#worksModal').focus();
        }, 0);

    }

    $('.js-works-btn').on('click', function (e) {
        e.preventDefault();
        // フォーカス復帰用
        lastFocusedElement = this;

        const title = $(this).data('title');
        const label = $(this).data('label');
        const points = $(this).find('.js-points-data').html();
        const url = $(this).data('url');
        const github = $(this).data('github');

        openModal(
            title,
            label,
            points,
            url,
            github
        );

    });

    $('.js-modal-close').on('click', function () {
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


        const focusableElements = $('#worksModal').find('button, a').filter(':visible').toArray();

        const currentIndex =
            focusableElements.indexOf(document.activeElement);

        if (currentIndex === -1) {
            e.preventDefault();
            focusableElements[0].focus();
            return;
        }

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