let boton = document.getElementById('boton');
let salida = document.getElementById('salida');
let limpiar = document.getElementById('limpiar');
boton.onclick = decimalAIEEE754;
limpiar.onclick = CleanTab;

function decimalAIEEE754() {
    // 1. Bit de signo
    let numero = parseFloat(document.getElementById('numero').value);
    let signo = numero < 0 ? 1 : 0;
    numero = Math.abs(numero);

    // 2. Convertir parte entera y decimal a binario
    let parteEntera = Math.floor(numero);
    let parteDecimal = numero - parteEntera;

    let binarioEntero = parteEntera.toString(2);
    let binarioDecimal = "";
    
    // Generar la parte decimal en binario
    while (binarioDecimal.length < 23 && parteDecimal > 0) {
        parteDecimal *= 2;
        if (parteDecimal >= 1) {
            binarioDecimal += "1";
            parteDecimal -= 1;
        } else {
            binarioDecimal += "0";
        }
    }

    // 3. Normalizar el número binario
    let binarioNormalizado = (binarioEntero + "." + binarioDecimal).split(".");
    let exponente = binarioNormalizado[0].length - 1;
    let mantisa = (binarioNormalizado.join("").slice(1)).padEnd(23, "0").slice(0, 23);

    // 4. Calcular el exponente con bias
    let exponenteConBias = (127 + exponente).toString(2).padStart(8, "0");

    // 5. Formar el número en IEEE 754
    let ieee754 = `${signo}${exponenteConBias}${mantisa}`;

    salida.textContent = `El numero convertido a binario es: ${ieee754}`;
}

function CleanTab() {
    numero.value = '';
    salida.textContent = '';
}