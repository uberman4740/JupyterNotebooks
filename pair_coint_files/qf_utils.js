define([
    "base/js/utils",
    "jquery"
], function (utils, $) {
    "use strict";

    // HACK: This string gets edited in place with QF's hostname when running
    // in a container with QF.
    var qf_base_url = "https://www.quantopian.com" + "/research";
    // For local development:
    // var qf_base_url = "http://localhost.dynoquant.com:3000/research";
    if (qf_base_url.substring(0, 11) === "||QF_HOSTNAME_PLACEHOLDER"){
        // We're not running with QF, so mark our base url empty.  This cancels
        // any postMessage calls we try to make via send_qf_post_message.
        qf_base_url = "";
    }

    // Base Url for the notebook server.
    var notebook_base_url = utils.get_body_data('baseUrl');

    var send_qf_post_message = function(data){
        if (window.parent !== window && qf_base_url){
            window.parent.postMessage(data, qf_base_url);
        }
    };

    // Use window.postMessage to tell qf the desired height of the iframe.
    var trigger_iframe_height_update = function(){
        var cur_height = $("body").outerHeight(true);  //include the margin in the height
        var iframe_height = Math.max(600, cur_height);
        var msg_data = {
            height: iframe_height
        };
        send_qf_post_message(msg_data);
    };

    var remove_leading_slash = function(val){
        if (val.indexOf("/") === 0){
            val = val.substring(1);
        }
        return val;
    };

    var convert_to_qf_link = function(nb_link_elem){
        var qf_url = qf_base_url;
        var nb_url = nb_link_elem.attr('href');

        // Don't convert links that are missing an href attribute, or links
        // that have already been converted (as indicated by the presence of
        // the 'data-nb-url' attribute).
        if (nb_url && !nb_link_elem.data('nb-url')){

            // Set the data-nb-url attribute to the old URL of the link, so
            // that we can use it to navigate the iframe when a link is
            // clicked.  The qf URL is used for the "right click -> open in new
            // tab" case.
            nb_link_elem.data('nb-url', nb_url);

            // In case this server has a custom value for base_url, trim
            // that base_url from the beginning of nb_url so we're left
            // with a path we can append to qf's base research URL.
            nb_url = nb_url.substring(notebook_base_url.length);

            // Some links need special handling.  Links to directories need
            // to have the 'tree' prefix removed from their path (to match qf's
            // user-friendly URL scheme).  Links to files should not be changed
            // at all, because they don't cause the URL of the iframe to change
            // (the file just starts downloading).
            if (nb_url.indexOf("tree") === 0){
                nb_url = nb_url.substring(4);
            } else if (nb_url.indexOf("file") === 0){
                return false; // skip this elem if it's a file
            }
            nb_url = remove_leading_slash(nb_url);

            // Note: we can't use url_path_join here because qf_url should
            // start with https://, and url_path_join normalizes the
            // protocol's double slash to a single slash.
            qf_url = qf_url + '/' + nb_url;

            // Set the href attribute of the link to our newly-constructed URL.
            nb_link_elem.attr('href', qf_url);
            return true;
        }
        return false;
    };

    // If a link that we translated is left-clicked, it's faster to only
    // navigate the inner iframe and let qf's javascript update the URL in the
    // web browser as it normally does when the iframe navigates to a new page.
    // We only do this special handling for links that we translated into qf
    // URL's (i.e. links that have a value for the 'data-nb-url' attribute).
    var handle_converted_link_clicked = function(){
        var nb_url = $(this).data('nb-url');
        if (nb_url){
            window.location.href = nb_url;
            return false;
        }
    };

    // Converts a list of notebook links (in the form of jquery object) into qf
    // links.  This means changing the href attribute of each link so that it
    // points to the appropriate qf URL, so that if a user right clicks the
    // link and choose "open in a new tab", the new tab will request the page
    // from qf and the normal header/footer will be present.
    //
    // Making a request to qf every time the iframe navigates is slower because
    // it requires two pages to load, so I wanted to avoid having to do that in
    // the more common case of simply clicking a link without opening it in a
    // new tab.  So in addition to translating the link URLs, I also hook up
    // click handlers for the converted links, and those click handlers simply
    // navigate the iframe without making a request to qf.
    var translate_links = function(link_elems){
        var i;
        if (!qf_base_url){
            return;
        }

        var convert_links = function(){
            var cur_link = $(this);

            // If convert_to_qf_link returns true, then the link was
            // converted and we should listen for click events on it.
            if (convert_to_qf_link(cur_link)){
                $(this).click(handle_converted_link_clicked);
            }
        };

        for (i = 0; i < link_elems.length; i++){
            link_elems[i].each(convert_links);
        }
    };

    var initialize_back_button = function(file_path) {
        var path_without_filename = utils.url_path_split(file_path)[0];
        var encoded_url = utils.url_join_encode(notebook_base_url, 'tree', path_without_filename);
        $('.back-button').attr('href', encoded_url);
        translate_links([$('.back-button')]);
    };

    // Send a message to the outer window of the iframe with the current
    // URL of the iframe, removing the server basename to normalize between
    // Jupyterhub and a standalone notebook.

    // This message is used by QF's javascript to update the URL of the
    // address bar chance to update the URL of the browser's address bar.
    // Without this code, the iframe would navigate to different URLs but
    // the URL in the browser's address bar would stay the same.  If the
    // user then clicked the refresh button in their browser, they would be
    // brought back to whatever URL they started on, and they would be very
    // confused.
    var update_qf_address = function(feedback_item_data) {
        var msg_data = {
            url: window.location.href.replace(notebook_base_url, '/'),
            version: "1.0"
        };

        if (feedback_item_data){
            msg_data.item_type = feedback_item_data.type
            msg_data.item_title = feedback_item_data.title
        }

        send_qf_post_message(msg_data);
    };

    var check_post_message_origin = function(event) {
        return event.origin + "/research" === qf_base_url
    }

    return {
        notebook_base_url: notebook_base_url,
        qf_base_url: qf_base_url,
        translate_links: translate_links,
        initialize_back_button: initialize_back_button,
        update_qf_address: update_qf_address,
        check_post_message_origin: check_post_message_origin,
        send_qf_post_message: send_qf_post_message,
        trigger_iframe_height_update: trigger_iframe_height_update,
        handle_converted_link_clicked: handle_converted_link_clicked
    };

});
