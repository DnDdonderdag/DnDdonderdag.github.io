//saving and loading functions
async function savestate() {
    let savelist = document.getElementsByClassName("save");
    let saveobj = {};
    let missingIds = [];

    console.log(`Found ${savelist.length} saveable elements`);

    for (let i = 0; i < savelist.length; i++) {
        const element = savelist[i];

        // Check if element has an ID
        if (!element.id) {
            missingIds.push(element.className);
            continue;
        }

        // Handle different element types
        if (element.type === "checkbox" || element.type === "radio") {
            saveobj[element.id] = element.checked;
        } else if (element.value !== undefined) {
            saveobj[element.id] = element.value;
        } else if (element.textContent) {
            saveobj[element.id] = element.textContent;
        }

        // Special handling for calculated fields
        if (element.classList.contains("calculated") && element.textContent) {
            saveobj[element.id + "calculation"] = element.textContent;
        }
    }

    if (missingIds.length > 0) {
        console.warn("Some elements don't have IDs and won't be saved:", missingIds);
    }

    // Create a Blob with the JSON data
    const jsonData = JSON.stringify(saveobj, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a download link and trigger it
    const fileName = saveobj.charactername ?
        `${saveobj.charactername.replace(/\s+/g, '_')}_character_sheet.json` :
        'dnd_character_sheet.json';

    const downloadLink = document.createElement('a');
    downloadLink.download = fileName;
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.style.display = 'none';

    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up
    setTimeout(() => {
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);
    }, 100);

    console.log("Character saved to file: " + fileName);
} async function loadstate(result) {
    let loadAction = true;

    if (!(await CheckSaved())) {
        loadAction = confirm("Are you sure you want to open this file? The current one is not saved.");
    }

    if (loadAction) {
        console.log("Loading character data...");
        let successCount = 0;
        let failCount = 0;
        let failedFields = [];

        // Debug the specific problematic field
        console.log("Looking for FEATURES & TRAITS element...");
        const featuresElement = document.getElementById("FEATURES & TRAITS");
        console.log("Element found:", featuresElement ? "Yes" : "No");

        // Try alternative selector for problematic IDs
        if (!featuresElement) {
            console.log("Trying alternative selector...");
            const altElement = document.querySelector('[id="FEATURES & TRAITS"]');
            console.log("Found with alternative selector:", altElement ? "Yes" : "No");
        }

        for (const property in result) {
            try {
                // Handle calculation fields
                if (property.includes("calculation")) {
                    const fieldId = property.slice(0, property.length - 11);
                    let field = document.getElementById(fieldId);

                    // Try alternative selector for problematic IDs
                    if (!field && fieldId.includes(" ")) {
                        field = document.querySelector(`[id="${fieldId}"]`);
                    }

                    if (field) {
                        field.textContent = result[property];
                        successCount++;
                    } else {
                        throw new Error(`Field not found: ${fieldId}`);
                    }
                } else {
                    let field = document.getElementById(property);

                    // Try alternative selector for problematic IDs
                    if (!field && property.includes(" ")) {
                        field = document.querySelector(`[id="${property}"]`);
                    }

                    if (field) {
                        // Handle different field types
                        if (field.type === "checkbox" || field.type === "radio") {
                            field.checked = result[property];
                        } else if (field.value !== undefined) {
                            field.value = result[property];
                        } else {
                            field.textContent = result[property];
                        }
                        successCount++;
                    } else {
                        throw new Error(`Field not found: ${property}`);
                    }
                }
            } catch (error) {
                console.log(`Error loading field: ${property}`, error.message);
                failedFields.push(property);
                failCount++;
            }
        }

        console.log(`Character loaded: ${successCount} fields loaded successfully, ${failCount} fields failed`);
        if (failCount > 0) {
            console.log("Failed fields:", failedFields);
        }
        update(); // Update calculations after loading
    }
} function unpackjson() {
    const file = this.files[0];
    if (!file) {
        console.log("No file selected");
        return;
    }

    console.log(`Loading file: ${file.name}`);
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        try {
            const result = JSON.parse(reader.result);
            console.log("JSON file parsed successfully");
            loadstate(result);
        } catch (e) {
            console.error("Error parsing JSON file:", e);
            alert("Error loading character sheet. The file might be corrupted or in an invalid format.");
        }
    };

    reader.onerror = function () {
        console.error("Error reading file");
        alert("Error reading file");
    };
} async function CheckSaved() {
    return new Promise((resolve) => {
        fileSelector = document.getElementById('loadstate');
        const file = fileSelector.files[0];
        reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {
            currentloaded = (JSON.parse(reader.result));
            var formfields = document.getElementsByClassName("save")
            var json = {}
            for (let i = 0; i < formfields.length; i++) {
                field = formfields.item(i)
                json[String(field.id)] = field.value
            }
            active = JSON.stringify(json)
            if (String(active) == JSON.stringify(currentloaded)) {
                //true, the file is saved
                resolve(true)
            }
            else {
                //false, the file is not saved
                resolve(false)
            }

        }
        reader.onerror = function () {
            console.log(reader.error);
            alert("Error loading file")
        };
    })
} window.onbeforeunload = function () {
    testing = true
    if (!testing) { return 'There is unsaved data.'; }

}; async function copyToClipboard(textToCopy) {
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
    } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    }
}