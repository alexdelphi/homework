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
    let bgImage = `background-image: ${prop} !important`
    newStyle.innerHTML = `
    .b_TS {
        ${bgImage};
    }
    `;
    document.head.appendChild(newStyle);

    let selector = '.jm.main.widgets div';
    let nodes = document.querySelectorAll(selector);
    let selector = '.jb rows__row.rows__row_main';
    let ad_containers = [];
    let i = 0;
    for (node = document.querySelector(selector); node; node = node.nextSibling)
    {
        if (!node.className)
        {
            ad_containers.push(node);
        }
    }
    console.log(`length = ${ad_containers.length}`);
    ad_containers[1].remove(); // for good
    ad_containers[0].querySelectorAll('div').foreach(node => {
        node.style = bgImage;
    });
    let misc_containers = [
        '.media-grid__media-content', // zen
        '.ya-chat-widget' // chats
    ]
    misc_containers.forEach(sel => {
        document.querySelector(sel).remove();
        console.log(sel);
    });
})();
