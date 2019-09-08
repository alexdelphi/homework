// ==UserScript==
// @name         yandex fixes
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.yandex.ru/
// @match        https://yandex.ru/
// @match        yandex.ru/
// @grant        none
// ==/UserScript==

'use strict';

(function() {
    let element = document.querySelector('body');
    /** Create a style */
    let newStyle = document.createElement('style');
    let browser_detect = mod_get_browser();
    let prop = browser_detect.isChrome ? '""' : 'null';
    newStyle.innerHTML = `
    .b_TS {
        background-image: ${prop} !important;
    }
    `;
    document.head.appendChild(newStyle);

    let selector = '.jm.main.widgets div';
    let i = 0;
    let nodes = document.querySelectorAll(selector);
    let ad_containers = Array.prototype.filter.call(
        nodes, node => node.querySelector('.Fg.Fg__Pu') && !node.className);
    console.log(ad_containers);
    ad_containers[1].remove(); // for good
    ad_containers[0].querySelectorAll('div').foreach(node => {
        node.style = 'background-image: "" !important';
    });
    let misc_containers = [
        '.media-grid__media-content', // zen
        '.ya-chat-widget' // chats
    ]
    misc_containers.forEach(selector => {
        document.querySelector(selector).remove();
    });
})();
