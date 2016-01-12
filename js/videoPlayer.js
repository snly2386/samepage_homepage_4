/**
 * Created by acheson on 11/10/14.
 */
var FF = FF || {};

FF.VideoPlayer = (function($){

    var html = $('html');

    var pub = {},
        els = {};

    pub.init = init;

    function init() {

        els.container = $('.video__wrapper');
        els.video = $('.video-player');
        els.video.get(0).addEventListener('webkitendfullscreen', exitFullscreenHandler);

        els.playButton = $('.video-link');
        els.playButton.click(handlePlayClick);

        els.closeButton = $('.video__close');
        els.closeButton.click(handleCloseClick);

        if(html.hasClass('mobile')) {
            els.container.css('opacity', '0');
        }
    }

    function handlePlayClick(e) {

        ga("send", "event", "videoPlay", 'header');

        e.preventDefault();
        if(html.hasClass('mobile')) {
            els.video.get(0).play();
            els.video.get(0).webkitEnterFullscreen();
        }
        else {
            els.container.addClass('show');
            els.video.get(0).play();
        }

        els.container.css('opacity', '1');

        setTimeout(function() {
            $('html, body').animate({scrollTop: 0}, 300);
        }, 10);
    }

    function handleCloseClick() {
        ga("send", "event", "videoClose", 'header');

        // Unless mobile
        if(!html.hasClass('mobile')) {
            els.container.removeClass('show');
            els.video.get(0).pause();
            els.video.get(0).currentTime = 0;
        }

        $('html, body').animate({scrollTop: 0}, 300);

        setTimeout(function() {
            els.container.css('opacity', '0');
        }, 400);
    }

    function exitFullscreenHandler() {
        $('html, body').animate({scrollTop: 0}, 300);
    }

    return pub;
})(jQuery);

$(document).ready(function() {
   FF.VideoPlayer.init();
});