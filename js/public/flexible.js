//控制页面自适应
resize_font(document, window);
function resize_font(doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        /* if(clientWidth>750){
        	clientWidth=750;	
        } */
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'; //////这里设计图多宽就改成多宽，目前相应宽度是750px
       
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}