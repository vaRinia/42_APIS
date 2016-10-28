var inputLista = document.getElementById("input-lista");
var renglon = document.getElementById("renglon");
var columna = renglon.firstChild;


function clickLista (){
	inputLista.removeEventListener("click", clickLista);
	var btnGuardarLista = document.createElement("button");
	btnGuardarLista.setAttribute("class", "btn btn-success btn-sm");
	btnGuardarLista.appendChild(document.createTextNode("Guardar Lista"));
	this.parentElement.appendChild(btnGuardarLista);

	btnGuardarLista.onclick = function () {
		if (inputLista.value == null || inputLista.value == 0) {
			alert("Escribee un super título :)");
			return false;
		}
		var tituloLista = document.createElement("h2");
		tituloLista.className = "inline"
		tituloLista.innerHTML = inputLista.value;
		var divColTitulo = document.createElement("div");
		divColTitulo.setAttribute("class", "box-lista");
		divColTitulo.appendChild(tituloLista);
		var tache2 = document.createElement("span");
		tache2.setAttribute("class","fa fa-times mg-l-20 pull-right");	
		divColTitulo.appendChild(tache2);
		
		var divCol = document.createElement("div");
		divCol.setAttribute("id", "echamelo");
		divCol.setAttribute("ondrop","drop(event)");
		divCol.setAttribute("ondragover","allowDrop(event)");
		
		divCol.setAttribute("class","col-xs-12 col-sm-4 col-md-3 pd-2");
		var divBox = document.createElement("div");
		divBox.setAttribute("class", "box-tarjeta mg-t-15");
		var inputTarjeta = document.createElement("textarea");
		inputTarjeta.setAttribute("placeholder", "Agregar super tarjeta");
		divCol.appendChild(divColTitulo);	
		divCol.appendChild(divBox);
		divBox.appendChild(inputTarjeta);
		var btnGuardarTarjeta = document.createElement("button");
		btnGuardarTarjeta.setAttribute("class", "btn btn-success btn-sm");
		btnGuardarTarjeta.appendChild(document.createTextNode("Guardar Tarjeta"));
		renglon.insertBefore(divCol, columna);

		tache2.onclick = function () {
			this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
		}
		
		inputTarjeta.onclick = function () {
			divBox.appendChild(btnGuardarTarjeta);	
		}
			inputLista.value = "";
	
		btnGuardarTarjeta.onclick = function () {
			if (inputTarjeta.value == null || inputTarjeta.value == 0) {
				alert("¡¡¡Escribe una super tarea!!!");
				return false;
			}
			var check = document.createElement("input");
			check.setAttribute("type","checkbox");
			var basura = document.createElement("span");
			basura.setAttribute("class", "fa fa-trash-o pull-right");
			var tareaBox = document.createElement("div");
			tareaBox.setAttribute("class","box-tarjeta");
			tareaBox.setAttribute("draggable","true");
			tareaBox.setAttribute("ondragstart","drag(event)")
			tareaBox.id = "" + (new Date()).getTime(); //esto no se que es, revisar
			var tarea = document.createElement("p");
			textoTarea = document.createTextNode(inputTarjeta.value);
			tarea.appendChild(check);
			tarea.appendChild(textoTarea);
			tarea.appendChild(basura);
			tareaBox.appendChild(tarea);

			btnGuardarTarjeta.parentNode.parentNode.insertBefore(tareaBox, (btnGuardarTarjeta.parentNode.parentNode.lastChild));

			basura.onclick = function () {
				tareaBox.parentElement.removeChild(tareaBox);
			};
			check.onclick = function () {
				if (check.checked == true) {
					tarea.parentElement.setAttribute("class","tachado");	
				} else {
					tarea.parentElement.setAttribute("class","box-tarjeta");
				}
			};
			
			inputTarjeta.value = "";
		};
	}
}; //fin de función clickLista
inputLista.addEventListener("click",clickLista); //al hacer click en inputLista, llama a la funcion clickLista

function allowDrop(ev) {
	ev.preventDefault();
	if (ev.target.id == "echamelo") {
		createElement()
	}
};
function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	if (ev.target.id == "echamelo") {
		ev.target.insertBefore(document.getElementById(data), ev.target.lastChild);	
	}
};
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
};