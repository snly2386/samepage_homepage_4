var FF = FF || {};

/**
 * FF - scrollToAnchor
 *
 *
 * Created by jason on 11/11/14
 */
FF.scrollToAnchor = (function ($) {

    var pub = {},
        els = {};

    // Public functions/objects
    pub.init = init;

    function init() {
        // Add scroll to anchor functionality
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - $('.menu-section .menu__header').height()
                    }, 1000);
                    return false;
                }
            }
        });
    }

    return pub;
})(jQuery);

$(document).ready(function() {
   FF.scrollToAnchor.init();
});