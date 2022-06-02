var minDaysCal = 1;
var maxDaysCal = 14;
var totalNinos = 0;
var maximo_adultos;


function PrepararSliderPrecioHome(precios) {
    //alert('PrepararSliderPrecioHome' + precios);
    var arrayPrecios = precios.split("-");
    $("#filter_ranks_home").slider({
        range: true,
        min: 0,
        max: 100000,
        values: [arrayPrecios[0], arrayPrecios[1]],
        change: function (event, ui) { },
        slide: function (event, ui) {
            $("#CantidadSliderHome").val(Desde + ui.values[0] + " € - " + Hasta + ui.values[1] + " €");
        }
    });
    $("#CantidadSliderHome").val(Desde + ' ' + $("#filter_ranks_home").slider("values", 0) + " € - " +
                             Hasta + ' ' + $("#filter_ranks_home").slider("values", 1) + " €");

    $('.ui-slider-handle').mousedown(function () {
        isDown = true;
    });
}

//#region "POP_UP_HABITACIONES"

function popUpHabitaciones() {
    $('#imgCerrarHab').unbind();
    $('#divTextHab').unbind();

    $('#divTextHab').click(function () {
        $('#habModal').modal('toggle');
    });

    $('#imgCerrarHab').click(function () {
        //cuando le damos a cerrar con errores inicializamos las filas
        if (!validaHabitaciones($('#cbNumHabitaciones').val())) {

            for (var i = 1; i <= 4; i++) {
                iniciaFila(i);
            }
        }

        textoHabitaciones($('#cbNumHabitaciones').val());

        $('#habModal').modal('toggle');
    });

    if (pestanaActiva == "VH" || pestanaActiva == "TRNH" || pestanaActiva == "CAR")
        CombosVH();
    else
        CombosH();

    $('#cbNumHabitaciones').change(function () {
        cambiaNumHabitaciones($('#cbNumHabitaciones').val());
    });

    if (pestanaActiva == "VH" || pestanaActiva == 'TRNH' || pestanaActiva == "CAR") {
        $('#habModal .comboAdulto').change(function () {
            cambioAdultosVH($(this).val(), $(this)[0].id)
        });

        $('#habModal .comboNinio').change(function () {
            cambioNiniosVH($(this).val(), $(this)[0].id)
        });
    }
    else {
        $('#habModal .comboAdulto').change(function () {
            cambioAdultosH($(this).val(), $(this)[0].id)
        });

        $('#habModal .comboNinio').change(function () {
            cambioNiniosH($(this).val(), $(this)[0].id)
        });
    }

    $('#btnSeleccionarHabita').click(function () {
        if (validaHabitaciones($('#cbNumHabitaciones').val())) {
            textoHabitaciones($('#cbNumHabitaciones').val());

            $('#habModal').modal('hide');
        }
    });

    $('#habModal').modal('hide');

    $('.th1').hide();

    $('#fila2').hide();
    $('#fila3').hide();
    $('#fila4').hide();

    if (pestanaActiva == 'VH' || pestanaActiva == 'TRNH' || pestanaActiva == 'CAR')
        hayCombosNiniosVisiblesVH();
    else
        hayCombosNiniosVisiblesH();

    textoHabitaciones($('#cbNumHabitaciones').val());
}


function cambiaNumHabitaciones(num) {
    var idFila;

    for (var i = 1; i <= 4; i++) {
        idFila = '#fila' + i.toString();

        if (i <= parseInt(num))
            $(idFila).show();
        else {

            $(idFila).hide();
            iniciaFila(i);
        }
    }
}

function iniciaFila(num) {
    var cbAdultos = "comboAdultos" + num;
    var cbNinios = "comboNinios" + num;
    var cbEdad1 = "comboEdadNinios" + num;
    var cbEdad2 = "comboEdadNinios" + num + "1";
    var cbEdad3 = "comboEdadNinios" + num + "2";
    var cbEdad4 = "comboEdadNinios" + num + "3";
    var cbEdad5 = "comboEdadNinios" + num + "4";
    var cbEdad6 = "comboEdadNinios" + num + "5";

    seleccionaValorCombosPorValue(2, cbAdultos);
    seleccionaValorCombosPorValue(0, cbNinios);

    var cbAdultosP = "comboAdultosP" + num;
    var cbNiniosP = "comboNiniosP" + num;

    seleccionaValorCombosPorValue(1, cbAdultosP);
    seleccionaValorCombosPorValue(0, cbNiniosP);
    cambioAdultosPasajeros(1);

    switch ($("#hidTipoViaje").val()) {
        case "ISL":
        case "VAC":
        case "HSKI":
        case "PSKI":
            iniciaComboEdad(cbEdad1, 12);
            iniciaComboEdad(cbEdad2, 12);
            iniciaComboEdad(cbEdad3, 12);
            break;
        case "TRNH":
        case "CAR":
        case "VH":
            iniciaComboEdad(cbEdad1, 15);
            iniciaComboEdad(cbEdad2, 15);
            iniciaComboEdad(cbEdad3, 15);
            iniciaComboEdad(cbEdad4, 15);
            iniciaComboEdad(cbEdad5, 15);
            iniciaComboEdad(cbEdad6, 15);
            break;
        case "H":
            iniciaComboEdad(cbEdad1, 17);
            iniciaComboEdad(cbEdad2, 17);
            iniciaComboEdad(cbEdad3, 17);
            iniciaComboEdad(cbEdad4, 17);
            iniciaComboEdad(cbEdad5, 17);
            iniciaComboEdad(cbEdad6, 17);
            break;
    }

    seleccionaValorCombosPorValue(99, cbEdad1)
    seleccionaValorCombosPorValue(99, cbEdad2)
    seleccionaValorCombosPorValue(99, cbEdad3)
    if (pestanaActiva != 'TRNH' && pestanaActiva != 'CAR') {
        seleccionaValorCombosPorValue(99, cbEdad4)
        seleccionaValorCombosPorValue(99, cbEdad5)
        seleccionaValorCombosPorValue(99, cbEdad6)
    }

    cambioNiniosH(0, cbNinios);
}

function iniciaComboEdad(combo, edadmax) {
    var vAux = "<option value=\"99\" selected=\"selected\">-</option>";
    for (var i = 0; i <= edadmax; i++) {
        vAux += "<option value=\"" + i.toString() + "\">" + i.toString() + "</option>";
    }

    $('#' + combo).html(vAux);
}

function CombosVH() {
    for (var hab = 1; hab <= 4; hab++) {
        var vAuxAdt = "";

        for (var i = 1; i <= 8; i++) {
            if (i == 2)
                vAuxAdt += "<option value='" + i.toString() + "' selected='selected' >" + i.toString() + "</option>";
            else
                vAuxAdt += "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
        }

        $('#comboAdultos' + hab).html(vAuxAdt);

        var vAuxNino = "<option value='0' selected='selected' >0</option>";

        for (var i = 1; i <= 6; i++) {
            vAuxNino += "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
        }

        $('#comboNinios' + hab).html(vAuxNino);
    }
}

function CombosH() {
    for (var hab = 1; hab <= 4; hab++) {
        var vAuxAdt = "";

        for (var i = 1; i <= 8; i++) {
            if (i == 2)
                vAuxAdt += "<option value='" + i.toString() + "' selected='selected' >" + i.toString() + "</option>";
            else
                vAuxAdt += "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
        }

        $('#comboAdultos' + hab).html(vAuxAdt);

        var vAuxNino = "<option value='0' selected='selected' >0</option>";

        for (var i = 1; i <= 6; i++) {
            vAuxNino += "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
        }

        $('#comboNinios' + hab).html(vAuxNino);
    }
}

function cambioAdultosVH(num, nombreCb) {

    var numFila = nombreCb.substring(nombreCb.length - 1);
    var cbNinios = "comboNinios" + numFila;

    var op0 = '<option value="0">0</option>';
    var op1 = '<option value="1">1</option>';
    var op2 = '<option value="2">2</option>';
    var op3 = '<option value="3">3</option>';
    var op4 = '<option value="4">4</option>';
    var op5 = '<option value="5">5</option>';
    var op6 = '<option value="6">6</option>';
    var HTML;

    switch (parseInt(num)) {
        case 1:
            HTML = op0 + op1 + op2 + op3 + op4 + op5 + op6;
            break;
        case 2:
            HTML = op0 + op1 + op2 + op3 + op4 + op5 + op6;
            break;
        case 3:
            HTML = op0 + op1 + op2 + op3 + op4 + op5;
            break;
        case 4:
            HTML = op0 + op1 + op2 + op3 + op4;
            break;
        case 5:
            HTML = op0 + op1 + op2 + op3;
            break;
        case 6:
            HTML = op0 + op1 + op2;
            break;
        case 7:
            HTML = op0 + op1;
            break;
        case 8:
            HTML = op0;
            break;
    }

    $('#' + cbNinios).html(HTML);
    cambioNiniosVH(0, cbNinios);

}

function cambioAdultosH(num, nombreCb) {

    maximo_adultos = num;
    $('#tarjeta_dorada').attr("max", maximo_adultos);
    $('#tarjeta_joven').attr("max", maximo_adultos);

    var numFila = nombreCb.substring(nombreCb.length - 1);
    var cbNinios = "comboNinios" + numFila;
    var op0 = '<option value="0">0</option>';
    var op1 = '<option value="1">1</option>'
    var op2 = '<option value="2">2</option>'
    var op3 = '<option value="3">3</option>'
    var op4 = '<option value="4">4</option>'
    var op5 = '<option value="5">5</option>'
    var op6 = '<option value="6">6</option>'
    var HTML;

    switch (parseInt(num)) {
        case 1:
            HTML = op0 + op1 + op2 + op3 + op4 + op5 + op6;
            break;
        case 2:
            HTML = op0 + op1 + op2 + op3 + op4 + op5 + op6;
            break;
        case 3:
            HTML = op0 + op1 + op2 + op3 + op4 + op5;
            break;
        case 4:
            HTML = op0 + op1 + op2 + op3 + op4;
            break;
        case 5:
            HTML = op0 + op1 + op2 + op3;
            break;
        case 6:
            HTML = op0 + op1 + op2;
            break;
        case 7:
            HTML = op0 + op1;
            break;
        case 8:
            HTML = op0;
            break;
    }

    $('#' + cbNinios).html(HTML);
    cambioNiniosH(0, cbNinios);
}

function cambioNiniosVH(num, nombreCb) {
    var numFila = nombreCb.substring(nombreCb.length - 1);
    var cbEdad1 = "comboEdadNinios" + numFila;
    var cbEdad2 = "comboEdadNinios" + numFila + "1";
    var cbEdad3 = "comboEdadNinios" + numFila + "2";
    var cbEdad4 = "comboEdadNinios" + numFila + "3";
    var cbEdad5 = "comboEdadNinios" + numFila + "4";
    var cbEdad6 = "comboEdadNinios" + numFila + "5";

    if (parseInt(num) == 0)
        $('#mensajeEdadNinios').addClass("comboEdadOculto");
    else
        $('#mensajeEdadNinios').removeClass("comboEdadOculto");

        

    switch (parseInt(num)) {
        case 0:
            $('.th' + numFila).hide();

            $('#' + cbEdad1)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad2)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad3)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad4)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad5)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

            seleccionaValorCombosPorValue(99, cbEdad1);
            seleccionaValorCombosPorValue(99, cbEdad2);
            seleccionaValorCombosPorValue(99, cbEdad3);
            seleccionaValorCombosPorValue(99, cbEdad4);
            seleccionaValorCombosPorValue(99, cbEdad5);
            seleccionaValorCombosPorValue(99, cbEdad6);

            if ($(window).width() > 900) {
                if ($('.habModal .modal-dialog').width() < 600)
                    $('.habModal .modal-dialog').width(600);
            }

            break;
        case 1:
            $('.th' + numFila).show();

            $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad2)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad3)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad4)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad5)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

            seleccionaValorCombosPorValue(99, cbEdad2);
            seleccionaValorCombosPorValue(99, cbEdad3);
            seleccionaValorCombosPorValue(99, cbEdad4);
            seleccionaValorCombosPorValue(99, cbEdad5);
            seleccionaValorCombosPorValue(99, cbEdad6);

            if ($(window).width() > 900) {
                if ($('.habModal .modal-dialog').width() < 600)
                    $('.habModal .modal-dialog').width(600);
            }

            break;
        case 2:
            $('.th' + numFila).show();

            $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad3)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad4)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad5)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

            seleccionaValorCombosPorValue(99, cbEdad3);
            seleccionaValorCombosPorValue(99, cbEdad4);
            seleccionaValorCombosPorValue(99, cbEdad5);
            seleccionaValorCombosPorValue(99, cbEdad6);

            if ($(window).width() > 900) {
                if ($('.habModal .modal-dialog').width() < 600)
                    $('.habModal .modal-dialog').width(600);
            }

            break;
        case 3:
            $('.th' + numFila).show();

            $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad3)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad4)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad5)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

            seleccionaValorCombosPorValue(99, cbEdad4);
            seleccionaValorCombosPorValue(99, cbEdad5);
            seleccionaValorCombosPorValue(99, cbEdad6);

            if ($(window).width() > 900) {
                if ($('.habModal .modal-dialog').width() < 600)
                    $('.habModal .modal-dialog').width(600);
            }

            break;
        case 4:
            $('.th' + numFila).show();

            $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad3)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad4)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad5)[0].attributes['class'].value = "comboEdadOculto";
            $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

            seleccionaValorCombosPorValue(99, cbEdad5);
            seleccionaValorCombosPorValue(99, cbEdad6);

            if ($(window).width() > 900) {
                if ($('.habModal .modal-dialog').width() < 700)
                    $('.habModal .modal-dialog').width(700);
            }

            break;
        case 5:
            $('.th' + numFila).show();

            $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad3)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad4)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad5)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

            seleccionaValorCombosPorValue(99, cbEdad6);

            if ($(window).width() > 900) {
                if ($('.habModal .modal-dialog').width() < 800)
                    $('.habModal .modal-dialog').width(800);
            }

            break;
        case 6:
            $('.th' + numFila).show();

            $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad3)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad4)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad5)[0].attributes['class'].value = "form-control comboEdad";
            $('#' + cbEdad6)[0].attributes['class'].value = "form-control comboEdad";

            if ($(window).width() > 900)
                $('.habModal .modal-dialog').width(910);

            break;
    }

    hayCombosNiniosVisiblesVH();
    $('#divWarnings').hide();
    $('#divWarningsMsg').html('');
}

function cambioNiniosH(num, nombreCb) {
    var numFila = nombreCb.substring(nombreCb.length - 1);
    var cbEdad1 = "comboEdadNinios" + numFila;
    var cbEdad2 = "comboEdadNinios" + numFila + "1";
    var cbEdad3 = "comboEdadNinios" + numFila + "2";
    var cbEdad4 = "comboEdadNinios" + numFila + "3";
    var cbEdad5 = "comboEdadNinios" + numFila + "4";
    var cbEdad6 = "comboEdadNinios" + numFila + "5";

    if (parseInt(num) == 0)
        $('#mensajeEdadNinios').addClass("comboEdadOculto");
    else
        $('#mensajeEdadNinios').removeClass("comboEdadOculto");
    
   

    if ($('#comboEdadNinios1')[0] != undefined) {

     

        switch (parseInt(num)) {
            case 0:
                $('.th' + numFila).hide();

                $('#' + cbEdad1)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad2)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad3)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad4)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad5)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

                seleccionaValorCombosPorValue(99, cbEdad1);
                seleccionaValorCombosPorValue(99, cbEdad2);
                seleccionaValorCombosPorValue(99, cbEdad3);
                seleccionaValorCombosPorValue(99, cbEdad4);
                seleccionaValorCombosPorValue(99, cbEdad5);
                seleccionaValorCombosPorValue(99, cbEdad6);

                if ($(window).width() > 900) {
                    if ($('.habModal .modal-dialog').width() < 600)
                        $('.habModal .modal-dialog').width(600);
                }

                break;
            case 1:
                $('.th' + numFila).show();

                $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad2)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad3)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad4)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad5)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

                seleccionaValorCombosPorValue(99, cbEdad2);
                seleccionaValorCombosPorValue(99, cbEdad3);
                seleccionaValorCombosPorValue(99, cbEdad4);
                seleccionaValorCombosPorValue(99, cbEdad5);
                seleccionaValorCombosPorValue(99, cbEdad6);

                if ($(window).width() > 900) {
                    if ($('.habModal .modal-dialog').width() < 600)
                        $('.habModal .modal-dialog').width(600);
                }

                break;
            case 2:
                $('.th' + numFila).show();

                $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad3)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad4)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad5)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

                seleccionaValorCombosPorValue(99, cbEdad3);
                seleccionaValorCombosPorValue(99, cbEdad4);
                seleccionaValorCombosPorValue(99, cbEdad5);
                seleccionaValorCombosPorValue(99, cbEdad6);

                if ($(window).width() > 900) {
                    if ($('.habModal .modal-dialog').width() < 600)
                        $('.habModal .modal-dialog').width(600);
                }

                break;
            case 3:
                $('.th' + numFila).show();

                $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad3)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad4)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad5)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

                seleccionaValorCombosPorValue(99, cbEdad4);
                seleccionaValorCombosPorValue(99, cbEdad5);
                seleccionaValorCombosPorValue(99, cbEdad6);

                if ($(window).width() > 900) {
                    if ($('.habModal .modal-dialog').width() < 600)
                        $('.habModal .modal-dialog').width(600);
                }

                break;
            case 4:
                $('.th' + numFila).show();

                $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad3)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad4)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad5)[0].attributes['class'].value = "comboEdadOculto";
                $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

                seleccionaValorCombosPorValue(99, cbEdad5);
                seleccionaValorCombosPorValue(99, cbEdad6);

                if ($(window).width() > 900) {
                    if ($('.habModal .modal-dialog').width() < 700)
                        $('.habModal .modal-dialog').width(700);
                }

                break;
            case 5:
                $('.th' + numFila).show();

                $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad3)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad4)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad5)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad6)[0].attributes['class'].value = "comboEdadOculto";

                seleccionaValorCombosPorValue(99, cbEdad6);

                if ($(window).width() > 900) {
                    if ($('.habModal .modal-dialog').width() < 800)
                        $('.habModal .modal-dialog').width(800);
                }

                break;
            case 6:
                $('.th' + numFila).show();

                $('#' + cbEdad1)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad3)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad4)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad5)[0].attributes['class'].value = "form-control comboEdad";
                $('#' + cbEdad6)[0].attributes['class'].value = "form-control comboEdad";

                if ($(window).width() > 900)
                    $('.habModal .modal-dialog').width(910);

                break;
        }
    }
    hayCombosNiniosVisiblesH();
    $('#divWarnings').hide();
    $('#divWarningsMsg').html('');
}


function hayCombosNiniosVisibles() {
    var hayVisibles = false;

    for (var i = 1; i <= 4; i++) {

        var cbEdad1 = "comboEdadNinios" + i;
        var cbEdad2 = "comboEdadNinios" + i + "1";
        var cbEdad3 = "comboEdadNinios" + i + "2";

        if ($('#' + cbEdad1)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad1)[0].attributes['class'].value == "comboEdadError" ||
            $('#' + cbEdad2)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad2)[0].attributes['class'].value == "comboEdadError" ||
            $('#' + cbEdad3)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad3)[0].attributes['class'].value == "comboEdadError") {

            hayVisibles = true;
            $('.th' + i).show();
            break;
        }
        else
            $('.th' + i).hide();
    }

    //if (!hayVisibles)
    //    $('.th4').hide();
}

function hayCombosNiniosVisiblesH() {
    var hayVisibles = false;

    if ($('#comboEdadNinios1')[0] != undefined)
    {
        for (var i = 1; i <= 4; i++) {
            var cbEdad1 = "comboEdadNinios" + i;
            var cbEdad2 = "comboEdadNinios" + i + "1";
            var cbEdad3 = "comboEdadNinios" + i + "2";
            var cbEdad4 = "comboEdadNinios" + i + "3";
            var cbEdad5 = "comboEdadNinios" + i + "4";
            var cbEdad6 = "comboEdadNinios" + i + "5";

            if ($('#' + cbEdad1)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad1)[0].attributes['class'].value == "comboEdadError" ||
                $('#' + cbEdad2)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad2)[0].attributes['class'].value == "comboEdadError" ||
                $('#' + cbEdad3)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad3)[0].attributes['class'].value == "comboEdadError" ||
                $('#' + cbEdad4)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad4)[0].attributes['class'].value == "comboEdadError" ||
                $('#' + cbEdad5)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad5)[0].attributes['class'].value == "comboEdadError" ||
                $('#' + cbEdad6)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad6)[0].attributes['class'].value == "comboEdadError") {

                hayVisibles = true;
                $('.th' + i).show();
                break;
            }
            else
                $('.th' + i).hide();
        }
    }
    
}

function hayCombosNiniosVisiblesVH() {
    var hayVisibles = false;

    for (var i = 1; i <= 4; i++) {
        var cbEdad1 = "comboEdadNinios" + i;
        var cbEdad2 = "comboEdadNinios" + i + "1";
        var cbEdad3 = "comboEdadNinios" + i + "2";
        var cbEdad4 = "comboEdadNinios" + i + "3";
        var cbEdad5 = "comboEdadNinios" + i + "4";
        var cbEdad6 = "comboEdadNinios" + i + "5";

        if ($('#' + cbEdad1)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad1)[0].attributes['class'].value == "comboEdadError" ||
            $('#' + cbEdad2)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad2)[0].attributes['class'].value == "comboEdadError" ||
            $('#' + cbEdad3)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad3)[0].attributes['class'].value == "comboEdadError" ||
            $('#' + cbEdad4)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad4)[0].attributes['class'].value == "comboEdadError" ||
            $('#' + cbEdad5)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad5)[0].attributes['class'].value == "comboEdadError" ||
            $('#' + cbEdad6)[0].attributes['class'].value == "form-control comboEdad" || $('#' + cbEdad6)[0].attributes['class'].value == "comboEdadError") {

            hayVisibles = true;
            $('.th' + i).show();
            break;
        }
        else
            $('.th' + i).hide();
    }

    //if (!hayVisibles)
    //    $('.th4').hide();
}


function textoHabitaciones(numFila) {
    var texto = numFila;

    if (parseInt(numFila) == 1)
        texto += " " + habitacion;
    else
        texto += " " + habitaciones;

    var numAdultos = 0;
    var numNinios = 0;

    for (var i = 1; i <= numFila; i++) {
        var cbAdultos = "#comboAdultos" + i;
        var cbNinios = "#comboNinios" + i;

        numAdultos += parseInt($(cbAdultos).val());
        if ($('#comboNinios1').val() != undefined) numNinios += parseInt($(cbNinios).val());
    }

    texto += ", ";

    if (numAdultos == 1)
        texto += numAdultos + " " + adultoTrad;
    else
        texto += numAdultos + " " + adultosTrad;

    if (numNinios > 0) {
        texto += ", ";

        if (numNinios == 1)
            texto += numNinios + " " + ninoTrad;
        else
            texto += numNinios + " " + ninosTrad;
    }

    try {
        maximo_adultos = numAdultos;
        $('#tarjeta_dorada').val('0');
        $('#tarjeta_joven').val('0');
        $('#tarjeta_dorada').attr("max", maximo_adultos);
        $('#tarjeta_joven').attr("max", maximo_adultos);
    }
    catch (ex) { }

    $('#habitaciones').val(texto);
}


function validaHabitaciones(numFila) {
    var textoError = '';

    for (var i = 1; i <= numFila; i++) {
        var cbNinios = "#comboNinios" + i;
        var cbEdad1 = "#comboEdadNinios" + i;
        var cbEdad2 = "#comboEdadNinios" + i + "1";
        var cbEdad3 = "#comboEdadNinios" + i + "2";
        var cbEdad4 = "#comboEdadNinios" + i + "3";
        var cbEdad5 = "#comboEdadNinios" + i + "4";
        var cbEdad6 = "#comboEdadNinios" + i + "5";
        var numNinios = parseInt($(cbNinios).val());

        if (numNinios > 0) {
            if (parseInt($(cbEdad1).val()) == 99) {
                $(cbEdad1)[0].attributes['class'].value = "form-control comboEdadError";
                textoError += '<p><span class="imgWarning"></span>' + errorCampoEdadNinio1 + ' 1 ' + errorDeLaHabitacion + ' ' + i + ' ' + errorCampoEdadNinio2 + '<p/>';
            }
            else
                $(cbEdad1)[0].attributes['class'].value = "form-control comboEdad";

            if (numNinios > 1) {
                if (parseInt($(cbEdad2).val()) == 99) {
                    $(cbEdad2)[0].attributes['class'].value = "form-control comboEdadError";
                    textoError += '<p><span class="imgWarning"></span>' + errorCampoEdadNinio1 + ' 2 ' + errorDeLaHabitacion + ' ' + i + ' ' + errorCampoEdadNinio2 + '<p/>';
                }
                else
                    $(cbEdad2)[0].attributes['class'].value = "form-control comboEdad";
            }

            if (numNinios > 2) {
                if (parseInt($(cbEdad3).val()) == 99) {
                    $(cbEdad3)[0].attributes['class'].value = "form-control comboEdadError";
                    textoError += '<p><span class="imgWarning"></span>' + errorCampoEdadNinio1 + ' 3 ' + errorDeLaHabitacion + ' ' + i + ' ' + errorCampoEdadNinio2 + '<p/>';
                }
                else
                    $(cbEdad3)[0].attributes['class'].value = "form-control comboEdad";
            }

            if (numNinios > 3) {
                if (parseInt($(cbEdad4).val()) == 99) {
                    $(cbEdad4)[0].attributes['class'].value = "form-control comboEdadError";
                    textoError += '<p><span class="imgWarning"></span>' + errorCampoEdadNinio1 + ' 4 ' + errorDeLaHabitacion + ' ' + i + ' ' + errorCampoEdadNinio2 + '<p/>';
                }
                else
                    $(cbEdad4)[0].attributes['class'].value = "form-control comboEdad";
            }

            if (numNinios > 4) {
                if (parseInt($(cbEdad5).val()) == 99) {

                    $(cbEdad5)[0].attributes['class'].value = "form-control comboEdadError";
                    textoError += '<p><span class="imgWarning"></span>' + errorCampoEdadNinio1 + ' 5 ' + errorDeLaHabitacion + ' ' + i + ' ' + errorCampoEdadNinio2 + '<p/>';
                }
                else
                    $(cbEdad5)[0].attributes['class'].value = "form-control comboEdad";
            }

            if (numNinios > 5) {
                if (parseInt($(cbEdad6).val()) == 99) {

                    $(cbEdad6)[0].attributes['class'].value = "form-control comboEdadError";
                    textoError += '<p><span class="imgWarning"></span>' + errorCampoEdadNinio1 + ' 6 ' + errorDeLaHabitacion + ' ' + i + ' ' + errorCampoEdadNinio2 + '<p/>';
                }
                else
                    $(cbEdad6)[0].attributes['class'].value = "form-control comboEdad";
            }
        }
    }


    if (textoError != '') {
        $('#divWarnings').show();
        $('#divWarningsMsg').html(textoError);
        $(".ui-messages-error").show();
        //$("#divWarnings").fadeOut(5000);

        return false;
    }
    else {
        $('#divWarnings').hide();
        $('#divWarningsMsg').html('');

        return true;
    }
}

//#endregion "POP_UP_HABITACIONES"            

//#region "POP_UP_PASAJEROS"
function popUpPasajeros() {
    $('#imgCerrarPas').unbind();
    $('#pasajeros').unbind();

    $('#pasajeros').click(function () {
        $('#pasModal').modal('toggle');
    });

    $('#imgCerrarPas').click(function () {
        ////cuando le damos a cerrar con errores inicializamos las filas
        if (!validaPasajeros()) {
            for (var i = 1; i <= 4; i++) {
                iniciaFila(i);
            }
        }

        textoPasajeros();

        $('#pasModal').modal('toggle');
        $('#divWarningsP').hide();
    });

    $('#pasModal .comboAdulto').change(function () {
        cambioAdultosPasajeros($(this).val())
    });

    $('#pasModal .comboNinio').change(function () {
        cambioNiniosPasajeros($(this).val())
    });

    $('#btnSeleccionarPasaje').click(function () {
        if (validaPasajeros()) {
            textoPasajeros();

            $('#pasModal').modal('hide');
        }
    });

    $('#pasModal').modal('hide');
    $('.thP1').hide();

    //hayCombosNiniosVisiblesPasajeros();

    textoPasajeros();
}

function cambioAdultosPasajeros(num) {
    var HTML = '';

    for (var i = 0; i <= (9 - num) ; i++) {
        HTML += '<option value="' + i.toString() + '">' + i.toString() + '</option>';
    }

    $('#comboNiniosP1').html(HTML);
    cambioNiniosPasajeros(0);
}

function cambioNiniosPasajeros(num) {
    if (num < 1) {
        $('.thP1').hide();
    }

    for (var i = 1; i <= 8; i++) {
        if (i > num) {
            if ($('#comboEdadNiniosP' + i.toString())[0] != undefined) {
                $('#comboEdadNiniosP' + i.toString())[0].attributes['class'].value = "comboEdadOculto";
                seleccionaValorCombosPorValue(99, 'comboEdadNiniosP' + i.toString());
            }
        }
        else {
            $('.thP1').show();
            $('#comboEdadNiniosP' + i.toString())[0].attributes['class'].value = "form-control comboEdad";
        }
    }

    //hayCombosNiniosVisibles();
    $('#divWarnings').hide();
    $('#divWarningsMsg').html('');
}

function textoPasajeros() {
    var texto = '';
    var numAdultos = parseInt($("#comboAdultosP1").val());
    var numNinios = parseInt($("#comboNiniosP1").val());

    if (numAdultos == 1)
        texto += numAdultos + " " + adultoTrad;
    else
        texto += numAdultos + " " + adultosTrad;

    texto += ", ";

    if (numNinios == 1)
        texto += numNinios + " " + ninoTrad;
    else
        texto += numNinios + " " + ninosTrad;

    $('#pasajeros').val(texto);
}

function validaPasajeros() {
    var textoError = '';
    var numNinios = parseInt($("#comboNiniosP1").val());

    if (numNinios > 0) {
        for (var i = 1; i <= numNinios; i++) {
            if (parseInt($("#comboEdadNiniosP" + i.toString()).val()) == 99) {

                $("#comboEdadNiniosP" + i.toString())[0].attributes['class'].value = "form-control comboEdadError";
                textoError += '<p><span class="imgWarning"></span>' + errorCampoEdadNinio1 + ' ' + i.toString() + ' ' + errorCampoEdadNinio2 + '<p/>';
            }
            else
                $("#comboEdadNiniosP" + i.toString())[0].attributes['class'].value = "form-control comboEdad";
        }
    }

    if (textoError != '') {
        $('#divWarningsP').show();
        $('#divWarningsPMsg').html(textoError);
        $(".ui-messages-error").show();
        //$("#divWarningsP").fadeOut(5000);

        return false;
    }
    else {
        $('#divWarningsP').hide();
        $('#divWarningsPMsg').html('');

        return true;
    }
}
//#endregion "POP_UP_PASAJEROS"  


function fechaDiaSemana() {
    $("#diaSalida").html(diaSemana($("#dateGo").val()));
    $("#diaRegreso").html(diaSemana($("#dateReturn").val()));

    calculaNumNoches($("#dateGo").val(), $("#dateReturn").val())
}


function diaSemana(fecha) {
    var date = convertDateEsToEn(fecha, 1);
    var fec = nuevaFecha(date);
    var dia = fec.getDay();

    if (dia == 0)
        dia = 7

    var strDia = diasTexto[dia];

    return strDia;
}

//compara que dos fechas no sean iguales
function compareDates(dateGo, dateReturn) {
    var dayGo = dateGo.substring(0, 2);
    var monthGo = dateGo.substring(3, 5);
    var yearGo = dateGo.substring(6, 10);
    var dayReturn = dateReturn.substring(0, 2);
    var monthReturn = dateReturn.substring(3, 5);
    var yearReturn = dateReturn.substring(6, 10);

    if (dayGo == dayReturn && monthGo == monthReturn && yearGo == yearReturn) {
        return true;
    }
}

function calculaNumNoches(fechaGo, fechaReturn) {

    var date;

    date = convertDateEsToEn(fechaGo, 1);
    var fecGo = nuevaFecha(date);

    date = convertDateEsToEn(fechaReturn, 1);
    var fecReturn = nuevaFecha(date);

    var MilisegEnUnDia = 24 * 60 * 60 * 1000;

    //obtengo la diferencia de fechas en milisegundos
    var tiempo = fecReturn.getTime() - fecGo.getTime();

    var numNights = Math.floor(tiempo / MilisegEnUnDia);

    $("#HidnumNoches").val(numNights);

}


function buscar() {

    if (validateSearch()) {

        $('#habModal').hide();
        abreURL(creaURL());
    }
    return false;
}


function validateSearch() {

    var isValid = true;
    var msgs = new Array;
    var i = 0;

    if ($("#hidTipoViaje").val() == '') {
        msgs[i] = "No hay tipo de viaje seleccionado."
        i++;
    }

    var fechaEntrada = new Date($("#dateGo").val().substring(6), $("#dateGo").val().substring(3, 5) - 1, $("#dateGo").val().substring(0, 2));
    var FechaSoloIda = new Date($("#dateOnlyGo").val().substring(6), $("#dateOnlyGo").val().substring(3, 5) - 1, $("#dateOnlyGo").val().substring(0, 2));
    var fechaSalida = new Date($("#dateReturn").val().substring(6), $("#dateReturn").val().substring(3, 5) - 1, $("#dateReturn").val().substring(0, 2));
    var fechaHoy = new Date(moment().format('DD-MM-YYYY').substring(6), moment().format('DD-MM-YYYY').substring(3, 5) - 1, moment().format('DD-MM-YYYY').substring(0, 2));

    switch ($("#hidTipoViaje").val()) {
        case 'CAR':
            if ($('#cmbDestinoCAR').val() === '') {
                isValid = false;
                msgs[i] = errorDestino;
                i++;
            }
            if ($('#cmbOrigenVHT').val() === '') {
                isValid = false;
                msgs[i] = errorOrigen;
                i++;
            }
            break;
        case 'ISL':
            if ($('#cmbDestinoISL').val() === '') {
                isValid = false;
                msgs[i] = errorDestino;
                i++;
            }
            if ($('#cmbOrigenVHT').val() === '') {
                isValid = false;
                msgs[i] = errorOrigen;
                i++;
            }
            break;
        case 'PSKI':
            if ($('#cmbDestinoSKI').val() === '') {
                isValid = false;
                msgs[i] = errorDestino;
                i++;
            }
            break;
        case 'H':
        case 'HSKI':
            if ($('#txtBuscar').val() === '') {
                isValid = false;
                msgs[i] = errorDestino;
                i++;
            }
            if (compareDates($("#dateGo").val(), $("#dateReturn").val())) {
                msgs[i] = erroSalidaRegreso;
                isValid = false;
                i++;
            }
            
            //if ((travellerToken != undefined) && (travellerToken != "") && ($('#txtViajeroReserva').val() == "")) {
            //    msgs[i] = errorViajero;
            //    isValid = false;
            //    i++;
            //}
            //if ($('#typemapping').val() == '') {
            //    isValid = false;
            //    msgs[i] = errorDestino;
            //    i++;
            //}
            break;
        case 'TRNH':
        case 'VH':
            if ($('#codigoDestino').val() === '' || $('#txtDestino').val() === '') {
                isValid = false;
                msgs[i] = errorDestino;
                i++;
            }
            if ($('#codigoOrigen').val() === '' || $('#txtOrigen').val() === '') {
                isValid = false;
                msgs[i] = errorOrigen;
                i++;
            }
            if (fechaEntrada <= fechaHoy) {
                isValid = false;
                msgs[i] = errorFechaMananan;
                i++;
            }
            if (compareDates($("#dateGo").val(), $("#dateReturn").val())) {
                isValid = false;
                msgs[i] = erroSalidaRegreso;
                i++;
            }
            break;
        case 'PK':
            if ($('#codigoDestino').val() === '') {
                isValid = false;
                msgs[i] = errorDestino;
                i++;
            }
            if ($('#cmbOrigenVHT').val() === '') {
                isValid = false;
                msgs[i] = errorOrigen;
                i++;
            }
            if (fechaEntrada <= fechaHoy) {
                isValid = false;
                msgs[i] = errorFechaMananan;
                i++;
            }
            if (compareDates($("#dateGo").val(), $("#dateReturn").val())) {
                isValid = false;
                msgs[i] = erroSalidaRegreso;
                i++;
            }
            break;
        case 'CIR':
            if ($('#codigoDestino').val() === '' && $('#txtDestinoCir').val() === '') {
                isValid = false;
                msgs[i] = errorDestino;
                i++;
            }
            break;
        case 'V':
        case 'V-OW':
            if ($('#codigoDestino').val() === '' && $('#nombreDestino').val() === '') {
                isValid = false;
                msgs[i] = errorDestino;
                i++;
            }
            if ($('#codigoOrigen').val() === '' && $('#nombreOrigen').val() === '') {
                isValid = false;
                msgs[i] = errorOrigen;
                i++;
            }
            if ($('#txtOrigen').val() && $('#codigoOrigen').val() === '') {
                isValid = false;
                msgs[i] = errorOrigenSinAeropuerto;
                i++;
            }
            if ($('#txtDestino').val() && $('#codigoDestino').val() === '') {
                isValid = false;
                msgs[i] = errorDestinoSinAeropuerto;
                i++;
            }


            //if ($("#hidTipoViaje").val() != 'V-OW') {
            //if (fechaEntrada <= fechaHoy) {
            //    isValid = false;
            //    msgs[i] = errorFechaMananan;
            //    i++;
            //}
            //if (compareDates($("#dateGo").val(), $("#dateReturn").val())) {
            //    isValid = false;
            //    msgs[i] = erroSalidaRegreso;
            //    i++;
            //}
            //if ($("#hidTipoViaje").val() != 'V') {
            //    if (FechaSoloIda <= fechaHoy) {
            //    isValid = false;
            //    msgs[i] = errorFechaMananan;
            //    i++;
            //    }
            //}

            //if ($("#hidTipoViaje").val() != 'V') {
            //    if (FechaSoloIda <= fechaHoy) {
            //        isValid = false;
            //        msgs[i] = errorFechaMananan;
            //        i++;
            //    }
            //}
            //}
            var numNinios = parseInt($("#comboNiniosP1").val()) + 1;
            if (numNinios > 0) {
                for (j = 1; j < (numNinios) ; j++) {
                    if ($("#comboEdadNiniosP" + j).val() == "-" || $("#comboEdadNiniosP" + j).val() == "99") {
                        isValid = false;
                        msgs[i] = "La edad del niño " + j + " no puede estar en blanco";
                        i++;
                    }
                }
            }
            // validaPasajeros();
            break;
        case 'CRU':
            if ($('#cmbZonas').val() == '[Todos]' &&
                $('#cmbNavieras').val() == '[Todos]' &&
                $('#cmbPuertos').val() == '[Todos]' &&
                $('#cmbFechas').val() == '') {
                msgs[i] = "Debe seleccionar al menos una zona, naviera, puerto, o fecha del crucero para obtener disponibilidad";
                isValid = false;
                i++;
            }
            break;
    }


    //asi obtenemos el numero de habitaciones seleccionadas
    var nRooms = $("#habitaciones").val().split(",")[0].split(" ")[0];

    for (var k = 1; k <= nRooms; k++) {

        var nChild = parseInt($("#comboNinios" + k).val());

        if (nChild > 0) {

            for (var j = 1; j <= nChild ; j++) {

                var h;

                if (j == 1)
                    h = '';
                else
                    h = (j - 1).toString();

                var childAge = $("#comboEdadNinios" + k.toString() + h).val();

                if (childAge == 99) {
                    if ($("#hidTipoViaje").val() == "V" || $("#hidTipoViaje").val() == "V-OW") {
                        msgs[i] = "La edad del niño " + j + " no puede estar en blanco";
                    } else {
                        msgs[i] = "La edad del niño " + j + " " + errorDeLaHabitacion + " " + k + " no puede estar en blanco";
                    }

                    i++;
                }
            }
        }
    }


    if (isValid) {
        isValid = (msgs.length == 0);
    }

    if (!isValid) {

        var txt = ""; //"<p>Se han producido errores : </p>";

        txt += ""
        for (var i = 0; i < msgs.length; i++) {
            //txt += "<span class='ui-messages-error-icon'></span><ul><li role='alert' aria-atomic='true'><span class='ui-messages-error-summary'>" + msgs[i] + "</span></li></ul>";
            txt += "<div class='validation-error-container '><div id='clientEmailMessage' class='ui-messages ui-widget' aria-live='polite'><div class='ui-messages-error ui-corner-all'><span class='ui-messages-error-icon'></span><ul><li role='alert' aria-atomic='true'><span class='ui-messages-error-summary'>" + msgs[i] + "</span></li></ul></div></div></div>";
        }
        txt += "";


        $("#alertErrorMsg").html(txt);
        $("#alertError").show();
        $(".ui-messages-error").show();
    }

    return isValid;

}//validateSearch

function creaURL() {

    var idMarca = $("#hidTipoViaje").val();
    var idProdPaq = '';
    var idSubProd = $('#cmbSubTipoViaje').val();

    var url = "";

    var dsitribucion = "";

    var trainDeparture = 'null';
    var trainArrival = 'null';

    var departure = 'null';

    var arrival = 'null';
    var nombreDestino = 'null';
    var tipoDestino = '';
    var nombreOrigen = 'null';
    var tarjeta_oro = '';
    var tarjeta_joven = '';

    var numeroNoches = 0;


    //var dateGo = $('#dateGo').val();
    //var dateReturn = $('#dateReturn').val();

    //var fechahotel = cambiarFechaHotelHome($('#dateGo').val());

    //var fechaEntrada = new Date($("#dateGo").val().substring(6), $("#dateGo").val().substring(3, 5) - 1, $("#dateGo").val().substring(0, 2));
    //var fechaSalida = new Date($("#dateReturn").val().substring(6), $("#dateReturn").val().substring(3, 5) - 1, $("#dateReturn").val().substring(0, 2));



    switch (idMarca) {
        case 'CAR':
        case 'PK':
        case 'PSKI':
        case 'PESC':
            //nombreOrigen = $('#cmbOrigenVHT option:selected').text();
            numeroNoches = $('#numNocheISL').val();

            if (idMarca === 'CAR') {
                departure = $('#cmbOrigenVHT').val();
                arrival = $('#cmbDestinoCAR').val();
                nombreDestino = $('#cmbDestinoCAR  option:selected').text();
                idProdPaq = "20";
            }
            if (idMarca === 'PK') {
                departure = $('#codigoOrigen').val();
                arrival = $('#codigoDestino').val();
                nombreDestino = $('#nombreDestino').val();
                nombreOrigen = $('#nombreOrigen').val();
                idProdPaq = "20";
            }
            if (idMarca === 'PSKI') {
                arrival = $('#cmbDestinoSKI').val();
                nombreDestino = $('#cmbDestinoSKI  option:selected').text();
                idProdPaq = "4";
                departure = '';
            }
            if (idMarca === 'PESC') {
                arrival = $('#cmbDestinoSKI').val();
                nombreDestino = $('#cmbDestinoSKI  option:selected').text();
                idProdPaq = "18";
                departure = '';
            }

            //url = '/engine/search.ashx?dest=' + arrival + '&pob=' + nombreDestino;
            url = '/aspx/disponibilidad.aspx?dest=' + arrival + '&pob=' + nombreDestino; //PRODUCCION ACTUAL
            if (idMarca === 'CAR') {
                url = '/engine/search.ashx?dest=' + arrival + '&pob=' + nombreDestino + '&prod=CAR';
            }
            if (departure != 'null' && departure != '') {
                url += '&orig=' + departure;
                url += '&poborig=' + $('#cmbOrigenVHT option:selected').text();
            }
            if (idMarca != 'CAR') {
                url += recuperarDistribucion() + '&fent=' + cambiarFechaHotelHome($('#dateOnlyGo').val()) + '&n=' + numeroNoches + '&idprod=' + idProdPaq;
            } else {
                url += recuperarDistribucion() + '&fent=' + cambiarFechaVH($('#dateOnlyGo').val()) + '&n=' + numeroNoches + '&idprod=' + idProdPaq;
            }

            if (idMarca === 'PESC' && idSubProd != '')
                url += '&idsubprod=' + idSubProd

            url = url_vacaciones + url;

            break;

        case 'ISL':

            departure = $('#cmbOrigenVHT').val();
            //nombreOrigen = $('#cmbOrigenVHT option:selected').text();
            numeroNoches = $('#numNocheISL').val();


            url = '/viajes/' + $('#cmbOrigenVHT option:selected').text().replace(' ', '-') + '/' + $('#cmbDestinoISL option:selected').text().replace(' ', '-') + '/' + $('#cmbSalidas option:selected').text().replace(' ', '') + '-' + $('#cmbSalidas').val() + '/' + numeroNoches + '-noches/VUELOHOTELTRASLADOS-20.html';

            //if (departure != 'null' && departure != '')
            //    url += '&orig=' + departure;

            //url += recuperarDistribucion() + '&fent=' + cambiarFechaHotelHome($('#dateOnlyGo').val()) + '&n=' + numeroNoches + '&idprod=' + idProdPaq;


            //url = url_vacaciones + url;
            url = url_home + url; //PRODUCCION ACTUAL
            break
        case 'H':
        case 'HSKI':
        case 'HESC':
            var fechaEntrada = new Date($("#dateGo").val().substring(6), $("#dateGo").val().substring(3, 5) - 1, $("#dateGo").val().substring(0, 2));
            var fechaSalida = new Date($("#dateReturn").val().substring(6), $("#dateReturn").val().substring(3, 5) - 1, $("#dateReturn").val().substring(0, 2));

            numeroNoches = Math.floor((fechaSalida.getTime() - fechaEntrada.getTime()) / (1000 * 60 * 60 * 24));
            if (fechaEntrada.getTimezoneOffset() != fechaSalida.getTimezoneOffset()) {
                if (fechaEntrada.getMonth() == 2 || fechaSalida.getMonth() == 2)
                    numeroNoches += 1;
            }
            url = '/Disponibilidad/Resultados.aspx?'; //PRODUCCION ACTUAL
            
            var pob ='';
            var hotel ='';
            //busqueda desde pagina resultados
            if ($('#codigoDestino').val() == '') {
                pob=quitarTilde($('#txtBuscar').val());
                url += '&pob=' + quitarTilde($('#txtBuscar').val());
                url += '&ParamTownCode=' + getQuerystring("ParamTownCode");
                url += '&prov=' + $('#codigoProvincia').val().substring(2);
                url += '&pais=' + getQuerystring("pais");
                url += '&strPoblacion=' + quitarTilde($('#txtBuscar').val());
            }
            else {
                pob=quitarTilde($('#nombreDestino').val());
                url += '&pob=' + quitarTilde($('#nombreDestino').val());
                url += '&ParamTownCode=' + $('#codigoDestino').val().substring(2);
                url += '&prov=' + $('#codigoProvincia').val().substring(2);
                url += '&pais=' + $('#codigoPais').val().substring(2);
                url += '&strPoblacion=' + quitarTilde($('#nombreDestino').val());
                if ($('#codigoHotel').val() != ''){
                    hotel=quitarTilde($('#txtBuscar').val());                
                    url += '&ch=' + $('#codigoHotel').val();
                }
            }
            if ($('#typemapping').val() != '') {
                url += '&tp=' + $('#typemapping').val();
            }
            else {
                url += '&tp=City';
            }
            url += '&cat=1';
            url += recuperarDistribucion();
            url += '&fent=' + cambiarFechaHotelHome($('#dateGo').val());
            url += '&n=' + numeroNoches;
            //url += '&categoria=1';
            url += recuperarCategorias();
            url += recuperarPrecios();

            if (idMarca === 'HSKI' || idMarca === 'HESC') {
                url += 'ESC=1';
            }
            if (idMarca === 'HESC' && idSubProd != '')
                url += '&idsubprod=' + idSubProd

            url = url_hoteles + url;

            if ($('#headerProfiles').length) {
                GetCustomerInfo($('#customerSelectedToken').val(), true, false); // Get Customer Info and flagged to save data in session
            };
            
            dataLayer.push({ 'event': 'Buscador', 'eAction': 'Buscador_hotel_fecha_Entrada_hotel', 'eLabel': cambiarFechaHotelHome($('#dateGo').val()) });
            dataLayer.push({ 'event': 'Buscador', 'eAction': 'Buscador_hotel_Habitaciones', 'eLabel': $("#cbNumHabitaciones").val() });
            dataLayer.push({ 'event': 'Buscador', 'eAction': 'Buscador_hotel_Ninos', 'eLabel': '' + totalNinos + '' });
            dataLayer.push({ 'event': 'Buscador', 'eAction': 'Buscador_hotel_destino', 'eLabel': nombreDestino });

            // Limpiamos cualquier filtro de "cerca de"
            if (typeof (Storage) !== "undefined") {
                if (localStorage.getItem("PIDLatitud") != null) {
                    localStorage.removeItem("PIDLatitud");
                }
                if (localStorage.getItem("PIDLongitud") != null) {
                    localStorage.removeItem("PIDLongitud");
                }
                if (localStorage.getItem("PIDNombre") != null) {
                    localStorage.removeItem("PIDNombre");
                }
                if (localStorage.getItem("PIDNELat") != null) {
                    localStorage.removeItem("PIDNELat");
                }
                if (localStorage.getItem("PIDNELng") != null) {
                    localStorage.removeItem("PIDNELng");
                }
                if (localStorage.getItem("PIDSWLat") != null) {
                    localStorage.removeItem("PIDSWLat");
                }
                if (localStorage.getItem("PIDSWLng") != null) {
                    localStorage.removeItem("PIDSWLng");
                }
            }
            
            GuardarBusquedaHoteles(hotel, pob, $('#habitaciones').val(), cambiarFechaHotelHome($('#dateGo').val()), numeroNoches, url);

            break;

        case 'E':
            url = '/aspx/espectaculos.aspx?nciu='
            if ($('#ddlCiudadesEspectaculos').val() != '[Todos]') {
                url += $('#ddlCiudadesEspectaculos option:selected').text();
            }
            if ($('#ddlTiposEspectaculos').val() != '[Todos]') {
                url += '&tipo=' + $('#ddlTiposEspectaculos option:selected').text();
            }
            url += '&fecini=' + cambiarFechaVH($('#dateGoYear').val());
            url += '&fecfin=' + cambiarFechaVH($('#dateReturnYear').val());
            url += '&nomesp=' + encodeURIComponent($('#txtBuscar').val());
            url = url_entradas + url;
            break;
        case 'VH':
            departure = $('#codigoOrigen').val();
            arrival = $('#codigoDestino').val();
            nombreDestino = $('#nombreDestino').val();
            nombreOrigen = $('#nombreOrigen').val();
            url = '/engine/search.ashx?';

            if (nombreOrigen == '')
                url += 'departure=' + $('#txtOrigen').val();
            else {
                url += 'departure=' + nombreOrigen;
                url += '&departure_pc=' + departure;
            }
            if (nombreDestino == '')
                url += '&arrival=' + $('#txtDestino').val();
            else {
                url += '&arrival=' + nombreDestino;
                url += '&arrival_pc=' + arrival;
            }

            url += recuperarDistribucionVH();

            url += '&dateGo=' + cambiarFechaVH($('#dateGo').val());
            url += '&dateReturn=' + cambiarFechaVH($('#dateReturn').val());
            url += '&air=true'// + $('#air').val();
            url += '&rail=true' //+ $("#rail").is(':checked');
            url += '&pais=';
            url += '&branch=' + Sid;
            var radioResidentes = $("input[name='residentsDiscount']:checked").val();
            if (radioResidentes) {
                if (radioResidentes != "noResident") {
                    url += '&resid=' + radioResidentes;
                }
            }
            url += '&prod=VH';

            url = domainWEB + url;

            break;
        case 'TRNH':

            trainDeparture = $('#codigoTrenOrigen').val();
            trainArrival = $('#codigoTrenDestino').val();

            departure = $('#codigoOrigen').val();
            arrival = $('#codigoDestino').val();
            nombreDestino = $('#nombreDestino').val();
            nombreOrigen = $('#nombreOrigen').val();

            //tarjeta_oro = $('#tarjeta_dorada').val();
            //tarjeta_joven = $('#tarjeta_joven').val();

            url = '/engine/search.ashx?';

            if (nombreOrigen == '')
                url += 'departure=' + $('#txtOrigen').val();
            else {
                url += 'departure=' + nombreOrigen;
                url += '&departure_pc=' + departure;
                url += '&departure_tc=' + trainDeparture;
            }
            if (nombreDestino == '')
                url += '&arrival=' + $('#txtDestino').val();
            else {
                url += '&arrival=' + nombreDestino;
                url += '&arrival_pc=' + arrival;
                url += '&arrival_tc=' + trainArrival;
            }

            //url += '&young_card=' + tarjeta_joven;
            //url += '&gold_card=' + tarjeta_oro;

            url += recuperarDistribucionVH();

            url += '&dateGo=' + cambiarFechaVH($('#dateGo').val());
            url += '&dateReturn=' + cambiarFechaVH($('#dateReturn').val());
            url += '&air=true'// + $('#air').val();
            url += '&rail=true' //+ $("#rail").is(':checked');
            url += '&pais=';
            url += '&branch=' + Sid;

            url += '&prod=TRNH';


            url = domainWEB + url;

            break;
        case 'CIR':
            arrival = $('#codigoDestino').val();
            nombreDestino = $('#txtDestinoCir').val();
            tipoDestino = $('#tipoDestino').val();

            var mark = $('#cmbTipoViaje').val();
            var nomark = $('#cmbTipoViaje option:selected').text();

            var salidas = $('#cmbSalidas').val();
            var fechaEntrada = "";
            var fechaSalida = "";

            departure = $('#cmbOrigenCIR').val();
            nombreOrigen = $('#cmbOrigenCIR option:selected').text();

            var n = $('#cmbRangoNoches').val().split("-");
            var rgnoches = $('#cmbRangoNoches option:selected').text();

            //url = "/viajes_ofertas.aspx?pob=" + arrival + "&tdest=" + tipoDestino + "&name=" + nombreDestino;
            url = "/engine/search.ashx?pob=" + arrival + "&tdest=" + tipoDestino + "&name=" + nombreDestino + "&prod=CIR";
            if ($('#cmbSalidas').val() != "") {
                if ($('#cmbSalidas').val() == new Date().getMonth() + 1)
                    fechaEntrada = new Date().getFullYear() + '-' + $('#cmbSalidas').val() + '-' + new Date().getDate();
                else {
                    if ($('#cmbSalidas').val() > 12)
                        fechaEntrada = (parseInt(new Date().getFullYear()) + Math.floor((($('#cmbSalidas').val() - 1) / 12))).toString() + '-' + ($('#cmbSalidas').val() - 12).toString() + '-01';
                    else
                        fechaEntrada = new Date().getFullYear() + '-' + $('#cmbSalidas').val() + '-01';
                }

                fechaSalida = (parseInt(new Date().getFullYear()) + Math.floor((($('#cmbSalidas').val() - 1) / 12))).toString() + '-' + ($('#cmbSalidas').val() - 12 * Math.floor(($('#cmbSalidas').val() - 1) / 12)).toString() + '-' + dias($('#cmbSalidas').val(), parseInt(new Date().getFullYear()) + Math.floor((($('#cmbSalidas').val() - 1) / 12)), $('#cmbSalidas').val());

                url = url + "&fechad=" + fechaEntrada + "&fechaa=" + fechaSalida;
            }

            if (n[0] != "" && n[0] != "N" && n[0] != undefined) {
                url = url + '&n=' + n[0]
            }
            if (n[1] != "" && n[1] != "N" && n[1] != undefined) {
                url = url + '&nmax=' + n[1]
            }
            if (rgnoches != "")
                url = url + '&rgn=' + rgnoches;
            if (departure != "") {
                url = url + '&origen=' + departure;
            }
            if (nombreOrigen != "")
                url = url + '&nombreor=' + nombreOrigen;
            if (mark != "") {
                url = url + '&marca=' + mark;
            }
            if (nomark != "")
                url = url + '&nomark=' + nomark;

            url = url_vacaciones + url;
            break;
        case 'V':
        case 'V-OW':

            url += '/Disponibilidad.aspx?Departure=' + $('#codigoOrigen').val();
            url += '&DL=' + $('#dlAutocompletar').val();
            url += '&DepartureInput=' + $('#nombreOrigen').val();
            url += '&Arrival=' + $('#codigoDestino').val();
            url += '&AL=' + $('#alAutocompletar').val();
            url += '&ArrivalInput=' + $('#nombreDestino').val();

            if (idMarca === 'V') {
                url += '&DepartureDate=' + cambiarFechaV($('#dateGo').val());
                url += '&ArrivalDate=' + cambiarFechaV($('#dateReturn').val());
            }
            else {
                url += '&DepartureDate=' + cambiarFechaV($('#dateOnlyGo').val());
            }
            url += '&DepartureGdsCode=' + $('#codigoOrigenGds').val();
            url += '&ArrivalGdsCode=' + $('#codigoDestinoGds').val();

            url += recuperarDistribucionT();

            if (IATACompany != '')
                url += '&company=' + IATACompany;

            url = url_vuelos + url;

            break;
        case 'CRU':

            var zonas = '';
            var nombreZona = '';


            if ($('#cmbZonas').val() != '[Todos]') {
                zonas = $('#cmbZonas').val();
                nombreZona = $('#cmbZonas option:selected').text();
            }

            url = '/cruceros.aspx?zonas=' + zonas + '&nombreZona=' + nombreZona;

            var navieras = '';
            var nombreNaviera = '';
            if ($('#cmbNavieras').val() != '[Todos]') {
                navieras = $('#cmbNavieras').val();
                nombreNaviera = $('#cmbNavieras option:selected').text();
            }

            url += '&navieras=' + navieras + '&nombreNaviera=' + nombreNaviera;

            var puertos = '';
            var nombrePuerto = '';
            if ($('#cmbPuertos').val() != '[Todos]') {
                puertos = $('#cmbPuertos').val();
                nombrePuerto = $('#cmbPuertos option:selected').text();
            }

            url += '&puertos=' + puertos + '&nombrePuerto=' + nombrePuerto;

            var fechas = '';
            if ($('#cmbFechas').val() != '') {
                queryString += '&fechas=' + $('#cmbFechas').val();
            }


            url = url_cruceros + url;

            break;
    }

    $('#alertError').hide();
    return url;
}

function GuardarBusquedaHoteles(hotel, pob, habita, dateGo, numeroNoches, parametros) {

    var parametros = parametros.slice(0, parametros.indexOf('&token'));

    var url = url_hoteles + '/Services/GuardarBusquedaHoteles.ashx?hotel=' + hotel + '&pob=' + quitarTilde(pob) + '&habita=' + quitarTilde(habita);
    url = url + '&dateGo=' + dateGo + '&numeroNoches=' + numeroNoches + '&parametros=' + encodeURIComponent(parametros);

    $.ajax({
        async: false,
        cache: true,
        url: url,
        processData: false,
        type: 'POST',
        success: function (data) {
            //alert('Busqueda guardada!! URL: ' + url);
		},
        error: function (data) {
            //alert('error ' + url);
        }
    });
}

function CargarBusquedasHoteles(s) {

    var url = url_hoteles + '/Services/GetBusquedasHoteles.ashx';

    $.ajax({
        async: true,
        cache: false,
        url: url,
        processData: false,
        type: 'GET',
        success: function (data) {
            //alert('Busquedas cargadas!!: ' + data);
            PintarBusquedas(data);
        },
        error: function (data) {
            //alert('error ' + url);
        }
    });
}

function PintarBusquedas(busquedas) {

    if (busquedas != null && busquedas != "") {
    
        if (busquedas.length >= 1) {
            var code = '<li class=""><div class="form-group" role="option"><i class="fas fa-history"></i><strong>' + strUltimasBusquedas + '</strong><i id="cierraUltimasBusquedas" class="fas fa-times" aria-hidden="true" onclick="CierraUltimasBusquedas()"></i></div></li>';

            for (i in busquedas) {
                code += '<li class=""><div class="dropdown-item" role="option">';
                //“Hotel Princesa plaza Madrid”, Madrid, 1 hab 2 adts, 13 de mayo de 2021, 1 noche”
                code += '<a href="' + busquedas[i].Parametros + '"> ';
                if (busquedas[i].NombreHotel != '') code += busquedas[i].NombreHotel.substr(0, 1).toUpperCase() + busquedas[i].NombreHotel.substr(1);
                code += ' ' + ponerTilde(busquedas[i].Ciudad).toUpperCase() + ', ';
                code += ponerTilde(busquedas[i].TextoHabitaciones) + ', ';

                var fechaSalida = new Date(busquedas[i].FechaIni);
                var diaSalida = fechaSalida.getDate();
                var mesSalida = (fechaSalida.getMonth() + 1);
                code += diaSalida + ' de ' + ArrayMonth[parseInt(mesSalida) - 1] + ' de ' + fechaSalida.getFullYear() + ', ';

                if (busquedas[i].NumeroNoches > 1) code += busquedas[i].NumeroNoches + ' ' + strNoches;
                else code += busquedas[i].NumeroNoches + ' ' + strNoche;
                code += '</a></div></li>';
            }

            $(".listaUltimasBusquedas").html(code);
            $(".listaUltimasBusquedas").toggle();
        }
    }
    else {
        var code = '<li class=""><div class="form-group" role="option"><i class="fas fa-history"></i><strong>ÚLTIMAS BÚSQUEDAS</strong><i id="cierraUltimasBusquedas" class="fas fa-times" aria-hidden="true" onclick="CierraUltimasBusquedas()"></i></div></li>';

        code += '<li class=""><div class="dropdown-item" role="option">';
        code += 'No existe ninguna búsqueda';
        code += '</div></li>';
        $(".listaUltimasBusquedas").html(code);
        $(".listaUltimasBusquedas").toggle();
    }
    
}
function CierraUltimasBusquedas() {
    $(".listaUltimasBusquedas").hide();
}
function abreURL(urlDestino) {
    location.href = urlDestino;
    window.scrollTo(0, 0);
}

function recuperarDistribucionVH() {

    var distri = '';
    var rooms = $("#cbNumHabitaciones").val();

    var room1Adultos = $("#comboAdultos1").val();
    var room1Ninios = $("#comboNinios1").val();
    var room1ChildAge1 = $("#comboEdadNinios1").val();
    var room1ChildAge2 = $("#comboEdadNinios11").val();
    var room1ChildAge3 = $("#comboEdadNinios12").val();
    var room1ChildAge4 = $("#comboEdadNinios13").val();
    var room1ChildAge5 = $("#comboEdadNinios14").val();
    var room1ChildAge6 = $("#comboEdadNinios15").val();

    var room2Adultos = $("#comboAdultos2").val();
    var room2Ninios = $("#comboNinios2").val();
    var room2ChildAge1 = $("#comboEdadNinios2").val();
    var room2ChildAge2 = $("#comboEdadNinios21").val();
    var room2ChildAge3 = $("#comboEdadNinios22").val();
    var room2ChildAge4 = $("#comboEdadNinios23").val();
    var room2ChildAge5 = $("#comboEdadNinios24").val();
    var room2ChildAge6 = $("#comboEdadNinios25").val();

    var room3Adultos = $("#comboAdultos3").val();
    var room3Ninios = $("#comboNinios3").val();
    var room3ChildAge1 = $("#comboEdadNinios3").val();
    var room3ChildAge2 = $("#comboEdadNinios31").val();
    var room3ChildAge3 = $("#comboEdadNinios32").val();
    var room3ChildAge4 = $("#comboEdadNinios33").val();
    var room3ChildAge5 = $("#comboEdadNinios34").val();
    var room3ChildAge6 = $("#comboEdadNinios35").val();

    var room4Adultos = $("#comboAdultos4").val();
    var room4Ninios = $("#comboNinios4").val();
    var room4ChildAge1 = $("#comboEdadNinios4").val();
    var room4ChildAge2 = $("#comboEdadNinios41").val();
    var room4ChildAge3 = $("#comboEdadNinios42").val();
    var room4ChildAge4 = $("#comboEdadNinios43").val();
    var room4ChildAge5 = $("#comboEdadNinios44").val();
    var room4ChildAge6 = $("#comboEdadNinios45").val();

    distri += '&rooms=' + rooms
     + '&room1Adults=' + room1Adultos
     + '&room1Children=' + room1Ninios
     + '&room1ChildAge1=' + room1ChildAge1
     + '&room1ChildAge2=' + room1ChildAge2
     + '&room1ChildAge3=' + room1ChildAge3
     + '&room1ChildAge4=' + room1ChildAge4
     + '&room1ChildAge5=' + room1ChildAge5
     + '&room1ChildAge6=' + room1ChildAge6

     + '&room2Adults=' + room2Adultos
     + '&room2Children=' + room2Ninios
     + '&room2ChildAge1=' + room2ChildAge1
     + '&room2ChildAge2=' + room2ChildAge2
     + '&room2ChildAge3=' + room2ChildAge3
     + '&room2ChildAge4=' + room2ChildAge4
     + '&room2ChildAge5=' + room2ChildAge5
     + '&room2ChildAge6=' + room2ChildAge6

     + '&room3Adults=' + room3Adultos
     + '&room3Children=' + room3Ninios
     + '&room3ChildAge1=' + room3ChildAge1
     + '&room3ChildAge2=' + room3ChildAge2
     + '&room3ChildAge3=' + room3ChildAge3
     + '&room3ChildAge4=' + room3ChildAge4
     + '&room3ChildAge5=' + room3ChildAge5
     + '&room3ChildAge6=' + room3ChildAge6

     + '&room4Adults=' + room4Adultos
     + '&room4Children=' + room4Ninios
     + '&room4ChildAge1=' + room4ChildAge1
     + '&room4ChildAge2=' + room4ChildAge2
     + '&room4ChildAge3=' + room4ChildAge3
     + '&room4ChildAge4=' + room4ChildAge4
     + '&room4ChildAge5=' + room4ChildAge5
     + '&room4ChildAge6=' + room4ChildAge6;

    return distri;
}
function recuperarDistribucionT() {
    var distri = '';
    distri += '&Adults=' + $("#comboAdultosP1").val();
    distri += '&Children=' + $("#comboNiniosP1").val();

    for (var i = 1; i <= 8; i++) {
        if (i > parseInt($("#comboNiniosP1").val())) {
            distri += '&childAge' + i.toString() + '=0';
        }
        else {
            distri += '&childAge' + i.toString() + '=' + $("#comboEdadNiniosP" + i.toString()).val();
        }
    }

    //distri += '&childAge1=' + $("#comboEdadNiniosP1").val();
    //distri += '&childAge2=' + $("#comboEdadNiniosP2").val();
    //distri += '&childAge3=' + $("#comboEdadNiniosP3").val();
    //distri += '&childAge4=' + $("#comboEdadNiniosP4").val();
    //distri += '&childAge5=' + $("#comboEdadNiniosP5").val();
    //distri += '&childAge6=' + $("#comboEdadNiniosP6").val();
    //distri += '&childAge7=' + $("#comboEdadNiniosP7").val();
    //distri += '&childAge8=' + $("#comboEdadNiniosP8").val();

    return distri;
}

function recuperarPrecios() {
    //HOTELES
    var paramPrecios = '';

    if ($("#filter_ranks_home").slider("instance")) paramPrecios = '&precios=' + $("#filter_ranks_home").slider("values", 0) + '-' + $("#filter_ranks_home").slider("values", 1);

    return paramPrecios;
}

function recuperarCategorias() {
    //HOTELES
    var distri = '';
    var categorias = '';
    var separator = '';

    for (var i = 1; i <= 5; i++) {

        if ($('#category_' + i).prop('checked')) {
            categorias += separator + i;

            separator = ',';
        }
    }
    if (categorias != '') distri = '&categoria=' + categorias;

    return distri;
}

function recuperarDistribucion() {
    //HOTELES Y VACACIONES
    var distri = '';
    var rooms = $("#cbNumHabitaciones").val();
    var ocupacion = '';
    var edades = '';
    var separator = '';

    for (var i = 1; i <= parseInt(rooms) ; i++) {

        if ($('#comboNinios' + i).val() > 0)
            ocupacion += separator + $('#comboAdultos' + i).val() + '-' + $('#comboNinios' + i).val();
        else
            ocupacion += separator + $('#comboAdultos' + i).val();

        separator = '/';
    }


    for (var i = 1; i <= parseInt(rooms) ; i++) {

        var ninosHab = parseInt($('#comboNinios' + i).val());

        separator = '';

        if (ninosHab > 0) {

            for (var j = 1; j <= ninosHab; j++) {

                var h;

                if (j == 1)
                    h = '';
                else
                    h = (j - 1).toString();

                var childAge = $("#comboEdadNinios" + i.toString() + h).val();

                edades += separator + childAge;
                separator = '-';

                totalNinos += 1;
            }

            edades += '/'
        }
        else
            edades += '-/'
    }
    distri = '&ocupa=' + ocupacion + '&edades=' + edades + '&numhab=' + rooms;
    return distri;
}

function ChangeTab(vObj, release) {
    //alert('ChangeTab(' + release + ') - Estructura');

    if (!(release)) release = 0;

    $("#hidTipoViaje").val(vObj);
    //resetAutocompletado(vObj);

    pestanaActiva = vObj;
    //alert(pestanaActiva);
    if (pestanaActiva == 'V')
        popUpPasajeros()
    else
        popUpHabitaciones();

    changeTabFechas(vObj, release);

    switch (vObj) {
        case "ISL":
        case "CAR":
        case "CIR":
            $("#divTrayectos").hide();
            $("#divCruceros").hide();
            $("#divTextPas").hide();
            $("#divProductosVAC .btn").removeClass("active");
            $("#divEntradas").hide();
            $("#lbl" + vObj).addClass("active");
            $("#divSubtipoViaje").hide();
            $("#divJovenDoradaTRN").hide();

            switch (vObj) {
                case "ISL":
                    //DESTINO-ORIGEN
                    $("#divTxtBuscar").hide();
                    $("#divOrigenDestinoCIR").hide();
                    $("#divOrigenDestinoV").hide();
                    $("#divFiltrosV").hide();
                    $("#divOrigenDestinoVHT").show();
                    $("#divDestinoCAR").hide();
                    $("#divDestinoISL").show();
                    $("#divDestinoSKI").hide();
                    $("#divTextHab").hide();
                    $("#divOrigenDestinoCIR").hide();
                    $("#divTipoViaje").hide();
                    //cambiaNumHabitaciones(1);
                    //iniciaFila(1);
                    //textoHabitaciones(1);
                    break;
                case "CAR":
                    //DESTINO-ORIGEN
                    $("#divTxtBuscar").hide();
                    $("#divOrigenDestinoCIR").hide();
                    $("#divOrigenDestinoV").hide();
                    $("#divFiltrosV").hide();
                    $("#divOrigenDestinoVHT").show();
                    $("#divDestinoCAR").show();
                    $("#divDestinoISL").hide();
                    $("#divDestinoSKI").hide();
                    $("#divTextHab").show();
                    $("#divTipoViaje").hide();
                    cambiaNumHabitaciones(1);
                    iniciaFila(1);
                    textoHabitaciones(1);
                    break;
                case "CIR":
                    //DESTINO-ORIGEN
                    $("#divTxtBuscar").hide();
                    $("#divOrigenDestinoCIR").show();
                    $("#divOrigenDestinoV").hide();
                    $("#divFiltrosV").hide();
                    $("#divOrigenDestinoVHT").hide();
                    $("#divDestinoSKI").hide();
                    $("#divTextHab").hide();
                    $("#divOrigenDestinoCIR").show();
                    $("#divTipoViaje").show();

                    $('#txtDestinoCir').typeahead('destroy');
                    $('#txtDestinoCir').typeahead({
                        source: function (query, response) { LoadAutocomplete.getSource(query, response, vObj) },
                        autoSelect: true,
                        minLength: 2,
                        typeAutocomplete: 'CACHE',
                        showHintOnFocus: true,
                        highlighter: function (item) { return item },
                        delay: 300,
                        afterSelect: function (item) {
                            $('#codigoDestino').val(item.Code);
                            $('#nombreDestino').val(item.Value);
                            if (item.Type == '40')
                                $('#tipoDestino').val('PB');
                            else if (item.Type == '50')
                                $('#tipoDestino').val('PR');
                            else if (item.Type == '60')
                                $('#tipoDestino').val('PA');
                            else if (item.Type == '80')
                                $('#tipoDestino').val('CO');
                            else
                                $('#tipoDestino').val('ZN');
                        },
                    });

                    $("#btnBuscar").text(encuentraBusqueda)

                    break;
            }
            $("#divProductosVAC").show();

            $("#btnBuscar").text(encuentraBusqueda)

            break;

        case "PK":
            $("#divTrayectos").hide();
            $("#divTextPas").hide();
            $("#divProductosVAC").hide();
            $("#divCruceros").hide();
            //DESTINO-ORIGEN
            $("#divTxtBuscar").hide();
            $("#divOrigenDestinoCIR").hide();
            $("#divOrigenDestinoV").show();
            $("#divFiltrosV").hide();
            $("#divOrigenDestinoVHT").hide();
            $("#divDestinoCAR").hide();
            $("#divDestinoISL").hide();
            $("#divDestinoSKI").hide();
            $("#divEntradas").hide();
            $("#divTextHab").show();
            $("#divTipoViaje").hide();
            $("#divSubtipoViaje").hide();
            $("#divJovenDoradaTRN").hide();
            cambiaNumHabitaciones(1);
            iniciaFila(1);
            textoHabitaciones(1);


            $("#btnBuscar").text(encuentraBusqueda)
            $('#txtOrigen').typeahead('destroy');
            $('#txtOrigen').typeahead({
                source: function (query, response) { LoadAutocomplete.getSource(query, response, 'HT') },
                autoSelect: true,
                minLength: 2,
                typeAutocomplete: 'PACKAGE',
                showHintOnFocus: true,
                highlighter: function (item) { return item },
                delay: 300,
                afterSelect: function (item) {
                    $('#codigoOrigen').val(item.City.Code);
                    if (item.Iata == null || item.Iata == '') {
                        $('#nombreOrigen').val(item.Name);
                        $('#txtOrigen').val(item.Name);
                    }
                    else {
                        $('#nombreOrigen').val(item.Name + ' (' + item.Iata + ')');
                        $('#txtOrigen').val(item.Name + ' (' + item.Iata + ')');
                    }
                }
            });
            $('#txtDestino').typeahead('destroy');
            $('#txtDestino').typeahead({
                source: function (query, response) { LoadAutocomplete.getSource(query, response, 'HT') },
                autoSelect: true,
                minLength: 2,
                typeAutocomplete: 'PACKAGE',
                showHintOnFocus: true,
                highlighter: function (item) { return item },
                delay: 300,
                afterSelect: function (item) {
                    $('#codigoDestino').val(item.City.Code);
                    if (item.Iata == null || item.Iata == '') {
                        $('#nombreDestino').val(item.Name);
                        $('#txtDestino').val(item.Name);
                    }
                    else {
                        $('#nombreDestino').val(item.Name + ' (' + item.Iata + ')');
                        $('#txtDestino').val(item.Name + ' (' + item.Iata + ')');
                    }
                }
            });
            break;
        case "PSKI":
        case "PESC":
            $("#divTrayectos").hide();
            $("#divTextPas").hide();
            $("#divProductosVAC").hide();
            $("#divCruceros").hide();
            //DESTINO-ORIGEN
            $("#divTxtBuscar").hide();
            $("#divOrigenDestinoCIR").hide();
            $("#divOrigenDestinoV").hide();
            $("#divFiltrosV").hide();
            $("#divOrigenDestinoVHT").hide();
            $("#divDestinoCAR").hide();
            $("#divDestinoISL").hide();
            $("#divDestinoSKI").show();
            $("#divEntradas").hide();
            $("#divTextHab").show();
            $("#divTipoViaje").hide();
            $("#divJovenDoradaTRN").hide();
            cambiaNumHabitaciones(1);
            iniciaFila(1);
            textoHabitaciones(1);
            switch (vObj) {
                case "PSKI":
                    $("#divSubtipoViaje").hide();
                    break;
                case "PESC":
                    $("#divSubtipoViaje").show();
                    break;
            }

            $("#btnBuscar").text(encuentraBusqueda)

            break;
        case "H":
        case "HSKI":
        case "HESC":
            $("#divTxtBuscar").show();
            //$("#txtBuscar").attr("placeholder", "Elige destino...");
            $("#divOrigenDestinoCIR").hide();
            $("#divCruceros").hide();
            $("#divOrigenDestinoV").hide();
            $("#divFiltrosV").hide();
            $("#divOrigenDestinoVHT").hide();
            $("#divDestinoSKI").hide();
            $("#divEntradas").hide();
            $("#divTipoViaje").hide();
            $("#divTrayectos").hide();
            $("#divTextPas").hide();
            $("#divProductosVAC").hide();
            $("#divTextHab").show();
            $("#txtBuscar").attr("placeholder", eligeDesti + '...');
            $("#divJovenDoradaTRN").hide();

            //if (dataLayer[0].sid == 'OH' || dataLayer[0].sid == 'LM') {
            $('#txtBuscar').typeahead('destroy');
            $('#txtBuscar').typeahead({
                source: function (query, response) { LoadAutocomplete.getSource(query, response, vObj) },
                autoSelect: true,
                items: 12,
                minLength: 2,
                typeAutocomplete: 'HOTEL',
                showHintOnFocus: true,
                highlighter: function (item) { return item },
                delay: 300,
                afterSelect: function (item) {
                    if (item.Type == 70) {
                        $('#codigoDestino').val(item.Code);
                        $('#nombreDestino').val(item.Name);
                    }
                    else {
                        $('#codigoDestino').val(item.City.Code);
                        $('#nombreDestino').val(item.City.Name);
                    }

                    if (item.Type == 10)
                        $('#codigoHotel').val(item.Code);

                    $('#codigoProvincia').val(item.Province.Code);
                    $('#codigoPais').val(item.Country.Code);
                    $('#typemapping').val(item.TypeMapping);

                    //$('input#account_id').val(item.Code);
                },
            });
            //}

            cambiaNumHabitaciones(1);
            iniciaFila(1);
            textoHabitaciones(1);
            switch (vObj) {
                case "H":
                    break;
                case "HSKI":
                    $("#divSubtipoViaje").hide();
                    break;
                case "HESC":
                    $("#divSubtipoViaje").show();
                    break;
            }



            break;
        case "E":
            //DESTINO-ORIGEN
            $("#divTxtBuscar").show();
            $("#txtBuscar").attr("placeholder", eligeEspectaculo + '...');
            $("#divOrigenDestinoCIR").hide();
            $("#divOrigenDestinoV").hide();
            $("#divFiltrosV").hide();
            $("#divOrigenDestinoVHT").hide();
            $("#divDestinoSKI").hide();
            $("#divCruceros").hide();

            $("#divTipoViaje").hide();
            $("#divEntradas").show();
            $("#divTrayectos").hide();
            $("#divTextPas").hide();
            $("#divProductosVAC").hide();
            $("#divTextHab").hide();
            $("#divSubtipoViaje").hide();
            $("#divJovenDoradaTRN").hide();

            $("#btnBuscar").text(encuentraBusqueda)

            $('#txtBuscar').typeahead('destroy');
            $('#txtBuscar').typeahead({
                source: function (query, response) { LoadAutocomplete.getSource(query, response, vObj) },
                autoSelect: true,
                minLength: 2,
                typeAutocomplete: 'TICKET',
                showHintOnFocus: true,
                highlighter: function (item) { return item },
                delay: 300,
                afterSelect: function (item) {
                    //window.location.href = item.UrlLink;
                },
            });
            break;
        case "VH":
            //DESTINO-ORIGEN
            $("#divTxtBuscar").hide();
            $("#divCruceros").hide();
            $("#divOrigenDestinoCIR").hide();
            $("#divOrigenDestinoV").show();
            $("#divFiltrosV").show();
            $("#divOrigenDestinoVHT").hide();
            $("#divDestinoSKI").hide();
            $("#divEntradas").hide();

            $("#divTipoViaje").hide();
            $("#divTrayectos").hide();
            $("#divTextPas").hide();
            $("#divProductosVAC").hide();
            $("#divTextHab").show();
            $("#divSubtipoViaje").hide();
            $("#divJovenDoradaTRN").hide();
            cambiaNumHabitaciones(1);
            iniciaFila(1);
            textoHabitaciones(1);
            $('#txtOrigen').typeahead('destroy');
            $('#txtOrigen').typeahead({
                source: function (query, response) { LoadAutocomplete.getSource(query, response, vObj) },
                autoSelect: true,
                minLength: 2,
                typeAutocomplete: 'PACKAGE',
                showHintOnFocus: true,
                highlighter: function (item) { return item },
                delay: 300,
                afterSelect: function (item) {
                    $('#codigoOrigen').val(item.City.Code);
                    if (item.Iata == null || item.Iata == '') {
                        $('#nombreOrigen').val(item.Name);
                        $('#txtOrigen').val(item.Name);
                    }
                    else {
                        $('#nombreOrigen').val(item.Name + ' (' + item.Iata + ')');
                        $('#txtOrigen').val(item.Name + ' (' + item.Iata + ')');

                        if ($('#txtOrigen').val() != '' && $('#txtDestino').val() != '') {
                            ResidentsDiscount($('#txtOrigen').val(), $('#txtDestino').val(),'');
                        }
                    }
                }
            });
            //$("#txtOrigen").focus(function () { $(this).select(); });
            $('#txtDestino').typeahead('destroy');
            $('#txtDestino').typeahead({
                source: function (query, response) { LoadAutocomplete.getSource(query, response, vObj) },
                autoSelect: true,
                minLength: 2,
                typeAutocomplete: 'PACKAGE',
                showHintOnFocus: true,
                highlighter: function (item) { return item },
                delay: 300,
                afterSelect: function (item) {
                    $('#codigoDestino').val(item.City.Code);
                    if (item.Iata == null || item.Iata == '') {
                        $('#nombreDestino').val(item.Name);
                        $('#txtDestino').val(item.Name);
                    }
                    else {
                        $('#nombreDestino').val(item.Name + ' (' + item.Iata + ')');
                        $('#txtDestino').val(item.Name + ' (' + item.Iata + ')');

                        if ($('#txtOrigen').val() != '' && $('#txtDestino').val() != '') {
                            ResidentsDiscount($('#txtOrigen').val(), $('#txtDestino').val(),'');
                        }
                    }
                }
            });

            $("#btnBuscar").text(encuentraBusqueda)

            break;

        case "TRNH":
            //DESTINO-ORIGEN
            $("#divTxtBuscar").hide();
            $("#divCruceros").hide();
            $("#divOrigenDestinoCIR").hide();
            $("#divOrigenDestinoV").show();
            $("#divFiltrosV").hide();
            $("#divOrigenDestinoVHT").hide();
            $("#divDestinoSKI").hide();
            $("#divEntradas").hide();

            $("#divTipoViaje").hide();
            $("#divTrayectos").hide();
            $("#divTextPas").hide();
            $("#divProductosVAC").hide();
            $("#divTextHab").show();
            $("#divSubtipoViaje").hide();
            $("#divJovenDoradaTRN").show();

            cambiaNumHabitaciones(1);
            iniciaFila(1);
            textoHabitaciones(1);
            $('#txtOrigen').typeahead('destroy');
            $('#txtOrigen').typeahead({
                source: function (query, response) { LoadAutocomplete.getSource(query, response, 'TRN') },
                autoSelect: true,
                minLength: 2,
                typeAutocomplete: 'TRN',
                showHintOnFocus: true,
                highlighter: function (item) { return item },
                delay: 300,
                afterSelect: function (item) {
                    $('#codigoTrenOrigen').val(item.Code);
                    $('#codigoOrigen').val(item.City.Code);
                    if (item.Iata == null || item.Iata == '') {
                        $('#nombreOrigen').val(item.Name);
                        $('#txtOrigen').val(item.Name);
                    }
                    else {
                        $('#nombreOrigen').val(item.Name + ' (' + item.Iata + ')');
                        $('#txtOrigen').val(item.Name + ' (' + item.Iata + ')');
                    }
                }
            });
            $('#txtDestino').typeahead('destroy');
            $('#txtDestino').typeahead({
                source: function (query, response) { LoadAutocomplete.getSource(query, response, 'TRN') },
                autoSelect: true,
                minLength: 2,
                typeAutocomplete: 'TRN',
                showHintOnFocus: true,
                highlighter: function (item) { return item },
                delay: 300,
                afterSelect: function (item) {
                    $('#codigoTrenDestino').val(item.Code);
                    $('#codigoDestino').val(item.City.Code);
                    if (item.Iata == null || item.Iata == '') {
                        $('#nombreDestino').val(item.Name);
                        $('#txtDestino').val(item.Name);
                    }
                    else {
                        $('#nombreDestino').val(item.Name + ' (' + item.Iata + ')');
                        $('#txtDestino').val(item.Name + ' (' + item.Iata + ')');
                    }
                }
            });

            //No se permite introducir texto con teclado
            $('#tarjeta_dorada').keypress(function (event) {
                event.preventDefault();
            });

            $('#tarjeta_joven').keypress(function (event) {
                event.preventDefault();
            });


            //Control para que la suma de ambas no supere el numero de adultos seleccionados
            $('#tarjeta_dorada').change(function (event) {
                maximo_adultos = maximo_adultos == 0 ? $(this).attr('max') : maximo_adultos;
                var value = $(this).val();
                var max = $(this).attr('max');
                var resto = maximo_adultos - value;
                var restoAux = $('#tarjeta_joven').attr('max') - $('#tarjeta_joven').val();

                $('#tarjeta_joven').attr('max', resto);
            });
            $('#tarjeta_joven').change(function (event) {
                maximo_adultos = maximo_adultos == 0 ? $(this).attr('max') : maximo_adultos;
                var value = $(this).val();
                var max = $(this).attr('max');
                var resto = maximo_adultos - value;
                var restoAux = $('#tarjeta_dorada').attr('max') - $('#tarjeta_dorada').val();

                $('#tarjeta_dorada').attr('max', resto);
            });

            $("#btnBuscar").text(encuentraBusqueda)

            break;
        case "V":
        case "V-OW":
            //DESTINO-ORIGEN
            $("#divTrayectos .btn").removeClass("active");
            $("#lbl" + vObj).addClass("active");
            $("#divTxtBuscar").hide();
            $("#divOrigenDestinoCIR").hide();
            $("#divOrigenDestinoV").show();
            $("#divFiltrosV").hide();
            $("#divOrigenDestinoVHT").hide();
            $("#divEntradas").hide();
            $("#divCruceros").hide();

            $("#divTipoViaje").hide();
            $("#divProductosVAC").hide();
            $("#divTrayectos").show();
            $("#divSubtipoViaje").hide();
            $("#divJovenDoradaTRN").hide();

            $("#divTextHab").hide();
            $("#divTextPas").show();

            $('#txtOrigen').typeahead('destroy');
            $('#txtOrigen').typeahead({
                source: function (query, response) { LoadAutocomplete.getSource(query, response, 'V') },
                autoSelect: true,
                minLength: 2,
                typeAutocomplete: 'TRANSPORT',
                showHintOnFocus: true,
                highlighter: function (item) { return item },
                delay: 300,
                afterSelect: function (item) {
                    $('#codigoOrigen').val(item.Code);
                    $('#codigoOrigenGds').val(item.City.Code);
                    $('#nombreOrigen').val(item.Name);
                    if (item != undefined && (item.Code == null || item.Code == '')) {
                        $('#dlAutocompletar').val('FALSE');
                    }
                    else {
                        $('#dlAutocompletar').val('TRUE');
                    }

                }
            });
            $('#txtDestino').typeahead('destroy');
            $('#txtDestino').typeahead({
                source: function (query, response) { LoadAutocomplete.getSource(query, response, 'V') },
                autoSelect: true,
                minLength: 2,
                typeAutocomplete: 'TRANSPORT',
                showHintOnFocus: true,
                highlighter: function (item) { return item },
                delay: 300,
                afterSelect: function (item) {
                    $('#codigoDestino').val(item.Code);
                    $('#codigoDestinoGds').val(item.City.Code);
                    $('#nombreDestino').val(item.Name);
                    if (item != undefined && (item.Code == null || item.Code == '')) {
                        $('#alAutocompletar').val('FALSE');
                    }
                    else {
                        $('#alAutocompletar').val('TRUE');
                    }

                }
            });

            $("#btnBuscar").text(encuentraBusqueda)

            break;

        case "CRU":
            $("#divTxtBuscar").hide();
            $("#divOrigenDestinoCIR").hide();
            $("#divOrigenDestinoV").hide();
            $("#divFiltrosV").hide();
            $("#divOrigenDestinoVHT").hide();
            $("#divDestinoSKI").hide();
            $("#divEntradas").hide();

            $("#divTipoViaje").hide();
            $("#divTrayectos").hide();
            $("#divTextPas").hide();
            $("#divProductosVAC").hide();
            $("#divTextHab").hide();
            $("#divFechaNoches").hide();
            $("#divSubtipoViaje").hide();
            $("#divCruceros").show();
            $("#divJovenDoradaTRN").hide();

            $("#btnBuscar").text(encuentraBusqueda)

            break;
    }


    $("#alertError").hide();
}

function changeTabFechas(vObj, release) {
    //alert('changeTabFechas(' + release + ') - Estructura');
    switch (vObj) {
        case "ISL":
        case "CAR":
        case "CIR":
        case "PSKI":
        case "PESC":
            $("#divFechasYear").hide();
            $("#divFechaNoches").show();
            $("#divFechaVuelta").hide();
            $("#divFechas").hide();
            $('#dateGoOnly').val(moment().add(1, 'd').format('DD-MM-YYYY'));
            $("#divFechaSoloIda").data('dateRangePicker').setDateRange(moment().add(1, 'd').format('DD-MM-YYYY'), moment().add(1, 'd').format('DD-MM-YYYY'));

            switch (vObj) {
                case "ISL":
                    $("#divRangoNoches").hide();
                    $("#divNumNoches").show();
                    $("#divFechaSoloIda").hide();
                    $("#divMesSalida").show();
                    $("#cmbSalidas option[value='']").hide();
                    //$("#cmbSalidas").val($("#cmbSalidas option:eq(1)").val());
                    break;
                case "CAR":
                    $("#divRangoNoches").hide();
                    $("#divNumNoches").show();
                    $("#divFechaSoloIda").show();
                    $("#spanFechaSoloIda").text(fechaSal);
                    $("#divMesSalida").hide();
                    break;
                case "CIR":
                    $("#divRangoNoches").show();
                    $("#divNumNoches").hide();
                    $("#divFechaSoloIda").hide();
                    $("#divMesSalida").show();
                    $("#cmbSalidas option[value='']").show();
                    //$("#cmbSalidas").val($("#cmbSalidas option:first").val());
                    break;
                case "PSKI":
                    $("#divRangoNoches").hide();
                    $("#divNumNoches").show();
                    $("#divFechaSoloIda").show();
                    $("#spanFechaSoloIda").text(fechaEntrada);
                    $("#divMesSalida").hide();
                    break;
                case "PESC":
                    $("#divRangoNoches").hide();
                    $("#divNumNoches").show();
                    $("#divFechaSoloIda").show();
                    $("#spanFechaSoloIda").text("Fecha de entrada");
                    $("#divMesSalida").hide();
                    break;
            }
            break;
        case "H":
        case "HSKI":
        case "HESC":
            $("#divFechasYear").hide();
            $("#divFechaVuelta").show();
            //$("#spanFechaIda").text(fechaEntrada);
            //$("#spanFechaVuelta").text(fechaSal);
            $("#divRangoNoches").hide();
            $("#divNumNoches").hide();
            $("#divFechaNoches").hide();
            $("#divFechas").show();
            $('#dateGo').val(moment().add(release, 'd').format('DD-MM-YYYY'));
            $('#dateReturn').val(moment().add(release + 1, 'd').format('DD-MM-YYYY'));
            $("#divFechas").data('dateRangePicker').setDateRange(moment().format('DD-MM-YYYY'), moment().add(1, 'd').format('DD-MM-YYYY'));
            break;
        case "E":

            $("#divFechas").hide();
            $("#divFechasYear").show();
            $("#divFechaNoches").hide();
            $("#divFechaVuelta").hide();
            $("#spanFechaIdaYear").text(fechaDesd);
            $("#spanFechaVueltaYear").text(fechaHast);
            $("#divRangoNoches").hide();
            $("#divNumNoches").hide();
            $("#divFechaVuelta").hide();
            $('#dateGoYear').val(moment().format('DD-MM-YYYY'));
            $('#dateReturnYear').val(moment().add(1, 'y').format('DD-MM-YYYY'));
            $("#divFechasYear").data('dateRangePicker').setDateRange(moment().format('DD-MM-YYYY'), moment().add(1, 'y').format('DD-MM-YYYY'));
            break;
        case "TRNH":
        case "VH":
        case "PK":
            $("#divFechasYear").hide();
            $("#divFechaNoches").hide();
            $("#divFechas").show();
            $("#divFechaVuelta").show();
            $("#spanFechaIda").text(fechaSal);
            $("#spanFechaVuelta").text(fechaRegreso);
            $("#divRangoNoches").hide();
            $("#divNumNoches").hide();
            $("#divFechaVuelta").show();
            $('#dateGo').val(moment().add(release, 'd').format('DD-MM-YYYY'));
            $('#dateReturn').val(moment().add(release + 1, 'd').format('DD-MM-YYYY'));
            $("#divFechas").data('dateRangePicker').setDateRange(moment().add(release, 'd').format('DD-MM-YYYY'), moment().add(release + 1, 'd').format('DD-MM-YYYY'));
            break;
        case "V":
        case "V-OW":
            $("#divFechasYear").hide();
            $("#spanFechaIda").text(fechaSal);
            $("#spanFechaVuelta").text(fechaRegreso);
            switch (vObj) {
                case "V-OW":

                    $("#spanFechaSoloIda").text(fechaSal);
                    $("#divFechaNoches").show();
                    $("#divRangoNoches").hide();
                    $("#divMesSalida").hide();
                    $("#divNumNoches").hide();
                    $("#divFechas").hide();
                    $('#dateGoOnly').val(moment().add(1, 'd').format('DD-MM-YYYY'));

                    var dGo = $("#dateGo").val();
                    var dateReturn = $("#dateReturn").val();
                    $("#dateOnlyGo").val(dGo);

                    var dateG = $('#dateGo').val();
                    var fDateOG = moment(dateG, "DD/MM/YYYY");
                    $("#divFechaSoloIda").data('dateRangePicker').setDateRange(dateG, moment(dateG, "DD-MM-YYYY").add(0, 'd').format('DD-MM-YYYY'));

                    break;
                case "V":
                    $("#divFechas").show();
                    $("#divFechaNoches").hide();
                    var dateReturn = $("#dateReturn").val();
                    var dGoOnly = $("#dateOnlyGo").val();
                    var compareGoOnly = moment(dGoOnly, "DD/MM/YYYY");
                    var compareDateReturn = moment(dateReturn, "DD/MM/YYYY");

                    if (dGoOnly != undefined && dGoOnly != '') {
                        $("#dateGo").val(dGoOnly);

                        if (moment(compareGoOnly).isAfter(moment(compareDateReturn), 'days'))
                            dateReturn = moment(dGoOnly, "DD-MM-YYYY").add(1, 'd').format('DD-MM-YYYY');

                        $("#dateReturn").val(dateReturn);
                    } else {
                        var compareGoOnly = moment($('#dateGo').val(), "DD/MM/YYYY");
                        var compareDateToday = moment();

                        if (moment(compareDateToday).diff(compareGoOnly, 'days') == 0) {
                            $('#dateGo').val(moment().add(1, 'd').format('DD-MM-YYYY'));
                            $('#dateReturn').val(moment().add(2, 'd').format('DD-MM-YYYY'));
                        }
                    }

                    var dateGo = $('#dateGo').val();
                    var dateRe = $('#dateReturn').val();
                    $("#divFechas").data('dateRangePicker').setDateRange(moment(dateGo, "DD-MM-YYYY").add(0, 'd').format('DD-MM-YYYY'), moment(dateRe, "DD-MM-YYYY").add(0, 'd').format('DD-MM-YYYY'));

                    break;
            }
    }
}

//--Calendario
function calendarioMV(cont, singleM, vMaxDays, vMinDays, release) {
    //alert('calendarioMV(' + cont + ', singleM, vMaxDays, vMinDays,' + release + ')');
    var minDays = 0;
    var maxDays = 0;
    if (singleM) {
        minDays = 1;
        maxDays = vMaxDays;
    }
    else {
        if (vMinDays != undefined) {
            minDays = vMinDays;
        } else {
            minDays = 2;
        }

        maxDays = vMaxDays;
    }


    $(cont).dateRangePicker({
        format: 'DD-MM-YYYY',
        language: userLang,
        startOfWeek: 'monday',
        startDate: moment().add(release, 'd').format('DD-MM-YYYY'),
        endDate: moment().add(1.3, 'y').format('DD-MM-YYYY'),
        showShortcuts: false,
        maxDays: maxDays,
        minDays: minDays,
        autoClose: true,
        container: cont,
        //customTopBar: 'Este sería un texto editable',
        stickyMonths: true,
        singleMonth: false,
        singleDate: singleM,
        setValue: function (s, s1, s2) {

            $(cont + ' .salida:input').val(s1);
            $(cont + ' .llegada:input').val(s2);

        },
        hoveringTooltip: function (days) {

            var D = ['0', errorSeleccionaFechaVuelta, '1 ' + strNoche];
            return D[days] ? D[days] : (days - 1) + ' ' + strNoches;

        }
    }).bind('datepicker-open', function () {

        $('.calendarcontainer').addClass('open');

    }).bind('datepicker-close', function () {

        $('.calendarcontainer').removeClass('open');

    });

    $(cont + ' .date-picker-wrapper').attr('data-parent', cont);

    $(cont).addClass('calparent');

}

function resetAutocompletado(vObj) {
    $("#txtDestino").val('');
    $("#tipoDestino").val('');
    $("#codigoDestino").val('');
    $("#codigoHotel").val('');
    $("#codigoProvincia").val('');
    $("#codigoPais").val('');
    $("#nombreDestino").val('');
    $("#txtOrigen").val('');
    $("#codigoOrigen").val('');
    $("#nombreOrigen").val('');
    $("#mesSalida").val('');
    $("#typemapping").val('');
}

function yLength(y) {
    y = (parseInt(y) < 100 ? "20" + y : y);
    return y;
}

function mLength(m) {
    m = (m.length == 1 ? "0" + m : m);
    return m;
}

function cambiarFechaHotelHome(fecha) {
    var iArr = fecha.split('-');
    y = yLength(iArr[2]);
    m = mLength(iArr[1]);
    d = mLength(iArr[0]);
    fecha = y + '-' + m + '-' + d;
    return fecha;
}

function cambiarFechaV(fecha) {
    var iArr = fecha.split('-');
    y = yLength(iArr[2]);
    m = mLength(iArr[1]);
    d = mLength(iArr[0]);
    fecha = y + m + d;
    return fecha;
}

function cambiarFechaVH(fecha) {
    var iArr = fecha.split('-');
    y = yLength(iArr[2]);
    m = mLength(iArr[1]);
    d = mLength(iArr[0]);
    fecha = d + '/' + m + '/' + y;
    return fecha;
}
function cambiarFechaCAR(fecha) {
    var iArr = fecha.split('-');
    y = yLength(iArr[2]);
    d = mLength(iArr[1]);
    m = mLength(iArr[0]);
    fecha = d + '/' + m + '/' + y;
    return fecha;
}
function seleccionaValorCombosPorValue(valor, nombreCombo) {

    if (valor != null) {

        if ($("#" + nombreCombo + " option[value=" + valor + "]").length == 1)
            $("#" + nombreCombo + " option[value=" + valor + "]").prop("selected", true);
    }

}

function seleccionaValorCombosPorTexto(valor, nombreCombo) {

    if (valor != null) {

        $("#" + nombreCombo + " option").each(function () {

            if ($(this).text().toLowerCase() == valor.toLowerCase()) {
                $(this).prop("selected", true);
                return false;
            }

        });
    }

    //$("#cbOrigenes option[text=" + origen.toUpperCase() + "]").attr("selected", true);

}

function dias(mes, anno, indiceSalida) {
    var restoMeses = Math.floor((indiceSalida - 1) / 12);
    mes = parseInt(mes - (12 * restoMeses));
    anno = parseInt(anno);
    switch (mes) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 2:
            return (anno % 4 == 0) ? 29 : 28;
    }
    return 30;
}

function quitarTilde(str) {
    rep = { "á": "-aacute", "é": "-eacute", "í": "-iacute", "ó": "-oacute", "ú": "-uacute", "Á": "-Aacute", "É": "-Eacute", "Í": "-Iacute", "Ó": "-Oacute", "Ú": "-Uacute", "ñ": "-ntilde", "Ñ": "-Ntilde" };
    for (var p in rep) {
        str = str.replace(p, rep[p]);
    }
    return str;
}
function ponerTilde(str) {
    rep = { "á": "-aacute", "é": "-eacute", "í": "-iacute", "ó": "-oacute", "ú": "-uacute", "Á": "-Aacute", "É": "-Eacute", "Í": "-Iacute", "Ó": "-Oacute", "Ú": "-Uacute", "ñ": "-ntilde", "Ñ": "-Ntilde" };
    for (var p in rep) {
        str = str.replace(rep[p], p);
    }
    return str;
}

var LoadAutocomplete = {
    getSource: function (query, response, key) {
        var ajaxResponse;
        //se fuerza para el autocompletado de LM


        $.ajax({
            //ponemos a mano el idioma de momento, porque en las páginas vuelve a dar Valor al UserLang para los calendarios, entonces el autocompleta no funciona en portugués.
            url: url_autocompletado + '/' + key + '/' + query + '/' + userLang,
            type: "GET",
            cache: true,
            async: true,
            success: function (responses) {
                ajaxResponse = responses.getJsonAutocompleteResult;
                response(ajaxResponse);
            },
        });
    }
}


function ShowSearcher(show, isPopUp, tabSelection, searchObj) {
    //alert('ShowSearcher - jsBuscador.js Estructura');

    tabSelectionSel = tabSelection;
    originCodeSel = searchObj.originCode;
    originNameSel = searchObj.originName;

    trainArrival = searchObj.trainArrival;
    trainDeparture = searchObj.trainDeparture;

    destinyCodeSel = searchObj.destinyCode;
    destinyNameSel = searchObj.destinyName;
    dateStartSel = searchObj.dateStart;
    dateReturnSel = searchObj.dateReturn;
    travelTypesSel = searchObj.travelTypes;
    nightsSel = searchObj.nights;
    shippingCompanySel = searchObj.shippingCompany;
    portSel = searchObj.port;
    showTypeSel = searchObj.showType;
    roomsNumSel = searchObj.rooms.length || 1;
    habitacionesTextSel = GetRomsPaxes(searchObj);
    roomsSel = searchObj.rooms;
    GdsCodigoOrigen = searchObj.DepartureGdsCode;
    GdsCodigoDestino = searchObj.ArrivalGdsCode;
    residentesSel = searchObj.residentes;


    if (show) {
        $('.nav-tabs li#tab' + tabSelection).tab('show');
        if (isPopUp)
            $('#popUpBuscador').modal('toggle');
        else {
            $('#divBuscador').show();
            $('.searchcontainer').addClass('open');
            ChangeTab(tabSelectionSel);
            SetDataSearcher();
        }
    }
};

function GetRomsPaxes(search) {
    var sumAdults = 0;
    var sumChildren = 0;

    //Sacamos información de número de adultos, niños y edades de rooms
    for (i = 0; i < roomsNumSel; i++) {
        eval("cbAdultos" + (i + 1).toString() + " = 2");
        eval("cbNinios" + (i + 1).toString() + " = ''");
        eval("cbEdadNinios" + (i + 1).toString() + " = ''");
        eval("cbEdadNinios" + (i + 1).toString() + "1 = ''");

        if (search.rooms[i] != undefined) {
            eval("cbAdultos" + (i + 1).toString() + " = search.rooms[i].adults");
            eval("cbNinios" + (i + 1).toString() + " = search.rooms[i].childrens");

            if (search.rooms[i].childAge1 != undefined)
                eval("cbEdadNinios" + (i + 1).toString() + " = search.rooms[i].childAge1");
            if (search.rooms[i].childAge2 != undefined)
                eval("cbEdadNinios" + (i + 1).toString() + "1 = search.rooms[i].childAge2");
            if (search.rooms[i].childAge3 != undefined)
                eval("cbEdadNinios" + (i + 1).toString() + "2 = search.rooms[i].childAge3");
            if (search.rooms[i].childAge4 != undefined)
                eval("cbEdadNinios" + (i + 1).toString() + "3 = search.rooms[i].childAge4");

            if (search.rooms[i].childAge5 != undefined)
                eval("cbEdadNinios" + (i + 1).toString() + "4 = search.rooms[i].childAge5");
            if (search.rooms[i].childAge6 != undefined)
                eval("cbEdadNinios" + (i + 1).toString() + "5 = search.rooms[i].childAge6");

            sumAdults = sumAdults + parseInt(search.rooms[i].adults);
            sumChildren = sumChildren + parseInt(search.rooms[i].childrens);
        }
    }

    sumAdults = sumAdults || 2;
    sumChildren = sumChildren || 0;

    maximo_adultos = sumAdults;
    $("#tarjeta_joven").attr("max", maximo_adultos);
    $("#tarjeta_dorada").attr("max", maximo_adultos);

    //HABITACIONES
    return roomsNumSel + ' Habitaciones, ' + sumAdults + ' Adultos, ' + sumChildren + ' Niños';
}

$(window).on('shown.bs.modal', function (event) {
    if (event.target.id == "popUpBuscador") {
        var htmlAux = $('#SEARCHTOTAL').html();

        $('#SEARCHTOTAL').html('');
        $('#MODALTOTAL').html(htmlAux);

        //alert('shown.bs.modal - Estructura');

        //ChangeTab(tabSelectionSel);

        SetDataSearcher();
    }
});

$(window).on('hidden.bs.modal', function (event) {
    if (event.target.id == "popUpBuscador") {

        forceCloseModal();
        var htmlAux = $('#MODALTOTAL').html();

        $('#MODALTOTAL').html('');
        $('#SEARCHTOTAL').html(htmlAux);
    }
});

function forceCloseModal() {
    $('#pasModal, #habModal').hide();
    $('#pasModal > div.modal-backdrop, #habModal > div.modal-backdrop').remove();
}

function SetDataSearcher() {
    //alert('SetDataSearcher - jsBuscador.js Estructura');
    if (dateStartSel !== undefined && dateStartSel != null && nightsSel !== undefined && nightsSel !== null) {
        // SALIDAS: hoy
        var dateText = dateStartSel.date() + '-' + (dateStartSel.month() + 1) + '-' + dateStartSel.year();

        // VUELTA: fecha de salida + número de noches recibidas en el ShowSearcher
        var dateSumNights = moment({ years: dateStartSel.year(), months: dateStartSel.month(), days: dateStartSel.date() });
        dateSumNights = moment(dateSumNights, "DD-MM-YYYY").add(nightsSel, 'days');
        var dateSumNightsText = dateSumNights.date() + '-' + (dateSumNights.month() + 1) + '-' + dateSumNights.year();
    }

    // NOCHES
    var rangoNoches = "N-N";

    if (nightsSel == 1)
        rangoNoches = "1-1";
    else if (nightsSel == 2 || nightsSel == 3)
        rangoNoches = "2-3";
    else if (nightsSel == 4 || nightsSel == 5 || nightsSel == 6)
        rangoNoches = "4-6";
    else if (nightsSel == 7)
        rangoNoches = "7-7";
    else if (nightsSel >= 8)
        rangoNoches = "8-N";

    // OBJETOS
    $("[id^=cmbOrigen],[id^=ddlCiudadesEspectaculos],[id^=codigoOrigen]").val(originCodeSel);
    $("[id^=codigoOrigenGds]").val(GdsCodigoOrigen);
    $("[id^=txtOrigen],[id^=nombreOrigen]").val(originNameSel.replace(/([+])/gi, " "));
    $("[id^=cmbDestino],[id^=cmbZonas],[id^=codigoDestino]").val(destinyCodeSel);
    $("[id^=codigoDestinoGds]").val(GdsCodigoDestino);
    $("[id^=txtDestino],[id^=txtDestino],[id^=nombreDestino],[id^=txtBuscar]").val(destinyNameSel.replace(/([+])/gi, " "));
    if (dateStartSel !== undefined && dateStartSel != null && nightsSel !== undefined && nightsSel !== null) {
        $("[id^=cmbSalidas],[id^=cmbFechas]").val(dateStartSel.month() + 1);
        $("[id^=divFechas]").data('dateRangePicker').setDateRange(dateText, dateSumNightsText, true);
        //$("[id^=divFechaSoloIda]").data('dateRangePicker').setDateRange(dateText, dateText, true);
    }
    $("[id^=numNoches]").val(nightsSel);
    $("[id^=cmbRangoNoches]").val(rangoNoches);
    $("[id^=cmbTipoViaje]").val(travelTypesSel);
    $("[id^=cmbNavieras]").val(shippingCompanySel);
    $("[id^=cmbPuertos]").val(portSel);
    $("[id^=ddlTiposEspectaculos]").val(showTypeSel);
    $('[id^=dateGo]').val(moment(dateStartSel).format('DD/MM/YYYY'));
    if (dateReturnSel !== undefined)
        $('[id^=dateReturn]').val(moment(dateReturnSel).format('DD/MM/YYYY'));
    if (dateStartSel !== undefined && dateReturnSel != undefined)
        $('[id^=divFechas]').data('dateRangePicker').setDateRange(moment(dateStartSel).format('DD/MM/YYYY'), moment(dateReturnSel).format('DD/MM/YYYY'));
    $('[id^=habitaciones]').val(habitacionesTextSel);

    $('#codigoTrenDestino').val(trainArrival);
    $('#codigoTrenOrigen').val(trainDeparture);
    if (document.getElementById('cmbSalidas') != null && $('#mesSalida').val() != "")
        $("[id^=cmbSalidas]").val($('#mesSalida').val());
    if (document.getElementById('cmbRangoNoches') != null && $('#rangoNoches').val() != "")
        document.getElementById('cmbRangoNoches').value = $('#rangoNoches').val();
    if (document.getElementById('cmbTipoViaje') != null && $('#tipoViajeCIR').val() != "")
        document.getElementById('cmbTipoViaje').value = $('#tipoViajeCIR').val();

    // llamamos a residentes
    ResidentsDiscount($('#txtOrigen').val(), $('#txtDestino').val(), residentesSel);    
    
    // SOVU
    SetComboPaxP();

    // VUHO
    SetComboPax();

    // Esto es un seguro, por si no se ha dado con el id correcto que los combos muestren algo
    $('select').each(function () {
        if ($(this).val() == null)
            $(this).val('');
    });
}

function SetComboPaxP() {
    //solo toma el primer ítem del array porque es la función para vuelos 
    //y solo envía una habitación
    if (roomsSel[0] !== undefined) {
        var adultsSel = roomsSel[0].adults;
        var childrenSel = roomsSel[0].childrens || 0;

        var childrenAgeArraySel = [];

        for (i = 0; i < childrenSel; i++) {
            childrenAgeArraySel[i] = eval("roomsSel[0].childAge" + (i + 1).toString());
        }

        if (adultsSel != undefined && childrenSel != undefined) {
            var auxAdultos = 'Adulto' + ((parseInt(adultsSel) == 1) ? '' : 's'), auxNinios = 'Niño' + ((parseInt(childrenSel) == 1) ? '' : 's');

            $('#comboAdultosP1 option:contains("' + adultsSel + '")').prop('selected', true);
            $('#comboNiniosP1 option:contains("' + childrenSel + '")').prop('selected', true);
            $('#pasajeros').val(adultsSel + ' ' + auxAdultos + ', ' + childrenSel + ' ' + auxNinios);
        }

        if (childrenAgeArraySel != undefined) {

            for (j = 0; j < 7; j++) {
                $('#comboEdadNiniosP' + (j + 1) + ' option[value="' + ((childrenAgeArraySel[j] != undefined) ? childrenAgeArraySel[j] : '99') + '"]').prop('selected', true);
            }
            $("#divWarningsP").hide();

            for (i = 1; i < (parseInt(childrenSel) + 1) ; i++) {
                $('.thP1').removeAttr("style");
                $('#comboEdadNiniosP' + i).removeClass("comboEdadOculto").addClass("form-control").addClass("comboEdad");
            }
        }
    }
}

function SetComboPax() {
    if (typeof (cbAdultos1) !== "undefined" != '' && parseInt(cbAdultos1) != parseInt($('[id^=comboAdultos1]').val())) {
        $('[id^=comboAdultos1]').val(cbAdultos1);
        cambioAdultosH(cbAdultos1, $('[id^=comboAdultos1]')[0].id)
    }

    if (typeof (cbNinios1) !== "undefined" && cbNinios1 != '') {
        if (parseInt(cbNinios1) != parseInt($('[id^=comboNinios1]').val())) {
            $('[id^=comboNinios1]').val(cbNinios1);
        }

        if (parseInt(cbNinios1) > 0) {
            cambioNiniosH(cbNinios1, 'comboNinios1');

            if (typeof (cbEdadNinios1) !== "undefined" && cbEdadNinios1 != '' && parseInt(cbEdadNinios1) != parseInt($('[id^=comboEdadNinios1]').val())) {
                $('[id^=comboEdadNinios1]').val(cbEdadNinios1);
            }

            if (typeof (cbEdadNinios11) !== "undefined" && cbEdadNinios11 != '' && parseInt(cbEdadNinios11) != parseInt($('[id^=comboEdadNinios11]').val())) {
                $('[id^=comboEdadNinios11]').val(cbEdadNinios11);
            }

            if (typeof (cbEdadNinios12) !== "undefined" && cbEdadNinios12 != '' && parseInt(cbEdadNinios12) != parseInt($('[id^=comboEdadNinios12]').val())) {
                $('[id^=comboEdadNinios12]').val(cbEdadNinios12);
            }

            if (typeof (cbEdadNinios13) !== "undefined" && cbEdadNinios13 != '' && parseInt(cbEdadNinios13) != parseInt($('[id^=comboEdadNinios13]').val())) {
                $('[id^=comboEdadNinios13]').val(cbEdadNinios13);
            }
            if (typeof (cbEdadNinios14) !== "undefined" && cbEdadNinios14 != '' && parseInt(cbEdadNinios14) != parseInt($('[id^=comboEdadNinios14]').val())) {
                $('[id^=comboEdadNinios14]').val(cbEdadNinios14);
            }

            if (typeof (cbEdadNinios15) !== "undefined" && cbEdadNinios15 != '' && parseInt(cbEdadNinios15) != parseInt($('[id^=comboEdadNinios15]').val())) {
                $('[id^=comboEdadNinios15]').val(cbEdadNinios15);
            }
        }
    }

    if (typeof (cbAdultos2) !== "undefined" && cbAdultos2 != '' && parseInt(cbAdultos2) != parseInt($('[id^=comboAdultos2]').val())) {
        $('[id^=comboAdultos2]').val(cbAdultos2);
        cambioAdultosH(cbAdultos2, $('[id^=comboAdultos2]')[0].id)
    }

    if (typeof (cbNinios2) !== "undefined" && cbNinios2 != '') {
        if (parseInt(cbNinios2) != parseInt($('[id^=comboNinios2]').val())) {
            $('[id^=comboNinios2]').val(cbNinios2);
        }

        if (parseInt(cbNinios2) > 0) {
            cambioNiniosH(cbNinios2, 'comboNinios2');

            if (typeof (cbEdadNinios2) !== "undefined" && cbEdadNinios2 != '' && parseInt(cbEdadNinios2) != parseInt($('[id^=comboEdadNinios2]').val())) {
                $('[id^=comboEdadNinios2]').val(cbEdadNinios2);
            }

            if (typeof (cbEdadNinios21) !== "undefined" && cbEdadNinios21 != '' && parseInt(cbEdadNinios21) != parseInt($('[id^=comboEdadNinios21]').val())) {
                $('[id^=comboEdadNinios21]').val(cbEdadNinios21);
            }

            if (typeof (cbEdadNinios22) !== "undefined" && cbEdadNinios22 != '' && parseInt(cbEdadNinios22) != parseInt($('[id^=comboEdadNinios22]').val())) {
                $('[id^=comboEdadNinios22]').val(cbEdadNinios22);
            }

            if (typeof (cbEdadNinios23) !== "undefined" && cbEdadNinios23 != '' && parseInt(cbEdadNinios23) != parseInt($('[id^=comboEdadNinios23]').val())) {
                $('[id^=comboEdadNinios23]').val(cbEdadNinios23);
            }

            if (typeof (cbEdadNinios24) !== "undefined" && cbEdadNinios24 != '' && parseInt(cbEdadNinios24) != parseInt($('[id^=comboEdadNinios24]').val())) {
                $('[id^=comboEdadNinios24]').val(cbEdadNinios24);
            }

            if (typeof (cbEdadNinios25) !== "undefined" && cbEdadNinios25 != '' && parseInt(cbEdadNinios25) != parseInt($('[id^=comboEdadNinios25]').val())) {
                $('[id^=comboEdadNinios25]').val(cbEdadNinios25);
            }
        }
    }

    if (typeof (cbAdultos3) !== "undefined" && cbAdultos3 != '' && parseInt(cbAdultos3) != parseInt($('[id^=comboAdultos3]').val())) {
        $('[id^=comboAdultos3]').val(cbAdultos3);
        cambioAdultosH(cbAdultos3, $('[id^=comboAdultos3]')[0].id)
    }

    if (typeof (cbNinios3) !== "undefined" && cbNinios3 != '') {
        if (parseInt(cbNinios3) != parseInt($('[id^=comboNinios3]').val())) {
            $('[id^=comboNinios3]').val(cbNinios3);
        }

        if (parseInt(cbNinios3) > 0) {
            cambioNiniosH(cbNinios3, 'comboNinios3');

            if (typeof (cbEdadNinios3) !== "undefined" && cbEdadNinios3 != '' && parseInt(cbEdadNinios3) != parseInt($('[id^=comboEdadNinios3]').val())) {
                $('[id^=comboEdadNinios3]').val(cbEdadNinios3);
            }

            if (typeof (cbEdadNinios31) !== "undefined" && cbEdadNinios31 != '' && parseInt(cbEdadNinios31) != parseInt($('[id^=comboEdadNinios31]').val())) {
                $('[id^=comboEdadNinios31]').val(cbEdadNinios31);
            }

            if (typeof (cbEdadNinios32) !== "undefined" && cbEdadNinios32 != '' && parseInt(cbEdadNinios32) != parseInt($('[id^=comboEdadNinios32]').val())) {
                $('[id^=comboEdadNinios32]').val(cbEdadNinios32);
            }

            if (typeof (cbEdadNinios33) !== "undefined" && cbEdadNinios33 != '' && parseInt(cbEdadNinios33) != parseInt($('[id^=comboEdadNinios33]').val())) {
                $('[id^=comboEdadNinios33]').val(cbEdadNinios33);
            }

            if (typeof (cbEdadNinios34) !== "undefined" && cbEdadNinios34 != '' && parseInt(cbEdadNinios34) != parseInt($('[id^=comboEdadNinios34]').val())) {
                $('[id^=comboEdadNinios34]').val(cbEdadNinios34);
            }

            if (typeof (cbEdadNinios35) !== "undefined" && cbEdadNinios35 != '' && parseInt(cbEdadNinios35) != parseInt($('[id^=comboEdadNinios35]').val())) {
                $('[id^=comboEdadNinios35]').val(cbEdadNinios35);
            }
        }
    }

    if (typeof (cbAdultos4) !== "undefined" && cbAdultos4 != '') {
        if (parseInt(cbAdultos4) != parseInt($('[id^=comboAdultos4]').val())) {
            $('[id^=comboAdultos4]').val(cbAdultos4);
            cambioAdultosH(cbAdultos4, $('[id^=comboAdultos4]')[0].id)
        }
    }
    if (typeof (cbNinios4) !== "undefined" && cbNinios4 != '') {
        if (parseInt(cbNinios4) != parseInt($('[id^=comboNinios4]').val())) {
            $('[id^=comboNinios4]').val(cbNinios4);
        }
        if (parseInt(cbNinios4) > 0) {
            cambioNiniosH(cbNinios4, 'comboNinios4');

            if (typeof (cbEdadNinios4) !== "undefined" && cbEdadNinios4 != '' && parseInt(cbEdadNinios4) != parseInt($('[id^=comboEdadNinios4]').val())) {
                $('[id^=comboEdadNinios4]').val(cbEdadNinios4);
            }

            if (typeof (cbEdadNinios41) !== "undefined" && cbEdadNinios41 != '' && parseInt(cbEdadNinios41) != parseInt($('[id^=comboEdadNinios41]').val())) {
                $('[id^=comboEdadNinios41]').val(cbEdadNinios41);
            }

            if (typeof (cbEdadNinios42) !== "undefined" && cbEdadNinios42 != '' && parseInt(cbEdadNinios42) != parseInt($('[id^=comboEdadNinios42]').val())) {
                $('[id^=comboEdadNinios42]').val(cbEdadNinios42);
            }

            if (typeof (cbEdadNinios43) !== "undefined" && cbEdadNinios43 != '' && parseInt(cbEdadNinios43) != parseInt($('[id^=comboEdadNinios43]').val())) {
                $('[id^=comboEdadNinios43]').val(cbEdadNinios43);
            }

            if (typeof (cbEdadNinios44) !== "undefined" && cbEdadNinios44 != '' && parseInt(cbEdadNinios44) != parseInt($('[id^=comboEdadNinios44]').val())) {
                $('[id^=comboEdadNinios44]').val(cbEdadNinios44);
            }

            if (typeof (cbEdadNinios45) !== "undefined" && cbEdadNinios45 != '' && parseInt(cbEdadNinios45) != parseInt($('[id^=comboEdadNinios45]').val())) {
                $('[id^=comboEdadNinios45]').val(cbEdadNinios45);
            }
        }
    }

    if (parseInt(roomsNumSel) != parseInt($('[id^=cbNumHabitaciones]').val())) {
        cambiaNumHabitaciones(roomsNumSel);
        $('[id^=cbNumHabitaciones]').val(roomsNumSel);
    }
}

function ResidentsDiscount(departure, arrival, valueSelected) {
    var ajaxResponse;
    var cleanIataDeparture;
    var cleanIataArrival;
    var url_discounts;

    $("#radiobuttonsResidentes").html("");

    var iataDeparture = /\((\w{3})\)/.exec(departure);
    var iataArrival = /\((\w{3})\)/.exec(arrival);
    if (iataDeparture != null && iataArrival != null) {
        cleanIataDeparture = iataDeparture[0].replace("(", "").replace(")", "");
        cleanIataArrival = iataArrival[0].replace("(", "").replace(")", "");

        url_discounts = url_autocompletado_descuentos + '/residents/' + Sid + '/' + cleanIataDeparture + '/' + cleanIataArrival;

        $.ajax({
            url: url_discounts,
            type: "GET",
            data: "",
            cache: true,
            async: true,
            success: function (responses) {
                if (responses != null) {
                    if (responses.getJsonApplicableDiscountsResult != null) {
                        if (responses.getJsonApplicableDiscountsResult.length > 0) {
                            $("#radiobuttonsResidentes").append("<input type='radio' name='residentsDiscount' id='noResident' value='noResident' checked>No Residente");

                            for (i = 0; i < responses.getJsonApplicableDiscountsResult.length; i++) {
                                var radio = " <input type='radio' name='residentsDiscount' id='" + responses.getJsonApplicableDiscountsResult[i].Code + "' value='" + responses.getJsonApplicableDiscountsResult[i].Code + "'>Residente en " + responses.getJsonApplicableDiscountsResult[i].Name

                                $("#radiobuttonsResidentes").append(radio);
                                //alert("OK en ResidentsDiscount" + url_discounts);
                            }

                            if (valueSelected != "") {
                                $('#' + residentesSel).attr('checked', 'checked');
                            }
                        }
                    }
                }
            }
            , error: function (data) {
                //alert("ERROR en ResidentsDiscount" + url_discounts);
            } //Fin error
        });
    }
}


function getQuerystring(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null)
        return default_;
    else
        return qs[1];
}