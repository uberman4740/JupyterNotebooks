/*global mixpanel*/
define([
    "base/js/namespace",
    "base/js/utils",
    "jquery",
], function (IPython, utils, $) {
    "use strict";

    // JupyterHub URLs are of the form hostname/user/<user_id>/...
    var username;
    var baseUrlPieces = utils.get_body_data('baseUrl').split('/');
    var userLocation = baseUrlPieces.indexOf('user');
    if (userLocation >= 0){
        username = baseUrlPieces[userLocation + 1];
    }
    else {
        console.log("No username could be parsed...assuming development");
        username = "dev";
    }

    var hostname = window.location.hostname;
    var token = "";
    if (hostname.indexOf("localhost") >= 0 || 
        hostname.indexOf("boot2docker") >= 0 || 
        hostname.indexOf("quanto-playground.herokuapp.com") >= 0 || 
        hostname.indexOf("quanto-audit.herokuapp.com") >= 0 || 
        hostname.indexOf("audit.quantopian.com") >= 0) {
        token = "648cec07b76a484d025871ca86c7b4ba";
    }
    else if (hostname.indexOf("stg.int.dynoquant.com") >= 0) {
        token = "cb1c2485364ed0de2586ffe61721e37c";
    }
    else if (hostname.indexOf("prd.int.dynoquant.com") >= 0) {
        token = "75873953cd404bcc1da88a55ff51e3b4";
    }
    else {
        var errmsg = "Unknown environment: " + window.location.hostname;
        console.warn(errmsg);
    }

    var page_info = {
        "url": window.location.href,
        "username": username,
    };

    // Mixpanel setup.
    /*jshint ignore:start*/
    (function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="//cdn.mxpnl.com/libs/mixpanel-2.2.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);
    mixpanel.init(token);
    /*jshint ignore:end*/
    mixpanel.identify(username);
    // End Mixpanel setup.

    var track = function(event_name, event_info){
        var combined_info = $.extend({}, page_info, event_info);
        mixpanel.track(event_name, combined_info);
    };

    return {
        track: track,
    };

});
