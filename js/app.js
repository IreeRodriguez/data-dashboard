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