// Obtener referencias a elementos del DOM
const container = document.getElementById('contenedor');
const btnNuevaCuadricula = document.getElementById('btnNuevaCuadricula');
const btnCambiarColorPintado = document.getElementById('btnCambiarColorPintado');
const btnReiniciarCuadricula = document.getElementById('btnReiniciarCuadricula'); // ¡Nueva referencia!
const currentPaintColorSpan = document.getElementById('currentPaintColorSpan');

// Configuración inicial de la cuadrícula
const defaultGridSize = 16; // Tamaño inicial de 16x16 cuadros
const containerSize = 256; // Ancho y alto fijo del contenedor en píxeles

// Colores disponibles para pintar
const paintColors = ['black', 'blue', 'red', 'green', 'purple', 'orange'];
let currentPaintColorIndex = 0;
let currentPaintColor = paintColors[currentPaintColorIndex]; // Color inicial

/**
 * Updates the visual indicator of the current paint color.
 */
function updateColorDisplay() {
    currentPaintColorSpan.style.backgroundColor = currentPaintColor;
}

/**
 * Creates the grid of divs inside the container.
 * @param {number} squaresPerSide - The number of squares per side of the grid.
 */
function createGrid(squaresPerSide) {
    // 1. Clear the existing grid (remove all children from the container)
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // 2. Calculate the size of each square so that the grid fits the container
    const squareSize = containerSize / squaresPerSide;

    // 3. Create the new divs and add them to the container
    // A total of squaresPerSide * squaresPerSide divs are created
    for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
        const div = document.createElement('div');
        div.classList.add('cuadro'); // Add the base class for general styles

        // Apply the calculated size to each div individually
        div.style.width = `${squareSize}px`;
        div.style.height = `${squareSize}px`;

        // Add the mouseover event to paint the div
        div.addEventListener('mouseover', () => {
            // When the mouse hovers over, apply the current paint color directly to the style
            div.style.backgroundColor = currentPaintColor;
        });

        // Add the newly created div to the container
        container.appendChild(div);
    }
}

/**
 * Resets the grid by setting all painted squares back to their default white color.
 */
function resetGrid() {
    // Select all divs with the class 'cuadro' inside the container
    const allSquares = container.querySelectorAll('.cuadro');

    // Iterate over each square and set its background color back to white
    allSquares.forEach(square => {
        square.style.backgroundColor = 'white';
        // Optionally, if you were using a 'painted' class for other purposes, you might remove it here:
        // square.classList.remove('pintado');
    });
}

// --- Event Listeners ---

// Event for the "Create New Grid" button
btnNuevaCuadricula.addEventListener('click', () => {
    let newSize;
    let isValidInput = false;

    // Loop to ask for input until it is valid or the user cancels
    while (!isValidInput) {
        newSize = prompt("Introduce el número de cuadrados por lado (máximo 100):");

        // If the user cancels the prompt, exit the function
        if (newSize === null) {
            return;
        }

        const sizeNumber = parseInt(newSize); // Convert the input to an integer

        // Validate the input: must be a number, greater than 0, and not greater than 100
        if (isNaN(sizeNumber) || sizeNumber <= 0 || sizeNumber > 100) {
            alert("Entrada inválida. Por favor, introduce un número entre 1 y 100.");
        } else {
            isValidInput = true; // Input is valid, exit the loop
            createGrid(sizeNumber); // Call the function to create the new grid
        }
    }
});

// Event for the "Change Paint Color" button
btnCambiarColorPintado.addEventListener('click', () => {
    // Advance to the next color in the list
    currentPaintColorIndex = (currentPaintColorIndex + 1) % paintColors.length;
    currentPaintColor = paintColors[currentPaintColorIndex];
    updateColorDisplay(); // Update the visual indicator
});

// Event for the "Reset Grid" button
btnReiniciarCuadricula.addEventListener('click', () => {
    resetGrid(); // Call the function to reset the grid
});

// --- Initialization ---

// Call the function to create the initial grid when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    createGrid(defaultGridSize);
    updateColorDisplay(); // Show the initial color
});
/*const container = document.getElementById("contenedor");

for (let i = 0; i < 256; i++) {
    const div = document.createElement("div");
    div.classList.add("cuadro");
    container.appendChild(div);
    div.addEventListener("mouseover", () => {
    div.classList.add("pintado");
});
}*/