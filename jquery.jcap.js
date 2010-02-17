(function($){
    $.fn.jCaps = function(settings){
        var config = {
            transcriptsDiv: null, // pass a jQuery element as stated in the docs
            language: 'en', // should refer to a child div of the above element, with a lang attribute
            showCaptions: false, // Captions are hidden by default, must be explicitly turned on
            switchOnCallback: function(){},
            switchOffCallback: function(){}
        };
        
        if(settings) $.extend(config, settings);
        
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
        
        // main loop, sort of.
        var captions = init();
        
        this.each(function(){
            $(this).css('position', 'relative');
            var div = $('<div/>', {
                id: 'captions',
                width: this.width,
                css: {display: 'none'}
            }).hover(
                    function(){
                        $(this).stop().hide();
                    },
                    function(){
                        $(this).stop().show();
                    }
                    );
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
        }
        
        arguments.callee.switchOn = function(){
            config.showCaptions = true;
        }
        
        arguments.callee.switchOff = function(){
            config.showCaptions = false;
        }
        
        arguments.callee.switchLanguage = function(lang){
            config.language = lang;
            captions = init();
        }
        
        // return this for chainability
        return this;
    }
})(jQuery);