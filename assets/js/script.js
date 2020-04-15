$('.smooth-goto').on('click', function() {  
    $('html, body').animate({scrollTop: $(this.hash).offset().top - 50}, 1000);
    return false;
    });
    
$(function () {
        $('[data-toggle="popover"]').popover()
    })

$('.popover-dismiss').popover({
        trigger: 'click'
    })