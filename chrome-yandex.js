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
    newStyle.innerHTML = `
    .b_TS {
        background-image: null !important;
    }
    `;
    document.head.appendChild(newStyle);

    let selector = '.jm.main.widgets div';
    let i = 0;
    let nodes = document.querySelectorAll(selector);
    let nodes_to_block = Array.prototype.filter.call(
        nodes, node => node.querySelector('.Fg.Fg__Pu') && !node.className);
    console.log(nodes_to_block);
    nodes_to_block[1].remove(); // for good
    nodes_to_block[0].querySelectorAll('div').foreach(node => {
        node.style = 'background-image: "" !important';
    });

})();
