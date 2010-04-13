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
 */

"use strict";

$(function($){

    var tests = {
        
        testCaptionsNotEmpty: function(){
            fireunit.ok($.captions.length, 'Captions array should not be empty');
        },
        
        testJcapsInterfaceWrapperExists: function(){
            fireunit.ok($('#jCapsInterfaceWrapper').length, "#jCapsInterfaceWrapper must exist.");
        },
        
        testJcapsInterfaceExists: function(){
            fireunit.ok($('#jCapsInterface').length, "#jCapsInterface must exist.");
        },
        
        testJcapsInterfaceInitiallyHidden: function(){
            fireunit.compare($('#jCapsInterface').children(':hidden').length, $('#jCapsInterface').children().length, "Children of #jCapsInterface should be hidden");
        },
        
        testTimestampParser: function(){
            values = [
                ["01:00:03,000", 3603],
                ["00:00:55,600", 55.6]
            ];
            
            for(var i=0; i<values.length; ++i){
                fireunit.compare($.jCaps_plugin._parseTimestamp(values[i][0]), values[i][1], 'parseTimestamp should return the correct values');
            }
        },
        
        testDivClick: function(){
            var div = $('#jCapsShowHide');
            fireunit.click(div);
            fireunit.ok($('#jCapsInterface').children(':hidden').length === 0, 'Clicking the div should show all child elements');       
            fireunit.click(div);     
        }        
    };

    window.setTimeout(function(){
        if(typeof fireunit === 'object'){
            for(var key in tests){
                tests[key]();
            } 
        }
        fireunit.testDone();
    }, 2000);
    
});
