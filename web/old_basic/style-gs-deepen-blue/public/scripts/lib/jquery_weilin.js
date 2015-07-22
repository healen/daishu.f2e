$.fn.extend({billing: function(tops, scrolltops) {
        var This = $(this);
        This.css('position', 'absolute');
        $(this).stop().animate({'top': tops + 'px'}, 200);
        setInterval(function() {
            if ($(document).scrollTop() >= scrolltops) {
                This.stop().animate({'top': $(document).scrollTop() + 'px'}, 100);
            } else {
                This.stop().animate({'top': tops + 'px'}, 1);
            }
        }, 100);
    },scrolling: function() {
        var This = $(this);
        if (This.find('ul:first').find('li').size() > 6) {
            setInterval(function() {
                This.find('ul:first').stop().animate({marginTop: "-32px"}, 500, function() {
                    $(this).css({marginTop: "0px"}).find('li:first').appendTo(this);
                });
            },3000);
        }
    },cutover: function() {
        var This = $(this);
        This.find('.cutoverBox-title').find('a').each(function() {
            $(this).hover(function() {
                $(this).parent().find('a').removeClass('active');
                $(this).parent().parent().find('.cutoverBox-content').hide();
                $(this).addClass('active');
                var index = $(this).parent().find('a').index($(this));
                $(this).parent().parent().find('.cutoverBox-content').eq(index).show();
                $(this).parent().parent().find('.index-partner').eq(index).slick({infinite: true,slidesToShow: 6,slidesToScroll: 3,autoplay: true,autoplaySpeed: 3000});
            });
        });
    }
});
