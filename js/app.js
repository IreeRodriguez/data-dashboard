/*
 * Funcionalidad de tu producto
 */

// Puedes hacer uso de la base de datos a través de la variable `data`
// console.log(data[AQP]);
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


//funcionalidad para le menu de tabs//
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


//funcion para buscar dentro de la data la informacion de las students//
function search(data,city,gen,students,status) {
    var students = data[city][gen][students];

    var divStudents= document.getElementById('datagirls');
    while (divStudents.hasChildNodes()) {
        divStudents.removeChild(divStudents.lastChild);
    }

    for(var i=0; i < students.length; i++){
        if(students[i].active===status){
            var textStudents = document.createElement('h3');
            var divGirl = document.createElement('div');
            var photo = document.createElement('img');
            var cont = document.createElement('div');
            photo.setAttribute('src', students[i].photo);
            var pic = document.createElement('div');
            divGirl.classList.add('girl');
            pic.appendChild(photo);
            textStudents.textContent = students[i].name;
            divGirl.appendChild(pic);
            cont.appendChild(textStudents);
            divGirl.appendChild(cont);
            divStudents.appendChild(divGirl);
        }

    };
}
