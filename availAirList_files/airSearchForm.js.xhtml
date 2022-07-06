$(document).ready(function () {
    const COMPLETE_ID = '#completeSearch';
    const COLLAPSED_ID = '#collapsedSearch';
    $(COMPLETE_ID).hide();
    $(COLLAPSED_ID).click(function () {
        $(COMPLETE_ID).slideDown("slow");
        $(COLLAPSED_ID).slideUp("slow");
    });
    $(document).click(function (e) {
        var container = $(COLLAPSED_ID);
        var element = $(COMPLETE_ID);

        //Autocompletados, desplegables, calendar
        var close = true;
        $("div[id$='_panel']").each(function () {
            if ($(this).is(e.target) || $(this).has(e.target).length !== 0) {
                close = false;
            }
        });

        $("div[id$='-div']").each(function () {
            if ($(this).is(e.target) || $(this).has(e.target).length !== 0) {
                close = false;
            }
        });

        //Si no se hace click sobre ningún elemento de la búsqueda, se cierra el panel
        if (!container.is(e.target) && container.has(e.target).length === 0
                && !element.is(e.target) && element.has(e.target).length === 0
                && close) {
            $(COMPLETE_ID).slideUp("slow");
            $(COLLAPSED_ID).slideDown("slow");
        }
    });
});
