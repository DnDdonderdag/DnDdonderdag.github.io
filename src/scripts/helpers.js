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
    const fields = document.getElementsByClassName("calculated");
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const calculation = field.textContent;

        // Split calculation by lines and process each separately
        const lines = calculation.split('\n');
        const resultLines = lines.map(processCalculationLine);

        // Combine the results with preserved line structure
        field.value = resultLines.join('\n');
    }
}

function processCalculationLine(line) {
    // Skip empty lines but preserve them
    if (line.trim() === '') return '';

    // If no calculation markers are present, return the line as is
    if (!/[\[\]\+\-\*\/\d\.]/.test(line)) return line;

    // Extract all calculation parts (dice notation, numbers, references)
    const calculationRegex = /(\d+d\d+|\[[^\]]+\]|[\+\-\*\/]|\d+\.\d+|\d+)/g;
    const calcParts = [];
    const textParts = [];

    let lastIndex = 0;
    let match;

    while ((match = calculationRegex.exec(line)) !== null) {
        // Add text before this match
        textParts.push(line.substring(lastIndex, match.index));
        // Add this calculation part
        calcParts.push(match[0]);
        lastIndex = match.index + match[0].length;
    }

    // Add any remaining text
    textParts.push(line.substring(lastIndex));

    // If no calculation parts found, return original line
    if (calcParts.length === 0) return line;

    // Join all calculation parts and process them
    let calculationPart = calcParts.join('');

    // Replace all references
    const processedCalcPart = replaceReferences(calculationPart);
    const cleanedCalcPart = processedCalcPart.replaceAll("--", "+");

    // Process the calculation part to get dice and numeric results
    const result = processCalculationExpression(cleanedCalcPart);

    // Format the result
    const formattedResult = formatResult(result.dice, result.numeric);

    // Check if this is a pure calculation (all parts are calculation related)
    const isPureCalculation = textParts.every(part => part.trim() === '');

    if (isPureCalculation) {
        // If it's a pure calculation, return just the result without any surrounding text
        return formattedResult;
    } else {
        // Normalize spaces: trim right space from first part, trim left space from last part
        const firstPart = textParts[0].replace(/\s+$/, '');
        const lastParts = textParts.slice(1).join('').replace(/^\s+/, '');

        // Add a single space between text and calculation if needed
        const spacer = firstPart && firstPart.length > 0 ? ' ' : '';
        const endSpacer = lastParts && lastParts.length > 0 ? ' ' : '';

        return firstPart + spacer + formattedResult + endSpacer + lastParts;
    }
}

function processCalculationExpression(expression) {
    // Apply distributive multiplication over brackets first
    expression = processDistributiveMultiplication(expression);

    // Handle dice multiplication (e.g., 1d12*2 → 2d12 and 2*1d12 → 2d12)
    expression = processDiceMultiplication(expression);

    // Extract all dice notations
    const diceResults = {};
    const diceRegex = /(\d+)d(\d+)/g;
    let match;
    let diceReplaced = expression;

    while ((match = diceRegex.exec(expression)) !== null) {
        const count = parseInt(match[1]);
        const die = match[2];

        if (!diceResults[die]) diceResults[die] = 0;
        diceResults[die] += count;

        // Replace dice notation with 0 for evaluation
        diceReplaced = diceReplaced.replace(match[0], "0");
    }

    // Clean up the expression for evaluation
    const mathExpression = diceReplaced
        .replace(/\s*\+\s*\+\s*/g, "+")
        .replace(/^\s*\+\s*|\s*\+\s*$/g, "")
        .trim();

    // Evaluate the remaining mathematical expression
    let numericValue = 0;
    try {
        if (mathExpression) {
            numericValue = eval(mathExpression);
            if (isNaN(numericValue)) numericValue = 0;
        }
    } catch (e) {
        console.error("Error evaluating expression:", mathExpression, e);
    }

    return { dice: diceResults, numeric: numericValue };
}

/**
 * Process dice multiplication expressions (e.g., 1d12*2 → 2d12 and 2*1d12 → 2d12)
 * @param {string} expression - The calculation expression
 * @returns {string} - The expression with dice multiplication resolved
 */
function processDiceMultiplication(expression) {
    // First handle: <number>d<number>*<number> (right multiplication)
    const rightMultRegex = /(\d+)d(\d+)\s*\*\s*(\d+)/g;
    expression = expression.replace(rightMultRegex, (match, count, die, multiplier) => {
        const newCount = parseInt(count) * parseInt(multiplier);
        return `${newCount}d${die}`;
    });

    // Then handle: <number>*<number>d<number> (left multiplication)
    const leftMultRegex = /(\d+)\s*\*\s*(\d+)d(\d+)/g;
    expression = expression.replace(leftMultRegex, (match, multiplier, count, die) => {
        const newCount = parseInt(multiplier) * parseInt(count);
        return `${newCount}d${die}`;
    });

    return expression;
}

/**
 * Process distributive multiplication over brackets
 * e.g., 2*(1d6+3) → 2d6+6
 * @param {string} expression - The calculation expression
 * @returns {string} - The expression with distributive multiplication resolved
 */
function processDistributiveMultiplication(expression) {
    // Match pattern: <number>*(<expression>) or <number> * (<expression>)
    const distributiveRegex = /(\d+)\s*\*\s*\(([^()]+)\)/g;

    // Keep applying the transformation until no more matches are found
    let prevExpression = "";
    let currentExpression = expression;

    while (prevExpression !== currentExpression) {
        prevExpression = currentExpression;

        currentExpression = prevExpression.replace(distributiveRegex, (match, multiplier, innerExpression) => {
            const multiplierNum = parseInt(multiplier);

            // Process dice notation inside brackets (e.g., 2*(1d6) → 2d6)
            const diceRegex = /(\d+)d(\d+)/g;
            let diceProcessed = innerExpression.replace(diceRegex, (diceMatch, count, die) => {
                return `${parseInt(count) * multiplierNum}d${die}`;
            });

            // Process numeric terms inside brackets
            const numericRegex = /([\+\-])\s*(\d+)/g;
            let finalExpression = diceProcessed.replace(numericRegex, (numMatch, operator, number) => {
                return `${operator} ${parseInt(number) * multiplierNum}`;
            });

            // Handle the first term if it's a number without a sign
            const firstTermRegex = /^(\d+)/;
            finalExpression = finalExpression.replace(firstTermRegex, (termMatch, number) => {
                return `${parseInt(number) * multiplierNum}`;
            });

            return finalExpression;
        });
    }

    return currentExpression;
}

function formatResult(dice, numericValue) {
    // Format dice part
    const diceParts = [];
    for (const [die, count] of Object.entries(dice)) {
        if (count > 0) {
            diceParts.push(`${count}d${die}`);
        }
    }

    const diceString = diceParts.join(' + ');

    // If we only have numeric value
    if (!diceString) {
        return numericValue === 0 ? "0" : numericValue.toString();
    }

    // If we have dice but no numeric value or numeric value is 0
    if (numericValue === 0) {
        return diceString;
    }

    // If we have both dice and numeric value
    const sign = numericValue > 0 ? " + " : " - ";
    return `${diceString}${sign}${Math.abs(numericValue)}`;
}

function replaceReferences(line) {
    let processedLine = line;
    // Use a regex to find all bracketed references, including those with spaces
    const referenceRegex = /\[([^\]]+)\]/g;
    let match;

    // Keep replacing until no more matches are found
    while ((match = referenceRegex.exec(processedLine)) !== null) {
        const fullMatch = match[0]; // e.g., "[EXPERIENCE POINTS tab]"
        const replacementId = match[1]; // e.g., "EXPERIENCE POINTS tab"

        try {
            // Attempt to find the element by its ID
            const element = document.getElementById(replacementId);
            if (!element) {
                // If element not found directly, try replacing spaces with underscores or removing them
                // This part depends on how IDs with spaces are actually handled/stored.
                // Assuming IDs might have spaces replaced or removed:
                let potentialId = replacementId.replace(/\s+/g, '_'); // Try with underscores
                let elementAlt = document.getElementById(potentialId);
                if (!elementAlt) {
                    potentialId = replacementId.replace(/\s+/g, ''); // Try with spaces removed
                    elementAlt = document.getElementById(potentialId);
                }

                if (!elementAlt) throw new Error(`Element with ID variations for "${replacementId}" not found`);
                // Use the found alternative element
                element = elementAlt;
            }


            let replacementText = element.value;
            // Ensure we get a numeric value if possible, preserving decimal points
            const numericValue = parseFloat(replacementText);
            const replacement = (replacementText === "" || isNaN(numericValue)) ? "0" : numericValue.toString();
            // Replace only the first occurrence in this iteration to avoid issues with nested/repeated patterns
            processedLine = processedLine.replace(fullMatch, replacement);
            // Reset regex lastIndex to restart search from the beginning after replacement
            referenceRegex.lastIndex = 0;
        } catch (e) {
            console.warn(`Could not find element or value for reference: ${replacementId}. Replacing with "0". Error: ${e.message}`);
            processedLine = processedLine.replace(fullMatch, "0");
            // Reset regex lastIndex
            referenceRegex.lastIndex = 0;
        }
    }


    return processedLine;
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