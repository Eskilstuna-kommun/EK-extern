"use strict";

var $ = require('jquery');
var utils = require('../utils');
var options = require('./../../conf/printSettings');
var print = require('./print');
var printarea = require('./printarea');
var Viewer = require('../viewer');
var ol = require('openlayers');
var $printButton, $printButtonTool, $printselect, vector;

function init() {
    var menuEl = '<form type="submit">' +
        '<div id="o-printmenu" class="o-printmenu">' +
        '<h5 id="o-main-setting-heading">Skriv ut karta</h5>' +
        '<div class="o-block">' +
        '<span class="o-setting-heading">Format</span>' +
        utils.createRadioButtons(options.formats, 1) +
        '</div>' +
        '<br />' +
        '<div class="o-block">' +
        '<span class="o-setting-heading">Orientering</span>' +
        utils.createRadioButtons(options.orientation, 2) +
        '</div>' +
        '</br>' +
        '<div class="o-block">' +
        '<span class="o-setting-heading">Storlek</span>' +
        '<select id="o-size-dd" class="o-dd-input">' +
        utils.createDdOptions(options.sizes) +
        '</select>' +
        '</div>' +
        '<div class="o-block">' +
        '<span class="o-setting-heading">Mall</span>' +
        '<select id="o-template-dd" class="o-dd-input">' +
        utils.createDdOptions(options.templates) +
        '</select>' +
        '</div>' +
        '<div class="o-block">' +
        '<span class="o-setting-heading">Skala</span>' +
        '<select id="o-scale-dd" class="o-dd-input">' +
        utils.createDdOptions(options.scales) +
        '</select>' +
        '</div>' +
        '<div class="o-block">' +
        '<span class="o-setting-heading">Upplösning</span>' +
        '<select id="o-resolution-dd" class="o-dd-input">' +
        utils.createDdOptions(options.resolutions) +
        '</select>' +
        '</div>' +
        '<br />' +
        '<div class="o-block">' +
        '<span class="o-setting-heading">Titel<span><br />' +
        '<input id="o-title-input" class="o-text-input" type="text" />' +
        '</div>' +
        '<br />' +
        '<div class="o-block">' +
        '<input type="checkbox" id="o-legend-input" />' +
        '<label for="o-legend-input">Teckenförklaring</label>' +
        '</div>' +
        '<br />' +
        '<div class="o-block">' +
        '<button id="o-print-create-button" class="btn" type="button">Skapa</button>' +
        '</div>' +
        '</div>' +
        '</form>';

    $('#o-map').append(menuEl);

    var printButton = utils.createButton({
        id: 'o-printmenu-button-close',
        cls: 'o-no-boxshadow',
        iconCls: 'o-icon-menu-fa-times',
        src: '#fa-times',
        tooltipText: 'Stäng meny',
        tooltipPlacement: 'west'
    });

    $('#o-main-setting-heading').append(printButton);

    var printButtonTool = utils.createButton({
        id: 'o-print-tool',
        iconCls: 'o-icon-fa-print',
        src: '#fa-print'
    });

    $('#o-toolbar-misc').append(printButtonTool);
    $printButtonTool = $('#o-print-tool');
    $printButton = $('#o-printmenu-button-close');
    $printselect = $('#o-size-dd');
    bindUIActions();
}

function bindUIActions() {
    $printButton.on('click', function (e) {
        $("#o-printmenu").removeClass('o-printmenu-show');
        e.preventDefault();
    });
    $printButtonTool.on('click', function (e) {
        if ($("#o-printmenu").hasClass('o-printmenu-show')) {
            $("#o-printmenu").removeClass('o-printmenu-show');
        }
        else {
            $("#o-printmenu").addClass('o-printmenu-show');
        }
        e.preventDefault();
    });
    $printselect.change(function () {
        if ($printselect.val() === "A1") {
            vector = printarea.printA1();
        }
    });  

    $('#o-print-create-button').click(function (event) {
        var map = Viewer.getMap();
        var layer = map.getLayers();
        var extent = vector.getSource().getFeatures()[0].getGeometry().getExtent();
        var centerPoint = ol.extent.getCenter(extent);
        
        var printLayers = [];        
        for (var i = 0, l = layer.a.length; i < l; i++) {
           if(layer.a[i].S.visible){
               printLayers.push(layer.a[i].S.title);
           }         
        }  
        var contract = {
            url: "http://localhost:8080/geoserver/wms",
            dpi: $('#o-resolution-dd').val(),
            layers: printLayers,
            imageFormat: $('input[name=group1]:checked').val(),
            scale: $('#o-scale-dd').val(),
            orientation: $('input[name=group2]:checked').val(),
            size: $('#o-size-dd').val(),
            title: $('#o-title-input').val(),
            template: $('#o-template-dd').val(),
            center: centerPoint
        };
        print.printMap(contract);
        return false;
    });


}




module.exports.init = init;