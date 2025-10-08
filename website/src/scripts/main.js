// Load and display buttons from the JSON file
async function loadButtons() {
    try {
        const response = await fetch('src/data/buttons.json');
        const buttonsData = await response.json();
        displayButtons(buttonsData.buttons);
    } catch (error) {
        console.error('Error loading buttons:', error);
        displayError();
    }
}

function displayButtons(buttons) {
    const container = document.getElementById('buttons-container');
    container.innerHTML = '';

    if (buttons.length === 0) {
        container.innerHTML = '<div class="loading">No buttons configured. Edit buttons.json to add links.</div>';
        return;
    }

    buttons.forEach((button, index) => {
        const buttonElement = createButtonElement(button, index);
        container.appendChild(buttonElement);
    });
}

function createButtonElement(button, index) {
    const buttonLink = document.createElement('a');
    buttonLink.href = button.url;
    buttonLink.target = '_blank';
    buttonLink.rel = 'noopener noreferrer';
    buttonLink.className = 'button';
    buttonLink.setAttribute('data-type', button.type || 'default');
    
    // Add delay for staggered animation
    buttonLink.style.animationDelay = `${index * 0.1}s`;
    
    buttonLink.innerHTML = `
        <span class="button-icon">${button.icon || '🔗'}</span>
        <div class="button-title">${button.title}</div>
        ${button.description ? `<div class="button-description">${button.description}</div>` : ''}
    `;
    
    return buttonLink;
}

function displayError() {
    const container = document.getElementById('buttons-container');
    container.innerHTML = `
        <div class="error-message">
            <p>Failed to load buttons. Please check the configuration file.</p>
        </div>
    `;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', loadButtons);
