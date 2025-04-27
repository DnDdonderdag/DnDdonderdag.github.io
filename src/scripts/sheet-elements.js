/**************************************************
 * MODULE 3: CHARACTER SHEET ELEMENTS
 * Functions for creating specific character sheet components
 **************************************************/

// Define constants that were previously global
const abilityBars = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

function createAbilityBoxes(top, left) {
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



    const currentDiv = document.getElementById("index");
    document.body.insertBefore(maindiv, null);
}

function filldarkbox(top, left) {

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




    const currentDiv = document.getElementById("index");
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
    createFormField(15, 141, 38, 38, "SPEED1", "input", 25, "#dde4ff", "center", maindiv, true, "", true, "")

    //death saves field
    const line = document.createElement("img");
    line.className = "verticalline not-selectable"
    line.src = "assets/svg/VerticalLine.svg";
    line.alt = "line";
    line.draggable = false;
    line.style = "--top:" + String(238) + "px; --left:" + String(155) + "px;  --scale:rotate(-90deg) scale(0.5,1) "
    maindiv.appendChild(line);
    const line2 = document.createElement("img");
    line2.className = "verticalline not-selectable"
    line2.src = "assets/svg/VerticalLine.svg";
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



}

function fillattackandspellcasting(width, height, top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "fillattackandspellcasting not-selectable"
    maindiv.style = "position:absolute; top:" + String(top) + "px; width:" + String(width) + "px; left:" + String(left) + "px; height:" + String(height - 20) + "px"
    const currentDiv = document.getElementById("index");
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
}

function fillEquipmentSlot(top, left, amount, name, parentdiv, addedclass) {
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

}

function createspellbar(top, left, width, level, parentdiv, version, addedclass) {
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

}

function createspellline(top, left, width, level, parentdiv, name) {
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
}

function createChargedAbilityLine(top, left, version, parentdiv, addedclass, name) {
    createFormField(top, left, 20, 15, "maxcharges" + String(version), "input", "10", "#dde4ff", "center", parentdiv, true, "", false, addedclass)
    createFormField(top, left + 25, 55, 15, "abilityname" + String(version), "input", "10", "#dde4ff", "left", parentdiv, false, "", false, addedclass)
    createScriptedButton(top, left + 85, 15, 17, "+1", plusonescript, parentdiv, addedclass, "15", name)
    createScriptedButton(top, left + 101, 15, 17, "-1", minusonescript, parentdiv, addedclass, "15", name)
    createFormField(top, left + 117, 23, 15, "currentcharges" + String(version), "input", "10", "#dde4ff", "center", parentdiv, false, "", false, addedclass)
    createScriptedButton(top, left + 145, 34, 17, "Recover", recoverscript, parentdiv, addedclass, "9", name)
}