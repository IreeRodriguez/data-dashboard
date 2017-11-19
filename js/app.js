/*
 * Funcionalidad de tu producto
 */

// Puedes hacer uso de la base de datos a través de la variable `data`
// console.log(data[AQP]);


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

window.onload = function () {
	search(data,'SCL','2017-2','students',true);
}



//funcion para buscar dentro de la data la informacion de las students//
function search(data,city,gen,students,status) {
    var students = data[city][gen][students];
	// console.log(students[0].sprints.length);

    var divStudents= document.getElementById('datagirls');
    while (divStudents.hasChildNodes()) {
        divStudents.removeChild(divStudents.lastChild);
    }

    for(var i=0; i < students.length; i++){
        if(students[i].active===status){
            var active = document.getElementById('active');
            var inactive = document.getElementById('inactive');
			var scoreTech = 0;
			var maxTech = 1800 * students[i].sprints.length;
			var scoreHse = 0;
			var maxHse = 1200 * students[i].sprints.length;
			// console.log(maxHse);
			// console.log(maxTech);
            var textStudents = document.createElement('h3');
            var divGirl = document.createElement('div');
            var photo = document.createElement('img');
            var cont = document.createElement('div');
            cont.className='cont';
			var divTech = document.createElement('div');
			var divHse = document.createElement('div');
			divTech.className="score";
			divHse.className="score";
            photo.setAttribute('src', students[i].photo);
            var pic = document.createElement('div');
            divGirl.classList.add('girl');
            pic.appendChild(photo);
            textStudents.textContent = students[i].name;
            divGirl.appendChild(pic);
            cont.appendChild(textStudents);
            divGirl.appendChild(cont);
            divStudents.appendChild(divGirl);


			if (students[i].active===true) {
                active.classList.add('active');
                inactive.classList.remove('active');


				for(var j=0 ; j < students[i].sprints.length;j++){
					scoreTech += parseInt(students[i].sprints[j].score.tech);
					scoreHse += parseInt(students[i].sprints[j].score.hse);
					// console.log(scoreHse);
					// console.log(scoreTech);
				}

				var techFinal = scoreTech * 100 / maxTech;
				var hseFinal = scoreHse * 100 / maxHse;
				// console.log(hseFinal);
				// console.log(techFinal);
				var tech = document.createElement('h4');
				var hse = document.createElement('h4');
				var techTitle = document.createElement('p');
				var hseTitle = document.createElement('p');
				techTitle.textContent = 'Teck Skills';
				hseTitle.textContent = 'Life Skills';
				tech.textContent = techFinal.toFixed(2)+ '%';
				hse.textContent = hseFinal.toFixed(2)+ '%';
				divTech.appendChild(tech);
				divTech.appendChild(techTitle);
				divHse.appendChild(hse);
				divHse.appendChild(hseTitle);
				cont.appendChild(divTech);
				cont.appendChild(divHse);
			} else{
                inactive.classList.add('active');
                active.classList.remove('active');
				var techFinal = 0;
				var hseFinal = 0;
				// console.log(hseFinal);
				// console.log(techFinal);
				var tech = document.createElement('h4');
				var hse = document.createElement('h4');
				tech.textContent = techFinal + '%';
				hse.textContent = hseFinal + '%' ;
				var techTitle = document.createElement('p');
				var hseTitle = document.createElement('p');
				techTitle.textContent = 'Teck Skills';
				hseTitle.textContent = 'Life Skills';
				divTech.appendChild(tech);
				divTech.appendChild(techTitle);
				divHse.appendChild(hse);
				divHse.appendChild(hseTitle);
				cont.appendChild(divTech);
				cont.appendChild(divHse);

			}


        }

    };
}
