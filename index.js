/**
  * Tabla de la representación de dígitos segun Interleaved 2 of 5.
  * A cada dígito le corresponde una cadena
  * de n's (Narrow (estrecho)) y w's (Width (ancho))
  * Se encuentran las n's en minúscula y las w's en mayúsculas
  * para hacer más notorio su significado.
  * */
const interleaved2of5Table = [
  "nnWWn", // 0
  "WnnnW", // 1
  "nWnnW", // 2
  "WWnnn", // 3
  "nnWnW", // 4
  "WnWnn", // 5
  "nWWnn", // 6
  "nnnWW", // 7
  "WnnWn", // 8
  "nWnWn"  // 9
]

/**
  * Funcion que devuelve el parametro 'cadena' representado por
  * cadenas formadas por los caracteres: [n,N,w,W].
  * 5 caracteres equivalen a 2 digitos.
  * El primer digito esta representado por si la letra es n o w.
  * El segundo digito esta representado por si la letra esta en min o may.
  * */
function interleaved2of5(cadena){
  let result = "";
  for(let i=0; i<cadena.length; i+=2){
    let s1 = interleaved2of5Table[cadena[i]]; // cadena que rep. digito 1
    let s2 = interleaved2of5Table[cadena[i+1]]; // cadena que rep. digito 2
    for (let j=0; j<5; j++){
      let char = "n";
      if (s1[j] === "W"){
        char = "w";
      } // else s1[j] === "n"
      if (s2[j] === "W"){
        char = char.toUpperCase();
      } // else s2[j] === "n"
      result += char;
    }
  }
  return result;
}

/**
 * Devuelve cadenas de caracteres n's y W's separadas por espacio cada 5.
 * 5 caracteres equivalen a un digito.
  */
function interleaved2of5clasic(cadena){
  let result = "";
  [...cadena].forEach((char) => {
    result.innerHTML += interleaved2of5Table[char] + " ";
  });
  return result;
}

/**
  * Imprime el céodigo de barras en la pantalla
  */
function dibujarBarra(chars, barid){
  const barcode = document.querySelector('#'+barid);
  for(let i=0; i<chars.length; i+=2){
    let s1 = interleaved2of5Table[chars[i]];
    let s2 = interleaved2of5Table[chars[i+1]];
    for (let j=0; j<5; j++){
      barcode.innerHTML += "█";
      if (s1[j] === "W"){
        barcode.innerHTML += "██";
      }
      barcode.innerHTML += " ";
      if (s2[j] === "W"){
        barcode.innerHTML += "  ";
      }
    }
  }
}

function vaciarBarCodes(){
    for (let i=1; i<10; i++) {
      document.querySelector('#form2of5barcode' + i).innerHTML = "";
    }
}

/**
  * muestra el texto en pantalla como resultado o error
  * */
function mostrarEnPantalla(texto, error = false){
  const errorObj = document.querySelector('#form2of5 #error');
  const resultObj = document.querySelector('#form2of5result');
  vaciarBarCodes();
  if (error) {
    resultObj.innerHTML = "";
    errorObj.innerHTML = texto;
  } else {
    resultObj.innerHTML = texto;
    errorObj.innerHTML = "";
  }
}

/**
 * Al presionar el boton enviar (submit):
 * */
function alPresionarEnviar(event) {
  event.preventDefault();
  const num = document.querySelector('#form2of5 #number').value;
  if (!num || isNaN(num)) { // No es un numero
    mostrarEnPantalla("Ingrese un número.", true);
  }
  else if (num.length === 0) { // Es vacío
    mostrarEnPantalla("El campo está vacío.", true);
  }
  else if (num.length%2 !== 0) { // Es impar
    mostrarEnPantalla("El número de caracteres debe ser par.", true);
  }
  else {
    mostrarEnPantalla("Resultado: " + interleaved2of5(num));
    for (let i=1; i<10; i++) {
      dibujarBarra(num, 'form2of5barcode' + i);
    }
  }
}

function iniciar() {
  const form = document.querySelector('#form2of5')
  form.addEventListener('submit', alPresionarEnviar)
}

iniciar();
