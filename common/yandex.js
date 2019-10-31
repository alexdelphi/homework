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
    /** Create a style */
    let newStyle = document.createElement('style');
    let browser_detect = mod_get_browser();
    let bgImage = `background-image: none !important`;
    newStyle.innerHTML = `
    .b_TS {
        ${bgImage};
    }
    `;
    document.head.appendChild(newStyle);
    node = document.querySelector('.teaser__content');
    if (node)
    {
        node.remove();
    }
    node = document.querySelector('.container__banner');
    if (node)
    {
        // the easy way
        node.remove();
    }
    else
    {
        // the obfuscated way
        selector = '.jb.rows__row.rows__row_main > div div';
        let ad_containers = [];
        for (node = document.querySelector(selector); node; node = node.nextSibling)
        {
            if (!node.className)
            {
                ad_containers.push(node);
            }
        }
        // console.log(`length = ${ad_containers.length}`);
        let i = 0;
        if (ad_containers.length > 1)
        {
            ad_containers[1].remove(); // for good
            for (let node of ad_containers[0].querySelectorAll('div'))
            {
                node.style = bgImage;
            }                        
        }
    }
    removeContainer = sel => {
        node = document.querySelector(sel);
        if (node) {
            node.remove();
        }
        else {
            console.log(`${sel} not found, couldn't remove!`);
        }
    };
    removeContainer('.media-grid__media-content');
    window.onload += () => {
        removeContainer('.ya-chat-widget');
    } 
})();
