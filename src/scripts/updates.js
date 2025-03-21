//updating functions
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


} function sizeadjust(name) {
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


} function sizeadjustinput(id, boxlength, startfont) {
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

} function updategenericbuttons() {
    let buttons = document.getElementsByClassName("genericbutton");
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if (button.value == 0) { button.style.setProperty('background-color', '#dde4ff'); }
        else if (button.value == 1) { button.style.setProperty('background-color', 'grey'); }
    }

    let checkmarks = document.getElementsByClassName("checkmarkbutton");
    for (let i = 0; i < checkmarks.length; i++) {
        let button = checkmarks[i];
        if (button.value == 0) { button.textContent = ""; }
        else if (button.value == 1) { button.textContent = "◆"; }
    }
} function updateCalculatedFields() {
    let fields = document.getElementsByClassName("calculated");
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        let calculation = field.textContent;
        let count = (calculation.match(/\[/g) || []).length;
        for (let j = 0; j < count; j++) {  // Changed from 'i' to 'j'
            let start = calculation.indexOf("[");
            let finish = calculation.indexOf("]");
            let replacementid = calculation.slice(start + 1, finish);
            try {
                let replacementtext = document.getElementById(replacementid).value;
                let replacement = (replacementtext == "") ? (0) : (parseInt(replacementtext));
                calculation = calculation.replace(calculation.slice(start, finish + 1), String(replacement));
            }
            catch { /* replacementtext = "" */ }
        }

        calculation = calculation.replaceAll("--", "+");
        if (calculation == "") { field.value = ""; }
        else {
            try {
                let val = eval(calculation);
                if (isNaN(val)) { field.value = calculation; }
                else { field.value = eval(calculation); }
            } catch (error) {
                field.value = calculation;
            }
        }
    }
}