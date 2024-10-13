let boton = document.getElementById('boton');
let salida = document.getElementById('salida');
let limpiar = document.getElementById('limpiar');
boton.onclick = decimalAIEEE754;
limpiar.onclick = CleanTab;

function decimalAIEEE754() {
    // 1. Bit de signo
    let numero = parseFloat(document.getElementById('numero').value);
    let signo = numero < 0 ? 1 : 0; // Si el numero es menor a 0
    // el signo sera 1, y si no lo es sera 0
    numero = Math.abs(numero);

    // 2. Convertir parte entera y decimal a binario
    let parteEntera = Math.floor(numero); // Redondeamos hacia el entero anterior para sacar la parte entera
    let parteDecimal = numero - parteEntera; // Calculamos la parte decimal
    //restando la parte entera al numero

    let binarioEntero = parteEntera.toString(2); //Convierte la parte entera en una cadena en base 2
    // parteEntera.toString(2);
    let binarioDecimal = ""; //Inicializamos como cadena vacia para ir agregando los numeros
    
    // Generar la parte decimal en binario
    while (binarioDecimal.length < 23 && parteDecimal > 0) { //23 bits de MANTISA
        parteDecimal *= 2;
        if (parteDecimal >= 1) {
            binarioDecimal += "1";
            parteDecimal -= 1;
        } else {
            binarioDecimal += "0";
        }
    }

    // 3. Normalizar el número binario
    let binarioNormalizado = (binarioEntero + "." + binarioDecimal).split(".");//Creamos una lista
    //de 2 elementos, la parte entera y la parte decimal, lo que nos servira para calcular el exponente
    let exponente = binarioNormalizado[0].length - 1;
    let mantisa = (binarioNormalizado.join("").slice(1)).padEnd(23, "0").slice(0, 23); //Primero unimos
    //a binarioNormalizado sin dejar espacios, luego quitamos la primera parte (entera), agregamos
    //0's al final de la cadena hasta tener 23 caracteres y finalmente tomamos eso y lo guardamos en
    //mantisa

    // 4. Calcular el exponente con bias
    let exponenteConBias = (127 + exponente).toString(2).padStart(8, "0");//convertimos la suma a una
    //cadena en base 2 y luego agregamos 0's al inicio hasta tener 8 caracteres

    // 5. Formar el número en IEEE 754
    let ieee754 = `${signo}${exponenteConBias}${mantisa}`;

    salida.textContent = `El numero convertido a binario es: ${ieee754}`;
}

function CleanTab() {
    numero.value = '';
    salida.textContent = '';
}