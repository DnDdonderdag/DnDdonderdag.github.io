/**************************************************
 * MODULE 2: HEADER COMPONENTS
 * Object-oriented implementation for page headers
 **************************************************/

class Header {
    constructor(top, left, svgPath) {
        this.top = top;
        this.left = left;
        this.svgPath = svgPath;
        this.maindiv = document.createElement("div");
        this.maindiv.className = "header";
    }

    render() {
        // Create the header image
        const headerchar = document.createElement("img");
        headerchar.className = "header not-selectable";
        headerchar.src = this.svgPath;
        headerchar.alt = "headerchar";
        headerchar.draggable = false;
        headerchar.style = `--top:${this.top}px; --left:${this.left}px;`;
        this.maindiv.appendChild(headerchar);

        // Add the header to the document
        const currentDiv = document.getElementById("index");
        document.body.insertBefore(this.maindiv, null);

        // Additional rendering to be implemented by subclasses
        this.renderContent();

        return this.maindiv;
    }

    renderContent() {
        // To be implemented by subclasses
    }

    createText(topOffset, leftOffset, height, width, text, fontSize, color, align, parent = this.maindiv) {
        return createText(this.top + topOffset, this.left + leftOffset, height, width, text, fontSize, color, align, parent);
    }

    createFormField(topOffset, leftOffset, height, width, id, type, fontSize, bgColor, align, parent = this.maindiv, readonly = false, placeholder = "", spellcheck = false) {
        return createFormField(this.top + topOffset, this.left + leftOffset, height, width, id, type, fontSize, bgColor, align, parent, readonly, placeholder, spellcheck);
    }

    createCharacterNameInput(topOffset, leftOffset, boxLength, startFont, id, synchronizeCallback) {
        const characternameform = document.createElement("input");
        characternameform.className = "charnameform save not-selectable sizeadjustinput";
        characternameform.id = id;
        characternameform.style = `--top:${this.top + topOffset}px; --left:${this.left + leftOffset}px; --boxlength:${boxLength}; --startfont:${startFont}`;
        characternameform.spellcheck = false;
        characternameform.onkeyup = synchronizeCallback;
        this.maindiv.appendChild(characternameform);
        return characternameform;
    }

    createTabs(tabs, topOffset, leftOffset, rowHeight, colWidth, createCallback) {
        for (let i = 0; i < tabs.length; i++) {
            const row = Math.floor(i / 3);
            const col = i % 3;

            const tabname = document.createElement("div");
            tabname.className = "headertab not-selectable";
            tabname.style = `--top:${this.top + topOffset + row * rowHeight}px; --left:${this.left + leftOffset + col * colWidth}px;`;
            tabname.textContent = tabs[i].toUpperCase();
            this.maindiv.appendChild(tabname);

            if (createCallback) {
                createCallback(tabs[i], row, col);
            }
        }
    }
}

class CharacterSheet1Header extends Header {
    constructor(top, left) {
        super(top, left, "assets/svg/headerP1.svg");
    }

    renderContent() {
        // Character name input
        const characternameform = this.createCharacterNameInput(51, 40, 160, 18, "charactername", function () {
            synchronizeNames(this.id);
            update();
        });

        // Tabs
        const tabs = ["class & level", "background", "player name", "race", "alignment", "experience points"];
        this.createTabs(tabs, 54, 290, 29, 110, (tab, row, col) => {
            const headertabform = document.createElement("input");
            headertabform.className = "headertabform save not-selectable sizeadjustinput";
            headertabform.id = tab.toUpperCase() + " tab";
            headertabform.style = `--top:${this.top + 38 + row * 29}px; --left:${this.left + 290 + col * 110}px; --boxlength:90; --startfont:11`;
            headertabform.spellcheck = false;
            headertabform.onkeyup = function () { update(); };
            this.maindiv.appendChild(headertabform);
        });

        // Character name label
        this.createText(83, 66, 20, 70, "CHARACTER NAME", 8, "#000000", "left");

        // Save button
        const save = document.createElement("button");
        save.className = "savebutton not-selectable";
        save.textContent = "Save";
        save.style = `--top:${this.top}px; --left:${this.left + 370}px; --height:22px; --width:50px`;
        save.draggable = false;
        save.onclick = function () { savestate(); };
        this.maindiv.appendChild(save);

        // Browse/Load button
        const browse = document.createElement("input");
        browse.type = "file";
        browse.className = "browsebutton not-selectable";
        browse.id = "loadstate";
        browse.textContent = "Browse...";
        browse.style = `--top:${this.top}px; --left:${this.left + 420}px; --height:22px; --width:210px`;
        browse.draggable = false;
        browse.accept = "application/JSON";
        browse.addEventListener('change', unpackjson, false);
        this.maindiv.appendChild(browse);
    }
}

class SpellcastingHeader extends Header {
    constructor(top, left) {
        super(top, left, "assets/svg/headerP2.svg");
    }

    renderContent() {
        // Spellcasting class input
        const spellcastingclassform = document.createElement("input");
        spellcastingclassform.className = "charnameform save not-selectable sizeadjustinput";
        spellcastingclassform.id = "spellcastingclass";
        spellcastingclassform.style = `--top:${this.top + 71}px; --left:${this.left + 40}px; --boxlength:160; --startfont:18`;
        spellcastingclassform.spellcheck = false;
        spellcastingclassform.onkeyup = function () { update(); };
        this.maindiv.appendChild(spellcastingclassform);

        // Label for spellcasting class
        this.createText(103, 66, 20, 70, "SPELLCASTING CLASS", 8, "#000000", "left");

        // Spell related form fields
        this.createFormField(60, 294, 61, 28, "PREPARED SPELL AMOUNT", "input", 20, "#dde4ff", "center", this.maindiv, true, "", false);
        this.createFormField(60, 377, 61, 28, "SPELLCASTING ABILITY1", "input", 20, "#dde4ff", "center", this.maindiv, false, "", true);
        this.createFormField(60, 460, 61, 28, "SPELL SAVE DC1", "input", 20, "#dde4ff", "center", this.maindiv, true, "[mod]+ 8 + [PROF]", true);
        this.createFormField(60, 543, 61, 28, "SPELL ATTACK BONUS1", "input", 20, "#dde4ff", "center", this.maindiv, true, "[mod] + [PROF]", true);

        // Labels for spell fields
        this.createText(95, 294, 28, 65, "PREPARED SPELL AMOUNT", 7, "#000000", "center");
        this.createText(95, 377, 28, 65, "SPELLCASTING ABILITY", 7, "#000000", "center");
        this.createText(95, 460, 28, 65, "SPELL SAVE DC", 7, "#000000", "center");
        this.createText(95, 543, 28, 65, "SPELL ATTACK BONUS", 7, "#000000", "center");
    }
}

// Additional header classes can be implemented similarly...

// Factory function to create header by page number
function createHeader(pageNumber, top, left) {
    let header;

    switch (pageNumber) {
        case 1:
            header = new CharacterSheet1Header(top, left);
            break;
        case 2:
            header = new SpellcastingHeader(top, left);
            break;
        // Add cases for other page types
        default:
            throw new Error(`Header for page ${pageNumber} not implemented`);
    }

    return header.render();
}

// Maintaining backward compatibility
function createHeaderpage1(top, left) {
    return createHeader(1, top, left);
}

function createHeaderpage2(top, left) {
    return createHeader(2, top, left);
}

// Implement the remaining header creation functions similarly...
