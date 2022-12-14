// const fetch = require('node-fetch'); // uncomment this line for version <= 16.x >
const API_URL = "nzbird.json";

var sortBy = "";
var consStatus = "";
var count = 0;
var statusCount = 0;


async function main() {
    let response = await fetch(API_URL);

    let birds = await response.json();

    /*Sort the birds from shortest to longest and use that as the initial state of the website */
    birds.sort(function compare(a, b) {
        return a.size.length.value - b.size.length.value;
    });
    for (b in birds) {

        createBirdTextBox(
            "eachBirdBox",
            birds[b].photo.source,
            null,
            birds[b].primary_name,
            "Photo by " + birds[b].photo.credit,
            birds[b].english_name,
            birds[b].scientific_name,
            birds[b].order,
            birds[b].family,
            birds[b].status,
            birds[b].size.length.value + birds[b].size.length.units,
            birds[b].size.weight.value + birds[b].size.weight.units,
            "Scientific name ",
            "Order ",
            "Family ",
            "Status ",
            "Length ",
            "Weight ",
        )

    }


    /** Filter the birds, only show those which are above a minium weight input */
    function minWeight() {
        const search_bar = document.querySelector('#searchMin')
        var min_weight = parseFloat(search_bar.value);

        if (Number.isNaN(min_weight)) return;
        else {
            for (b in birds) {
                var i = parseFloat(birds[b].size.weight.value);
                if (i > min_weight);
                else {
                    let boxes = document.querySelectorAll(".eachBirdBox");
                    for (i = 0; i < boxes.length; i++) {
                        if (i == b) {
                            boxes[i].style.display = "none";
                        }
                    }
                }
            }
        }
    }


    /** Filter the birds, only show those which are below a maximum weight input */
    function maxWeight() {
        const search_bar = document.querySelector('#searchMax')
        var max_weight = parseFloat(search_bar.value);

        if (Number.isNaN(max_weight)) return;
        else {
            console.log(max_weight);
            for (b in birds) {
                var i = parseFloat(birds[b].size.weight.value);
                if (i < max_weight);
                else {
                    let boxes = document.querySelectorAll(".eachBirdBox");
                    for (i = 0; i < boxes.length; i++) {
                        if (i == b) {
                            boxes[i].style.display = "none";
                        }
                    }
                }
            }
        }
    }







    /** Function which takes in a string and checks if it is a substring of the descriptions of any of the birds 
     * changes the display of the birds tile to none if it does not contain the search substring. Function is called by
     * another function clickFunction, which uses an event listener for the button.
    */
    function searchBarFunction() {
        const search_bar = document.querySelector('#search')
        var userString = search_bar.value;
        var searchVal = userString.toLowerCase();

        console.log("search val is " + searchVal);

        for (var b = 0; b < birds.length; b++) {
            let isSubString = false;
            for (otherName in birds[b].other_names) {
                if (birds[b].other_names[otherName].toLowerCase().indexOf(searchVal) != -1) {
                    isSubString = true;
                }
            }
            var norm = (birds[b].primary_name).normalize("NFC");
            // console.log(norm);
            if (norm.indexOf(searchVal) != -1); //console.log(birds[b].primary_name);
            else if ((birds[b].english_name).toLowerCase().indexOf(searchVal) != -1); // console.log(birds[b].primary_name);
            else if ((birds[b].scientific_name).toLowerCase().indexOf(searchVal) != -1); // console.log(birds[b].primary_name);
            else if ((birds[b].order).toLowerCase().indexOf(searchVal) != -1); // console.log(birds[b].primary_name);
            else if ((birds[b].family).toLowerCase().indexOf(searchVal) != -1); // console.log(birds[b].primary_name);
            else if ((birds[b].photo.credit).toLowerCase().indexOf(searchVal) !== -1); // console.log(birds[b].primary_name);
            else if (isSubString); // console.log(birds[b].primary_name);
            else {

                let boxes = document.querySelectorAll(".eachBirdBox");
                for (i = 0; i < boxes.length; i++) {
                    if (i == b) {
                        boxes[i].style.display = "none";
                        // console.log("this is the id of the bird  " + id);
                    }

                }
            }
        }

    }



    /** Function which sorts birds through values like length and weight
     * function is called by another function, clickFunction which uses an eventlistener for a button.
     * function also has a reset, which calles a function which clears the HTML in main.
     */
    function sortBirdsBy() {

        var select = document.getElementById('sort-by');
        var sortBy = select.options[select.selectedIndex].value;
        // console.log(sortBy);
        reset();
        switch (sortBy) {
            case 'short-long':
                birds.sort(function compare(a, b) {
                    return a.size.length.value - b.size.length.value;
                });
                break;
            case 'long-short':
                birds.sort(function compare(a, b) {
                    return b.size.length.value - a.size.length.value;
                });
                break;
            case 'light-heavy':
                birds.sort(function compare(a, b) {
                    return a.size.weight.value - b.size.weight.value;
                });
                break;
            case 'heavy-light':
                birds.sort(function compare(a, b) {
                    return b.size.weight.value - a.size.weight.value;
                });
                break;
        }

        for (b in birds) {
            createBirdTextBox(
                "eachBirdBox",
                birds[b].photo.source,
                null,
                birds[b].primary_name,
                "Photo By " + birds[b].photo.credit,
                birds[b].english_name,
                birds[b].scientific_name,
                birds[b].order,
                birds[b].family,
                birds[b].status,
                birds[b].size.length.value + birds[b].size.length.units,
                birds[b].size.weight.value + birds[b].size.weight.units,
                "Scientific name ",
                "Order ",
                "Family ",
                "Status ",
                "Length ",
                "Weight ",
            )
        }
    }

    /** Function to filter birds by their conservation status, this function is also called by clickFunction */
    function sortStatus() {
        const input = document.getElementById('sort-cons')
        var consStatus = input.options[input.selectedIndex].value;

        switch (consStatus) {
            case 'all':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "inline");
                break;
            case 'notThreatened':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "none");
                document.querySelectorAll("#notThreatened").forEach(a => a.style.display = "inline");
                break;
            case 'naturallyUncommon':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "none");
                document.querySelectorAll("#naturallyUncommon").forEach(a => a.style.display = "inline");
                break;
            case 'relict':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "none");
                document.querySelectorAll("#relict").forEach(a => a.style.display = "inline");
                break;
            case 'recovering':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "none");
                document.querySelectorAll("#recovering").forEach(a => a.style.display = "inline");
                break;
            case 'declining':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "none");
                document.querySelectorAll("#declining").forEach(a => a.style.display = "inline");
                break;
            case 'nationallyIncreasing':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "none");
                document.querySelectorAll("#nationallyIncreasing").forEach(a => a.style.display = "inline");
                break;
            case 'nationallyVulnerable':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "none");
                document.querySelectorAll("#nationallyVulnerable").forEach(a => a.style.display = "inline");
                break;
            case 'nationallyEndangered':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "none");
                document.querySelectorAll("#nationallyEndangered").forEach(a => a.style.display = "inline");
                break;
            case 'nationallyCritical':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "none");
                document.querySelectorAll("#nationallyCritical").forEach(a => a.style.display = "inline");
                break;
            case 'dataDeficient':
                document.querySelectorAll(".eachBirdBox").forEach(a => a.style.display = "none");
                document.querySelectorAll("#dataDeficient").forEach(a => a.style.display = "inline");
                break;
        }
    }

    /** Has an eventListener for the button and calls all other methods for sorting */
    const btn = document.querySelector('button')
    btn.addEventListener("click", clickFunction);
    function clickFunction() {
        console.log("The button has been pressed");
        sortBirdsBy();
        sortStatus();
        searchBarFunction();
        minWeight();
        maxWeight();

    }
}

main();

/** Function which just empties main, when called the sortBirdsBy method 
 * will repopulate with whatever sorting method is chosen */
function reset() {
    let e = document.querySelector('main');
    e.innerHTML = "";
}


function newElement(type, className, content) {
    const e = document.createElement(type);
    e.setAttribute('class', className);
    e.textContent = content;
    return e;
}
