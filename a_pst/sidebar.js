function show(sidebar) {
    var modal = $(sidebar.jqId);
    var body = $(window);
    // Get modal size
    var w = modal.width();
    var h = modal.height();
    // Get window size
    var bw = body.width();
    var bh = body.height();
    // Update the css and center the modal on screen
    modal.css({
        "position": "fixed",
        "top": ((bh - h) / 2) + "px",
        "left": ((bw - w) / 2) + "px",
        "transform": "initial"
    })
}

function hide(sidebar) {
    var modal = $(sidebar.jqId);
    modal.css({
        "top": "0px",
        "left": "0px",
        "transform": "translateX(-100%)"
    })

}
