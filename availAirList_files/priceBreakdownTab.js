function togglePrice(obj) {
    obj.parent().next().slideToggle("slow");
    obj.toggleClass("fa-chevron-down");
    obj.toggleClass("fa-chevron-up");
}
