
function resizeTextArea(textAreaId) {
    if (document.getElementById(textAreaId).style.width === "490px" || document.getElementById(textAreaId).style.width === "") {
        document.getElementById(textAreaId).style.width = "1000px";
        document.getElementById(textAreaId).style.height = "2000px";
    } else {
        document.getElementById(textAreaId).style.width = "490px";
        document.getElementById(textAreaId).style.height = null;
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/*
 *  LABEL QUE APARECE CUANDO HACER CLICK DENTRO DEL INPUT
 */
/*********** INPUTS ***************/
$(document).ready(function () {
    $("input:placeholder-shown").prev().css({"opacity": "0", "transition": "opacity .5s linear"});
    $("input").focus(function () {
        $(this).prev().css({"opacity": "1", "transition": "opacity .5s linear"});
    });

    $(".required input").each(function () {
        $(this).attr('placeholder', $(this).attr('placeholder') + "*");
    });

    $("input").blur(function () {
        if ($(this).attr('placeholder') && $(this).val() === '') {
            $(this).prev().css({"opacity": "0", "transition": "opacity .5s linear"});
        }
    });

});

function labelRefresh() {
    $("input:placeholder-shown").prev().css({"opacity": "0"});
    $("input").focus(function () {
        $(this).prev().css({"opacity": "1", "transition": "opacity .5s linear"});
    });
    $("input").blur(function () {
        if ($(this).attr('placeholder') && $(this).val() === '') {
            $(this).prev().css({"opacity": "0", "transition": "opacity .5s linear"});
        }
    });
}

/*********** TEXTAREA ***************/
$("textarea:placeholder-shown").prev().css({"opacity": "0", "transition": "opacity .5s linear"});
$("textarea").focus(function () {
    $(this).prev().css({"opacity": "1", "transition": "opacity .5s linear"});
});
$("textarea").blur(function () {
    if ($(this).attr('placeholder') && $(this).val() === '') {
        $(this).prev().css({"opacity": "0", "transition": "opacity .5s linear"});
    }
});

/*********** AUTOCOMPLETADOS ***************/
$("input:placeholder-shown").parents('span.ui-autocomplete').prev().css({"opacity": "0", "transition": "opacity .5s linear"});
$(".ui-autocomplete > input").focus(function () {
    $(this).parents('span.ui-autocomplete').prev().css({"opacity": "1", "transition": "opacity .5s linear"});
});
$(".ui-autocomplete > input:placeholder-shown").blur(function () {
    if ($(this).attr('placeholder') && $(this).val() === '') {
        $(this).parents('span.ui-autocomplete').prev().css({"opacity": "0", "transition": "opacity .5s linear"});
    }
});

/*
 * BOTÓN PARA HACER HIDDEN Y SHOW
 */
$(".button-toggle").click(function () {
    $(this).next().slideToggle("slow");
});

$('.provider-avail-list').hide();

/*
 *  DELAY EN LA APERTURA DEL DIALOG
 */
var statusDlgTimer = null;

// show delayed dialog
function showStatusDialog() {
    if (statusDlgTimer === null)
        statusDlgTimer = setTimeout(function () {
            PF('statusDialog').show()
        }, 1000);
}

// hide dialog / cancel timer
function hideStatusDialog() {
    if (statusDlgTimer !== null) {
        clearTimeout(statusDlgTimer);
        PF('statusDialog').hide();
        statusDlgTimer = null;
    }
}

$("body").on("click", '.ui-dialog-mask', function () {
    var idModal = this.id.replace("_modal", "");
    PF(idModal).hide();
});


function scrollToError() {
    try {
        $('.ui-messages :first-child').eq(0).parent()[0].scrollIntoView();
        window.scrollBy(0, -200);
    } catch (err) {
        //No Message was found!
    }
}

