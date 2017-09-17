/**
 * **************************************************
 * ******************* Web Share ********************
 * **************************************************
 *
 * Usage ::
 *
 * __web_share__.attach({
 *  target: '.className' or '#id' or any valid selector for querySelector
 *  style: {
 *      position: absolute,
 *      color: red
 *   }
 * });
 */
(function (root) {
    // If share api is not available
    if (navigator.share) {
        console.warn('Web Share API is not available');
        return false;
    }
        

    let __web_share__ = {};
    const svg = `<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>`;
    
    __web_share__.attach = options => {
        if (typeof options === 'undefined' || typeof options.target === 'undefined'){
            return;
        }

        const container = document.querySelector(options.target);
        const host = document.createElement('p');
        let url = document.location.href;
        const canonicalElement = document.querySelector('link[rel=canonical]');
        if (canonicalElement !== undefined) {
            url = canonicalElement.href;
        }
        host.id = '__ws__share';

        if (typeof options.style === 'object'){
            try{
                host.style = JSON.stringify(options.style).replace(/({|}|\")/g, '').replace(/,/g, ';');
            }catch(e){
                console.error(e);
                return;
            }
        }
        host.innerHTML = svg;
        host.addEventListener('click', function () {
            navigator.share({url: url});
        });
        container.appendChild(host);
    }

    root.__web_share__ = __web_share__;
}(window));