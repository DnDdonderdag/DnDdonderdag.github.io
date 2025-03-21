//listening functions
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

} function skillprof() {
    if (this.value == 0) {
        this.value = 1
        this.style.setProperty("background-color", "grey")
    }
    else if (this.value == 1) {
        this.value = 0
        this.style.setProperty('background-color', 'white')
    }
    update()
} function skillexp() {
    if (this.value == 0) {
        this.value = 1
        this.style.setProperty("background-color", "grey")
    }
    else if (this.value = 1) {
        this.value = 0
        this.style.setProperty('background-color', 'white')
    }
    update()
} function genericbuttonclick() {
    if (this.value == 0) {
        this.value = 1
        this.style.setProperty("background-color", "grey")
    }
    else if (this.value = 1) {
        this.value = 0
        this.style.setProperty("background-color", "#dde4ff")
    }
    update()
} function genericcheckmarkclick() {
    if (this.value == 0) {
        this.value = 1
        //this.style.setProperty("background-color", "grey")
        this.textContent = "◆"
    }
    else if (this.value = 1) {
        this.value = 0
        // this.style.setProperty('background-color', '#dde4ff')
        this.textContent = ""
    }
    updateSyncedFields(this)
    update()
} function entercalc() {
    show = this.value
    calculation = this.textContent
    this.value = calculation
    this.textContent = show
} function unfocusfunc(el, condition) {
    if (condition.includes("calc")) { exitcalc(el) }
    if (condition.includes("sync")) { updateSyncedFields(el) }
    if (condition.includes("update")) { update() }

} function exitcalc(el) {
    calculation = el.value
    show = el.textContent
    el.value = show
    el.textContent = calculation
} function updateSyncedFields(field) {
    syncedfields = document.getElementsByClassName("sync")
    content = field.textContent
    value = field.value
    for (let i = 0; i < syncedfields.length; i++) {
        if (syncedfields[i].id.slice(0, -1) == field.id.slice(0, -1)) {
            syncedfields[i].textContent = content
            syncedfields[i].value = value
        }
    }
} function changeSidebar() {
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
} function updateLookups() {
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
} function healscript() {
    hp = document.getElementById("currenthitpoints1");
    total = document.getElementById("totalhitpoints1");
    hp.value = total.value;
    unfocusfunc(hp, "sync update")
} function healscriptcompanion() {
    hp = document.getElementById("currenthitpointscompanion");
    total = document.getElementById("totalhitpointscompanion");
    hp.value = total.value;
    unfocusfunc(hp, "sync update")
} function plusonescript() {
    num = this.id.slice(-1)
    charges = document.getElementById("currentcharges" + String(num))
    max = document.getElementById("maxcharges" + String(num))
    charges.value = Number(charges.value) + 1

} function minusonescript() {
    num = this.id.slice(-1)
    charges = document.getElementById("currentcharges" + String(num))
    max = document.getElementById("maxcharges" + String(num))
    charges.value = Number(charges.value) - 1

} function recoverscript() {
    num = this.id.slice(-1)
    charges = document.getElementById("currentcharges" + String(num))
    max = document.getElementById("maxcharges" + String(num))
    charges.value = max.value
} function checkControl(event) {
    if (event.keyCode == "17" && document.activeElement != document.body) {
        el = document.activeElement
        tooltip = document.getElementById(el.id + "tooltip")
        tooltip.style.opacity = 1 - tooltip.style.opacity
        tooltip.style.zIndex = 1000 - tooltip.style.zIndex
    }


} function createTooltips() {
    const tooltipsdiv = document.createElement("div");
    tooltipsdiv.className = "tooltips"

    if (!invisdiv) {
        const invisdiv = document.createElement("div");
        invisdiv.id = "invisdiv"
        const currentDiv = document.getElementById("index");
        document.body.insertBefore(invisdiv, null);
    }

    fields = document.getElementsByClassName("save")
    for (let i = 0; i < fields.length; i++) {




        field = fields[i]
        tooltip = createDiv(field.getBoundingClientRect().top, field.getBoundingClientRect().left, 20, 30, field.id, 12, "#e7e8e8", "left", tooltipsdiv, "", field.id + 'tooltip')
        tooltip.style.opacity = 0
        tooltip.style.zIndex = -1
        invisdiv.style.fontSize = "12px"
        invisdiv.innerText = tooltip.textContent
        tooltip.style.width = invisdiv.clientWidth + "px"
    }

    document.body.insertBefore(tooltipsdiv, null);
}