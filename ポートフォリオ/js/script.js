$(function(){
    $('.header__hamburger').on('click',function(){
        console.log('click')
        $(this).toggleClass('active')
        $('.header__menu ul').toggleClass('open');
    });
})
    