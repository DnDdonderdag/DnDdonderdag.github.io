// Listening functions

/**
 * Updates the ability score modifier based on the score value
 */
function updatemodifier() {
    const score = Number(this.value);
    let modifier = Math.floor((score - 10) / 2);

    if (isNaN(modifier)) {
        modifier = '?';
    } else if (modifier >= 0) {
        modifier = '+' + modifier;
    } else {
        modifier = String(modifier);
    }

    document.getElementById(this.id.slice(0, -5) + 'mod').value = modifier;
}

/**
 * Toggles skill proficiency status
 */
function skillprof() {
    if (this.value === '0') {
        this.value = '1';
        this.style.setProperty('background-color', 'grey');
    } else if (this.value === '1') {
        this.value = '0';
        this.style.setProperty('background-color', 'white');
    }
    update();
}

/**
 * Toggles skill expertise status
 */
function skillexp() {
    if (this.value === '0') {
        this.value = '1';
        this.style.setProperty('background-color', 'grey');
    } else if (this.value === '1') {
        this.value = '0';
        this.style.setProperty('background-color', 'white');
    }
    update();
}

/**
 * Generic button click handler for toggling button state
 */
function genericbuttonclick() {
    if (this.value === '0') {
        this.value = '1';
        this.style.setProperty('background-color', 'grey');
    } else if (this.value === '1') {
        this.value = '0';
        this.style.setProperty('background-color', '#dde4ff');
    }
    update();
}

/**
 * Generic checkmark click handler for toggling checkmark state
 */
function genericcheckmarkclick() {
    if (this.value === '0') {
        this.value = '1';
        this.textContent = '◆';
    } else if (this.value === '1') {
        this.value = '0';
        this.textContent = '';
    }
    updateSyncedFields(this);
    update();
}

/**
 * Switches between calculation and display values
 */
function entercalc() {
    const show = this.value;
    const calculation = this.textContent;
    this.value = calculation;
    this.textContent = show;
}

/**
 * Handles unfocus events based on provided conditions
 */
function unfocusfunc(el, condition) {
    if (condition.includes('calc')) { exitcalc(el); }
    if (condition.includes('sync')) { updateSyncedFields(el); }
    if (condition.includes('update')) { update(); }
}

/**
 * Exits calculation mode
 */
function exitcalc(el) {
    const calculation = el.value;
    const show = el.textContent;
    el.value = show;
    el.textContent = calculation;
}

/**
 * Updates all fields synced with the provided field
 */
function updateSyncedFields(field) {
    const syncedfields = document.getElementsByClassName('sync');
    const content = field.textContent;
    const value = field.value;
    const fieldPrefix = field.id.slice(0, -1);

    for (let i = 0; i < syncedfields.length; i++) {
        if (syncedfields[i].id.slice(0, -1) === fieldPrefix) {
            syncedfields[i].textContent = content;
            syncedfields[i].value = value;
        }
    }
}

/**
 * Changes the visible sidebar based on dropdown selection
 */
function changeSidebar() {
    const el = document.getElementById('attacksheetdropdown');
    const sidebarElements = document.getElementsByClassName('sidebar');

    // Hide all sidebar elements
    for (let i = 0; i < sidebarElements.length; i++) {
        sidebarElements[i].style.opacity = '0';
        sidebarElements[i].disabled = true;
        sidebarElements[i].style.zIndex = '-100';
    }

    // Show elements of the selected class
    const selectedElements = document.getElementsByClassName(el.value);
    for (let i = 0; i < selectedElements.length; i++) {
        selectedElements[i].style.opacity = '1';
        selectedElements[i].disabled = false;
        selectedElements[i].style.zIndex = '100';

        if (selectedElements[i].className.includes('spellbar')) {
            selectedElements[i].style.zIndex = '99';
        }
    }
}

/**
 * Updates spell lookup results based on input
 */
function updateLookups() {
    const results = document.getElementsByClassName('lookup');

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const entry = document.getElementById('lookupentry' + result.id.slice(-3));
        const query = entry.value.toLowerCase()
            .replaceAll(' ', '')
            .replaceAll('-', '')
            .replaceAll("'", '')
            .replaceAll('/', '');

        let output = '';

        if (query !== '') {
            try {
                const spell = spellObject[query];
                output += `${entry.value}\n`;
                output += `Level: ${spell.level}\n`;
                output += `Casting Time: ${spell.castingtime}\n`;
                output += `Range: ${spell.range}\n`;
                output += `Components: ${spell.components}\n`;
                output += `Duration: ${spell.duration}\n`;
                output += `\n ${spell.description}`;
            } catch (error) {
                output = 'not recognized';
            }
        }

        result.value = output;
    }
}

/**
 * Restores hit points to maximum
 */
function healscript() {
    const hp = document.getElementById('currenthitpoints1');
    const total = document.getElementById('totalhitpoints1');
    hp.value = total.value;
    unfocusfunc(hp, 'sync update');
}

/**
 * Restores companion hit points to maximum
 */
function healscriptcompanion() {
    const hp = document.getElementById('currenthitpointscompanion');
    const total = document.getElementById('totalhitpointscompanion');
    hp.value = total.value;
    unfocusfunc(hp, 'sync update');
}

/**
 * Increases charges by one
 */
function plusonescript() {
    const num = this.id.slice(-1);
    const charges = document.getElementById('currentcharges' + num);
    charges.value = Number(charges.value) + 1;
}

/**
 * Decreases charges by one
 */
function minusonescript() {
    const num = this.id.slice(-1);
    const charges = document.getElementById('currentcharges' + num);
    charges.value = Number(charges.value) - 1;
}

/**
 * Restores charges to maximum
 */
function recoverscript() {
    const num = this.id.slice(-1);
    const charges = document.getElementById('currentcharges' + num);
    const max = document.getElementById('maxcharges' + num);
    charges.value = max.value;
}

/**
 * Handles control key press for displaying tooltips
 */
function checkControl(event) {
    if (event.key === 'Alt' && document.activeElement !== document.body) {
        const el = document.activeElement;
        const tooltip = document.getElementById(el.id + 'tooltip');

        if (tooltip) {
            tooltip.style.opacity = 1 - tooltip.style.opacity;
            tooltip.style.zIndex = 1000 - tooltip.style.zIndex;
        }
    }
}

/**
 * Creates tooltips for fields with the 'save' class
 */
function createTooltips() {
    const tooltipsdiv = document.createElement('div');
    tooltipsdiv.className = 'tooltips';

    let invisdiv = document.getElementById('invisdiv');
    if (!invisdiv) {
        invisdiv = document.createElement('div');
        invisdiv.id = 'invisdiv';
        document.body.appendChild(invisdiv);
    }

    const fields = document.getElementsByClassName('save');
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const tooltip = createDiv(
            field.getBoundingClientRect().top,
            field.getBoundingClientRect().left,
            20, 30, field.id, 12, '#e7e8e8',
            'left', tooltipsdiv, '',
            field.id + 'tooltip'
        );

        tooltip.style.opacity = 0;
        tooltip.style.zIndex = -1;
        invisdiv.style.fontSize = '12px';
        invisdiv.innerText = tooltip.textContent;
        tooltip.style.width = invisdiv.clientWidth + 'px';
    }

    document.body.appendChild(tooltipsdiv);
}