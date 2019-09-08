// ==UserScript==
// @name     TFS font tweaks
// @version  1
// @grant    none
// @include  https://dev.azure.com/forrards/*
// @include  https://forrards.visualstudio.com/*
// ==/UserScript==

(function() {
    let element = document.querySelector('body');
    let style = window.getComputedStyle(element);
    let originalFontFamily = style.getPropertyValue('font-family');
    let fontFamily = originalFontFamily ? '"Noto Sans", ' + originalFontFamily : '"Noto Sans"';
    // let fontFamily = '"Noto Sans"';
    /** Create a style */
    let newStyle = document.createElement('style');
    newStyle.innerHTML = `
    body, button, input, select, textarea, div, span {
        font-family: ${fontFamily};
    }
		p {
        font-family: ${fontFamily} !important;
    }
    `;
    document.head.appendChild(newStyle);
})();