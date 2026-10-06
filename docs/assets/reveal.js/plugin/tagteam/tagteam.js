
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Tagteam.js for Reveal.js
 * Version 1.0.1
 *
 * @license
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js
 ******************************************************************/


(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tagteam = factory());
})(this, (function () { 'use strict';

    var Plugin = function Plugin() {
      var tagteam = function tagteam(deck, options) {
        var debugLog = function debugLog(text) {
          if (options.debug) console.log(text);
        };

        var getParams = function getParams() {
          var url = new URL(window.location);
          var urlparams = new URLSearchParams(url.search);
          var t = urlparams.get('t');
          var n = urlparams.get('n');
          var g = urlparams.get('g');
          var d = new Date(urlparams.get('dodayay') || new Date().toISOString().substring(0,10));
          return {
            t: t,
            n: n,
            g: g,
            d: d
          };
        };

        var arrayFromString = function arrayFromString(string) {
          var newArray = [];
          var arrayItems = string.split(',').map(function (item) {
            return item.trim();
          });
          arrayItems.forEach(function (arrayItem) {
            if (arrayItem.indexOf(' ') >= 0) {
              var arrayItemWithSpace = arrayItem.split(' ');
              newArray.push(arrayItemWithSpace);
            } else {
              newArray.push(arrayItem);
            }
          });
          return newArray;
        };

        var arrayFromNameString = function arrayFromNameString(string) {
          var newArray = [];
          var arrayItems = string.split(',').map(function (item) {
            return item.trim();
          });
          arrayItems.forEach(function (arrayItem) {
            newArray.push(arrayItem);
          });
          return newArray;
        };

        var isInArray = function isInArray(arr, item) {
          var contains = arr.some(function (ele) {
            if (item.indexOf(ele) >= 0 || Array.isArray(ele) && ele.every(function (elem) {
              return item.includes(elem);
            })) {
              return true;
            }
          });
          return contains;
        };

        var hideElement = function hideElement(section) {
          section.setAttribute('data-visibility', 'hidden');
        };

        var showElement = function showElement(section) {
          // When an element needs to be shown, but had data-visibility set to hidden
          section.setAttribute('data-visibility', 'visible'); // Or when its parent is set to hidden, show it if there is no n set

          if (!getParams().n && !options.groups.names) {
            section.parentNode.setAttribute('data-visibility', 'visible');
          }
        };

        var hideItems = function hideItems(elems, elementsToShowArray, kind, currentDate) {
          elems.forEach(function (elem) {
            var sectionArray = [];

            if (kind === 'tags' && elem.dataset.tag) {
              sectionArray = elem.dataset.tag.trim().split(/\s*,\s*/);

              if (elem.parentNode.dataset.tag) {
                var parentArray = elem.parentNode.dataset.tag.trim().split(/\s*,\s*/);
                sectionArray = sectionArray.concat(parentArray);
              }
            }

            if (kind === 'names') {
              var nameName = elem.dataset.name ? elem.dataset.name.toLowerCase() : elem.getAttribute(name).toLowerCase();

              if (nameName) {
                sectionArray = nameName.trim().split(/\s*,\s*/);
              }
            }

            if (kind === 'after') {
              var afterDateStr = elem.dataset.after ? elem.dataset.after.toLowerCase() : elem.getAttribute(after).toLowerCase();
              
              if (afterDateStr) {
                var afterDate = new Date(afterDateStr);
                sectionArray = [currentDate >= afterDate];
                console.log("afterStr", afterDateStr, sectionArray);
              }
              if (elem.parentNode.dataset.after) {
                var parentAfterDateStr = elem.parentNode.dataset.after.toLowerCase();
                var parentAfterDate = new Date(parentAfterDateStr);
                var parentArray = [currentDate >= parentAfterDate];
                if(!afterDateStr) {
                    console.log("using parent rule", parentAfterDateStr, parentArray);
                    sectionArray = sectionArray.concat(parentArray);
                } else {
                    console.log("parent after ignored since we have explicitly set one", parentAfterDateStr, afterDateStr);
                }
              }
            }

            if (!isInArray(elementsToShowArray, sectionArray)) {
              hideElement(elem);
            } else {
              showElement(elem);
            }
          });
        };

        var checkSections = function checkSections() {
          var allSections = deck.getRevealElement().querySelectorAll("section:not([data-mandatory])");
          var taggedSections = deck.getRevealElement().querySelectorAll("section[data-tag]:not([data-tag=keep])");
          var namedSections = deck.getRevealElement().querySelectorAll("section[data-name]:not([data-tag=keep])");
          var mandatorySections = deck.getRevealElement().querySelectorAll("section[data-mandatory]");
          var afterSections = deck.getRevealElement().querySelectorAll("section[data-after]");
          var params = getParams();
          // console.log(params);
          var tagsToShow = params.t;
          var namesToShow = params.n;
          var groupToShow = params.g;
          var currentDate = params.d;
          var groups = options.groups;

          if (options.mandatorygroup) {
            if (!(groupToShow in groups)) {
              hideItems(allSections, [], '');
            } else if (mandatorySections) {
              hideItems(mandatorySections, [], '');
            }
          } else if (mandatorySections) {
            hideItems(mandatorySections, [], 'mnd');
          }
          if (groupToShow) {
            if (groupToShow in groups) {
              var groupTagsToShow = groups[groupToShow].tags;
              if(groupTagsToShow[0].startsWith('dec')){
                var requestedDay = Number.parseInt(groupTagsToShow[0].substring(3));
                groupTagsToShow.pop();
                var currDay = currentDate.getDate();
                var currMonth = currentDate.getMonth();
                if (currMonth < 11)
                  currDay -= 30;

                if (requestedDay > currDay)
                {
                  groupTagsToShow.push("tomorrow");
                  currentDate.setDate(0);
                } else {
                  if (requestedDay <= 0)
                    window.location.hash = currDay - requestedDay + 1; // välkommensidan
                  else
                    window.location.hash = currDay - requestedDay
                }
                for (let day = 1; day <= Math.min(currDay, requestedDay); day++) {
                  var dStr = ("0" + day);
                  groupTagsToShow.push("dec" + dStr.substring(dStr.length - 2));
                }
                groupTagsToShow.push("init");
                
                console.log(groupToShow, requestedDay, groupTagsToShow);
              }
              var groupNamesToShow = groups[groupToShow].names;
              if (!groupTagsToShow && !groupNamesToShow) {
                console.log("Please set a 'tags' or an 'names' object in this group.");
              }

              if (groupTagsToShow) {
                debugLog("Group tags to show: ".concat(JSON.stringify(groupTagsToShow)));
                hideItems(taggedSections, groupTagsToShow, 'tags');
              }

              if (groupNamesToShow) {
                debugLog("Group names to show: ".concat(JSON.stringify(groupNamesToShow)));
                hideItems(namedSections, groupNamesToShow, 'names');
              }
            } else {
              hideItems(taggedSections, [], '');
              hideItems(namedSections, [], '');
            }
            if(options.dateFilter) {
              console.log("after", afterSections);
              hideItems(afterSections, [true], 'after', currentDate);
            }
          } else if (!options.mandatorygroup) {
            if (taggedSections && tagsToShow) {
              var tagsToShowArray = arrayFromString(tagsToShow);
              debugLog("URL Tag parameters: ".concat(JSON.stringify(tagsToShowArray)));
              hideItems(taggedSections, tagsToShowArray, 'tags');
            }

            if (namedSections && namesToShow) {
              var namesToShowArray = arrayFromNameString(namesToShow);
              debugLog("URL Names parameters: ".concat(JSON.stringify(namesToShowArray)));
              hideItems(namedSections, namesToShowArray, 'names');
            }
            if (afterSections && options.dateFilter) {
                console.log("after", afterSections);
                hideItems(afterSections, [true], 'after');
            }
          }
          if (namedSections) {
            namedSections.forEach(function (namedSection) {
              if (namedSection.dataset.visibility != "hidden") {
                var parentVisible = false;

                if (namedSection.hasChildNodes()) {
                  [].forEach.call(namedSection.children, function (child) {
                    if (child.dataset.visibility != "hidden") {
                      parentVisible = true;
                    }
                  });
                }

                if (parentVisible != true) {
                  hideElement(namedSection);
                }
              }
            });
          }
        };

        checkSections();
      };

      var init = function init(deck) {
        var defaultOptions = {
          debug: false,
          datefilter: false,
          mandatorygroup: false,
          groups: {
            "pets": {
              t: ["cats", "dogs"],
              n: ["red"]
            }
          }
        };

        var defaults = function defaults(options, defaultOptions) {
          for (var i in defaultOptions) {
            if (!options.hasOwnProperty(i)) {
              options[i] = defaultOptions[i];
            }
          }
        };

        var options = deck.getConfig().tagteam || {};
        defaults(options, defaultOptions);
        tagteam(deck, options);
      };

      return {
        id: 'tagteam',
        init: init
      };
    };

    return Plugin;

}));
