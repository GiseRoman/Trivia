(function() {
  document.getElementById("miName").focus();
})();

let index = 0
let aciertos = [];
let questions = [];
let incisos = [];
let answers = [];


function usuarioNombre() {
  let elemento = document.getElementById("miName");
  let nombre = document.getElementById("miName").value;
  if (nombre.length === 0) {
    alert("Aún no nos has dicho tu nombre");
    document.getElementById("miName").focus();
  } else {
    greetings(nombre);
  }
}



function greetings(nombre) {

  aparecer('saludo');

  let saludito = `¡Bienvenida ${nombre}!`;
  document.getElementById('mensajeSaludo').innerHTML = saludito;

}

function aparecer(div) {
  let invi = document.getElementsByClassName("cajas");
  for (let i = 0, caj = invi.length; i < caj; i++) {
    invi[i].style.display = "none";
  }
  document.getElementById(div).style.display = "block";
}

function abrirPreguntas(opcion) {

  let categoria = '';
  reiniciar();

  if (opcion === 'categoria1') {
    questions = [
      "1) ¿Cuál es el río mas largo de México?",
      "2) ¿En que país nació el internet?",
      "3) ¿Qué país tiene la línea de ferrocarril más larga del mundo?"
    ];

    incisos = [
      ["Bravo", "Lerma", "Balsas"],
      ["Alemania", "Estados Unidos", "Japón"],
      ["China", "Estados Unidos", "Rusia"]
    ];

    answers = [
      0,
      1,
      2
    ];

    categoria = "Conocimiento general";

  } else if (opcion === 'categoria2') {
    questions = [
      "1) En Stranger Things ¿Cuál es la comida favorita de Eleven?",
      "2) ¿Cómo se llama la protagonista principal de The Big Ban Theory?",
      "3) En Game of Thrones ¿Cómo muere el rey de la noche?"
    ];
    incisos = [
      ["Hot Cakes", "Waffles", "Hot dogs"],
      ["Penny", "Jenny", "Amy"],
      ["Jon Snow lo mata", "Un dragón lo aplasta", "Una adolescente lo mata"]
    ];

    answers = [
      1,
      0,
      2
    ];

    categoria = "Series de TV";
  }

  document.getElementById("nombreCategoria").innerHTML = categoria;
  preguntar(index);
  aparecer("tarjetas");

}

function preguntar(indice) {
  document.getElementById("aparezcanP").innerHTML = questions[indice];
  let opciones = "";
  for (let i = 0; i < incisos[indice].length; i++) {
    opciones += "<p>";
    opciones += "<label><input class='radios' type='radio' onclick = 'respUser(" + i + ")' name='opcion'>" + incisos[indice][i] + "</label>";
    opciones += "</p>";
  }
  document.getElementById("incisos").innerHTML = opciones;

}

function respUser(resp) {
  document.getElementById("almostAnswer").style.display = "block";
  let aviso = "Respuesta incorrecta (ಥ﹏ಥ)";
  let color = "DarkGray";

  if (answers[index] === resp) {
    aviso = "Respuesta correcta (=⌒‿‿⌒=)";
    aciertos.push(index);
    color = "MediumSpringGreen";
  }
  document.getElementById("almostAnswer").style.background = color;
  document.getElementById("almostAnswer").innerHTML = aviso;
}

function next() {
  document.getElementById("almostAnswer").style.display = "none";
  index++;
  if (index <= questions.length - 1) {
    preguntar(index);
  }
  if (index === questions.length) {
    muestraTotal();
  }
}


function muestraTotal() {
  aparecer("totales");
  let plantilla = "";
  let plantillaFinal = "";
  for (let j = 0; j < questions.length; j++) {
    plantilla += "<p>";

    let daleInfo = "Incorrecto";
    let dameInfo = "wrong";
    for (let x of aciertos) {
      if (x === j) {
        daleInfo = "Correcto";
        dameInfo = "right";
        break;
      }
    }
    plantillaFinal += '<label class="' + dameInfo + '">' + daleInfo + "</label>";
    plantilla += "<p>" + questions[j] + " " + plantillaFinal + "</p>";

    plantilla += "</p>";
    plantillaFinal = "";
  }
  document.getElementById("muestrameTodo").innerHTML = plantilla;
}
function reload() {
  window.location.reload();
}

function reiniciar() {
  index = 0;
  aciertos = [];
  questions = [];
  incisos = [];
  answers = [];
}
