/**
 * DnD Character Sheet Application
 * Main entry point
 * 
 * This file serves as the entry point for the application, importing
 * all required modules and initializing the character sheet.
 */

// Define app state
let testing = false; // Set to true during development
let unsavedChanges = false;

// Global event handlers
window.onbeforeunload = function () {
    if (!testing && unsavedChanges) {
        return 'There is unsaved data.';
    }
};

/**
 * Mark the character sheet as having unsaved changes
 */
function markUnsaved() {
    unsavedChanges = true;
}

/**
 * Mark the character sheet as saved
 */
function markSaved() {
    unsavedChanges = false;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM loaded, initializing application");

    try {
        // Create the main pages
        createMainpage(130, 30);
        createSpellPage(130, 930);
        createAttackpage(650, 30);
        createBackstoryPage(650, 930);
        createInventoryPage(1170, 30);

        console.log("Pages created successfully");
    } catch (error) {
        console.error("Error creating pages:", error);
    }

    // Add event listeners
    document.addEventListener('keydown', checkAlt);

    // Create tooltips
    try {
        createTooltips();
    } catch (error) {
        console.error("Error creating tooltips:", error);
    }

    // Set up file input listener
    const loadStateInput = document.getElementById('loadstate');
    if (loadStateInput) {
        loadStateInput.addEventListener('change', unpackjson, false);
    }

    // Initialize the app
    try {
        // Just update without checking saved data
        update();

        // No need to check saved data on initial load
        // This was causing the error because no file is selected yet
    } catch (error) {
        console.error("Error initializing app:", error);
    }

    // Set up event listeners for detecting changes
    document.addEventListener('input', function () {
        markUnsaved();
    });
});