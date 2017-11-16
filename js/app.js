/*
 * Funcionalidad de tu producto
 */

// Puedes hacer uso de la base de datos a través de la variable `data`
//console.log(data);
/*menu hamburgesa*/
var boton=document.getElementById('btn');

function showMenu(){
	//guarda en una var nuestro nav
	var menu =document.getElementById('opcs-menu');
	if (menu.classList.contains('disabled-menu')) {// classLIst.contains verifica la lista
		menu.classList.remove('disabled-menu');
		menu.classList.add('enable-menu')
	}
	else {
		menu.classList.remove('enable-menu');
		menu.classList.add('disabled-menu');
		console.log('ocultar');
	}

}
boton.addEventListener('click',showMenu);



function openSection(evt, seccion) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(seccion).style.display = "block";
    evt.currentTarget.className += " active";
}
