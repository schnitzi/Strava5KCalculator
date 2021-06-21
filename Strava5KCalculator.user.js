// ==UserScript==
// @name         Strava 5K calculator
// @namespace    http://computronium.org/
// @version      0.1
// @description  Shows 5K time on Strava activity pages
// @author       Mark Schnitzius
// @match        https://www.strava.com/activities/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
    'use strict';

    var seconds = 0;
    var splitsRow = document.getElementsByClassName('mile-splits')[0].children[0].children[1];
    var splits = splitsRow.children;
    var timeMatcher = /(\d+):(\d+)/;
    for (var i=0; i<5; i++) {
        var time = splits[i].children[1].textContent;
        var matcher = time.match(timeMatcher);
        seconds += parseInt(matcher[1])*60 + parseInt(matcher[2]);
    }

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.textContent = "5K time: " + Math.floor(seconds/60) + ":" + String(seconds % 60).padStart(2, '0');
    tr.appendChild(td);
    splitsRow.appendChild(tr);

}, false);