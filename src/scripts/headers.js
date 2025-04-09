/**************************************************
 * MODULE 2: HEADER COMPONENTS
 * Functions for creating page headers
 **************************************************/

function createHeaderpage1(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "header"

    const headerchar = document.createElement("img");
    headerchar.className = "header not-selectable"
    headerchar.src = "assets/svg/headerP1.svg";
    headerchar.alt = "headerchar";
    headerchar.draggable = false;
    headerchar.style = "--top:" + String(top) + "px; --left:" + String(left) + "px;"
    maindiv.appendChild(headerchar);
    const currentDiv = document.getElementById("index");
    document.body.insertBefore(maindiv, null);

    const characternameform = document.createElement("input");
    characternameform.className = "charnameform save not-selectable sizeadjustinput";
    characternameform.id = "charactername"
    characternameform.style = "--top:" + String(top + 51) + "px; --left:" + String(left + 40) + "px; --boxlength:" + String(160) + "; --startfont:" + String(18)
    characternameform.spellcheck = false
    characternameform.onkeyup = function () {
        synchronizeNames(characternameform.id);
        update();
    };
    maindiv.appendChild(characternameform);

    tabs = ["class & level", "background", "player name", "race", "alignment", "experience points"]
    for (let i = 0; i < tabs.length; i++) {
        const tabname = document.createElement("div");
        tabname.className = "headertab not-selectable"
        tabname.style = "--top:" + String(top + 54 + Math.floor(i / 3) * 29) + "px; --left:" + String(left + 290 + i % 3 * 110) + "px;"
        tabname.textContent = tabs[i].toUpperCase()
        maindiv.appendChild(tabname);

        const headertabform = document.createElement("input");
        headertabform.className = "headertabform save not-selectable sizeadjustinput";
        headertabform.id = tabs[i].toUpperCase() + " tab"
        headertabform.style = "--top:" + String(top + 38 + Math.floor(i / 3) * 29) + "px; --left:" + String(left + 290 + i % 3 * 110) + "px; --boxlength:" + String(90) + "; --startfont:" + String(11)
        headertabform.spellcheck = false
        headertabform.onkeyup = function () { update() };
        maindiv.appendChild(headertabform);
    }
    createText(top + 83, left + 66, 20, 70, "CHARACTER NAME", 8, "#000000", "left", maindiv)

    const save = document.createElement("button");
    save.className = "savebutton not-selectable"
    save.textContent = "Save"
    save.style = "--top:" + String(top) + "px; --left:" + String(left + 370) + "px; --height:" + String(22) + "px; --width:" + String(50) + "px"
    save.draggable = false;
    save.onclick = function () { savestate() }
    maindiv.appendChild(save);

    const browse = document.createElement("input");
    browse.type = "file"
    browse.className = "browsebutton not-selectable"
    browse.id = "loadstate"
    browse.textContent = "Browse..."
    browse.style = "--top:" + String(top) + "px; --left:" + String(left + 420) + "px; --height:" + String(22) + "px; --width:" + String(210) + "px"
    browse.draggable = false;
    browse.accept = "application/JSON"
    browse.addEventListener('change', unpackjson, false);
    maindiv.appendChild(browse);

}

function createHeaderpage2(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "header"

    const headerchar = document.createElement("img");
    headerchar.className = "header not-selectable"
    headerchar.src = "assets/svg/headerP2.svg";
    headerchar.alt = "headerchar";
    headerchar.draggable = false;
    headerchar.style = "--top:" + String(top) + "px; --left:" + String(left) + "px;"
    maindiv.appendChild(headerchar);
    const currentDiv = document.getElementById("index");
    document.body.insertBefore(maindiv, null);

    const spellcastingclassform = document.createElement("input");
    spellcastingclassform.className = "charnameform save not-selectable sizeadjustinput";
    spellcastingclassform.id = "spellcastingclass"
    spellcastingclassform.style = "--top:" + String(top + 71) + "px; --left:" + String(left + 40) + "px; --boxlength:" + String(160) + "; --startfont:" + String(18)
    spellcastingclassform.spellcheck = false
    spellcastingclassform.onkeyup = function () { update() };
    maindiv.appendChild(spellcastingclassform);

    createText(top + 103, left + 66, 20, 70, "SPELLCASTING CLASS", 8, "#000000", "left", maindiv)

    createFormField(top + 60, left + 294, 61, 28, "PREPARED SPELL AMOUNT", "input", 20, "#dde4ff", "center", maindiv, true, "", false)
    createFormField(top + 60, left + 377, 61, 28, "SPELLCASTING ABILITY1", "input", 20, "#dde4ff", "center", maindiv, false, "", true)
    createFormField(top + 60, left + 460, 61, 28, "SPELL SAVE DC1", "input", 20, "#dde4ff", "center", maindiv, true, "[mod]+ 8 + [PROF]", true)
    createFormField(top + 60, left + 543, 61, 28, "SPELL ATTACK BONUS1", "input", 20, "#dde4ff", "center", maindiv, true, "[mod] + [PROF]", true)

    createText(top + 95, left + 294, 28, 65, "PREPARED SPELL AMOUNT", 7, "#000000", "center", maindiv)
    createText(top + 95, left + 377, 28, 65, "SPELLCASTING ABILITY", 7, "#000000", "center", maindiv)
    createText(top + 95, left + 460, 28, 65, "SPELL SAVE DC", 7, "#000000", "center", maindiv)
    createText(top + 95, left + 543, 28, 65, "SPELL ATTACK BONUS", 7, "#000000", "center", maindiv)

}

function createHeaderpage3(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "header"

    const headerchar = document.createElement("img");
    headerchar.className = "header not-selectable"
    headerchar.src = "assets/svg/headerP3.svg";
    headerchar.alt = "headerchar";
    headerchar.draggable = false;
    headerchar.style = "--top:" + String(top) + "px; --left:" + String(left) + "px;"
    maindiv.appendChild(headerchar);
    const currentDiv = document.getElementById("index");
    document.body.insertBefore(maindiv, null);

    createFormField(top + 57, left + 85, 61, 28, "SPELLCASTING ABILITY2", "input", 20, "#dde4ff", "center", maindiv, false, "", true)
    createFormField(top + 57, left + 196, 61, 28, "SPELL SAVE DC2", "input", 20, "#dde4ff", "center", maindiv, true, "[mod]+ 8 + [PROF]", true)
    createFormField(top + 57, left + 309, 61, 28, "SPELL ATTACK BONUS2", "input", 20, "#dde4ff", "center", maindiv, true, "[mod] + [PROF]", true)

    createText(top + 92, left + 85, 28, 65, "SPELLCASTING ABILITY", 7, "#000000", "center", maindiv)
    createText(top + 92, left + 196, 28, 65, "SPELL SAVE DC", 7, "#000000", "center", maindiv)
    createText(top + 92, left + 309, 28, 65, "SPELL ATTACK BONUS", 7, "#000000", "center", maindiv)

}

function createHeaderpage4(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "header"

    const headerchar = document.createElement("img");
    headerchar.className = "header not-selectable"
    headerchar.src = "assets/svg/headerP4.svg";
    headerchar.alt = "headerchar";
    headerchar.draggable = false;
    headerchar.style = "--top:" + String(top) + "px; --left:" + String(left) + "px;"
    maindiv.appendChild(headerchar);
    const currentDiv = document.getElementById("index");
    document.body.insertBefore(maindiv, null);

    const characternameform = document.createElement("input");
    characternameform.className = "charnameform save not-selectable sizeadjustinput";
    characternameform.id = "charactername_2" // Changed ID to avoid duplicate
    characternameform.style = "--top:" + String(top + 51) + "px; --left:" + String(left + 40) + "px; --boxlength:" + String(160) + "; --startfont:" + String(18)
    characternameform.spellcheck = false
    characternameform.onkeyup = function () {
        synchronizeNames(characternameform.id);
        update();
    };
    maindiv.appendChild(characternameform);

    tabs = ["age", "height", "weight", "eyes", "skin", "hair"]
    for (let i = 0; i < tabs.length; i++) {
        const tabname = document.createElement("div");
        tabname.className = "headertab not-selectable"
        tabname.style = "--top:" + String(top + 54 + Math.floor(i / 3) * 29) + "px; --left:" + String(left + 290 + i % 3 * 110) + "px;"
        tabname.textContent = tabs[i].toUpperCase()
        maindiv.appendChild(tabname);

        const headertabform = document.createElement("input");
        headertabform.className = "headertabform save not-selectable sizeadjustinput";
        headertabform.id = tabs[i].toUpperCase() + " tab"
        headertabform.style = "--top:" + String(top + 38 + Math.floor(i / 3) * 29) + "px; --left:" + String(left + 290 + i % 3 * 110) + "px; --boxlength:" + String(90) + "; --startfont:" + String(11)
        headertabform.spellcheck = false
        headertabform.onkeyup = function () {
            synchronizePhenome("");
            update()
        };
        maindiv.appendChild(headertabform);
    }
    createText(top + 83, left + 66, 20, 70, "CHARACTER NAME", 8, "#000000", "left", maindiv)
}

function createHeaderpage5(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "header"

    const headerchar = document.createElement("img");
    headerchar.className = "header not-selectable"
    headerchar.src = "assets/svg/headerP5.svg";
    headerchar.alt = "headerchar";
    headerchar.draggable = false;
    headerchar.style = "--top:" + String(top) + "px; --left:" + String(left) + "px;"
    maindiv.appendChild(headerchar);
    const currentDiv = document.getElementById("index");
    document.body.insertBefore(maindiv, null);

    createFormField(top + 62, left + 55, 140, 22, "inventorycontainer", "input", 18, "#dde4ff", "center", maindiv, false, "", false)

    createText(top + 93, left + 66, 20, 100, "INVENTORY CONTAINER", 8, "#000000", "left", maindiv)
    tabscontent = ["MAX CARRY WEIGHT", "CURRENT DAY", "CURRENT CARRY WEIGHT", "CURRENT WEEKDAY"]
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            const inventorytab = document.createElement("img");
            inventorytab.className = "inventorytab not-selectable"
            if (j == 0) { inventorytab.src = "assets/svg/inventorytab top.svg"; }
            else { inventorytab.src = "assets/svg/inventorytab bottom.svg"; }
            inventorytab.alt = "inventorytab";
            inventorytab.draggable = false;
            inventorytab.style = "--top:" + String(top + 27 + 31 * j) + "px; --left:" + String(left + 240 + 190 * i) + "px; --width:" + String(170) + "px"

            maindiv.appendChild(inventorytab);
            createText(top + 36 + 32 * j, left + 298 + 190 * i, 33, 106, tabscontent[i + 2 * j], 9, "#000000", "left", maindiv, "")
            createFormField(top + 34 + 29 * j, left + 245 + 190 * i, 33, 16, "inventorytab" + String(i) + String(j), "input", 12, "#dde4ff", "center", maindiv, true, "", false, "")

        }
    }
}

function createHeaderpage6(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "header"

    const headerchar = document.createElement("img");
    headerchar.className = "header not-selectable"
    headerchar.src = "assets/svg/headerP4.svg";
    headerchar.alt = "headerchar";
    headerchar.draggable = false;
    headerchar.style = "--top:" + String(top) + "px; --left:" + String(left) + "px;"
    maindiv.appendChild(headerchar);
    const currentDiv = document.getElementById("index");
    document.body.insertBefore(maindiv, null);

    const characternameform = document.createElement("input");
    characternameform.className = "charnameform save not-selectable sizeadjustinput";
    characternameform.id = "charactername_2" // Changed ID to avoid duplicate
    characternameform.style = "--top:" + String(top + 51) + "px; --left:" + String(left + 40) + "px; --boxlength:" + String(160) + "; --startfont:" + String(18)
    characternameform.spellcheck = false
    characternameform.onkeyup = function () {
        synchronizeNames(characternameform.id);
        update();
    };
    maindiv.appendChild(characternameform);

    tabs = ["age", "height", "weight", "eyes", "skin", "hair"]
    for (let i = 0; i < tabs.length; i++) {
        const tabname = document.createElement("div");
        tabname.className = "headertab not-selectable"
        tabname.style = "--top:" + String(top + 54 + Math.floor(i / 3) * 29) + "px; --left:" + String(left + 290 + i % 3 * 110) + "px;"
        tabname.textContent = tabs[i].toUpperCase()
        maindiv.appendChild(tabname);

        const headertabform = document.createElement("input");
        headertabform.className = "headertabform save not-selectable sizeadjustinput";
        headertabform.id = tabs[i].toUpperCase() + " tab" + "_2"
        headertabform.style = "--top:" + String(top + 38 + Math.floor(i / 3) * 29) + "px; --left:" + String(left + 290 + i % 3 * 110) + "px; --boxlength:" + String(90) + "; --startfont:" + String(11)
        headertabform.spellcheck = false
        headertabform.onkeyup = function () {
            synchronizePhenome("_2");
            update()
        };
        maindiv.appendChild(headertabform);
    }
    createText(top + 83, left + 66, 20, 70, "CHARACTER NAME", 8, "#000000", "left", maindiv)
}