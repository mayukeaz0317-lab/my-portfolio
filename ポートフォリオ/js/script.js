$(function(){
    $('.hamburger').on('click',function(){
        console.log('click')
        $(this).toggleClass('active')
        $('.menu ul').toggleClass('open');
    });
})
    