/**
 * jCaps - jQuery plugin for caption support in HTML5 video.
 * Based on an implementation by Bruce Lawson, Philip Jägenstedt, and Daniel Davis:
 * http://dev.opera.com/articles/view/accessible-html5-video-with-javascripted-captions/
 *
 * http://www.360innovate.co.uk / John McCollum
 *
 * Licensed under the Creative Commons BSD Licence, as per original work
 * http://creativecommons.org/licenses/BSD/
 *
 * Version: 0.1
 */

(function($){
    $.fn.jCaps = function(settings){
        var config = {
            transcriptsDiv: null, // pass a jQuery element as stated in the docs
            language: 'en', // should refer to a child div of the above element, with a lang attribute
            showCaptions: false, // Captions are hidden by default, must be explicitly turned on
            switchOnCallback: function(){}, // called immediately after subtitles are switched on
            switchOffCallback: function(){} // called immediately after subtitles are switched off
        };
        
        if(settings){
            $.extend(config, settings);
        }
        
        // hides transcription div and populate captions list
        function init(){
            var captions = [];
            if(config.transcriptsDiv !== null){
                config.transcriptsDiv.hide();
                var spans = $(settings.transcriptsDiv).children('div[lang="' + config.language + '"]').find('span');
                for(i=0; i<spans.length; ++i){
                    captions[i] = [];
                    var $span = $(spans[i]);
                    captions[i][0] = $span.text();
                    captions[i][1] = $span.attr('data-begin');
                    captions[i][2] = $span.attr('data-end');
                }
                
                return captions;
            }
            return false;
        }
        
        // main loop. Sort of.
        var captions = init();
        
        this.each(function(){
            
            // create 
            $(this).css('position', 'relative');
            var div = $('<div/>', {
                id: 'captions',
                width: this.width,
                css: {display: 'none'}
            });
            $('<p>').appendTo(div);
            
            $(this).after(div);
            
            $(this).bind('timeupdate', function(){
                var now = this.currentTime;
                $.each(captions, function(i, captionSet){
                    if(now >= captionSet[1] && now <= captionSet[2]){
                        $('#captions').text(captionSet[0]);
                        return true;
                    }
                });
                
                if(config.showCaptions){
                    if($('div#captions').is(':hidden')){
                        $('div#captions').show();
                        config.switchOnCallback();
                    }
                }else{
                    if(!$('div#captions').is(':hidden')){
                        $('div#captions').hide();
                        config.switchOffCallback();
                    }
                }
            });
        });
        
        // public methods, can only be called after being initially set up
        arguments.callee.toggle = function(){
            config.showCaptions = !config.showCaptions;
        };
        
        arguments.callee.switchOn = function(){
            config.showCaptions = true;
        };
        
        arguments.callee.switchOff = function(){
            config.showCaptions = false;
        };
        
        arguments.callee.switchLanguage = function(lang){
            config.language = lang;
            captions = init();
        };
        
        arguments.callee.swapOut = function(){
            config.transcriptsDiv.show();
            config.transcriptsDiv.children().show();
            config.transcriptsDiv.children('div').not('div[lang="' + config.language + '"]').hide();
        };
        
        // return this for chainability
        return this;
    };
})(jQuery);