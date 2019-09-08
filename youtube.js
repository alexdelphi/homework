// ==UserScript==
// @name         youtube fixes
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

'use strict';

/** delete the video rows if there are less than `limit` videos in a row */
var mod_youtube_purgeShortContainers = (nodes, limit, debug=false) => {
    let browser = document.querySelector('ytd-browse');
    if (!browser) {
        // we're not on the main page
        return;
    }

    let debugLog = msg => {
        if (debug) {
            console.log(msg);
        }
    };

    nodes.forEach((node, index) => {
        debugLog(`Element no. ${index}`);
        if (index == 0) {
            return; // пропустить первый элемент
        }
        // if (node.querySelector('#subscribe-button').childElementCount == 0) {
        //     debugLog('No subscribe button found!'); // actually it's hidden
        //     return;
        // }
        // debugLog('Found a subscribe button');
        let videos = node.querySelectorAll('#scroll-container ytd-grid-video-renderer');
        if (videos.length >= limit) {
            debugLog(`The container will stay in place, it has ${limit} columns`);
            return;
        }
        debugLog(`The container will be deleted, it has ${videos.length} columns`);
        node.remove();
    });
};

(function() {
    let debug = false;
    let debugLog = msg => {
        if (debug) {
            console.log(msg);
        }
    };

    /** 5 columns to 6 columns */
    let replaceAllClasses = (classToRemove, classToAdd) => {
        document.querySelectorAll('.' + classToRemove).forEach(node => {
            node.classList.remove(classToRemove);
            node.classList.add(classToAdd);
        });
    };

    /** fix styles */
    let browser = document.querySelector('ytd-browse'); //
    if (!browser) {
        // we're not on the main page
        return;
    }
    replaceAllClasses('grid-5-columns', 'grid-6-columns');
    const columnsNeeded = 6;
    mod_youtube_purgeShortContainers(document.querySelectorAll('ytd-shelf-renderer'), columnsNeeded);
    let leftGuide = document.querySelector('app-drawer#guide');
    if (leftGuide) {
        leftGuide.remove();
    }
    else {
        debugLog(`Didn't find an app-drawer element`);
    }
    let pageManager = document.querySelector('ytd-page-manager');
    if (pageManager) {
        pageManager.style = "margin-left: var(--ytd-masthead-height, 56px);";
    }
    else {
        debugLog(`Didn't find a ytd-page-manager element`);
    }
})();

var mod_youtube_origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
    console.log(`Triggered loadEnd`);
    this.addEventListener(
        'loadEnd', mod_youtube_purgeShortContainers(document.querySelectorAll('ytd-shelf-renderer'), 6));
    mod_youtube_origOpen.apply(this, arguments);
};

setTimeout(function main() {
	mod_youtube_purgeShortContainers(document.querySelectorAll('ytd-shelf-renderer'), 6);
	setTimeout(main, 2000);
}, 2000);
