/**************************************************
 * MODULE 4: PAGE LAYOUTS
 * Functions for creating complete page layouts
 **************************************************/

function createMainpage(top, left) {
    // Fix: Make sure parent element exists before creating child elements
    const mainContainer = document.getElementById("index");
    if (!mainContainer) {
        console.error("Container element 'index' not found");
        return;
    }

    createFeaturebox(200, 600, 6, "e7e8e8", top, left, "index");
    createFeaturebox(200, 300, 6, "c5c6c7", top, left + 210, "index");
    filldarkbox(top, left + 210);
    createFrame(200, 290, top + 310, left + 210, false, true, "ATTACKS & SPELLCASTING", "index", "textarea");
    fillattackandspellcasting(200, 290, top + 310, left + 210);
    createFrame(200, 760, top, left + 420, true, true, "FEATURES & TRAITS", "index", "textarea");
    createFrame(200, 150, top + 610, left, true, true, "OTHER PROFICIENCIES & LANGUAGES", "index", "textarea");
    createFrame(200, 150, top + 610, left + 210, true, true, "CHARACTER NOTES", "index", "textarea");
    createAbilityBoxes(top + 85, left + 5);
    createHeaderpage1(top - 120, left - 30);
}

function createSpellPage(top, left) {
    //createFrame(620, 760, top, left, false, false, "spellframe", "index", "textarea")
    createHeaderpage2(top - 140, left - 30);

    const maindiv = document.createElement("div");
    maindiv.className = "spell list page";

    for (let i = 0; i < 3; i++) {
        const headerchar = document.createElement("img");
        headerchar.className = "spelllistrect not-selectable";
        headerchar.src = "assets/svg/spelllist frame.svg";
        headerchar.alt = "spelllistframe";
        headerchar.draggable = false;
        headerchar.style = `
            --top: ${top - 20}px;
            --left: ${left + i * 206}px; 
            --height: 760px;
            --width: 207px;
            transform-origin: top center;
            transform: scaleY(1.05);
            object-fit: fill;
        `;
        maindiv.appendChild(headerchar);
    }

    //54 slots spellbar is 3 slots
    linesperlevel = [8, 19, 17, 16, 15, 13, 12, 12, 9, 8]; //pretty set in stone, if changed will not be compatible with loaded sheets
    initi = 0;
    finalj = 0;
    j = 0;
    for (let k = 0; k < 3; k++) {
        row = 0;
        for (let i = initi; i < linesperlevel.length; i++) {
            if (row + 3 > 53 && endj == linesperlevel[i - 1] - 1) { initi = i; finalj = 0; break; }
            if (row + 3 > 53) { initi = i - 1; break; }
            createspellbar(top + 22 + row * 40 / 3, left + 10 + k * 210, 180, i, maindiv, 1);
            row += 3;
            for (let j = 0; j < linesperlevel[i]; j++) {
                if (row + 1 > 53) { finalj = j; break; }
                if (finalj + j >= linesperlevel[i]) { finalj = 0; break; }
                createspellline(top + 20 + row * 40 / 3, left + 10 + k * 210, 180, i, maindiv, "level:" + String(i) + " num:" + String(j));
                row += 1;
                endj = j;
            }
        }
    }

    document.body.insertBefore(maindiv, null);
}

function createAttackpage(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "attack page";

    createHeaderpage3(top - 140, left - 30);
    createFrame(410, 760, top, left, false, false, "attack page", "page1", "textarea");

    //lookups
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            //390x740
            entryfield = createFormField(top + 10 + j * 372, left + 10 + i * 196, 190, 20, "lookupentry" + String(i) + "," + String(j), "input", 14, "#dde4ff", "left", maindiv, false, "", false, "");
            resultfield = createFormField(top + 34 + j * 372, left + 10 + i * 196, 190, 334, "lookupresult" + String(i) + "," + String(j), "textarea", 14, "#c5c6c7", "left", maindiv, false, "", false, "lookup");
            resultfield.style.outline = "none";
        }
    }

    const attackSheetDropDown = document.createElement("select");
    attackSheetDropDown.className = "dropdown save";
    attackSheetDropDown.draggable = false;
    attackSheetDropDown.id = "attacksheetdropdown";
    attackSheetDropDown.style = "--top:" + String(top - 100) + "px; --left:" + String(left + 420) + "px; --height:" + String(22) + "px; --width:" + String(200) + "px";
    attackSheetDropDown.addEventListener('change', function () { changeSidebar(); });
    options = ["Select Archetype...", "Melee", "Half caster", "Full caster"];
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement('option');
        opt.value = options[i].replace(/ /g, "_");
        opt.innerHTML = options[i];
        attackSheetDropDown.appendChild(opt);
    }
    maindiv.appendChild(attackSheetDropDown);

    //archetype specific fields
    //all:
    addedclass = "sidebar Melee Full_caster Half_caster";
    createFeaturebox(200, 300, 6, "c5c6c7", top - 74, left + 420, "index", addedclass);
    createFrame(180, 85, top - 64, left + 430, false, false, "appliedConditions", "page1", "textarea", addedclass);
    createFrame(61, 63, top + 63, left + 485, false, true, "INITIATIVE", "index", "input", addedclass);
    createFrame(61, 63, top + 63, left + 548, false, true, "SPEED", "index", "input", addedclass);
    createFrame(180, 83, top + 133, left + 430, false, false, "health", "page1", "textarea", addedclass);
    for (let i = 0; i < 1; i++) {//ac shield, not actual forloop, just collapsed
        const ac = document.createElement("img");
        ac.className = "acshield not-selectable " + addedclass;
        ac.src = "assets/svg/armor.svg";
        ac.draggable = false;
        ac.style = " --top:" + String(top + 63) + "px; --left:" + String(left + 428) + "px; --height:63px; --width:auto;";
        maindiv.appendChild(ac);

        const acname = document.createElement("div");
        acname.className = "acshieldname not-selectable " + addedclass;
        acname.textContent = "ARMOR CLASS";
        acname.draggable = false;
        acname.style = " --top:" + String(top + 103) + "px; --left:" + String(left + 440) + "px;";
        maindiv.appendChild(acname);

        createFormField(top + 73, left + 440, 27, 27, "AC2", "input", 20, "#dde4ff", "center", maindiv, true, "[armor0button]*[armor0] + [armor1button]*[armor1] + [armor2button]*[armor2] + [armor3button]*[armor3]", true, addedclass);
    }
    createFormField(top + 68, left + 420 + 75, 36, 38, "INITIATIVE2", "input", 25, "#dde4ff", "center", maindiv, true, "[DEXmod]", true, addedclass);
    createFormField(top + 68, left + 420 + 138, 36, 38, "SPEED2", "input", 25, "#dde4ff", "center", maindiv, false, "", true, addedclass);
    total = createFormField(top + 138, left + 515, 40, 10, "totalhitpoints2", "input", "9", "#dde4ff", "left", maindiv, true, "", true, addedclass);
    hp = createFormField(top + 152, left + 440, 75, 49, "currenthitpoints2", "input", "30", "#dde4ff", "center", maindiv, false, "", true, addedclass);
    createFormField(top + 152, left + 520, 75, 49, "TEMPORARY HIT POINTS2", "input", "28", "#dde4ff", "center", maindiv, false, "", true, addedclass);
    createText(top + 204, left + 440, 10, 80, "CURRENT HIT POINTS", 7, "#000000", "center", maindiv, addedclass);
    createText(top + 204, left + 520, 10, 80, "TEMPORARY HIT POINTS", 7, "#000000", "center", maindiv, addedclass);
    createText(top + 140, left + 435, 10, 80, "HIT POINT MAXIMUM", 7, "#000000", "center", maindiv, addedclass);
    createScriptedButton(top + 138, left + 560, 39, 12, "Heal", healscript, maindiv, addedclass);
    createFormField(top - 59, left + 440, 156, 62, "appliedConditions", "textarea", "14", "#dde4ff", "left", maindiv, false, "", false, addedclass);
    createText(top + 9, left + 440, 20, 156, "CURRENTLY APPLIED CONDITIONS", 8, "#000000", "center", maindiv, addedclass);
    createFrame(140, 30, top + 27, left + 450, false, false, "concentration", "page1", "textarea", addedclass);
    createText(top + 36, left + 455, 20, 95, "CONCENTRATION", 10, "#000000", "center", maindiv, addedclass);
    createCheckmark(top + 31, left + 550, 20, 0, "CONCENTRATIONcheck", genericcheckmarkclick, maindiv, addedclass);

    createText(top + 236, left + 430, 10, 38, "NAME", 7, "#c5c6c7", "left", maindiv, addedclass);
    createText(top + 236, left + 500, 10, 50, "ATK BONUS", 7, "#c5c6c7", "left", maindiv, addedclass);
    createText(top + 236, left + 545, 10, 50, "DAMAGE/TYPE", 7, "#c5c6c7", "left", maindiv, addedclass);
    createFrame(200, 100, top + 231, left + 420, false, false, "attacksfull", "page1", "input", "sidebar Melee");
    createFrame(200, 80, top + 231, left + 420, false, false, "attackshalf", "page1", "input", "sidebar Half_caster");
    createFrame(200, 60, top + 231, left + 420, false, false, "attacksmin", "page1", "input", "sidebar Full_caster");
    for (let i = 0; i < 4; i++) {
        if (i >= 2) { addedclass = "sidebar Melee Half_caster"; }
        if (i >= 3) { addedclass = "sidebar Melee"; }
        createFormField(top + 246 + i * 20, left + 430, 60, 15, "attackname" + String(i) + "2", "input", "9", "#dde4ff", "left", maindiv, false, "", true, addedclass);
        createFormField(top + 246 + i * 20, left + 500, 35, 15, "attackbonus" + String(i) + "2", "input", "11", "#dde4ff", "left", maindiv, true, "", true, addedclass);
        createFormField(top + 246 + i * 20, left + 545, 60, 15, "attackdamage" + String(i) + "2", "input", "9", "#dde4ff", "left", maindiv, true, "", true, addedclass);
    }

    //charged ability box for different archetypes
    createFrame(200, 160, top + 336, left + 420, false, false, "chargesfull", "page1", "input", "sidebar Melee");
    createText(top + 341, left + 430, 10, 38, "MAX", 7, "#c5c6c7", "left", maindiv, "sidebar Melee");
    createText(top + 341, left + 460, 10, 38, "ABILITY", 7, "#c5c6c7", "left", maindiv, "sidebar Melee");
    createText(top + 341, left + 550, 10, 38, "CHARGES", 7, "#c5c6c7", "left", maindiv, "sidebar Melee");

    createFrame(200, 180, top + 316, left + 420, false, false, "chargesfull", "page1", "input", "sidebar Half_caster");
    createText(top + 321, left + 430, 10, 38, "MAX", 7, "#c5c6c7", "left", maindiv, "sidebar Half_caster");
    createText(top + 321, left + 460, 10, 38, "ABILITY", 7, "#c5c6c7", "left", maindiv, "sidebar Half_caster");
    createText(top + 321, left + 550, 10, 38, "CHARGES", 7, "#c5c6c7", "left", maindiv, "sidebar Half_caster");

    createFrame(200, 60, top + 296, left + 420, false, false, "chargesmin", "page1", "input", "sidebar Full_caster");
    createText(top + 301, left + 430, 10, 38, "MAX", 7, "#c5c6c7", "left", maindiv, "sidebar Full_caster");
    createText(top + 301, left + 460, 10, 38, "ABILITY", 7, "#c5c6c7", "left", maindiv, "sidebar Full_caster");
    createText(top + 301, left + 550, 10, 38, "CHARGES", 7, "#c5c6c7", "left", maindiv, "sidebar Full_caster");
    archetypelist = ["sidebar Full_caster", "sidebar Full_caster Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster", "sidebar Melee Half_caster"];
    for (let i = 0; i < 9; i++) {
        createChargedAbilityLine(top + 311 + i * 20, left + 430, i, maindiv, archetypelist[i], "ChargedAbility" + String(i));
    }

    //spellbars for different archetypes
    for (let i = 0; i < 9; i++) {
        createspellbar(top + 364 + i * 44, left + 420, 200, i + 1, maindiv, 2, "sidebar Full_caster");
    }
    for (let i = 0; i < 5; i++) {
        createspellbar(top + 540 + i * 44, left + 420, 200, i + 1, maindiv, 3, "sidebar Half_caster");
    }
    createspellbar(top + 501, left + 420, 200, 'custom', maindiv, 4, "sidebar Melee");

    //companion area
    addedclass = "sidebar Melee";
    createFeaturebox(200, 208, 6, "c5c6c7", top + 551, left + 420, "index", 'sidebar Melee');
    createFrame(180, 45, top - 64 + 625, left + 430, false, false, "appliedConditions", "page1", "textarea", addedclass);
    createFrame(61, 63, top - 9 + 625, left + 485, false, true, "INITIATIVE", "index", "input", addedclass);
    createFrame(61, 63, top - 9 + 625, left + 548, false, true, "SPEED", "index", "input", addedclass);
    createFrame(180, 63, top + 63 + 625, left + 430, false, false, "health", "page1", "textarea", addedclass);
    for (let i = 0; i < 1; i++) {//ac shield, not actual forloop, just collapsed
        const ac = document.createElement("img");
        ac.className = "acshield not-selectable " + addedclass;
        ac.src = "assets/svg/armor.svg";
        ac.draggable = false;
        ac.style = " --top:" + String(top - 9 + 625) + "px; --left:" + String(left + 428) + "px; --height:63px; --width:auto;";
        maindiv.appendChild(ac);

        const acname = document.createElement("div");
        acname.className = "acshieldname not-selectable " + addedclass;
        acname.textContent = "ARMOR CLASS";
        acname.draggable = false;
        acname.style = " --top:" + String(top + 103 - 72 + 625) + "px; --left:" + String(left + 440) + "px;";
        maindiv.appendChild(acname);

        const formfield = document.createElement("input");
        formfield.className = "acshieldform save sizeadjustinput " + addedclass;
        formfield.id = "AC3";
        formfield.style = "--width:" + String(27) + "px; --height:" + String(27) + "px; --boxlength:" + String(25) + "; --startfont:" + String(30) + "; --top:" + String(top + 1 + 625) + "px; --left:" + String(left + 440) + "px;";
        formfield.value = "";
        formfield.onkeyup = function () { update("typing"); };
        formfield.onblur = function () { unfocusfunc(formfield, "update"); };
        formfield.spellcheck = false;
        maindiv.appendChild(formfield);
    }
    createFormField(top + 68 + 625 - 72, left + 420 + 75, 36, 38, "INITIATIVEcompanion", "input", 25, "#dde4ff", "center", maindiv, false, "", false, addedclass);
    createFormField(top + 68 + 625 - 72, left + 420 + 138, 36, 38, "SPEEDcompanion", "input", 25, "#dde4ff", "center", maindiv, false, "", false, addedclass);
    total = createFormField(top + 138 + 625 - 72, left + 515, 40, 10, "totalhitpointscompanion", "input", "9", "#dde4ff", "left", maindiv, true, "", false, addedclass);
    hp = createFormField(top + 152 + 625 - 72, left + 440, 75, 32, "currenthitpointscompanion", "input", "30", "#dde4ff", "center", maindiv, false, "", false, addedclass);
    createFormField(top + 152 + 625 - 72, left + 520, 75, 32, "TEMPORARY HIT POINTScompanion", "input", "28", "#dde4ff", "center", maindiv, false, "", false, addedclass);
    createText(top + 204 + 625 - 72 - 17, left + 440, 10, 80, "CURRENT HIT POINTS", 7, "#000000", "center", maindiv, addedclass);
    createText(top + 204 + 625 - 72 - 17, left + 520, 10, 80, "TEMPORARY HIT POINTS", 7, "#000000", "center", maindiv, addedclass);
    createText(top + 140 + 625 - 72, left + 435, 10, 80, "HIT POINT MAXIMUM", 7, "#000000", "center", maindiv, addedclass);
    createScriptedButton(top + 138 + 625 - 72, left + 560, 39, 12, "Heal", healscriptcompanion, maindiv, addedclass);
    createFormField(top - 59 + 625, left + 440, 156, 22, "appliedConditionscompanion", "textarea", "14", "#dde4ff", "left", maindiv, false, "", false, addedclass);
    createText(top + 9 + 625 - 40, left + 440, 20, 156, "CURRENTLY APPLIED CONDITIONS", 8, "#000000", "center", maindiv, addedclass);

    //division div, so your mouse wont be a pointer for something in the background
    const divider = document.createElement("img");
    divider.className = "divider not-selectable ";
    divider.draggable = false;
    divider.style = "--top:" + String(top) + "px; --left:" + String(left + 420) + "px; --height:" + String(760) + "px; --width:" + String(200) + "px";
    maindiv.appendChild(divider);

    const currentDiv = document.getElementById("index");
    document.body.insertBefore(maindiv, null);
}

function createBackstoryPage(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "Backstory page";

    createHeaderpage4(top - 120, left - 30);

    createFrame(400, 350, top, left, true, true, "BACKSTORY", "page1", "textarea", "");
    createFeaturebox(210, 350, 6, "c5c6c7", top, left + 410, "index");
    backstoryTabs = ["PERSONALITY TRAITS", "IDEALS", "BONDS", "FLAWS"];
    for (let i = 0; i < 4; i++) {
        createFrame(190, 80, top + 10 + 83 * i, left + 420, true, true, backstoryTabs[i], "page1", "textarea", "");
    }

    createFrame(210, 400, top + 360, left, true, true, "ALLIES & ORGANIZATIONS", "page1", "textarea", "");
    createFrame(400, 400, top + 360, left + 220, false, true, "FEATURES & TRAITS LOOK UP", "page1", "textarea", "");

    document.body.insertBefore(maindiv, null);
}

function createInventoryPage(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "Inventory page";

    createHeaderpage5(top - 120, left - 30);

    createFrame(330, 185, top, left, false, false, "miscellaneous", "page1", "textarea", "");
    createFormField(top + 5, left + 10, 148, 160, "miscellaneous", "textarea", "16", "#dde4ff", "left", maindiv, true, "", false, "");
    createFormField(top + 5, left + 168, 148, 160, "shoppinglist", "textarea", "16", "#dde4ff", "left", maindiv, true, "", false, "");
    createText(top + 172, left + 10, 15, 148, "MISCELLANEOUS", "8", "#000000", "center", maindiv, "");
    createText(top + 172, left + 168, 15, 148, "SHOPPING LIST", "8", "#000000", "center", maindiv, "");

    createFrame(130, 185, top, left + 340, false, false, "funds", "page1", "textarea", "");
    createText(top + 172, left + 340, 15, 130, "FUNDS", "8", "#000000", "center", maindiv, "");
    createText(top + 10, left + 310, 15, 130, "PERSONAL", "8", "#000000", "center", maindiv, "");
    createText(top + 10, left + 370, 15, 130, "PARTY", "8", "#000000", "center", maindiv, "");

    createFrame(140, 185, top, left + 480, false, false, "essentials", "page1", "textarea", "");
    createText(top + 172, left + 480, 15, 140, "ESSENTIAL ITEMS", "8", "#000000", "center", maindiv, "");

    createFrame(200, 200, top + 195, left, false, false, "potions", "page1", "textarea", "");
    createFormField(top + 200, left + 10, 175, 175, "potions", "textarea", "16", "#dde4ff", "left", maindiv, true, "", false, "test");
    createText(top + 382, left + 10, 15, 175, "POTIONS", "8", "#000000", "center", maindiv, "");

    createFrame(200, 200, top + 195, left + 210, false, false, "questitems", "page1", "textarea", "");
    createFormField(top + 200, left + 220, 175, 175, "questitems", "textarea", "16", "#dde4ff", "left", maindiv, true, "", false, "");
    createText(top + 382, left + 220, 15, 175, "QUEST ITEMS", "8", "#000000", "center", maindiv, "");

    createFrame(200, 355, top + 405, left, false, false, "treasures", "page1", "textarea", "");
    createFormField(top + 410, left + 10, 175, 330, "treasures1", "textarea", "12", "#dde4ff", "left", maindiv, true, "", false, "");
    createText(top + 747, left + 10, 15, 175, "TREASURES", "8", "#000000", "center", maindiv, "");

    createFrame(210, 355, top + 405, left + 210, false, false, "spell effects", "page1", "textarea", "");
    createText(top + 747, left, 175, 340, "SPELL EFFECTS", "8", "#000000", "right", maindiv, "");
    fillEquipmentSlot(top + 410, left + 215, 8, "spell effects", maindiv, "");

    createFrame(190, 200, top + 195, left + 430, false, false, "armor", "page1", "textarea", "");
    createText(top + 195 + 200 - 15, left + 440, 15, 165, "ARMOR", "12", "#000000", "right", maindiv, "");
    fillEquipmentSlot(top + 195, left + 430, 4, "armor", maindiv, "");

    createFrame(190, 200, top + 400, left + 430, false, false, "weapons", "page1", "textarea", "");
    createText(top + 400 + 200 - 15, left + 440, 15, 165, "WEAPONS", "12", "#000000", "right", maindiv, "");
    fillEquipmentSlot(top + 400, left + 430, 4, "weapons", maindiv, "");

    createFrame(190, 155, top + 605, left + 430, false, false, "attunements", "page1", "textarea", "");
    createText(top + 605 + 155 - 15, left + 440, 15, 165, "ATTUNEMENTS", "12", "#000000", "right", maindiv, "");
    fillEquipmentSlot(top + 605, left + 430, 3, "attunements", maindiv, "");

    //essentials
    for (let i = 0; i < 5; i++) {
        const inventorytab = document.createElement("img");
        inventorytab.className = "inventorytab not-selectable";
        inventorytab.src = "assets/svg/essential item tab.svg";
        inventorytab.alt = "essentialstab";
        inventorytab.draggable = false;
        inventorytab.style = "--top:" + String(top + 15 + 30 * i) + "px; --left:" + String(left + 487) + "px; --width:" + String(125) + "px";
        maindiv.appendChild(inventorytab);
        createFormField(top + 19 + 30 * i, left + 494, 30, 17, "essentialsamount" + String(i), "input", 12, "#dde4ff", "center", maindiv, false, "", false, "");
        createFormField(top + 20 + 30 * i, left + 545, 50, 15, "essentials" + String(i), "input", 12, "#dde4ff", "left", maindiv, false, "", false, "");
    }

    //funds
    funds = ["CP", "SP", "EP", "GP", "PP"];
    for (let i = 0; i < 5; i++) {
        const inventorytab = document.createElement("img");
        inventorytab.className = "fundstab not-selectable";
        inventorytab.src = "assets/svg/funds" + funds[i] + ".svg";
        inventorytab.alt = "funds";
        inventorytab.draggable = false;
        inventorytab.style = "--top:" + String(top + 20 + 30 * i) + "px; --left:" + String(left + 335) + "px; --width:" + String(67) + "px; --scale:" + "none;";
        maindiv.appendChild(inventorytab);

        const inventorytabrev = document.createElement("img");
        inventorytabrev.className = "fundstab not-selectable";
        inventorytabrev.src = "assets/svg/funds" + funds[i] + ".svg";
        inventorytabrev.alt = "funds";
        inventorytabrev.draggable = false;
        inventorytabrev.style = "--top:" + String(top + 20 + 30 * i) + "px; --left:" + String(left + 408) + "px; --width:" + String(67) + "px; --scale:" + "scale(-1,1);";
        maindiv.appendChild(inventorytabrev);

        createText(top + 30 + 30 * i, left + 462, 15, 10, funds[i], "8", "#000000", "center", maindiv, "");
        createText(top + 30 + 30 * i, left + 338, 15, 10, funds[i], "8", "#000000", "center", maindiv, "");
        createFormField(top + 24 + 30 * i, left + 358, 30, 17, "personalfundsamount" + funds[i], "input", 12, "#dde4ff", "center", maindiv, false, "", false, "");
        createFormField(top + 24 + 30 * i, left + 418, 30, 17, "partyfundsamount" + funds[i], "input", 12, "#dde4ff", "center", maindiv, false, "", false, "");
    }

    document.body.insertBefore(maindiv, null);
}

function createNotesPage(top, left) {
    const maindiv = document.createElement("div");
    maindiv.className = "notes page";

    createHeaderpage6(top - 120, left - 30);

    // Create main notes sections in a vertical layout
    const noteCategories = ["GENERAL", "LOCATIONS", "NPCS", "QUESTS", "LORE"];
    const sectionHeight = 148; // Height for each section
    const margin = 5; // Margin between sections

    // Create a single container for all notes
    for (let i = 0; i < noteCategories.length; i++) {
        const sectionTop = top + (i * (sectionHeight + margin));

        // Create main frame for each category
        createFrame(620, sectionHeight, sectionTop, left, true, true, `${noteCategories[i]}`, "index", "textarea", "");
    }

    document.body.insertBefore(maindiv, null);
}