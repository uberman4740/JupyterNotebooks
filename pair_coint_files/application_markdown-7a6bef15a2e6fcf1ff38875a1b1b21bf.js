var Markdown;Markdown="object"==typeof exports&&"function"==typeof require?exports:{},function(){function e(e){return e}function t(){return!1}function n(){}function r(){}n.prototype={chain:function(t,n){var r=this[t];if(!r)throw new Error("unknown hook "+t);this[t]=r===e?n:function(e){return n(r(e))}},set:function(e,t){if(!this[e])throw new Error("unknown hook "+e);this[e]=t},addNoop:function(t){this[t]=e},addFalse:function(e){this[e]=t}},Markdown.HookCollection=n,r.prototype={set:function(e,t){this["s_"+e]=t},get:function(e){return this["s_"+e]}},Markdown.Converter=function(){function e(e){return e=e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm,function(e,t,n,r,o,a){return t=t.toLowerCase(),K.set(t,$(n)),o?r:(a&&R.set(t,a.replace(/"/g,"&quot;")),"")})}function t(e){return e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,o),e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,o),e=e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,o),e=e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g,o),e=e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,o)}function o(e,t){var n=t;return n=n.replace(/^\n+/,""),n=n.replace(/\n+$/g,""),n="\n\n~K"+(M.push(n)-1)+"K\n\n"}function a(e,n){e=p(e);var r="<hr />\n";return e=e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,r),e=e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm,r),e=e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,r),e=g(e),e=v(e),e=y(e),e=t(e),e=T(e,n)}function i(e){return e=b(e),e=c(e),e=C(e),e=u(e),e=s(e),e=E(e),e=e.replace(/~P/g,"://"),e=$(e),e=k(e),e=e.replace(/  +\n/g," <br>\n")}function c(e){var t=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;return e=e.replace(t,function(e){var t=e.replace(/(.)<\/?code>(?=.)/g,"$1`");return t=q(t,"!"==e.charAt(1)?"\\`*_/":"\\`*_")})}function s(e){return e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,l),e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,l),e=e.replace(/(\[([^\[\]]+)\])()()()()()/g,l)}function l(e,t,n,r,o,a,i,c){void 0==c&&(c="");var s=t,l=n.replace(/:\/\//g,"~P"),u=r.toLowerCase(),d=o,p=c;if(""==d)if(""==u&&(u=l.toLowerCase().replace(/ ?\n/g," ")),d="#"+u,void 0!=K.get(u))d=K.get(u),void 0!=R.get(u)&&(p=R.get(u));else{if(!(s.search(/\(\s*\)$/m)>-1))return s;d=""}d=_(d),d=q(d,"*_");var g='<a href="'+d+'"';return""!=p&&(p=f(p),p=q(p,"*_"),g+=' title="'+p+'"'),g+=">"+l+"</a>"}function u(e){return e=e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,d),e=e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,d)}function f(e){return e.replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}function d(e,t,n,r,o,a,i,c){var s=t,l=n,u=r.toLowerCase(),d=o,p=c;if(p||(p=""),""==d){if(""==u&&(u=l.toLowerCase().replace(/ ?\n/g," ")),d="#"+u,void 0==K.get(u))return s;d=K.get(u),void 0!=R.get(u)&&(p=R.get(u))}l=q(f(l),"*_[]()"),d=q(d,"*_");var g='<img src="'+d+'" alt="'+l+'"';return p=f(p),p=q(p,"*_"),g+=' title="'+p+'"',g+=" />"}function p(e){return e=e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(e,t){return"<h1>"+i(t)+"</h1>\n\n"}),e=e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(e,t){return"<h2>"+i(t)+"</h2>\n\n"}),e=e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(e,t,n){var r=t.length;return"<h"+r+">"+i(n)+"</h"+r+">\n\n"})}function g(e){e+="~0";var t=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return A?e=e.replace(t,function(e,t,n){var r=t,o=n.search(/[*+-]/g)>-1?"ul":"ol",a=h(r,o);return a=a.replace(/\s+$/,""),a="<"+o+">"+a+"</"+o+">\n"}):(t=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,e=e.replace(t,function(e,t,n,r){var o=t,a=n,i=r.search(/[*+-]/g)>-1?"ul":"ol",c=h(a,i);return c=o+"<"+i+">\n"+c+"</"+i+">\n"})),e=e.replace(/~0/,"")}function h(e,t){A++,e=e.replace(/\n{2,}$/,"\n"),e+="~0";var n=B[t],r=new RegExp("(^[ \\t]*)("+n+")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1("+n+")[ \\t]+))","gm"),o=!1;return e=e.replace(r,function(e,t,n,r){var c=r,s=/\n\n$/.test(c),l=s||c.search(/\n{2,}/)>-1;return l||o?c=a(S(c),!0):(c=g(S(c)),c=c.replace(/\n$/,""),c=i(c)),o=s,"<li>"+c+"</li>\n"}),e=e.replace(/~0/g,""),A--,e}function v(e){return e+="~0",e=e.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(e,t,n){var r=t,o=n;return r=w(S(r)),r=L(r),r=r.replace(/^\n+/g,""),r=r.replace(/\n+$/g,""),r='<pre class="prettyprint"><code>'+r+"\n</code></pre>","\n\n"+r+"\n\n"+o}),e=e.replace(/~0/,"")}function m(e){return e=e.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(M.push(e)-1)+"K\n\n"}function b(e){return e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,t,n,r){var o=r;return o=o.replace(/^([ \t]*)/g,""),o=o.replace(/[ \t]*$/g,""),o=w(o),o=o.replace(/:\/\//g,"~P"),t+"<code>"+o+"</code>"})}function w(e){return e=e.replace(/&/g,"&amp;"),e=e.replace(/</g,"&lt;"),e=e.replace(/>/g,"&gt;"),e=q(e,"*_{}[]\\",!1)}function k(e){return e=e.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g,"$1<strong>$3</strong>$4"),e=e.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g,"$1<em>$3</em>$4")}function y(e){return e=e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(e,t){var n=t;return n=n.replace(/^[ \t]*>[ \t]?/gm,"~0"),n=n.replace(/~0/g,""),n=n.replace(/^[ \t]+$/gm,""),n=a(n),n=n.replace(/(^|\n)/g,"$1  "),n=n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,t){var n=t;return n=n.replace(/^  /gm,"~0"),n=n.replace(/~0/g,"")}),m("<blockquote>\n"+n+"\n</blockquote>")})}function T(e,t){e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,"");for(var n=e.split(/\n{2,}/g),r=[],o=/~K(\d+)K/,a=n.length,c=0;a>c;c++){var s=n[c];o.test(s)?r.push(s):/\S/.test(s)&&(s=i(s),s=s.replace(/^([ \t]*)/g,"<p>"),s+="</p>",r.push(s))}if(!t){a=r.length;for(var c=0;a>c;c++)for(var l=!0;l;)l=!1,r[c]=r[c].replace(/~K(\d+)K/g,function(e,t){return l=!0,M[t]})}return r.join("\n\n")}function $(e){return e=e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),e=e.replace(/<(?![a-z\/?\$!])/gi,"&lt;")}function C(e){return e=e.replace(/\\(\\)/g,H),e=e.replace(/\\([`*_{}\[\]()>#+-.!])/g,H)}function E(e){e=e.replace(/(^|\s)(https?|ftp)(:\/\/[-A-Z0-9+&@#\/%?=~_|\[\]\(\)!:,\.;]*[-A-Z0-9+&@#\/%=~_|\[\]])($|\W)/gi,"$1<$2$3>$4");var t=function(e,t){return'<a href="'+t+'">'+I.plainLinkText(t)+"</a>"};e=e.replace(/<((https?|ftp):[^'">\s]+)>/gi,t);var n=function(e,t){var n,r,o="mailto:";return t.substring(0,o.length)!=o?(n=o+t,r=t):(n=t,r=t.substring(o.length,t.length)),'<a href="'+n+'">'+I.plainLinkText(r)+"</a>"};return e=e.replace(/<((?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+))>/gi,n)}function x(e){return e=e.replace(/~E(\d+)E/g,function(e,t){var n=parseInt(t);return String.fromCharCode(n)})}function S(e){return e=e.replace(/^(\t|[ ]{1,4})/gm,"~0"),e=e.replace(/~0/g,"")}function L(e){if(!/\t/.test(e))return e;var t,n=["    ","   ","  "," "],r=0;return e.replace(/[\n\t]/g,function(e,o){return"\n"===e?(r=o+1,e):(t=(o-r)%4,r=o+1,n[t])})}function _(e){if(!e)return"";var t=e.length;return e.replace(N,function(n,r){if("~D"==n)return"%24";if(":"==n){if(r==t-1||/[0-9\/]/.test(e.charAt(r+1)))return":";if("mailto:"===e.substring(0,"mailto:".length))return":";if("magnet:"===e.substring(0,"magnet:".length))return":"}return"%"+n.charCodeAt(0).toString(16)})}function q(e,t,n){var r="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])";n&&(r="\\\\"+r);var o=new RegExp(r,"g");return e=e.replace(o,H)}function H(e,t){var n=t.charCodeAt(0);return"~E"+n+"E"}var I=this.hooks=new n;I.addNoop("plainLinkText"),I.addNoop("preConversion"),I.addNoop("postConversion");var K,R,M,A;this.makeHtml=function(n){if(K)throw new Error("Recursive call to converter.makeHtml");return K=new r,R=new r,M=[],A=0,n=I.preConversion(n),n=n.replace(/~/g,"~T"),n=n.replace(/\$/g,"~D"),n=n.replace(/\r\n/g,"\n"),n=n.replace(/\r/g,"\n"),n="\n\n"+n+"\n\n",n=L(n),n=n.replace(/^[ \t]+$/gm,""),n=t(n),n=e(n),n=a(n),n=x(n),n=n.replace(/~D/g,"$$"),n=n.replace(/~T/g,"~"),n=I.postConversion(n),M=R=K=null,n};var B={ol:"\\d+[.]",ul:"[*+-]"},N=/(?:["'*()[\]:]|~D)/g}}(),function(){function e(){}function t(e){this.buttonBar=f.getElementById("wmd-button-bar"+e),this.preview=f.getElementById("wmd-preview"+e),this.input=f.getElementById("wmd-input"+e)}function n(e,t){var n,o,a,i=this,c=[],l=0,u="none",f=function(e,t){u!=e&&(u=e,t||p()),h.isIE&&"moving"==u?a=null:o=setTimeout(d,1)},d=function(e){a=new r(t,e),o=void 0};this.setCommandMode=function(){u="command",p(),o=setTimeout(d,0)},this.canUndo=function(){return l>1},this.canRedo=function(){return c[l+1]?!0:!1},this.undo=function(){i.canUndo()&&(n?(n.restore(),n=null):(c[l]=new r(t),c[--l].restore(),e&&e())),u="none",t.input.focus(),d()},this.redo=function(){i.canRedo()&&(c[++l].restore(),e&&e()),u="none",t.input.focus(),d()};var p=function(){var o=a||new r(t);return o?"moving"==u?(n||(n=o),void 0):(n&&(c[l-1].text!=n.text&&(c[l++]=n),n=null),c[l++]=o,c[l+1]=null,e&&e(),void 0):!1},g=function(e){var t=!1;if(e.ctrlKey||e.metaKey){var n=e.charCode||e.keyCode,r=String.fromCharCode(n);switch(r){case"y":i.redo(),t=!0;break;case"z":e.shiftKey?i.redo():i.undo(),t=!0}}return t?(e.preventDefault&&e.preventDefault(),window.event&&(window.event.returnValue=!1),void 0):void 0},v=function(e){if(!e.ctrlKey&&!e.metaKey){var t=e.keyCode;t>=33&&40>=t||t>=63232&&63235>=t?f("moving"):8==t||46==t||127==t?f("deleting"):13==t?f("newlines"):27==t?f("escape"):(16>t||t>20)&&91!=t&&f("typing")}},m=function(){s.addEvent(t.input,"keypress",function(e){!e.ctrlKey&&!e.metaKey||89!=e.keyCode&&90!=e.keyCode||e.preventDefault()});var e=function(){(h.isIE||a&&a.text!=t.input.value)&&void 0==o&&(u="paste",p(),d())};s.addEvent(t.input,"keydown",g),s.addEvent(t.input,"keydown",v),s.addEvent(t.input,"mousedown",function(){f("moving")}),t.input.onpaste=e,t.input.ondrop=e},b=function(){m(),d(!0),p()};b()}function r(t,n){var r=this,o=t.input;this.init=function(){s.isVisible(o)&&(n||!f.activeElement||f.activeElement===o)&&(this.setInputAreaSelectionStartEnd(),this.scrollTop=o.scrollTop,(!this.text&&o.selectionStart||0===o.selectionStart)&&(this.text=o.value))},this.setInputAreaSelection=function(){if(s.isVisible(o))if(void 0===o.selectionStart||h.isOpera){if(f.selection){if(f.activeElement&&f.activeElement!==o)return;o.focus();var e=o.createTextRange();e.moveStart("character",-o.value.length),e.moveEnd("character",-o.value.length),e.moveEnd("character",r.end),e.moveStart("character",r.start),e.select()}}else o.focus(),o.selectionStart=r.start,o.selectionEnd=r.end,o.scrollTop=r.scrollTop},this.setInputAreaSelectionStartEnd=function(){if(t.ieCachedRange||!o.selectionStart&&0!==o.selectionStart){if(f.selection){r.text=s.fixEolChars(o.value);var e=t.ieCachedRange||f.selection.createRange(),n=s.fixEolChars(e.text),a="",i=a+n+a;e.text=i;var c=s.fixEolChars(o.value);e.moveStart("character",-i.length),e.text=n,r.start=c.indexOf(a),r.end=c.lastIndexOf(a)-a.length;var l=r.text.length-s.fixEolChars(o.value).length;if(l){for(e.moveStart("character",-n.length);l--;)n+="\n",r.end+=1;e.text=n}t.ieCachedRange&&(r.scrollTop=t.ieCachedScrollTop),t.ieCachedRange=null,this.setInputAreaSelection()}}else r.start=o.selectionStart,r.end=o.selectionEnd},this.restore=function(){void 0!=r.text&&r.text!=o.value&&(o.value=r.text),this.setInputAreaSelection(),o.scrollTop=r.scrollTop},this.getChunks=function(){var t=new e;return t.before=s.fixEolChars(r.text.substring(0,r.start)),t.startTag="",t.selection=s.fixEolChars(r.text.substring(r.start,r.end)),t.endTag="",t.after=s.fixEolChars(r.text.substring(r.end)),t.scrollTop=r.scrollTop,t},this.setChunks=function(e){e.before=e.before+e.startTag,e.after=e.endTag+e.after,this.start=e.before.length,this.end=e.before.length+e.selection.length,this.text=e.before+e.selection+e.after,this.scrollTop=e.scrollTop},this.init()}function o(e,t,n){var r,o,a,i=3e3,c="delayed",u=function(e,t){s.addEvent(e,"input",t),e.onpaste=t,e.ondrop=t,s.addEvent(e,"keypress",t),s.addEvent(e,"keydown",t)},d=function(){var e=0;return window.innerHeight?e=window.pageYOffset:f.documentElement&&f.documentElement.scrollTop?e=f.documentElement.scrollTop:f.body&&(e=f.body.scrollTop),e},p=function(){if(t.preview){var n=t.input.value;if(!n||n!=a){a=n;var r=(new Date).getTime();n=e.makeHtml(n);var i=(new Date).getTime();o=i-r,$(n)}}},g=function(){if(r&&(clearTimeout(r),r=void 0),"manual"!==c){var e=0;"delayed"===c&&(e=o),e>i&&(e=i),r=setTimeout(p,e)}},v=function(e){return e.scrollHeight<=e.clientHeight?1:e.scrollTop/(e.scrollHeight-e.clientHeight)},m=function(){t.preview&&(t.preview.scrollTop=(t.preview.scrollHeight-t.preview.clientHeight)*v(t.preview))};this.refresh=function(e){e?(a="",p()):g()},this.processingTime=function(){return o};var b,w=!0,k=function(e){var n=t.preview,r=n.parentNode,o=n.nextSibling;r.removeChild(n),n.innerHTML=e,o?r.insertBefore(n,o):r.appendChild(n)},y=function(e){t.preview.innerHTML=e},T=function(e){if(b)return b(e);try{y(e),b=y}catch(t){b=k,b(e)}},$=function(e){var r=l.getTop(t.input)-d();if(t.preview&&(T(e),n()),m(),w)return w=!1,void 0;var o=l.getTop(t.input)-d();h.isIE?setTimeout(function(){window.scrollBy(0,o-r)},0):window.scrollBy(0,o-r)},C=function(){u(t.input,g),p(),t.preview&&(t.preview.scrollTop=0)};C()}function a(e,t,n,o,a){function i(e){if(d.focus(),e.textOp){n&&n.setCommandMode();var a=new r(t);if(!a)return;var i=a.getChunks(),c=function(){d.focus(),i&&a.setChunks(i),a.restore(),o.refresh()},s=e.textOp(i,c);s||c()}e.execute&&e.execute(n)}function c(e,t){t?(e.disabled=!1,e.isHelp||(e.onclick=function(){return this.onmouseout&&this.onmouseout(),i(this),!1})):e.disabled=!0}function l(e){return"string"==typeof e&&(e=a[e]),function(){e.apply(a,arguments)}}function u(t){var n=t.buttonBar,r=document.createElement("div");r.id="wmd-button-row"+e,r.className="btn-toolbar",r=n.appendChild(r);var o=function(t,n,o){var a=document.createElement("button");return a.className="btn "+t,a.id=t+e,n&&(a.textOp=n),c(a,!0),o?o.appendChild(a):r.appendChild(a),a},a=function(t){var n=document.createElement("div");return n.className="btn-group wmd-button-group"+t,n.id="wmd-button-group"+t+e,r.appendChild(n),n};group1=a(1),p.bold=o("wmd-bold-button",l("doBold"),group1),p.italic=o("wmd-italic-button",l("doItalic"),group1),group2=a(2),p.link=o("wmd-link-button",l(function(e,t){return this.doLinkOrImage(e,t,!1)}),group2),p.code=o("wmd-code-button",l("doCode"),group2),p.quote=o("wmd-quote-button",l("doBlockquote"),group2),group3=a(3),p.olist=o("wmd-olist-button",l(function(e,t){this.doList(e,t,!0)}),group3),p.ulist=o("wmd-ulist-button",l(function(e,t){this.doList(e,t,!1)}),group3),group4=a(4),p.undo=o("wmd-undo-button",null,group4),p.undo.execute=function(e){e&&e.undo()},p.redo=o("wmd-redo-button",null,group4),p.redo.execute=function(e){e&&e.redo()},group5=a("-add-backtest"),$(t.buttonBar).find(".wmd-button-group-add-backtest").append('<div class="dropdown quanto-dropdown"><button class="dropdown-toggle btn btn-default attach-button" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><span class="quanto-icon attachment-icon"><span class="attach-label">Attach</span></span></button><ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1"><li><a class="attach-backtest" href="#"></span>Backtest</a></li><li><a class="attach-notebook" href="#"></span>Notebook</a></li></ul></div>'),$(document).on("click",".attach-notebook",function(){return $(document).trigger("insert_notebook_in_reply"),!1}),$(document).on("click",".attach-backtest",function(){return $(document).trigger("insert_backtest_in_reply"),!1}),f()}function f(){n&&(c(p.undo,n.canUndo()),c(p.redo,n.canRedo()))}var d=t.input,p={};u(t);var g="keydown";h.isOpera&&(g="keypress"),s.addEvent(d,g,function(e){if((e.ctrlKey||e.metaKey)&&!e.altKey&&!e.shiftKey){var t=e.charCode||e.keyCode,n=String.fromCharCode(t).toLowerCase();switch(n){case"b":i(p.bold);break;case"i":i(p.italic);break;case"l":i(p.link);break;case"q":i(p.quote);break;case"k":i(p.code);break;case"o":i(p.olist);break;case"u":i(p.ulist);break;case"y":i(p.redo);break;case"z":e.shiftKey?i(p.redo):i(p.undo);break;default:return}e.preventDefault&&e.preventDefault(),window.event&&(window.event.returnValue=!1)}}),s.addEvent(d,"keyup",function(e){if(e.shiftKey&&!e.ctrlKey&&!e.metaKey){var t=e.charCode||e.keyCode;if(13===t){var n={};n.textOp=l("doAutoindent"),i(n)}}}),h.isIE&&s.addEvent(d,"keydown",function(e){var t=e.keyCode;return 27===t?!1:void 0}),this.setUndoRedoButtonStates=f}function i(e){this.hooks=e}function c(e){return e.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/,function(e,t,n){return t=t.replace(/\?.*$/,function(e){return e.replace(/\+/g," ")}),t=decodeURIComponent(t),t=encodeURI(t).replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29"),t=t.replace(/\?.*$/,function(e){return e.replace(/\+/g,"%2b")}),n&&(n=n.trim?n.trim():n.replace(/^\s*/,"").replace(/\s*$/,""),n=$.trim(n).replace(/"/g,"quot;").replace(/\(/g,"&#40;").replace(/\)/g,"&#41;").replace(/</g,"&lt;").replace(/>/g,"&gt;")),n?t+' "'+n+'"':t})}var s={},l={},u={},f=window.document,d=window.RegExp,p=window.navigator,g={lineLength:72},h={isIE:/msie/.test(p.userAgent.toLowerCase()),isIE_5or6:/msie 6/.test(p.userAgent.toLowerCase())||/msie 5/.test(p.userAgent.toLowerCase()),isOpera:/opera/.test(p.userAgent.toLowerCase())},v="",m='<p>http://example.com/images/diagram.jpg "optional title"</p>',b="http://",w="http://";Markdown.Editor=function(e,r,c){r=r||"";var s=this.hooks=new Markdown.HookCollection;s.addNoop("onPreviewRefresh"),s.addNoop("postBlockquoteCreation"),s.addFalse("insertImageDialog"),this.getConverter=function(){return e};var l,u=this;this.run=function(){if(!l){l=new t(r);var d,p,g=new i(s),h=new o(e,l,function(){s.onPreviewRefresh()});/\?noundo/.test(f.location.href)||(d=new n(function(){h.refresh(),p&&p.setUndoRedoButtonStates()},l),this.textOperation=function(e){d.setCommandMode(),e(),u.refreshPreview()}),p=new a(r,l,d,h,g,c),p.setUndoRedoButtonStates();var v=u.refreshPreview=function(){h.refresh(!0)};v()}}},e.prototype.findTags=function(e,t){var n,r=this;e&&(n=s.extendRegExp(e,"","$"),this.before=this.before.replace(n,function(e){return r.startTag=r.startTag+e,""}),n=s.extendRegExp(e,"^",""),this.selection=this.selection.replace(n,function(e){return r.startTag=r.startTag+e,""})),t&&(n=s.extendRegExp(t,"","$"),this.selection=this.selection.replace(n,function(e){return r.endTag=e+r.endTag,""}),n=s.extendRegExp(t,"^",""),this.after=this.after.replace(n,function(e){return r.endTag=e+r.endTag,""}))},e.prototype.trimWhitespace=function(e){var t,n,r=this;e?t=n="":(t=function(e){return r.before+=e,""},n=function(e){return r.after=e+r.after,""}),this.selection=this.selection.replace(/^(\s*)/,t).replace(/(\s*)$/,n)},e.prototype.skipLines=function(e,t,n){void 0===e&&(e=1),void 0===t&&(t=1),e++,t++;var r,o;if(navigator.userAgent.match(/Chrome/)&&"X".match(/()./),this.selection=this.selection.replace(/(^\n*)/,""),this.startTag=this.startTag+d.$1,this.selection=this.selection.replace(/(\n*$)/,""),this.endTag=this.endTag+d.$1,this.startTag=this.startTag.replace(/(^\n*)/,""),this.before=this.before+d.$1,this.endTag=this.endTag.replace(/(\n*$)/,""),this.after=this.after+d.$1,this.before){for(r=o="";e--;)r+="\\n?",o+="\n";n&&(r="\\n*"),this.before=this.before.replace(new d(r+"$",""),o)}if(this.after){for(r=o="";t--;)r+="\\n?",o+="\n";n&&(r="\\n*"),this.after=this.after.replace(new d(r,""),o)}},s.isVisible=function(e){return window.getComputedStyle?"none"!==window.getComputedStyle(e,null).getPropertyValue("display"):e.currentStyle?"none"!==e.currentStyle.display:void 0},s.addEvent=function(e,t,n){e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener(t,n,!1)},s.removeEvent=function(e,t,n){e.detachEvent?e.detachEvent("on"+t,n):e.removeEventListener(t,n,!1)},s.fixEolChars=function(e){return e=e.replace(/\r\n/g,"\n"),e=e.replace(/\r/g,"\n")},s.extendRegExp=function(e,t,n){(null===t||void 0===t)&&(t=""),(null===n||void 0===n)&&(n="");var r,o=e.toString();return o=o.replace(/\/([gim]*)$/,function(e,t){return r=t,""}),o=o.replace(/(^\/|\/$)/g,""),o=t+o+n,new d(o,r)},l.getTop=function(e,t){var n=e.offsetTop;if(!t)for(;e=e.offsetParent;)n+=e.offsetTop;return n},l.getHeight=function(e){return e.offsetHeight||e.scrollHeight},l.getWidth=function(e){return e.offsetWidth||e.scrollWidth},l.getPageSize=function(){var e,t,n,r;self.innerHeight&&self.scrollMaxY?(e=f.body.scrollWidth,t=self.innerHeight+self.scrollMaxY):f.body.scrollHeight>f.body.offsetHeight?(e=f.body.scrollWidth,t=f.body.scrollHeight):(e=f.body.offsetWidth,t=f.body.offsetHeight),self.innerHeight?(n=self.innerWidth,r=self.innerHeight):f.documentElement&&f.documentElement.clientHeight?(n=f.documentElement.clientWidth,r=f.documentElement.clientHeight):f.body&&(n=f.body.clientWidth,r=f.body.clientHeight);var o=Math.max(e,n),a=Math.max(t,r);return[o,a,n,r]},u.prompt=function(e,t,n,r){var o,a;void 0===n&&(n="");var i=function(e){var t=e.charCode||e.keyCode;27===t&&c(!0)},c=function(e){s.removeEvent(f.body,"keydown",i);var t=a.value;return e?t=null:(t=t.replace(/^http:\/\/(https?|ftp):\/\//,"$1://"),/^(?:https?|ftp):\/\//.test(t)||(t="http://"+t)),$(o).modal("hide"),r(t),!1},l=function(){o=f.createElement("div"),o.className="fade modal linkmodal quanto-modal",dialog_container=f.createElement("div"),dialog_container.className="modal-dialog",o.appendChild(dialog_container),content_container=f.createElement("div"),content_container.className="modal-content",dialog_container.appendChild(content_container);var t=f.createElement("div");t.className="modal-header",t.innerHTML='<a class="close" data-dismiss="modal">×</a>'+e,content_container.appendChild(t);var r=f.createElement("div");r.className="modal-body",content_container.appendChild(r);var l=f.createElement("form"),u=l.style;l.className="quanto-form",l.onsubmit=function(){return c(!1)},u.padding="0",u.margin="0",r.appendChild(l);var d=f.createElement("div");d.className="form-group",l.appendChild(d),a=f.createElement("input"),a.className=a.type="text",a.value=n,u=a.style,u.display="block",d.appendChild(a);var p=f.createElement("button");p.className="btn new-btn blue",p.type="button",p.onclick=function(){return c(!1)},p.innerHTML="Insert",d.appendChild(p),s.addEvent(f.body,"keydown",i),f.body.appendChild(o)};setTimeout(function(){l();var e=n.length;if(void 0!==a.selectionStart)a.selectionStart=0,a.selectionEnd=e;else if(a.createTextRange){var t=a.createTextRange();t.collapse(!1),t.moveStart("character",-e),t.moveEnd("character",e),t.select()}$(o).on("shown",function(){a.focus()}),$(o).on("hidden",function(){o.parentNode.removeChild(o)}),$(o).modal("show")},0)};var k=i.prototype;k.prefixes="(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)",k.unwrap=function(e){var t=new d("([^\\n])\\n(?!(\\n|"+this.prefixes+"))","g");e.selection=e.selection.replace(t,"$1 $2")},k.wrap=function(e,t){this.unwrap(e);var n=new d("(.{1,"+t+"})( +|$\\n?)","gm"),r=this;e.selection=e.selection.replace(n,function(e,t){return new d("^"+r.prefixes,"").test(e)?e:t+"\n"}),e.selection=e.selection.replace(/\s+$/,"")},k.doBold=function(e,t){return this.doBorI(e,t,2,"strong text")},k.doItalic=function(e,t){return this.doBorI(e,t,1,"emphasized text")},k.doBorI=function(e,t,n,r){e.trimWhitespace(),e.selection=e.selection.replace(/\n{2,}/g,"\n");var o=/(\**$)/.exec(e.before)[0],a=/(^\**)/.exec(e.after)[0],i=Math.min(o.length,a.length);if(i>=n&&(2!=i||1!=n))e.before=e.before.replace(d("[*]{"+n+"}$",""),""),e.after=e.after.replace(d("^[*]{"+n+"}",""),"");else if(!e.selection&&a){e.after=e.after.replace(/^([*_]*)/,""),e.before=e.before.replace(/(\s?)$/,"");var c=d.$1;e.before=e.before+a+c}else{e.selection||a||(e.selection=r);var s=1>=n?"*":"**";e.before=e.before+s,e.after=s+e.after}},k.stripLinkDefs=function(e,t){return e=e.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm,function(e,n,r,o,a){return t[n]=e.replace(/\s*$/,""),o?(t[n]=e.replace(/["(](.+?)[")]$/,""),o+a):""})},k.addLinkDef=function(e,t){var n=0,r={};e.before=this.stripLinkDefs(e.before,r),e.selection=this.stripLinkDefs(e.selection,r),e.after=this.stripLinkDefs(e.after,r);var o="",a=/(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g,i=function(e){n++,e=e.replace(/^[ ]{0,3}\[(\d+)\]:/,"  ["+n+"]:"),o+="\n"+e},c=function(e,t,o,s,l,u){return o=o.replace(a,c),r[l]?(i(r[l]),t+o+s+n+u):e};e.before=e.before.replace(a,c),t?i(t):e.selection=e.selection.replace(a,c);var s=n;return e.after=e.after.replace(a,c),e.after&&(e.after=e.after.replace(/\n*$/,"")),e.after||(e.selection=e.selection.replace(/\n*$/,"")),e.after+="\n\n"+o,s},k.doLinkOrImage=function(e,t,n){if(e.trimWhitespace(),e.findTags(/\s*!?\[/,/\][ ]?(?:\n[ ]*)?(\[.*?\])?/),!(e.endTag.length>1&&e.startTag.length>0)){if(e.selection=e.startTag+e.selection+e.endTag,e.startTag=e.endTag="",/\n\n/.test(e.selection))return this.addLinkDef(e,null),void 0;var r=this,o=function(o){if(null!==o){e.selection=(" "+e.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g,"$1\\").substr(1);var a=" [999]: "+c(o),i=r.addLinkDef(e,a);e.startTag=n?"![":"[",e.endTag="]["+i+"]",e.selection||(e.selection=n?"enter image description here":"enter link description here")}t()};return n?this.hooks.insertImageDialog(o)||u.prompt("Insert Image",m,b,o):u.prompt("Insert Link",v,w,o),!0}e.startTag=e.startTag.replace(/!?\[/,""),e.endTag="",this.addLinkDef(e,null)},k.doAutoindent=function(e){var t=this,n=!1;e.before=e.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/,"\n\n"),e.before=e.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/,"\n\n"),e.before=e.before.replace(/(\n|^)[ \t]+\n$/,"\n\n"),e.selection||/^[ \t]*(?:\n|$)/.test(e.after)||(e.after=e.after.replace(/^[^\n]*/,function(t){return e.selection=t,""}),n=!0),/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(e.before)&&t.doList&&t.doList(e),/(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(e.before)&&t.doBlockquote&&t.doBlockquote(e),/(\n|^)(\t|[ ]{4,}).*\n$/.test(e.before)&&t.doCode&&t.doCode(e),n&&(e.after=e.selection+e.after,e.selection="")},k.doBlockquote=function(e){e.selection=e.selection.replace(/^(\n*)([^\r]+?)(\n*)$/,function(t,n,r,o){return e.before+=n,e.after=o+e.after,r}),e.before=e.before.replace(/(>[ \t]*)$/,function(t,n){return e.selection=n+e.selection,""}),e.selection=e.selection.replace(/^(\s|>)+$/,""),e.selection=e.selection||"Blockquote";var t,n="",r="";if(e.before){for(var o=e.before.replace(/\n$/,"").split("\n"),a=!1,i=0;i<o.length;i++){var c=!1;t=o[i],a=a&&t.length>0,/^>/.test(t)?(c=!0,!a&&t.length>1&&(a=!0)):c=/^[ \t]*$/.test(t)?!0:a,c?n+=t+"\n":(r+=n+t,n="\n")}/(^|\n)>/.test(n)||(r+=n,n="")}e.startTag=n,e.before=r,e.after&&(e.after=e.after.replace(/^\n?/,"\n")),e.after=e.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/,function(t){return e.endTag=t,""});var s=function(t){var n=t?"> ":"";e.startTag&&(e.startTag=e.startTag.replace(/\n((>|\s)*)\n$/,function(e,t){return"\n"+t.replace(/^[ ]{0,3}>?[ \t]*$/gm,n)+"\n"})),e.endTag&&(e.endTag=e.endTag.replace(/^\n((>|\s)*)\n/,function(e,t){return"\n"+t.replace(/^[ ]{0,3}>?[ \t]*$/gm,n)+"\n"}))};/^(?![ ]{0,3}>)/m.test(e.selection)?(this.wrap(e,g.lineLength-2),e.selection=e.selection.replace(/^/gm,"> "),s(!0),e.skipLines()):(e.selection=e.selection.replace(/^[ ]{0,3}> ?/gm,""),this.unwrap(e),s(!1),!/^(\n|^)[ ]{0,3}>/.test(e.selection)&&e.startTag&&(e.startTag=e.startTag.replace(/\n{0,2}$/,"\n\n")),!/(\n|^)[ ]{0,3}>.*$/.test(e.selection)&&e.endTag&&(e.endTag=e.endTag.replace(/^\n{0,2}/,"\n\n"))),e.selection=this.hooks.postBlockquoteCreation(e.selection),/\n/.test(e.selection)||(e.selection=e.selection.replace(/^(> *)/,function(t,n){return e.startTag+=n,""}))},k.doCode=function(e){/\S[ ]*$/.test(e.before),/^[ ]*\S/.test(e.after),_.str.endsWith(e.before,"```\n")||(e.before+="```\n"),0!=e.after.indexOf("\n```")&&(e.after="\n```"+e.after)},k.doList=function(e,t,n){var r=/(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/,o=/^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/,a="-",i=1,c=function(){var e;return n?(e=" "+i+". ",i++):e=" "+a+" ",e},s=function(e){return void 0===n&&(n=/^\s*\d/.test(e)),e=e.replace(/^[ ]{0,3}([*+-]|\d+[.])\s/gm,function(){return c()})};if(e.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/,null),!e.before||/\n$/.test(e.before)||/^\n/.test(e.startTag)||(e.before+=e.startTag,e.startTag=""),e.startTag){var l=/\d+[.]/.test(e.startTag);if(e.startTag="",e.selection=e.selection.replace(/\n[ ]{4}/g,"\n"),this.unwrap(e),e.skipLines(),l&&(e.after=e.after.replace(o,s)),n==l)return}var u=1;e.before=e.before.replace(r,function(e){return/^\s*([*+-])/.test(e)&&(a=d.$1),u=/[^\n]\n\n[^\n]/.test(e)?1:0,s(e)});var f=c(),p=1;e.after=e.after.replace(o,function(e){return p=/[^\n]\n\n[^\n]/.test(e)?1:0,s(e)}),e.trimWhitespace(!0),e.skipLines(u,p,!0),e.startTag=f;var h=f.replace(/./g," ");this.wrap(e,g.lineLength-h.length),e.selection=e.selection.replace(/\n/g,"\n"+h)},k.doHeading=function(e){if(e.selection=e.selection.replace(/\s+/g," "),e.selection=e.selection.replace(/(^\s+|\s+$)/g,""),!e.selection)return e.startTag="## ",e.selection="Heading",e.endTag=" ##",void 0;var t=0;e.findTags(/#+[ ]*/,/[ ]*#+/),/#+/.test(e.startTag)&&(t=d.lastMatch.length),e.startTag=e.endTag="",e.findTags(null,/\s?(-+|=+)/),/=+/.test(e.endTag)&&(t=1),/-+/.test(e.endTag)&&(t=2),e.startTag=e.endTag="",e.skipLines(1,1);var n=0==t?2:t-1;if(n>0){var r=n>=2?"-":"=",o=e.selection.length;for(o>g.lineLength&&(o=g.lineLength),e.endTag="\n";o--;)e.endTag+=r}},k.doHorizontalRule=function(e){e.startTag="----------\n",e.selection="",e.skipLines(2,1,!0)}}(),function(){function e(e){return e.replace(/<[^>]*>?/gi,t)}function t(e){return e.match(a)||e.match(i)||e.match(c)||e.match(s)?e:"<div class='backtest-marker'>"==e?(window.match_start=!0,e):"undefined"!=typeof window.match_start&&window.match_start&&"</div>"==e?(this.match_start=!1,e):""}function n(e){if(""==e)return"";var t=/<\/?\w+[^>]*(\s|$|>)/g,n=e.toLowerCase().match(t),r=(n||[]).length;if(0==r)return e;for(var o,a,i,c="<p><img><br><li><hr>",s=[],l=[],u=!1,f=0;r>f;f++)if(o=n[f].replace(/<\/?(\w+).*/,"$1"),!(s[f]||c.search("<"+o+">")>-1)){if(a=n[f],i=-1,!/^<\//.test(a))for(var d=f+1;r>d;d++)if(!s[d]&&n[d]=="</"+o+">"){i=d;break}-1==i?u=l[f]=!0:s[i]=!0}if(!u)return e;var f=0;return e=e.replace(t,function(e){var t=l[f]?"":e;return f++,t})}var r,o;"object"==typeof exports&&"function"==typeof require?(r=exports,o=require("./Markdown.Converter").Converter):(r=window.Markdown,o=r.Converter),r.getSanitizingConverter=function(){var t=new o;return t.hooks.chain("postConversion",e),t.hooks.chain("postConversion",n),t};var a=/^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol|p|s|sup|sub|strong|strike|ul)>|<(br|hr)\s?\/?>)$/i,i=/^(<a\shref="(https?:(\/\/|\/)|ftp:(\/\/|\/)|mailto:|magnet:)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i,c=/^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i,s=/^(<pre(\sclass="prettyprint linenums")?>|<\/pre>)$/i}(),/**
 * Copyright 2013 Craig Campbell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Mousetrap is a simple keyboard shortcut library for Javascript with
 * no external dependencies
 *
 * @version 1.4.6
 * @url craig.is/killing/mice
 */
function(e,t){function n(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!1),void 0):(e.attachEvent("on"+t,n),void 0)}function r(e){if("keypress"==e.type){var t=String.fromCharCode(e.which);return e.shiftKey||(t=t.toLowerCase()),t}return C[e.which]?C[e.which]:E[e.which]?E[e.which]:String.fromCharCode(e.which).toLowerCase()}function o(e,t){return e.sort().join(",")===t.sort().join(",")}function a(e){e=e||{};var t,n=!1;for(t in q)e[t]?n=!0:q[t]=0;n||(K=!1)}function i(e,t,n,r,a,i){var c,s,l=[],u=n.type;if(!L[e])return[];for("keyup"==u&&p(e)&&(t=[e]),c=0;c<L[e].length;++c)if(s=L[e][c],(r||!s.seq||q[s.seq]==s.level)&&u==s.action&&("keypress"==u&&!n.metaKey&&!n.ctrlKey||o(t,s.modifiers))){var f=!r&&s.combo==a,d=r&&s.seq==r&&s.level==i;(f||d)&&L[e].splice(c,1),l.push(s)}return l}function c(e){var t=[];return e.shiftKey&&t.push("shift"),e.altKey&&t.push("alt"),e.ctrlKey&&t.push("ctrl"),e.metaKey&&t.push("meta"),t}function s(e){return e.preventDefault?(e.preventDefault(),void 0):(e.returnValue=!1,void 0)}function l(e){return e.stopPropagation?(e.stopPropagation(),void 0):(e.cancelBubble=!0,void 0)}function u(e,t,n,r){M.stopCallback(t,t.target||t.srcElement,n,r)||e(t,n)===!1&&(s(t),l(t))}function f(e,t,n){var r,o=i(e,t,n),c={},s=0,l=!1;for(r=0;r<o.length;++r)o[r].seq&&(s=Math.max(s,o[r].level));for(r=0;r<o.length;++r)if(o[r].seq){if(o[r].level!=s)continue;l=!0,c[o[r].seq]=1,u(o[r].callback,n,o[r].combo,o[r].seq)}else l||u(o[r].callback,n,o[r].combo);var f="keypress"==n.type&&I;n.type!=K||p(e)||f||a(c),I=l&&"keydown"==n.type}function d(e){"number"!=typeof e.which&&(e.which=e.keyCode);var t=r(e);if(t)return"keyup"==e.type&&H===t?(H=!1,void 0):(M.handleKey(t,c(e),e),void 0)}function p(e){return"shift"==e||"ctrl"==e||"alt"==e||"meta"==e}function g(){clearTimeout($),$=setTimeout(a,1e3)}function h(){if(!T){T={};for(var e in C)e>95&&112>e||C.hasOwnProperty(e)&&(T[C[e]]=e)}return T}function v(e,t,n){return n||(n=h()[e]?"keydown":"keypress"),"keypress"==n&&t.length&&(n="keydown"),n}function m(e,t,n,o){function i(t){return function(){K=t,++q[e],g()}}function c(t){u(n,t,e),"keyup"!==o&&(H=r(t)),setTimeout(a,10)}q[e]=0;for(var s=0;s<t.length;++s){var l=s+1===t.length,f=l?c:i(o||w(t[s+1]).action);k(t[s],f,o,e,s)}}function b(e){return"+"===e?["+"]:e.split("+")}function w(e,t){var n,r,o,a=[];for(n=b(e),o=0;o<n.length;++o)r=n[o],S[r]&&(r=S[r]),t&&"keypress"!=t&&x[r]&&(r=x[r],a.push("shift")),p(r)&&a.push(r);return t=v(r,a,t),{key:r,modifiers:a,action:t}}function k(e,t,n,r,o){_[e+":"+n]=t,e=e.replace(/\s+/g," ");var a,c=e.split(" ");return c.length>1?(m(e,c,t,n),void 0):(a=w(e,n),L[a.key]=L[a.key]||[],i(a.key,a.modifiers,{type:a.action},r,e,o),L[a.key][r?"unshift":"push"]({callback:t,modifiers:a.modifiers,action:a.action,seq:r,level:o,combo:e}),void 0)}function y(e,t,n){for(var r=0;r<e.length;++r)k(e[r],t,n)}for(var T,$,C={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},E={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},x={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},S={option:"alt",command:"meta","return":"enter",escape:"esc",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},L={},_={},q={},H=!1,I=!1,K=!1,R=1;20>R;++R)C[111+R]="f"+R;for(R=0;9>=R;++R)C[R+96]=R;n(t,"keypress",d),n(t,"keydown",d),n(t,"keyup",d);var M={bind:function(e,t,n){return e=e instanceof Array?e:[e],y(e,t,n),this},unbind:function(e,t){return M.bind(e,function(){},t)},trigger:function(e,t){return _[e+":"+t]&&_[e+":"+t]({},e),this},reset:function(){return L={},_={},this},stopCallback:function(e,t){return(" "+t.className+" ").indexOf(" mousetrap ")>-1?!1:"INPUT"==t.tagName||"SELECT"==t.tagName||"TEXTAREA"==t.tagName||t.isContentEditable},handleKey:f};e.Mousetrap=M,"function"==typeof define&&define.amd&&define(M)}(window,document),Mousetrap=function(e){var t={},n=e.stopCallback;return e.stopCallback=function(e,r,o,a){return t[o]||t[a]?!1:n(e,r,o)},e.bindGlobal=function(n,r,o){if(e.bind(n,r,o),n instanceof Array)for(var a=0;a<n.length;a++)t[n[a]]=!0;else t[n]=!0},e}(Mousetrap);