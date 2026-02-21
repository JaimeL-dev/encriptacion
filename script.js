// 1. Selección de elementos de la interfaz
const alphabetInput = document.getElementById('alphabet');
const methodSelect = document.getElementById('method');
const shiftInput = document.getElementById('shift');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const shiftContainer = document.getElementById('shift-container');

// 2. Mostrar/Ocultar el campo de desplazamiento según el método
methodSelect.addEventListener('change', () => {
    shiftContainer.style.display = methodSelect.value === 'atbash' ? 'none' : 'flex';
});

// 3. Función principal de procesamiento
function processText(mode) {
    const alphabet = alphabetInput.value; // El "universo" de caracteres
    const text = inputText.value;
    const method = methodSelect.value;
    const n = alphabet.length; // El MÓDULO
    let result = "";

    if (n === 0) {
        alert("El conjunto de caracteres no puede estar vacío");
        return;
    }

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const p = alphabet.indexOf(char);

        // Si el carácter no está en el alfabeto dado, se queda igual
        if (p === -1) {
            result += char;
            continue;
        }

        if (method === 'cesar') {
            let k = parseInt(shiftInput.value);
            if (mode === 'decrypt') k = (n - (k % n)) % n; // Inverso aditivo para descifrar
            
            // Fórmula: (P + K) mod N
            const c = (p + k) % n;
            result += alphabet[c];

        } else if (method === 'atbash') {
            // Fórmula: (N - 1) - P
            const c = (n - 1) - p;
            result += alphabet[c];
        }
    }
    outputText.value = result;
}

// 4. Eventos de los botones
encryptBtn.addEventListener('click', () => processText('encrypt'));
decryptBtn.addEventListener('click', () => processText('decrypt'));