//asset creation
function createFormField(top, left, width, height, name, format, textsize, color, align, parentdiv, calculated = false, initcalculation = "", syncbool = false, addedclass = "") {
    const formfield = document.createElement(format);
    if (addedclass.includes("exceptsize")) {
        if (format == "input") { formfield.className = "genericformfield save not-selectable " + " " + addedclass + " " + (calculated ? (" calculated") : ("")) + (syncbool ? (" sync") : ("")); }
        else if (format == "textarea") { formfield.className = "genericformfield save not-selectable " + " " + addedclass + " " + (calculated ? (" calculated") : ("")) + (syncbool ? (" sync") : ("")); }
    }
    else {
        if (format == "input") { formfield.className = "genericformfield save not-selectable sizeadjustinput" + " " + addedclass + " " + (calculated ? (" calculated") : ("")) + (syncbool ? (" sync") : ("")); }
        else if (format == "textarea") { formfield.className = "genericformfield save not-selectable sizeadjust" + " " + addedclass + " " + (calculated ? (" calculated") : ("")) + (syncbool ? (" sync") : ("")); }
    }
    formfield.id = name
    formfield.style = "--top:" + String(top) + "px; --left:" + String(left) + "px; --boxlength:" + String(width - 10) + "; --startfont:" + String(textsize) + "; --width:" + String(width) + "px; --height:" + String(height) + "px; --color:" + String(color) + "; --align:" + String(align) + "; --fontsize:" + String(textsize) + "px"
    formfield.spellcheck = false
    formfield.onkeyup = function () { update("typing") };
    if (calculated) {
        formfield.textContent = initcalculation
        formfield.value = ""
        formfield.addEventListener("focus", entercalc, false);
        formfield.onblur = function () { unfocusfunc(formfield, "calc sync update") };
    }
    else { formfield.onblur = function () { unfocusfunc(formfield, "sync update") }; }
    parentdiv.appendChild(formfield);
    return formfield

} function createText(top, left, height, width, content, fontsize, color, align, parentdiv, addedclass = "") {
    const textfield = document.createElement("div");
    textfield.className = "generictext not-selectable" + " " + addedclass + " "
    textfield.style = "--top:" + String(height) + "px; --width:" + String(width) + "px; --left:" + String(left) + "px; --top:" + String(top) + "px; --color:" + String(color) + "; --align:" + String(align) + "; --fontsize:" + String(fontsize) + "px;"
    textfield.textContent = content
    parentdiv.appendChild(textfield);
} function createButton(top, left, size, initvalue, name, func, parentdiv, addedclass = "") {
    const checkbox = document.createElement("div");
    checkbox.className = "genericbutton save" + " " + addedclass + " "
    checkbox.value = initvalue
    checkbox.id = name
    checkbox.style = "--top:" + String(top) + "px; --left:" + String(left) + "px; --size:" + String(size) + "px"
    checkbox.addEventListener("click", func, false)
    parentdiv.appendChild(checkbox);
} function createCheckmark(top, left, size, initvalue, name, func, parentdiv, addedclass, syncbool) {
    const checkbox = document.createElement("div");
    checkbox.className = "checkmarkbutton save " + addedclass + (syncbool ? (" sync") : (""))
    checkbox.value = initvalue
    checkbox.id = name
    checkbox.style = "--top:" + String(top) + "px; --left:" + String(left) + "px; --size:" + String(size) + "px; --textsize:" + String(size - 3) + "px; --lineheight:" + String(size) + "px;"
    checkbox.addEventListener("click", func, false)
    parentdiv.appendChild(checkbox);
} function createFrame(width, height, top, left, formbool = false, namebool = false, name, page = "index", format = "textarea", addedclass = "") {
    //Create the parent div
    const maindiv = document.createElement("div");
    maindiv.className = "frame " + addedclass
    maindiv.style = "--width: " + String(width) + "px; --height: " + String(height) + "px; top:" + String(top) + "px; left:" + String(left) + "px; --bevel:7.5px;"

    //create corners
    const rotations = ["scale(-1,1)", "scale(1,1)", "scale(1,-1)", "scale(-1,-1)"];
    const positions = ["--top:0px; --left:0px;", " --top:0px; --left:" + String(width - 20) + "px;", " --top:" + String(height - 20) + "px; --left:" + String(width - 20) + "px;", " --top:" + String(height - 20) + "px; --left:0px;"];
    for (let i = 0; i < 4; i++) {
        const corner = document.createElement("img");
        corner.className = "corner not-selectable"
        corner.src = "assets/svg/FrameCorner.svg";
        corner.alt = "corner";
        corner.draggable = false;
        corner.style = "--rotate:" + rotations[i] + "; --width:20px; " + positions[i]
        maindiv.appendChild(corner);
    }

    //Create sides
    const scales = ["--scale:scale(" + String((width - 15) / 20) + ",1);", "--scale:scale(" + String((width - 15) / 20) + ",-1);", "--scale:scale(1," + String((height - 38) / 20) + ");", "--scale:scale(-1," + String((height - 38) / 20) + ");"];
    const tops = ["--top:0px;", " --top:" + String(height - 20) + "px;", " --top:" + String(height / 2 - 10) + "px;", " --top:" + String(height / 2 - 10) + "px;"];
    const lefts = ["--left:" + String((width - 20) / 2) + "px;", "--left:" + String((width - 20) / 2) + "px;", "--left:" + String(width - 20) + "px;", "--left:0px;"];
    for (let i = 0; i < 4; i++) {
        const line = document.createElement("img");
        line.className = "horizontalline not-selectable"
        if (i < 2) {
            line.src = "assets/svg/HorizontalLine.svg";
        }
        else {
            line.src = "assets/svg/verticalLine.svg";
        }
        line.alt = "line";
        line.draggable = false;
        line.style = tops[i] + lefts[i] + scales[i]
        maindiv.appendChild(line);
    }

    //Create text area
    if (formbool) {
        const formfield = document.createElement(format);
        if (format == "textarea") { formfield.className = "frameform save sizeadjust calculated"; }
        if (format == "input") { formfield.className = "frameform save sizeadjustinput calculated"; }
        formfield.id = name
        formfield.style = "--width:" + String(width - 25) + "px; --height:" + String(height - 25) + "px; --boxlength:" + String(width - 25) + "; --startfont:" + String(20);
        formfield.value = "";
        if (format == "textarea") { formfield.onkeyup = function () { update("typing") }; }
        if (format == "input") { formfield.onkeyup = function () { update("typing") }; formfield.style.textAlign = "center"; }
        formfield.spellcheck = false
        formfield.textContent = ""
        formfield.value = ""
        formfield.addEventListener("focus", entercalc, false);
        formfield.onblur = function () { unfocusfunc(formfield, "calc sync update") };

        maindiv.appendChild(formfield);

    }

    //Create text at bottom
    if (namebool) {
        const framename = document.createElement("div");
        framename.className = "framename not-selectable"
        framename.style = "--top:" + String(height - 13) + "px; --width:" + String(width) + "px;"
        framename.textContent = name
        maindiv.appendChild(framename);
    }

    const currentDiv = document.getElementById(page);
    document.body.insertBefore(maindiv, null);
} function createFeaturebox(width, height, bevel, color, top, left, page, addedclass = "") {
    const div = document.createElement("div");
    div.className = "featurebox" + " " + addedclass + " ";
    div.style = "--width: " + String(width) + "px; --height: " + String(height) + "px; --bevel: " + String(bevel) + "px; --color: #" + String(color) + "; top:" + String(top) + "px; left:" + String(left) + "px;";
    const currentDiv = document.getElementById(page);
    document.body.insertBefore(div, currentDiv);
} function createScriptedButton(top, left, width, height, content, script, parentdiv, addedclass, textsize = "9", name) {
    const button = document.createElement("div");
    button.textContent = content
    button.id = name
    button.className = "genericScriptedButton not-selectable " + addedclass
    button.style = "--top:" + String(top) + "px; --left:" + String(left) + "px; --height:" + String(height) + "px; --width:" + String(width) + "px; --textsize:" + String(textsize) + "px;"
    button.draggable = false;
    button.onclick = script
    parentdiv.appendChild(button);
} function createDiv(top, left, height, width, content, fontsize, color, align, parentdiv, addedclass = "", id) {
    const square = document.createElement("div");
    square.className = "tooltip" + " " + addedclass + " "
    square.style = "--heigth:" + String(height) + "px; --width:" + String(width) + "px; --left:" + String(left) + "px; --top:" + String(top) + "px; --color:" + String(color) + "; --align:" + String(align) + "; --fontsize:" + String(fontsize) + "px;"
    square.textContent = content
    square.id = id
    parentdiv.appendChild(square);
    return square
} function createHeaderpage1(top, left) {
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
    characternameform.onkeyup = function () { update() };
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




} function createHeaderpage2(top, left) {
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



} function createHeaderpage3(top, left) {
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

} function createHeaderpage4(top, left) {
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
    characternameform.id = "charactername3"
    characternameform.style = "--top:" + String(top + 51) + "px; --left:" + String(left + 40) + "px; --boxlength:" + String(160) + "; --startfont:" + String(18)
    characternameform.spellcheck = false
    characternameform.onkeyup = function () { update() };
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
        headertabform.onkeyup = function () { update() };
        maindiv.appendChild(headertabform);
    }
    createText(top + 83, left + 66, 20, 70, "CHARACTER NAME", 8, "#000000", "left", maindiv)





} function createHeaderpage5(top, left) {
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


    createFormField(top + 62, left + 55, 140, 22, "charactername2", "input", 18, "#dde4ff", "center", maindiv, false, "", false)

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




} function createAbilityBoxes(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "abilityboxes not-selectable"
    maindiv.style = " top:" + String(top) + "px; left:" + String(left) + "px;"

    bars = ["prof", "inspiration", "passive perception"]
    names = ["proficiency bonus", "inspiration", "passive perception"]
    for (let i = 0; i < bars.length; i++) {
        if (i == 0) { temptop = -75; }
        else if (i == 1) { temptop = -40; }
        else if (i == 2) { temptop = 475; }
        const profbonusbox = document.createElement("img");
        profbonusbox.className = "proficiencybox not-selectable"
        profbonusbox.src = "assets/svg/profbonus.svg";
        profbonusbox.draggable = false;
        profbonusbox.style = " --top:" + String(temptop) + "px; --left:" + String(10) + "px"
        maindiv.appendChild(profbonusbox);

        const profbonustext = document.createElement("div");
        profbonustext.className = "proficiencyboxname not-selectable"
        profbonustext.draggable = false;
        profbonustext.style = " --top:" + String(temptop + 10) + "px; --left:" + String(75) + "px"
        profbonustext.textContent = names[i].toUpperCase()
        maindiv.appendChild(profbonustext);

        //the formfied for the score
        if (i == 0) {
            createFormField(temptop + 3, 21, 35, 18, bars[i].toUpperCase(), "textarea", 15, "#dde4ff", "center", maindiv, true, "0", false, "exceptsize")
        }
        if (i == 1) {
            createFormField(temptop + 3, 21, 35, 18, bars[i].toUpperCase(), "textarea", 15, "#dde4ff", "center", maindiv, false, "", false, "exceptsize")
        }
        if (i == 2) {
            createFormField(temptop + 3, 21, 35, 18, bars[i].toUpperCase(), "textarea", 15, "#dde4ff", "center", maindiv, true, "[WISPERCEPTIONskillmodifier] + 10", false, "exceptsize")
        }
    }

    let abilities = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]
    let skills = { strength: ["savingthrows", "athletics"], dexterity: ["savingthrows", "acrobatics", "sleight of hand", "stealth"], constitution: ["savingthrows",], intelligence: ["savingthrows", "arcana", "history", "investigation", "nature", "religion"], wisdom: ["savingthrows", "animal handling", "insight", "medicine", "perception", "survival"], charisma: ["savingthrows", "deception", "intimidation", "performance", "persuasion"] }

    for (let i = 0; i < abilities.length; i++) {
        const abiliydiv = document.createElement("div")
        abiliydiv.className = abilities[i].toUpperCase() + " div"
        maindiv.appendChild(abiliydiv);

        const box = document.createElement("img");
        box.className = "abilitybox not-selectable"
        box.src = "assets/svg/modifiertab.svg";
        box.alt = abilities[i];
        box.draggable = false;
        box.style = " --top:" + String(i * 80) + "px; --left:" + String(0) + "px; --width:190px; --height:auto;"
        abiliydiv.appendChild(box);

        const abilityboxname = document.createElement("div");
        abilityboxname.className = "abilityboxname"
        abilityboxname.style = "--top:" + String(i * 80 + 55) + "px; --left:" + String(3.5) + "px;"
        abilityboxname.textContent = abilities[i].toUpperCase()
        abiliydiv.appendChild(abilityboxname);

        //the formfied for the score
        const formfield = document.createElement("input");
        formfield.className = "abilityboxform save";
        formfield.id = abilities[i].toUpperCase().slice(0, 3) + "score"
        formfield.style = "--top:" + String(i * 80 + 27) + "px; --left:" + String(13) + "px;"
        formfield.value = "10";
        formfield.spellcheck = false
        abiliydiv.appendChild(formfield);

        //the formfied for the modifier
        const modifier = document.createElement("input");
        modifier.className = "modiferform save not-selectable";
        modifier.id = abilities[i].toUpperCase().slice(0, 3) + "mod"
        modifier.style = "--top:" + String(i * 80 + 6) + "px; --left:" + String(23) + "px;"
        formfield.addEventListener('change', updatemodifier, false);
        formfield.addEventListener('change', update, false);
        modifier.value = "+0"
        modifier.spellcheck = false
        abiliydiv.appendChild(modifier);

        //create the skill boxes
        for (let j = 0; j < skills[abilities[i]].length; j++) {
            const skill = document.createElement("div");
            skill.className = "skilltext"
            skill.style = "--top:" + String(i * 80 + 7 + j * 12) + "px; --left:" + String(110) + "px;"
            skill.textContent = skills[abilities[i]][j].toUpperCase()
            abiliydiv.appendChild(skill);

            //expertisechkbx
            createButton(i * 80 + 5 + j * 12, 85, 5, 0, abilities[i].slice(0, 3).toUpperCase() + "" + skills[abilities[i]][j].toUpperCase() + "expertise", genericbuttonclick, abiliydiv, "")

            //profchkbx
            createButton(i * 80 + 7 + j * 12, 80, 6, 0, abilities[i].slice(0, 3).toUpperCase() + "" + skills[abilities[i]][j].toUpperCase() + "proficiency", genericbuttonclick, abiliydiv, "")

            //skillmodifier
            createFormField(i * 80 + 4 + j * 12, 94, 10, 7, abilities[i].slice(0, 3).toUpperCase() + "" + skills[abilities[i]][j].toUpperCase() + "skillmodifier", "input", 7, "#dde4ff", "center", abiliydiv, true, "[" + abilities[i].slice(0, 3).toUpperCase() + "mod] + [" + abilities[i].slice(0, 3).toUpperCase() + "" + skills[abilities[i]][j].toUpperCase() + "proficiency" + "]*[PROF]" + "+[" + abilities[i].slice(0, 3).toUpperCase() + "" + skills[abilities[i]][j].toUpperCase() + "expertise" + "]*[PROF]", false, "exceptsize")

            //line under form
            const skillline = document.createElement("div");
            skillline.className = "skillline"
            skillline.style = "--top:" + String(i * 80 + 13 + j * 12) + "px; --left:" + String(94) + "px;"
            abiliydiv.appendChild(skillline);
        }

    }



    const currentDiv = document.getElementById("page1");
    document.body.insertBefore(maindiv, null);
} function filldarkbox(top, left) {

    const maindiv = document.createElement("div");
    maindiv.className = "filldarkfeaturebox not-selectable"
    maindiv.style = " top:" + String(top) + "px; left:" + String(left) + "px;"

    const ac = document.createElement("img");
    ac.className = "acshield not-selectable"
    ac.src = "assets/svg/armor.svg";
    ac.draggable = false;
    ac.style = " --top:" + String(10) + "px; --left:" + String(8) + "px; --height:63px; --width:auto;"
    maindiv.appendChild(ac);

    const acname = document.createElement("div");
    acname.className = "acshieldname not-selectable"
    acname.textContent = "ARMOR CLASS"
    acname.draggable = false;
    acname.style = " --top:" + String(50) + "px; --left:" + String(20) + "px;"
    maindiv.appendChild(acname);

    createFormField(20, 20, 27, 27, "AC1", "input", 20, "#dde4ff", "center", maindiv, true, "[armor0button]*[armor0] + [armor1button]*[armor1] + [armor2button]*[armor2] + [armor3button]*[armor3]", true, "")




    const currentDiv = document.getElementById("page1");
    document.body.insertBefore(maindiv, null);

    createFrame(63, 63, top + 10, left + 65, false, true, "INITIATIVE", "index", "input");
    createFrame(63, 63, top + 10, left + 131, false, true, "SPEED", "index", "input");
    createFrame(190, 83, top + 78, left + 5, false, true, "CURRENT HIT POINTS", "index", "input");
    createFrame(190, 58, top + 166, left + 5, false, true, "TEMPORARY HIT POINTS", "index", "input");
    createFrame(92, 63, top + 230, left + 5, false, true, "HIT DICE", "index", "input");
    createFrame(92, 63, top + 230, left + 102, false, true, "DEATH SAVES", "index", "input");

    //hitpoint and hit dice fields
    createFormField(83, 90, 90, 10, "totalhitpoints1", "input", "9", "#dde4ff", "left", maindiv, true, "", true, "")
    createFormField(98, 15, 165, 45, "currenthitpoints1", "input", "30", "#dde4ff", "center", maindiv, false, "", true, "")
    createText(85, 3, 12, 85, "HIT POINT MAXIMUM", 7.5, "#c5c6c7", "right", maindiv)
    createFormField(235, 40, 43, 10, "totalhitdice", "input", "9", "#dde4ff", "left", maindiv)
    createFormField(250, 15, 68, 25, "currenthitdice", "input", "15", "#dde4ff", "center", maindiv)
    createText(238, 3, 12, 35, "TOTAL", 7.5, "#c5c6c7", "right", maindiv)
    createFormField(171, 15, 165, 33, "TEMPORARY HIT POINTS1", "textarea", "28", "#dde4ff", "center", maindiv, false, "", true, "")
    createFormField(15, 75, 38, 38, "INITIATIVE1", "input", 25, "#dde4ff", "center", maindiv, true, "[DEXmod]", true, "")
    createFormField(15, 141, 38, 38, "SPEED1", "input", 25, "#dde4ff", "center", maindiv, false, "", true, "")

    //death saves field
    const line = document.createElement("img");
    line.className = "verticalline not-selectable"
    line.src = "assets/svg/verticalLine.svg";
    line.alt = "line";
    line.draggable = false;
    line.style = "--top:" + String(238) + "px; --left:" + String(155) + "px;  --scale:rotate(-90deg) scale(0.5,1) "
    maindiv.appendChild(line);
    const line2 = document.createElement("img");
    line2.className = "verticalline not-selectable"
    line2.src = "assets/svg/verticalLine.svg";
    line2.alt = "line";
    line2.draggable = false;
    line2.style = "--top:" + String(258) + "px; --left:" + String(155) + "px;  --scale:rotate(-90deg) scale(0.5,1) "
    maindiv.appendChild(line2);
    for (let i = 0; i < 3; i++) {
        createButton(240, 150 + i * 12, 8, 0, "DeathsaveSucces" + String(i), genericbuttonclick, maindiv)
        createButton(260, 150 + i * 12, 8, 0, "DeathsaveFailure" + String(i), genericbuttonclick, maindiv)
    }
    createText(241, 110, 10, 38, "SUCCESSES", 7.5, "#000000", "right", maindiv)
    createText(261, 110, 10, 38, "FAILURES", 7.5, "#000000", "right", maindiv)



} function fillattackandspellcasting(width, height, top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "fillattackandspellcasting not-selectable"
    maindiv.style = "position:absolute; top:" + String(top) + "px; width:" + String(width) + "px; left:" + String(left) + "px; height:" + String(height - 20) + "px"
    const currentDiv = document.getElementById("page1");
    document.body.insertBefore(maindiv, null);
    createText(5, 10, 10, 38, "NAME", 7, "#c5c6c7", "left", maindiv)
    createText(5, 80, 10, 50, "ATK BONUS", 7, "#c5c6c7", "left", maindiv)
    createText(5, 125, 10, 50, "DAMAGE/TYPE", 7, "#c5c6c7", "left", maindiv)
    for (let i = 0; i < 3; i++) {
        createFormField(15 + i * 20, 10, 60, 15, "attackname" + String(i) + "1", "input", "9", "#dde4ff", "left", maindiv, false, "", true, "")
        createFormField(15 + i * 20, 80, 35, 15, "attackbonus" + String(i) + "1", "input", "11", "#dde4ff", "left", maindiv, true, "", true, "")
        createFormField(15 + i * 20, 125, 60, 15, "attackdamage" + String(i) + "1", "input", "9", "#dde4ff", "left", maindiv, true, "", true, "")
    }
    createFormField(75, 10, 175, 195, "ATTACKS & SPELLCASTING", "textarea", "12", "#dde4ff", "left", maindiv)
} function fillEquipmentSlot(top, left, amount, name, parentdiv, addedclass) {
    for (let i = 0; i < amount; i++) {
        if (name == "armor") {
            createFormField(top + 5 + 45 * i, left + 70, 105, 40, name + String(i) + "name", "input", 20, "#dde4ff", "left", parentdiv, false, "", false, addedclass)
            createFormField(top + 5 + 45 * i, left + 25, 40, 40, name + String(i), "input", 25, "#c5c6c7", "center", parentdiv, true, "", false, addedclass)
        }
        if (name == "weapons") {
            createFormField(top + 5 + 45 * i, left + 25, 150, 40, "attackname" + String(i) + "3", "input", 18, "#dde4ff", "left", parentdiv, false, "", true, addedclass)
        }
        if (name == "attunements") {
            createFormField(top + 5 + 45 * i, left + 25, 150, 40, name + String(i) + "3", "input", 18, "#dde4ff", "left", parentdiv, false, "", true, addedclass)
        }
        createButton(top + 33 + 45 * i, left + 10, 10, 0, name + String(i) + "button", genericbuttonclick, parentdiv, "")
        line = document.createElement("div");
        line.className = "genericline not-selectable"
        line.alt = "line";
        line.draggable = false;
        line.style = "--top:" + String(top + 47 + 45 * i) + "px; --left:" + String(left + 10) + "px; --width:" + String(170) + "px; --height:" + String(1) + "px"
        parentdiv.appendChild(line);

    }

} function createspellbar(top, left, width, level, parentdiv, version, addedclass) {
    const maindiv = parentdiv


    const bar = document.createElement("img");
    bar.className = "spellbar not-selectable " + addedclass
    if (level == 0) { bar.src = "assets/svg/spellbar cantrip.svg"; }
    else { bar.src = "assets/svg/spellbar.svg"; }
    bar.alt = "spellbar";
    bar.draggable = false;
    bar.style = "--top:" + String(top) + "px; --left:" + String(left) + "px; --width:" + String(width) + "px"
    if (level == "custom") { level = 1; custom = true }
    else { custom = false }

    if (level > 0) {
        if (custom) { createFormField(top + 10, left + 5, 8, 17, "custom level" + String(version), "textarea", 8, "#dde4ff", "center", maindiv, false, "", true, addedclass) }
        else { createText(top + 0.05 * width, left, 100, 0.11 * width, String(level), width / 12, "#000000", "center", maindiv, addedclass) }



        for (let i = 0; i < 4; i++) {
            createCheckmark(top + 0.065 * width, left + width * 0.45 + i * width * 0.12, width * 0.08, 0, "checkmark level " + String(level) + " num: " + String(i) + String(version), genericcheckmarkclick, maindiv, addedclass, true)
        }
        createFormField(top + 0.053 * width, left + width * 0.12, width * 0.2, width * 0.1, "spellbar" + String(level) + String(version), "input", 14, "#dde4ff", "center", maindiv, false, "", true, addedclass)
    } else {
        createText(top + 0.05 * width, left, 100, 0.11 * width, String(level), width / 12, "#000000", "center", maindiv, addedclass)
        createText(top + 0.08 * width, left + width * 0.3, 100, 0.5 * width, "CANTRIPS", width / 20, "#000000", "center", maindiv, addedclass)
    }


    maindiv.appendChild(bar);

} function createspellline(top, left, width, level, parentdiv, name) {
    const line = document.createElement("div");
    line.className = "genericline not-selectable"
    line.alt = "line";
    line.draggable = false;

    parentdiv.appendChild(line);
    if (level == 0) {
        line.style = "--top:" + String(top + 40 / 3) + "px; --left:" + String(left) + "px; --width:" + String(width) + "px; --height:" + String(1) + "px"
    } else {
        line.style = "--top:" + String(top + 40 / 3) + "px; --left:" + String(left + 10) + "px; --width:" + String(width - 10) + "px; --height:" + String(1) + "px"
        createButton(top + 5, left, 7, 0, name + " prepared", genericbuttonclick, parentdiv)

    }
    createFormField(top + 3, left + 10, width - 20, 40 / 3 - 5, name, "input", 8, "#dde4ff", "left", parentdiv)
} function createChargedAbilityLine(top, left, version, parentdiv, addedclass, name) {
    createFormField(top, left, 20, 15, "maxcharges" + String(version), "input", "10", "#dde4ff", "center", parentdiv, true, "", false, addedclass)
    createFormField(top, left + 25, 55, 15, "abilityname" + String(version), "input", "10", "#dde4ff", "left", parentdiv, false, "", false, addedclass)
    createScriptedButton(top, left + 85, 15, 17, "+1", plusonescript, parentdiv, addedclass, "15", name)
    createScriptedButton(top, left + 101, 15, 17, "-1", minusonescript, parentdiv, addedclass, "15", name)
    createFormField(top, left + 117, 23, 15, "currentcharges" + String(version), "input", "10", "#dde4ff", "center", parentdiv, false, "", false, addedclass)
    createScriptedButton(top, left + 145, 34, 17, "Recover", recoverscript, parentdiv, addedclass, "9", name)
} function createMainpage(top, left) {
    createFeaturebox(200, 600, 6, "e7e8e8", top, left, "index")
    createFeaturebox(200, 300, 6, "c5c6c7", top, left + 210, "index")
    filldarkbox(top, left + 210)
    createFrame(200, 290, top + 310, left + 210, false, true, "ATTACKS & SPELLCASTING", "index", "textarea");
    fillattackandspellcasting(200, 290, top + 310, left + 210)
    createFrame(200, 760, top, left + 420, true, true, "FEATURES & TRAITS", "index", "textarea");
    createFrame(200, 150, top + 610, left, true, true, "OTHER PROFICIENCIES & LANGUAGES", "index", "textarea");
    createFrame(200, 150, top + 610, left + 210, true, true, "CHARACTER NOTES", "index", "textarea");
    createAbilityBoxes(top + 85, left + 5)
    createHeaderpage1(top - 120, left - 30)


} function createSpellPage(top, left) {
    //createFrame(620, 760, top, left, false, false, "spellframe", "index", "textarea")
    createHeaderpage2(top - 140, left - 30)

    const maindiv = document.createElement("div");
    maindiv.className = "spell list page"


    for (let i = 0; i < 3; i++) {
        const headerchar = document.createElement("img");
        headerchar.className = "spelllistrect not-selectable"
        headerchar.src = "assets/svg/spelllist frame.svg";
        headerchar.alt = "spelllistframe";
        headerchar.draggable = false;
        headerchar.style = "--top:" + String(top) + "px; --left:" + String(left + i * 206) + "px; --height:" + String(760) + "px; --width:" + String(207) + "px"
        maindiv.appendChild(headerchar);

    }

    //54 slots spellbar is 3 slots
    linesperlevel = [8, 19, 17, 16, 15, 13, 12, 12, 9, 8]//pretty set in stone, if changed will not be compatible with loaded sheets
    initi = 0
    finalj = 0
    j = 0
    for (let k = 0; k < 3; k++) {
        row = 0
        for (let i = initi; i < linesperlevel.length; i++) {
            if (row + 3 > 53 && endj == linesperlevel[i - 1] - 1) { initi = i; finalj = 0; break }
            if (row + 3 > 53) { initi = i - 1; break }
            createspellbar(top + 22 + row * 40 / 3, left + 10 + k * 210, 180, i, maindiv, 1)
            row += 3
            for (let j = 0; j < linesperlevel[i]; j++) {
                if (row + 1 > 53) { finalj = j; break }
                if (finalj + j >= linesperlevel[i]) { finalj = 0; break }
                createspellline(top + 20 + row * 40 / 3, left + 10 + k * 210, 180, i, maindiv, "level:" + String(i) + " num:" + String(j))
                row += 1
                endj = j
            }
        }
    }


    document.body.insertBefore(maindiv, null);
} function createAttackpage(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "attack page"


    createHeaderpage3(top - 140, left - 30)
    createFrame(410, 760, top, left, false, false, "attack page", "page1", "textarea")

    //lookups
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            //390x740
            entryfield = createFormField(top + 10 + j * 372, left + 10 + i * 196, 190, 20, "lookupentry" + String(i) + "," + String(j), "input", 14, "#dde4ff", "left", maindiv, false, "", false, "")
            resultfield = createFormField(top + 34 + j * 372, left + 10 + i * 196, 190, 334, "lookupresult" + String(i) + "," + String(j), "textarea", 14, "#c5c6c7", "left", maindiv, false, "", false, "lookup")
            resultfield.style.outline = "none"
        }
    }


    const attackSheetDropDown = document.createElement("select");
    attackSheetDropDown.className = "dropdown save"
    attackSheetDropDown.draggable = false;
    attackSheetDropDown.id = "attacksheetdropdown"
    attackSheetDropDown.style = "--top:" + String(top - 100) + "px; --left:" + String(left + 420) + "px; --height:" + String(22) + "px; --width:" + String(200) + "px"
    attackSheetDropDown.addEventListener('change', function () { changeSidebar() })
    options = ["Select Archetype...", "Melee", "Half caster", "Full caster"]
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement('option');
        opt.value = options[i].replace(/ /g, "_");
        opt.innerHTML = options[i];
        attackSheetDropDown.appendChild(opt);
    }
    maindiv.appendChild(attackSheetDropDown);

    //archetype specific fields
    //all:
    addedclass = "sidebar Melee Full_caster Half_caster"
    createFeaturebox(200, 300, 6, "c5c6c7", top - 74, left + 420, "index", addedclass)
    createFrame(180, 85, top - 64, left + 430, false, false, "appliedConditions", "page1", "textarea", addedclass)
    createFrame(61, 63, top + 63, left + 485, false, true, "INITIATIVE", "index", "input", addedclass);
    createFrame(61, 63, top + 63, left + 548, false, true, "SPEED", "index", "input", addedclass);
    createFrame(180, 83, top + 133, left + 430, false, false, "health", "page1", "textarea", addedclass)
    for (let i = 0; i < 1; i++) {//ac shield, not actual forloop, just collapsed
        const ac = document.createElement("img");
        ac.className = "acshield not-selectable " + addedclass
        ac.src = "assets/svg/armor.svg";
        ac.draggable = false;
        ac.style = " --top:" + String(top + 63) + "px; --left:" + String(left + 428) + "px; --height:63px; --width:auto;"
        maindiv.appendChild(ac);

        const acname = document.createElement("div");
        acname.className = "acshieldname not-selectable " + addedclass
        acname.textContent = "ARMOR CLASS"
        acname.draggable = false;
        acname.style = " --top:" + String(top + 103) + "px; --left:" + String(left + 440) + "px;"
        maindiv.appendChild(acname);

        createFormField(top + 73, left + 440, 27, 27, "AC2", "input", 20, "#dde4ff", "center", maindiv, true, "[armor0button]*[armor0] + [armor1button]*[armor1] + [armor2button]*[armor2] + [armor3button]*[armor3]", true, addedclass)

    }
    createFormField(top + 68, left + 420 + 75, 36, 38, "INITIATIVE2", "input", 25, "#dde4ff", "center", maindiv, true, "[DEXmod]", true, addedclass)
    createFormField(top + 68, left + 420 + 138, 36, 38, "SPEED2", "input", 25, "#dde4ff", "center", maindiv, false, "", true, addedclass)
    total = createFormField(top + 138, left + 515, 40, 10, "totalhitpoints2", "input", "9", "#dde4ff", "left", maindiv, true, "", true, addedclass)
    hp = createFormField(top + 152, left + 440, 75, 49, "currenthitpoints2", "input", "30", "#dde4ff", "center", maindiv, false, "", true, addedclass)
    createFormField(top + 152, left + 520, 75, 49, "TEMPORARY HIT POINTS2", "input", "28", "#dde4ff", "center", maindiv, false, "", true, addedclass)
    createText(top + 204, left + 440, 10, 80, "CURRENT HIT POINTS", 7, "#000000", "center", maindiv, addedclass)
    createText(top + 204, left + 520, 10, 80, "TEMPORARY HIT POINTS", 7, "#000000", "center", maindiv, addedclass)
    createText(top + 140, left + 435, 10, 80, "HIT POINT MAXIMUM", 7, "#000000", "center", maindiv, addedclass)
    createScriptedButton(top + 138, left + 560, 39, 12, "Heal", healscript, maindiv, addedclass)
    createFormField(top - 59, left + 440, 156, 62, "appliedConditions", "textarea", "14", "#dde4ff", "left", maindiv, false, "", false, addedclass)
    createText(top + 9, left + 440, 20, 156, "CURRENTLY APPLIED CONDITIONS", 8, "#000000", "center", maindiv, addedclass)
    createFrame(140, 30, top + 27, left + 450, false, false, "concentration", "page1", "textarea", addedclass)
    createText(top + 36, left + 455, 20, 95, "CONCENTRATION", 10, "#000000", "center", maindiv, addedclass)
    createCheckmark(top + 31, left + 550, 20, 0, "CONCENTRATIONcheck", genericcheckmarkclick, maindiv, addedclass)

    createText(top + 236, left + 430, 10, 38, "NAME", 7, "#c5c6c7", "left", maindiv, addedclass)
    createText(top + 236, left + 500, 10, 50, "ATK BONUS", 7, "#c5c6c7", "left", maindiv, addedclass)
    createText(top + 236, left + 545, 10, 50, "DAMAGE/TYPE", 7, "#c5c6c7", "left", maindiv, addedclass)
    createFrame(200, 100, top + 231, left + 420, false, false, "attacksfull", "page1", "input", "sidebar Melee")
    createFrame(200, 80, top + 231, left + 420, false, false, "attackshalf", "page1", "input", "sidebar Half_caster")
    createFrame(200, 60, top + 231, left + 420, false, false, "attacksmin", "page1", "input", "sidebar Full_caster")
    for (let i = 0; i < 4; i++) {
        if (i >= 2) { addedclass = "sidebar Melee Half_caster"; }
        if (i >= 3) { addedclass = "sidebar Melee" }
        createFormField(top + 246 + i * 20, left + 430, 60, 15, "attackname" + String(i) + "2", "input", "9", "#dde4ff", "left", maindiv, false, "", true, addedclass)
        createFormField(top + 246 + i * 20, left + 500, 35, 15, "attackbonus" + String(i) + "2", "input", "11", "#dde4ff", "left", maindiv, true, "", true, addedclass)
        createFormField(top + 246 + i * 20, left + 545, 60, 15, "attackdamage" + String(i) + "2", "input", "9", "#dde4ff", "left", maindiv, true, "", true, addedclass)
    }

    //charged ability box for different archetypes
    createFrame(200, 160, top + 336, left + 420, false, false, "chargesfull", "page1", "input", "sidebar Melee")
    createText(top + 341, left + 430, 10, 38, "MAX", 7, "#c5c6c7", "left", maindiv, "sidebar Melee")
    createText(top + 341, left + 460, 10, 38, "ABILITY", 7, "#c5c6c7", "left", maindiv, "sidebar Melee")
    createText(top + 341, left + 550, 10, 38, "CHARGES", 7, "#c5c6c7", "left", maindiv, "sidebar Melee")

    createFrame(200, 180, top + 316, left + 420, false, false, "chargesfull", "page1", "input", "sidebar Half_caster")
    createText(top + 321, left + 430, 10, 38, "MAX", 7, "#c5c6c7", "left", maindiv, "sidebar Half_caster")
    createText(top + 321, left + 460, 10, 38, "ABILITY", 7, "#c5c6c7", "left", maindiv, "sidebar Half_caster")
    createText(top + 321, left + 550, 10, 38, "CHARGES", 7, "#c5c6c7", "left", maindiv, "sidebar Half_caster")

    createFrame(200, 60, top + 296, left + 420, false, false, "chargesmin", "page1", "input", "sidebar Full_caster")
    createText(top + 301, left + 430, 10, 38, "MAX", 7, "#c5c6c7", "left", maindiv, "sidebar Full_caster")
    createText(top + 301, left + 460, 10, 38, "ABILITY", 7, "#c5c6c7", "left", maindiv, "sidebar Full_caster")
    createText(top + 301, left + 550, 10, 38, "CHARGES", 7, "#c5c6c7", "left", maindiv, "sidebar Full_caster")
    archetypelist = ["sidebar Full_caster", "sidebar Full_caster Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster"]
    for (let i = 0; i < 9; i++) {
        createChargedAbilityLine(top + 311 + i * 20, left + 430, i, maindiv, archetypelist[i], "ChargedAbility" + String(i))
    }

    //spellbars for different archetypes
    for (let i = 0; i < 9; i++) {
        createspellbar(top + 364 + i * 44, left + 420, 200, i + 1, maindiv, 2, "sidebar Full_caster")
    }
    for (let i = 0; i < 5; i++) {
        createspellbar(top + 540 + i * 44, left + 420, 200, i + 1, maindiv, 3, "sidebar Half_caster")
    }
    createspellbar(top + 501, left + 420, 200, 'custom', maindiv, 4, "sidebar Melee")

    //companion area
    addedclass = "sidebar Melee"
    createFeaturebox(200, 208, 6, "c5c6c7", top + 551, left + 420, "index", 'sidebar Melee')
    createFrame(180, 45, top - 64 + 625, left + 430, false, false, "appliedConditions", "page1", "textarea", addedclass)
    createFrame(61, 63, top - 9 + 625, left + 485, false, true, "INITIATIVE", "index", "input", addedclass);
    createFrame(61, 63, top - 9 + 625, left + 548, false, true, "SPEED", "index", "input", addedclass);
    createFrame(180, 63, top + 63 + 625, left + 430, false, false, "health", "page1", "textarea", addedclass)
    for (let i = 0; i < 1; i++) {//ac shield, not actual forloop, just collapsed
        const ac = document.createElement("img");
        ac.className = "acshield not-selectable " + addedclass
        ac.src = "assets/svg/armor.svg";
        ac.draggable = false;
        ac.style = " --top:" + String(top - 9 + 625) + "px; --left:" + String(left + 428) + "px; --height:63px; --width:auto;"
        maindiv.appendChild(ac);

        const acname = document.createElement("div");
        acname.className = "acshieldname not-selectable " + addedclass
        acname.textContent = "ARMOR CLASS"
        acname.draggable = false;
        acname.style = " --top:" + String(top + 103 - 72 + 625) + "px; --left:" + String(left + 440) + "px;"
        maindiv.appendChild(acname);


        const formfield = document.createElement("input");
        formfield.className = "acshieldform save sizeadjustinput " + addedclass;
        formfield.id = "AC3"
        formfield.style = "--width:" + String(27) + "px; --height:" + String(27) + "px; --boxlength:" + String(25) + "; --startfont:" + String(30) + "; --top:" + String(top + 1 + 625) + "px; --left:" + String(left + 440) + "px;"
        formfield.value = "";
        formfield.onkeyup = function () { update("typing") }
        formfield.onblur = function () { unfocusfunc(formfield, "update") };
        formfield.spellcheck = false
        maindiv.appendChild(formfield);

    }
    createFormField(top + 68 + 625 - 72, left + 420 + 75, 36, 38, "INITIATIVEcompanion", "input", 25, "#dde4ff", "center", maindiv, false, "", false, addedclass)
    createFormField(top + 68 + 625 - 72, left + 420 + 138, 36, 38, "SPEEDcompanion", "input", 25, "#dde4ff", "center", maindiv, false, "", false, addedclass)
    total = createFormField(top + 138 + 625 - 72, left + 515, 40, 10, "totalhitpointscompanion", "input", "9", "#dde4ff", "left", maindiv, true, "", false, addedclass)
    hp = createFormField(top + 152 + 625 - 72, left + 440, 75, 32, "currenthitpointscompanion", "input", "30", "#dde4ff", "center", maindiv, false, "", false, addedclass)
    createFormField(top + 152 + 625 - 72, left + 520, 75, 32, "TEMPORARY HIT POINTScompanion", "input", "28", "#dde4ff", "center", maindiv, false, "", false, addedclass)
    createText(top + 204 + 625 - 72 - 17, left + 440, 10, 80, "CURRENT HIT POINTS", 7, "#000000", "center", maindiv, addedclass)
    createText(top + 204 + 625 - 72 - 17, left + 520, 10, 80, "TEMPORARY HIT POINTS", 7, "#000000", "center", maindiv, addedclass)
    createText(top + 140 + 625 - 72, left + 435, 10, 80, "HIT POINT MAXIMUM", 7, "#000000", "center", maindiv, addedclass)
    createScriptedButton(top + 138 + 625 - 72, left + 560, 39, 12, "Heal", healscriptcompanion, maindiv, addedclass)
    createFormField(top - 59 + 625, left + 440, 156, 22, "appliedConditionscompanion", "textarea", "14", "#dde4ff", "left", maindiv, false, "", false, addedclass)
    createText(top + 9 + 625 - 40, left + 440, 20, 156, "CURRENTLY APPLIED CONDITIONS", 8, "#000000", "center", maindiv, addedclass)

    //division div, so your mouse wont be a pointer for something in the background
    const divider = document.createElement("img");
    divider.className = "divider not-selectable "
    divider.draggable = false;
    divider.style = "--top:" + String(top) + "px; --left:" + String(left + 420) + "px; --height:" + String(760) + "px; --width:" + String(200) + "px"
    maindiv.appendChild(divider);



    const currentDiv = document.getElementById("index");
    document.body.insertBefore(maindiv, null);
} function createBackstoryPage(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "Backstory page"

    createHeaderpage4(top - 120, left - 30)


    createFrame(400, 350, top, left, true, true, "BACKSTORY", "page1", "textarea", "")
    createFeaturebox(210, 350, 6, "c5c6c7", top, left + 410, "index")
    backstoryTabs = ["PERSONALITY TRAITS", "IDEALS", "BONDS", "FLAWS"]
    for (let i = 0; i < 4; i++) {
        createFrame(190, 80, top + 10 + 83 * i, left + 420, true, true, backstoryTabs[i], "page1", "textarea", "")
    }

    createFrame(210, 400, top + 360, left, true, true, "ALLIES & ORGANIZATIONS", "page1", "textarea", "")
    createFrame(400, 400, top + 360, left + 220, false, true, "FEATURES & TRAITS LOOK UP", "page1", "textarea", "")




    document.body.insertBefore(maindiv, null);
} function createInventoryPage(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "Inventory page"

    createHeaderpage5(top - 120, left - 30)




    createFrame(330, 185, top, left, false, false, "miscellaneous", "page1", "textarea", "")
    createFormField(top + 5, left + 10, 148, 160, "miscellaneous", "textarea", "16", "#dde4ff", "left", maindiv, true, "", false, "")
    createFormField(top + 5, left + 168, 148, 160, "shoppinglist", "textarea", "16", "#dde4ff", "left", maindiv, true, "", false, "")
    createText(top + 172, left + 10, 15, 148, "MISCELLANEOUS", "8", "#000000", "center", maindiv, "")
    createText(top + 172, left + 168, 15, 148, "SHOPPING LIST", "8", "#000000", "center", maindiv, "")

    createFrame(130, 185, top, left + 340, false, false, "funds", "page1", "textarea", "")
    createText(top + 172, left + 340, 15, 130, "FUNDS", "8", "#000000", "center", maindiv, "")
    createText(top + 10, left + 310, 15, 130, "PERSONAL", "8", "#000000", "center", maindiv, "")
    createText(top + 10, left + 370, 15, 130, "PARTY", "8", "#000000", "center", maindiv, "")

    createFrame(140, 185, top, left + 480, false, false, "essentials", "page1", "textarea", "")
    createText(top + 172, left + 480, 15, 140, "ESSENTIAL ITEMS", "8", "#000000", "center", maindiv, "")

    createFrame(200, 200, top + 195, left, false, false, "potions", "page1", "textarea", "")
    createFormField(top + 200, left + 10, 175, 175, "potions", "textarea", "16", "#dde4ff", "left", maindiv, true, "", false, "")
    createText(top + 382, left + 10, 15, 175, "POTIONS", "8", "#000000", "center", maindiv, "")

    createFrame(200, 200, top + 195, left + 210, false, false, "questitems", "page1", "textarea", "")
    createFormField(top + 200, left + 220, 175, 175, "questitems", "textarea", "16", "#dde4ff", "left", maindiv, true, "", false, "")
    createText(top + 382, left + 220, 15, 175, "QUEST ITEMS", "8", "#000000", "center", maindiv, "")

    createFrame(410, 355, top + 405, left, false, false, "treasures", "page1", "textarea", "")
    createFormField(top + 410, left + 10, 188, 330, "treasures1", "textarea", "12", "#dde4ff", "left", maindiv, true, "", false, "")
    createFormField(top + 410, left + 208, 188, 330, "treasures2", "textarea", "12", "#dde4ff", "left", maindiv, true, "", false, "")
    createText(top + 747, left + 10, 15, 385, "TREASURES", "8", "#000000", "center", maindiv, "")

    createFrame(190, 200, top + 195, left + 430, false, false, "armor", "page1", "textarea", "")
    createText(top + 195 + 200 - 15, left + 440, 15, 165, "ARMOR", "12", "#000000", "right", maindiv, "")
    fillEquipmentSlot(top + 195, left + 430, 4, "armor", maindiv, "")


    createFrame(190, 200, top + 400, left + 430, false, false, "weapons", "page1", "textarea", "")
    createText(top + 400 + 200 - 15, left + 440, 15, 165, "WEAPONS", "12", "#000000", "right", maindiv, "")
    fillEquipmentSlot(top + 400, left + 430, 4, "weapons", maindiv, "")


    createFrame(190, 155, top + 605, left + 430, false, false, "attunements", "page1", "textarea", "")
    createText(top + 605 + 155 - 15, left + 440, 15, 165, "ATTUNEMENTS", "12", "#000000", "right", maindiv, "")
    fillEquipmentSlot(top + 605, left + 430, 3, "attunements", maindiv, "")

    //essentials
    for (let i = 0; i < 5; i++) {
        const inventorytab = document.createElement("img");
        inventorytab.className = "inventorytab not-selectable"
        inventorytab.src = "assets/svg/essential item tab.svg";
        inventorytab.alt = "essentialstab";
        inventorytab.draggable = false;
        inventorytab.style = "--top:" + String(top + 15 + 30 * i) + "px; --left:" + String(left + 487) + "px; --width:" + String(125) + "px"
        maindiv.appendChild(inventorytab);
        createFormField(top + 19 + 30 * i, left + 494, 30, 17, "essentialsamount" + String(i), "input", 12, "#dde4ff", "center", maindiv, false, "", false, "")
        createFormField(top + 20 + 30 * i, left + 545, 50, 15, "essentials" + String(i), "input", 12, "#dde4ff", "left", maindiv, false, "", false, "")
    }


    //funds
    funds = ["CP", "SP", "EP", "GP", "PP"]
    for (let i = 0; i < 5; i++) {
        const inventorytab = document.createElement("img");
        inventorytab.className = "fundstab not-selectable"
        inventorytab.src = "assets/svg/funds" + funds[i] + ".svg";
        inventorytab.alt = "funds";
        inventorytab.draggable = false;
        inventorytab.style = "--top:" + String(top + 20 + 30 * i) + "px; --left:" + String(left + 335) + "px; --width:" + String(67) + "px; --scale:" + "none;"
        maindiv.appendChild(inventorytab);

        const inventorytabrev = document.createElement("img");
        inventorytabrev.className = "fundstab not-selectable"
        inventorytabrev.src = "assets/svg/funds" + funds[i] + ".svg";
        inventorytabrev.alt = "funds";
        inventorytabrev.draggable = false;
        inventorytabrev.style = "--top:" + String(top + 20 + 30 * i) + "px; --left:" + String(left + 408) + "px; --width:" + String(67) + "px; --scale:" + "scale(-1,1);"
        maindiv.appendChild(inventorytabrev);

        createText(top + 30 + 30 * i, left + 462, 15, 10, funds[i], "8", "#000000", "center", maindiv, "")
        createText(top + 30 + 30 * i, left + 338, 15, 10, funds[i], "8", "#000000", "center", maindiv, "")
        createFormField(top + 24 + 30 * i, left + 358, 30, 17, "personalfundsamount" + funds[i], "input", 12, "#dde4ff", "center", maindiv, false, "", false, "")
        createFormField(top + 24 + 30 * i, left + 418, 30, 17, "partyfundsamount" + funds[i], "input", 12, "#dde4ff", "center", maindiv, false, "", false, "")

    }



    document.body.insertBefore(maindiv, null);
}
