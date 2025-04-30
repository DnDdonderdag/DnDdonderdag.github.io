/**************************************************
 * MODULE 1: UI COMPONENT CREATION
 * Core functions for creating UI elements
 **************************************************/

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

}

function createText(top, left, height, width, content, fontsize, color, align, parentdiv, addedclass = "") {
    const textfield = document.createElement("div");
    textfield.className = "generictext not-selectable" + " " + addedclass + " "
    textfield.style = "--top:" + String(height) + "px; --width:" + String(width) + "px; --left:" + String(left) + "px; --top:" + String(top) + "px; --color:" + String(color) + "; --align:" + String(align) + "; --fontsize:" + String(fontsize) + "px;"
    textfield.textContent = content
    parentdiv.appendChild(textfield);
}

function createButton(top, left, size, initvalue, name, func, parentdiv, addedclass = "") {
    const checkbox = document.createElement("div");
    checkbox.className = "genericbutton save" + " " + addedclass + " "
    checkbox.value = initvalue
    checkbox.id = name
    checkbox.style = "--top:" + String(top) + "px; --left:" + String(left) + "px; --size:" + String(size) + "px"
    checkbox.addEventListener("click", func, false)
    parentdiv.appendChild(checkbox);
}

function createCheckmark(top, left, size, initvalue, name, func, parentdiv, addedclass, syncbool) {
    const checkbox = document.createElement("div");
    checkbox.className = "checkmarkbutton save " + addedclass + (syncbool ? (" sync") : (""))
    checkbox.value = initvalue
    checkbox.id = name
    checkbox.style = "--top:" + String(top) + "px; --left:" + String(left) + "px; --size:" + String(size) + "px; --textsize:" + String(size - 3) + "px; --lineheight:" + String(size) + "px;"
    checkbox.addEventListener("click", func, false)
    parentdiv.appendChild(checkbox);
}

function createFrame(width, height, top, left, formbool = false, namebool = false, name, page = "index", format = "textarea", addedclass = "") {
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
            line.src = "assets/svg/VerticalLine.svg";
        }
        line.alt = "line";
        line.draggable = false;
        line.style = tops[i] + lefts[i] + scales[i]
        maindiv.appendChild(line);
    }

    //Create text area
    if (formbool) {
        const formfield = document.createElement(format);
        if (format == "textarea" && !(addedclass == "txt")) { formfield.className = "frameform save sizeadjust calculated"; }
        if (format == "input") { formfield.className = "frameform save sizeadjustinput calculated"; }
        if (format == "textarea" && addedclass == "txt") { formfield.className = "frameform save sizeadjust"; }
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
}

function createFeaturebox(width, height, bevel, color, top, left, page, addedclass = "") {
    const div = document.createElement("div");
    div.className = "featurebox" + " " + addedclass + " ";
    div.style = "--width: " + String(width) + "px; --height: " + String(height) + "px; --bevel: " + String(bevel) + "px; --color: #" + String(color) + "; top:" + String(top) + "px; left:" + String(left) + "px;";
    const currentDiv = document.getElementById(page);
    document.body.insertBefore(div, currentDiv);
}

function createScriptedButton(top, left, width, height, content, script, parentdiv, addedclass, textsize = "9", name) {
    const button = document.createElement("div");
    button.textContent = content
    button.id = name
    button.className = "genericScriptedButton not-selectable " + addedclass
    button.style = "--top:" + String(top) + "px; --left:" + String(left) + "px; --height:" + String(height) + "px; --width:" + String(width) + "px; --textsize:" + String(textsize) + "px;"
    button.draggable = false;
    button.onclick = script
    parentdiv.appendChild(button);
}

function createDiv(top, left, height, width, content, fontsize, color, align, parentdiv, addedclass = "", id) {
    const square = document.createElement("div");
    square.className = "tooltip" + " " + addedclass + " "
    square.style = "--heigth:" + String(height) + "px; --width:" + String(width) + "px; --left:" + String(left) + "px; --top:" + String(top) + "px; --color:" + String(color) + "; --align:" + String(align) + "; --fontsize:" + String(fontsize) + "px;"
    square.textContent = content
    square.id = id
    parentdiv.appendChild(square);
    return square
}
