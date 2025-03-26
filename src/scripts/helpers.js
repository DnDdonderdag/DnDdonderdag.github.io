/**************************************************
 * MODULE 0: HELPER FUNCTIONS
 * Utility functions used throughout the application
 **************************************************/

function update(exception) {
    //updates lookups
    if (exception != "typing") { updateLookups() }

    //updates the sizes of textareas so they fit in their frame
    var ids = document.getElementsByClassName("sizeadjust")
    for (let i = 0; i < ids.length; i++) {
        sizeadjust(ids[i].id)
    }

    //updates the sizes of inputareas so they fit in their frame
    var ids = document.getElementsByClassName("sizeadjustinput")
    for (let i = 0; i < ids.length; i++) {

        boxlength = window.getComputedStyle(ids[i]).getPropertyValue("--boxlength")
        startfont = window.getComputedStyle(ids[i]).getPropertyValue("--startfont")
        sizeadjustinput(ids[i].id, boxlength, startfont)
    }

    //updates all the generic buttons
    updategenericbuttons()
    //updates all the calculated fields
    if (exception != "typing") { updateCalculatedFields() }
    //updates the sidebar to reflect chosen archetype
    changeSidebar()
}

function sizeadjust(name) {
    //adjust formfield textsize on the fly
    let textArea = document.getElementById(name);
    var style = window.getComputedStyle(textArea, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style);
    while (fontSize < 14) {
        var style = window.getComputedStyle(textArea, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style);
        textArea.style.fontSize = fontSize + 0.1 + 'px'
        if (textArea.clientHeight < textArea.scrollHeight) {
            textArea.style.fontSize = fontSize - 0.1 + 'px';
            break
        }
    }
    while (textArea.clientHeight < textArea.scrollHeight) {
        var style = window.getComputedStyle(textArea, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style);
        textArea.style.fontSize = fontSize - 0.1 + 'px';
    }
}

function sizeadjustinput(id, boxlength, startfont) {
    let invisdiv = document.getElementById("invisdiv");
    boxlength = parseInt(boxlength)
    if (!invisdiv) {
        const invisdiv = document.createElement("div");
        invisdiv.id = "invisdiv"
        const currentDiv = document.getElementById("index");
        document.body.insertBefore(invisdiv, null);
    } else {
        let inputarea = document.getElementById(id);
        var style = window.getComputedStyle(inputarea, null).getPropertyValue('font-size');
        var fontSize = style
        invisdiv.style.fontSize = fontSize
        inputarea.style.fontSize = fontSize
        invisdiv.innerText = inputarea.value
        while (invisdiv.clientWidth < boxlength && Number(fontSize.slice(0, -2)) < startfont) {
            var style = window.getComputedStyle(inputarea, null).getPropertyValue('font-size');
            var fontSize = String(Number(style.slice(0, -2)) + 0.1) + "px"
            invisdiv.style.fontSize = fontSize
            inputarea.style.fontSize = fontSize
        }
        while (invisdiv.clientWidth > boxlength) {
            var style = window.getComputedStyle(inputarea, null).getPropertyValue('font-size');
            var fontSize = String(Number(style.slice(0, -2)) - 0.1) + "px"
            invisdiv.style.fontSize = fontSize
            inputarea.style.fontSize = fontSize
        }
    }
}

function updategenericbuttons() {
    buttons = document.getElementsByClassName("genericbutton")
    for (let i = 0; i < buttons.length; i++) {
        button = buttons[i]
        if (button.value == 0) { button.style.setProperty('background-color', '#dde4ff'); }
        else if (button.value == 1) { button.style.setProperty('background-color', 'grey'); }
    }
    checkmarks = document.getElementsByClassName("checkmarkbutton")
    for (let i = 0; i < checkmarks.length; i++) {
        button = checkmarks[i]
        if (button.value == 0) { button.textContent = ""; }
        else if (button.value == 1) { button.textContent = "◆"; }
    }
}

function updateCalculatedFields() {
    fields = document.getElementsByClassName("calculated")
    for (let i = 0; i < fields.length; i++) {
        field = fields[i]
        calculation = field.textContent
        count = (calculation.match(/\[/g) || []).length;
        for (let i = 0; i < count; i++) {
            start = calculation.indexOf("[")
            finish = calculation.indexOf("]")
            replacementid = calculation.slice(start + 1, finish)
            try {
                replacementtext = document.getElementById(replacementid).value
                replacement = (replacementtext == "") ? (0) : (replacementtext)
                calculation = calculation.replace(calculation.slice(start, finish + 1), replacement)
            }
            catch { replacementtext = "" }
        }

        calculation = calculation.replaceAll("--", "+")

        // Process and combine dice notation
        const diceCounts = {};
        const diceRegex = /(\d+)d(\d+)/g;
        let match;
        let modifiedCalculation = calculation;

        // Extract all dice references
        while ((match = diceRegex.exec(calculation)) !== null) {
            const count = parseInt(match[1]);
            const die = match[2];

            if (!diceCounts[die]) {
                diceCounts[die] = 0;
            }
            diceCounts[die] += count;

            // Remove the dice notation from the calculation
            modifiedCalculation = modifiedCalculation.replace(match[0], "");
        }

        // Clean up the remaining calculation (remove extra operators)
        modifiedCalculation = modifiedCalculation.replace(/\s*\+\s*\+\s*/g, "+").replace(/^\s*\+\s*|\s*\+\s*$/g, "");

        // Evaluate the non-dice part
        let numericValue = 0;
        if (modifiedCalculation.trim() !== "") {
            try {
                numericValue = eval(modifiedCalculation);
            } catch (error) {
                field.value = calculation; // Return original if evaluation fails
                continue;
            }
        }

        // Build the final result
        let result = "";
        for (const die in diceCounts) {
            if (diceCounts[die] > 0) {
                result += (result ? " + " : "") + diceCounts[die] + "d" + die;
            }
        }

        if (numericValue !== 0) {
            result += (numericValue > 0 ? " + " : " - ") + Math.abs(numericValue);
        }

        if (result === "") {
            field.value = calculation; // If we couldn't parse anything, return original
        } else {
            field.value = result;
        }
    }
}

function updatemodifier() {
    //this function updates the modifier value based on the value of the score. see createabilityboxes.
    var score = Number(this.value)
    var modifier = Math.floor((score - 10) / 2)
    if (modifier >= 0) {
        modifier = "+" + String(modifier)
    } else {
        modifier = String(modifier)
    }
    if (isNaN(modifier)) { modifier = "?" }
    document.getElementById(this.id.slice(0, -5) + "mod").value = modifier

}

function skillprof() {
    if (this.value == 0) {
        this.value = 1
        this.style.setProperty("background-color", "grey")
    }
    else if (this.value == 1) {
        this.value = 0
        this.style.setProperty('background-color', 'white')
    }
    update()
}

function skillexp() {
    if (this.value == 0) {
        this.value = 1
        this.style.setProperty("background-color", "grey")
    }
    else if (this.value == 1) {
        this.value = 0
        this.style.setProperty('background-color', 'white')
    }
    update()
}

function genericbuttonclick() {
    if (this.value == 0) {
        this.value = 1
        this.style.setProperty("background-color", "grey")
    }
    else if (this.value == 1) {
        this.value = 0
        this.style.setProperty("background-color", "#dde4ff")
    }
    update()
}

function genericcheckmarkclick() {
    if (this.value == 0) {
        this.value = 1;
        this.textContent = "◆";
    }
    else if (this.value == 1) { // Fixed == instead of =
        this.value = 0;
        this.textContent = "";
    }
    updateSyncedFields(this);
    update();
}

function entercalc() {
    show = this.value
    calculation = this.textContent
    this.value = calculation
    this.textContent = show
}

function unfocusfunc(el, condition) {
    if (condition.includes("calc")) { exitcalc(el) }
    if (condition.includes("sync")) { updateSyncedFields(el) }
    if (condition.includes("update")) { update() }

}

function exitcalc(el) {
    calculation = el.value
    show = el.textContent
    el.value = show
    el.textContent = calculation
}

function updateSyncedFields(field) {
    syncedfields = document.getElementsByClassName("sync")
    content = field.textContent
    value = field.value
    for (let i = 0; i < syncedfields.length; i++) {
        if (syncedfields[i].id.slice(0, -1) == field.id.slice(0, -1)) {
            syncedfields[i].textContent = content
            syncedfields[i].value = value
        }
    }
}

function changeSidebar() {
    el = document.getElementById("attacksheetdropdown")
    sidebarElements = document.getElementsByClassName("sidebar")
    for (let i = 0; i < sidebarElements.length; i++) {
        sidebarElements[i].style.opacity = "0"
        sidebarElements[i].disabled = true;
        sidebarElements[i].style.zIndex = "-100"
    }
    sidebarElements = document.getElementsByClassName(el.value)
    for (let i = 0; i < sidebarElements.length; i++) {
        sidebarElements[i].style.opacity = "1"
        sidebarElements[i].disabled = false;
        sidebarElements[i].style.zIndex = "100"
        if (sidebarElements[i].className.includes("spellbar")) { sidebarElements[i].style.zIndex = "99" }
    }
}

function updateLookups() {
    results = document.getElementsByClassName("lookup")
    for (let i = 0; i < results.length; i++) {
        result = results[i]
        entry = document.getElementById("lookupentry" + result.id.slice(-3))
        query = entry.value.toLowerCase().replaceAll(" ", "").replaceAll("-", "").replaceAll("'", "").replaceAll("/", "")
        output = ""
        if (query != "") {
            try {
                output += entry.value + "\n"
                output += "Level: " + spellObject[query]["level"] + "\n"
                output += "Casting Time: " + spellObject[query]["castingtime"] + "\n"
                output += "Range: " + spellObject[query]["range"] + "\n"
                output += "Components: " + spellObject[query]["components"] + "\n"
                output += "Duration: " + spellObject[query]["duration"] + "\n"
                output += "\n " + spellObject[query]["description"]

            }
            catch { output = "not recognized" }
        }
        result.value = output

        //acidsplash:{components:"V,S",duration:"Instantaneous",level:"0",range:"60 ft",castingtime:"1 Action",school:"Conjuration",description:"ddd"}
    }
}

function healscript() {
    hp = document.getElementById("currenthitpoints1");
    total = document.getElementById("totalhitpoints1");
    hp.value = total.value;
    unfocusfunc(hp, "sync update")
}

function healscriptcompanion() {
    hp = document.getElementById("currenthitpointscompanion");
    total = document.getElementById("totalhitpointscompanion");
    hp.value = total.value;
    unfocusfunc(hp, "sync update")
}

function plusonescript() {
    num = this.id.slice(-1)
    charges = document.getElementById("currentcharges" + String(num))
    max = document.getElementById("maxcharges" + String(num))
    charges.value = Number(charges.value) + 1

}

function minusonescript() {
    num = this.id.slice(-1)
    charges = document.getElementById("currentcharges" + String(num))
    max = document.getElementById("maxcharges" + String(num))
    charges.value = Number(charges.value) - 1

}

function recoverscript() {
    num = this.id.slice(-1)
    charges = document.getElementById("currentcharges" + String(num))
    max = document.getElementById("maxcharges" + String(num))
    charges.value = max.value
}

function checkAlt(event) {
    if (event.code === "AltRight" && document.activeElement != document.body) {
        el = document.activeElement
        tooltip = document.getElementById(el.id + "tooltip")
        tooltip.style.opacity = 1 - tooltip.style.opacity
        tooltip.style.zIndex = 1000 - tooltip.style.zIndex
    }
}

function createTooltips() {
    const tooltipsdiv = document.createElement("div");
    tooltipsdiv.className = "tooltips";

    // Check for existing invisdiv using getElementById instead
    let invisdiv = document.getElementById("invisdiv");

    if (!invisdiv) {
        invisdiv = document.createElement("div");
        invisdiv.id = "invisdiv";
        document.body.appendChild(invisdiv);
    }

    const fields = document.getElementsByClassName("save");
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const tooltip = createDiv(
            field.getBoundingClientRect().top,
            field.getBoundingClientRect().left,
            20,
            30,
            field.id,
            12,
            "#e7e8e8",
            "left",
            tooltipsdiv,
            "",
            field.id + 'tooltip'
        );

        tooltip.style.opacity = 0;
        tooltip.style.zIndex = -1;
        invisdiv.style.fontSize = "12px";
        invisdiv.innerText = tooltip.textContent;
        tooltip.style.width = invisdiv.clientWidth + "px";
    }

    document.body.appendChild(tooltipsdiv);
}

function synchronizeNames(sourceId = "charactername") {
    const fields = [
        document.getElementById("charactername"),
        document.getElementById("charactername_2"),
        document.getElementById("charactername_3")
    ];

    // Get the value from the source field
    const sourceValue = fields.find(f => f && f.id === sourceId)?.value || "";

    // Update all other fields
    fields.forEach(field => {
        if (field && field.id !== sourceId) {
            field.value = sourceValue;
        }
    });
}

function synchronizePhenome(sourceId = "") {
    const tabs = ["age", "height", "weight", "eyes", "skin", "hair"]

    // Replace Python-style loop with JavaScript syntax
    tabs.forEach(tab => {
        tabId = tab.toUpperCase() + " tab" + sourceId;

        const fields = [
            document.getElementById(tab.toUpperCase() + " tab"),
            document.getElementById(tab.toUpperCase() + " tab" + "_2")
        ]

        // Get the value from the source field
        const sourceValue = fields.find(f => f && f.id === tabId)?.value || "";

        // Update all other fields
        fields.forEach(field => {
            if (field && field.id !== tabId) {
                field.value = sourceValue;
            }
        });
    });
}