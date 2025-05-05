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

    function format(seconds) {
        return Math.floor(seconds/60) + ":" + String(seconds % 60).padStart(2, '0')
    }

    function addRow(label, seconds) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.textContent = label + format(seconds);
        tr.appendChild(td);
        splitsRow.appendChild(tr);
    }

    var seconds = 0;
    var fiveKSeconds = 0;
    var splitsRow = document.getElementsByClassName('mile-splits')[0].children[0].children[1];
    var splits = splitsRow.children;
    var timeMatcher = /(\d+):(\d+)/;
    for (var i=0; i<splits.length; i++) {
        var time = splits[i].children[1].textContent;
        var matcher = time.match(timeMatcher);
        var split = parseInt(matcher[1])*60 + parseInt(matcher[2])
        if (i < 5) {
            fiveKSeconds += split
        }
        if (i < 10) {
            seconds += split;
        }
    }

    if (splits.length >= 5) {
        addRow("5K time: ", fiveKSeconds);
        if (splits.length >= 10) {
            addRow("10K time: ", seconds);
        }
    }
}, false);