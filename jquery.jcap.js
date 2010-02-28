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
 * Version: 0.15 (functional but fugly)
 */

(function($){
    var captions = [];
    
    var languages = {
        "aa": "Afar",
        "ab": "Abkhazian",
        "ae": "Avestan",
        "af": "Africaans",
        "ak": "Akan",
        "am": "Amharic",
        "an": "Aragonese",
        "anp": "Angika",
        "ar": "Arabic",
        "ar-ae": "Arabic (U.A.E.)",
        "ar-bh": "Arabic (Bahrain)",
        "ar-dz": "Arabic (Algeria)",
        "ar-eg": "Arabic (Egypt)",
        "ar-iq": "Arabic (Iraq)",
        "ar-jo": "Arabic (Jordan)",
        "ar-kw": "Arabic (Kuwait)",
        "ar-lb": "Arabic (Lebanon)",
        "ar-ly": "Arabic (Libya)",
        "ar-ma": "Arabic (Morocco)",
        "ar-om": "Arabic (Oman)",
        "ar-qa": "Arabic (Qatar)",
        "ar-sa": "Arabic (Saudi Arabia)",
        "ar-sy": "Arabic (Syria)",
        "ar-tn": "Arabic (Tunisia)",
        "ar-ye": "Arabic (Yemen)",
        "as": "Assamese",
        "ast": "Asturian",
        "av": "Avaric",
        "ay": "Aymara",
        "az": "Azerbaijani",
        "ba": "Bashkir",
        "be": "Belarusian",
        "bg": "Bulgarian",
        "bg-bg": "Bulgarian (Bulgaria)",
        "bh": "Bihari",
        "bi": "Bislama",
        "bm": "Bambara",
        "bn": "Bengali",
        "bo": "Tibetan",
        "br": "Breton",
        "bs": "Bosnian",
        "ca": "Catalan",
        "ca-es": "Catalan (Catalan)",
        "ce": "Chechen",
        "ch": "Chamorro",
        "co": "Corsican",
        "cr": "Cree",
        "cs": "Czech",
        "cs-cz": "Czech (Czech Republic)",
        "cu": "Church Slavic",
        "cv": "Cuvash",
        "cy": "Welsh",
        "da": "Danish",
        "da-dk": "Danish (Denmark)",
        "de": "German",
        "de-at": "German (Austria)",
        "de-ch": "German (Swiss)",
        "de-de": "German (Germany)",
        "de-li": "Deutsch (Lichtenstein)",
        "de-lu": "Deutsch (Luxemburg)",
        "dv": "Divehi",
        "dz": "Dzongkha",
        "ee": "Ewe",
        "el": "Greek",
        "en": "English",
        "en-au": "English (Australia)",
        "en-bz": "English (Belize)",
        "en-ca": "English (Canada)",
        "en-gb": "English (Great Britan)",
        "en-ie": "English (Ireland)",
        "en-jm": "English (Jamaica)",
        "en-nz": "English (New Zealand)",
        "en-ph": "English (Philippines)",
        "en-uk": "English (Great Britan)",
        "en-us": "English (United States)",
        "en-tt": "English (Trinidad)",
        "en-za": "English (South Africa)",
        "en-zw": "English (Zimbabwe)",
        "eo": "Ensperanto",
        "es": "Spanish",
        "es-ar": "Spanish (Argentina)",
        "es-bo": "Spanish (Bolivia)",
        "es-cl": "Spanish (Chile)",
        "es-co": "Spanish (Colombia)",
        "es-cr": "Spanish (Costa Rica)",
        "es-do": "Spanish (Dominican Republic)",
        "es-ec": "Spanish (Ecuador)",
        "es-es": "Spanish (Spain)",
        "es-gt": "Spanish (Guatemala)",
        "es-hn": "Spanish (Honduras)",
        "es-sv": "Spanish (El Salvador)",
        "es-mx": "Spanish (Mexico)",
        "es-nt": "Spanish (Nicaragua)",
        "es-pa": "Spanish (Panama)",
        "es-pe": "Spanish (Peru)",
        "es-pr": "Spanish (Puerto Rico)",
        "es-py": "Spanish (Paraguay)",
        "es-uy": "Spanish (Uruguay)",
        "es-ve": "Spanish (Venezuela)",
        "et": "Estonian",
        "eu": "Basque",
        "fa": "Persian",
        "ff": "Fulah",
        "fi": "Finnish",
        "fj": "Fijian",
        "fo": "Faroese",
        "fr": "French",
        "fr-be": "French (Belgium)",
        "fr-ca": "French (Canada)",
        "fr-ch": "French (Swiss)",
        "fr-fr": "French (France)",
        "fr-lu": "French (Luxemburg)",
        "fr-mc": "French (Mexico)",
        "frr": "Frisian",
        "fy": "Western Frisian",
        "ga": "Irish",
        "gd": "Gaelic",
        "gl": "Galician",
        "gn": "Guarani",
        "gu": "Gujarati",
        "gv": "Manx",
        "ha": "Hausa",
        "he": "Hebrew",
        "hi": "Hindi",
        "ho": "Hiri Motu",
        "hr": "Croatian",
        "hsb": "High Sorbian",
        "ht": "Haitian",
        "hu": "Hungarian",
        "hy": "Armenian",
        "hz": "Herero",
        "ia": "Interlingua",
        "id": "Indonesian",
        "ie": "Interlingue",
        "ig": "Igbo",
        "ii": "Sichuan Yi",
        "ik": "Inupiaq",
        "in": "Indonesian",
        "io": "Ido",
        "is": "Icelandic",
        "it": "Italian",
        "it-ch": "Italian (Swiss)",
        "iu": "Inuktitut",
        "iw": "Hebrew",
        "ja": "Japanese",
        "ji": "Yiddish",
        "jv": "Javanese",
        "ka": "Georian",
        "kg": "Kongo",
        "ki": "Kikuyu",
        "kj": "Kuanyama",
        "kk": "Kasakh",
        "kl": "Kalaallisut",
        "km": "Central Khmer",
        "kn": "Kannada",
        "ko": "Korean",
        "ko-kp": "Korean (North Korea)",
        "ko-kr": "Korean (South Korea)",
        "kr": "Kanuri",
        "ks": "Kashmiri",
        "ku": "Kurdish",
        "kv": "Komi",
        "kw": "Cornish",
        "ky": "Kyrgyz",
        "la": "Latin",
        "lb": "Luxembourgish",
        "lg": "Ganda",
        "li": "Limburgan",
        "ln": "Lingala",
        "lo": "Lao",
        "lt": "Lithuanian",
        "lu": "Luba-Katanga",
        "lv": "Latvian",
        "mg": "Malagasy",
        "mh": "Marshallese",
        "mi": "Maori",
        "mk": "Macedonian",
        "mk-mk": "Macedonian (F.J.R. Macedonia)",
        "ml": "Malayalam",
        "mn": "Mongolian",
        "mo": "Moldavian",
        "mr": "Marathi",
        "ms": "Malay",
        "mt": "Maltese",
        "my": "Burmese",
        "na": "Nauru",
        "nb": "Nowegian Bokm&#xE5;l",
        "nd": "North Ndebele",
        "ne": "Nepali",
        "ng": "Ndonga",
        "nl": "Dutch",
        "nl-be": "Dutch (Belgium)",
        "nn": "Nowegian Nynorsk",
        "no": "Nowegian",
        "nr": "South Ndebele",
        "nv": "Navajo",
        "ny": "Chichewa",
        "oc": "Occitan",
        "oj": "Ojibwa",
        "om": "Oromo",
        "or": "Oriya",
        "os": "Ossetian",
        "pa": "Panjabi",
        "pi": "Pali",
        "pl": "Polish",
        "ps": "Pushto",
        "pt": "Portuguese",
        "pt-br": "Portuguese (Brasil)",
        "qu": "Quechua",
        "rm": "Romansh",
        "rn": "Rundi",
        "ro": "Romanian",
        "ru": "Russian",
        "rw": "Kinyarwanda",
        "sa": "Sanskit",
        "sc": "Sardinian",
        "sd": "Sindhi",
        "se": "Northern Sami",
        "sg": "Sango",
        "sh": "Serbo-Croatian",
        "si": "Sinhala",
        "sk": "Slovak",
        "sl": "Slovenian",
        "sm": "Samoan",
        "sn": "Shona",
        "so": "Somali",
        "sq": "Albanian",
        "sr": "Serbian",
        "ss": "Swati",
        "st": "Southern Sotho",
        "su": "Sundanese",
        "sv": "Swedish",
        "sv-fi": "Swedisch (Finnland)",
        "sw": "Swahili",
        "ta": "Tamil",
        "te": "Telugu",
        "tg": "Tajik",
        "th": "Thai",
        "ti": "Tigrinya",
        "tk": "Turkmen",
        "tl": "Tagalog",
        "tn": "Tswana",
        "to": "Tonga",
        "tr": "Turkish",
        "ts": "Tsonga",
        "tt": "Tatar",
        "tw": "Twi",
        "ty": "Tahitian",
        "ug": "Uighur",
        "uk": "Ukrainian",
        "ur": "Urdu",
        "uz": "Uzbek",
        "ve": "Venda",
        "vi": "Vietnamese",
        "vo": "Volap&#xFC;k",
        "wa": "Walloon",
        "wo": "Wolof",
        "xh": "Xhosa",
        "yi": "Yiddish",
        "yo": "Yoruba",
        "za": "Zhuang",
        "zh": "Chinese",
        "zh-chs": "Chinese (Simplified)",
        "zh-cht": "Chinese (Traditional)",
        "zh-cn": "Chinese (People's Republic of China)",
        "zh-guoyu": "Mandarin",
        "zh-hk": "Chinese (Hong Kong S.A.R.)",
        "zh-min-nan": "Min-Nan",
        "zh-mp": "Chinese (Macau S.A.R.)",
        "zh-sg": "Chinese (Singapore)",
        "zh-tw": "Chinese (Taiwan)",
        "zh-xiang": "Xiang",
        "zu": "Zulu"
    };
    
    var config = {
        transcriptsDiv: null, // pass a jQuery element as stated in the docs
        transcriptType: 'html', // support for other methods is planned for the future
        language: $('html').attr('lang'), // should refer to a child div of the above element, with a lang attribute
        languageChooser: true,
        interfaceImg: 'speechbubble.gif',
        toggleButton: true,
        onButton: true,
        offButton: true,
        transcriptButton: true,
        showCaptions: false, // Captions are hidden by default, must be explicitly turned on
        switchOnCallback: function(){}, // called immediately after subtitles are switched on
        switchOffCallback: function(){} // called immediately after subtitles are switched off
    };    
    


    $.jCaps_plugin = {
        _init: function(){
            var context = $(this);
            var interfaceDiv = $.jCaps_plugin._getInterfaceDiv();
            
            if(config.languageChooser){
                var langDropdown = $.jCaps_plugin._getLanguageDropdown();
                interfaceDiv.children('div#jCapsInterface').append(langDropdown);
            }

            if(config.toggleButton){
                var toggleButton = $.jCaps_plugin._getToggleButton();
                interfaceDiv.children('div#jCapsInterface').append(toggleButton);
            }
            
            if(config.onButton){
                var onButton = $.jCaps_plugin._getOnButton();
                interfaceDiv.children('div#jCapsInterface').append(onButton);
            }
            
            if(config.offButton){
                var offButton = $.jCaps_plugin._getOffButton();
                interfaceDiv.children('div#jCapsInterface').append(offButton);
            }
            
            context.after(interfaceDiv).show();
            
            $.jCaps_plugin._appendAria(context);
            
            return $.jCaps_plugin._getCaptions();
        },
        
        _getInterfaceDiv: function(){
            var jCapsInterfaceWrapper = $('<div/>', {
                id: 'jCapsInterfaceWrapper'
            });
            
            var showhide = $('<div/>', {
                css: {
                    width: '60px',
                    height: '60px',
                    background: 'url(' + config.interfaceImg + ') no-repeat center left',
                    paddingLeft: '30px'
                }
            }).toggle(
                function(){
                    $('#jCapsInterface').children().stop().fadeIn(1000);
                },
                function(){
                    $('#jCapsInterface').children().stop().fadeOut(500);
                }
            ).appendTo(jCapsInterfaceWrapper);
            
            var interfaceDiv = $('<div/>', {
                id: 'jCapsInterface'
            }).appendTo(jCapsInterfaceWrapper);
            
            return jCapsInterfaceWrapper;
        },
        
        _getCaptions: function(){
            if(config.transcriptsDiv !== null){    
                config.transcriptsDiv.hide();
                var spans = $(config.transcriptsDiv).children('div[lang="' + config.language + '"]').find('span');
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
        },
        
        _appendAria: function(context){
            if(config.transcriptsDiv.attr('id')){
                var ids = [];
                var langDivs = config.transcriptsDiv.children('div');
                $.each(langDivs, function(i, div){
                    div = $(div);
                    if(!div.attr('id')){
                        var newId = languages[div.attr('lang')] + "_language_transcript";
                        div.attr('id', newId);
                    }else{
                        var newId = div.attr('id');
                    }
                    
                    ids.push(newId);
                });
                context.attr('aria-describedby', ids.join(' '));
            }
        },
        
        _getOnButton: function(){
            var onButton = $('<a/>', {
                href: '#',
                text: 'switch on',
                css: {display: 'none'},
                click: function(event){
                    event.preventDefault();
                    $.jCaps_plugin.switchOn();
                }
            });
            return onButton;
        },
        
        _getOffButton: function(){
            var offButton = $('<a/>', {
                href: '#',
                text: 'switch off',
                css: {display: 'none'},
                click: function(event){
                    event.preventDefault();
                    $.jCaps_plugin.switchOff();
                }
            });
            return offButton;
        },
        
        _getToggleButton: function(){
            var toggleButton = $('<a/>', {
                href: '#',
                text: 'toggle captions',
                css: {display: 'none'},
                click: function(event){
                    event.preventDefault();
                    $.jCaps_plugin.toggleCaptions();
                }
            });
            return toggleButton;
        },
        
        _getLanguageDropdown: function(){
            var divs = $(config.transcriptsDiv).children('div[lang^=""]');
            var docLang = $('html').attr('lang');
            
            var dd = $('<select/>', {
                change: function(){
                    $.jCaps_plugin.switchLanguage($(this).val());
                },
                css: {display: 'none'}
            });
            
            var first = $("<option/>", {
                text: 'choose...',
                value: ''
            }).appendTo(dd);
            
            $.each(divs, function(i, div){
                var lang = $(div).attr('lang');
                var option = $('<option/>', {
                    text: languages[lang],
                    value: lang
                });
                
                if(docLang === lang){
                    option.attr('selected', 'selected');
                }
                
                option.appendTo(dd);
            });
            
            return dd;
        },
        
        switchOn: function(){
            config.showCaptions = true;
            return;
        },
        
        switchOff: function(){
            config.showCaptions = false;
            return;
        },
        
        toggleCaptions: function(){
            config.showCaptions = !config.showCaptions;
            return;
        },
        
        switchLanguage: function(lang){
            config.language = lang;
            captions = $.jCaps_plugin._getCaptions();
            return;
        },
        
        swapOut: function(){
            config.transcriptsDiv.show();
            config.transcriptsDiv.children().show();
            config.transcriptsDiv.children('div').not('div[lang="' + config.language + '"]').hide();
            return;
        }
    };
    
    $.fn.jCaps = function(cmd){         
        if(typeof cmd === 'object'){
            $.extend(config, cmd);
        }else if(typeof cmd === 'string'){
            switch(cmd){
                    case 'switchOn':
                        return $.jCaps_plugin.switchOn.call(this);
                    case 'switchOff':
                        return $.jCaps_plugin.switchOff.call(this);
                    case 'toggle':
                        return $.jCaps_plugin.toggle.call(this);
                    case 'swapOut':
                        return $.jCaps_plugin.swapOut.call(this);
            }
        }
                
        // main loop. Sort of.
        this.each(function(){
            var captions = $.jCaps_plugin._init.call(this);
            var context = $(this);
            
            context.css('position', 'relative');
            
            var wrapper = $('<div/>', { id: 'jCapsWrapper', css: {position: 'relative', display: 'inline'}});
            context.wrap(wrapper);
            
            if(!$('div#captions').length){
                var div = $('<div/>', {
                    id: 'captions',
                    width: this.width,
                    css: {display: 'none', position: 'absolute', top: '15px', opacity: 0.7}
                });
                $('<p>').appendTo(div);
                div.appendTo($('#jCapsWrapper'));
            }
            
            context.bind('timeupdate', function(){
                var now = this.currentTime;
                var currentText = '';
                
                $.each(captions, function(i, captionSet){
                    if(now >= captionSet[1] && now <= captionSet[2]){
                        var newText = captionSet[0];
                        if(newText !== currentText){
                            currentText = newText;
                            $('#captions').text(newText);
                            return true;
                        }
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
        
        return this;
    };
    
})(jQuery);


