$(".inner_height").css({height: (window.innerHeight) + 'px'})
$('.link-on').on('click', function (e){
    console.log(e);
    console.log($(e.target).attr('href'))
    if($(e.target).attr('href') === "#info_link"){
        $('html, body').animate({
            scrollTop: $(".info").offset().top  // класс объекта к которому приезжаем
        }, 1000);
    }
})