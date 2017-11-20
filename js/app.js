var countActive=0;
var countInactive=0;
var counts = countSprints(data,'SCL','2017-2','students');

//cargar datos de google charts//
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.load('current', {packages:['line']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(achievementChart);
//cargar las estudiantes actvias al cargar la pagina//
window.onload = function () {
	search(data,'SCL','2017-2','students',true);
}

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





function countSprints(data,city,gen,students){
    var students = data[city][gen][students];
    // console.log(students[0].sprints.length);

    var maxSprints = 0;
    for(var i = 0; i < students.length; i++){
        if(students[i].active===true){
            countActive++;
        } else {
            countInactive++;
        }



        if (students[i].sprints.length > maxSprints){
            maxSprints = students[i].sprints.length;
        }
    }
    // console.log(maxSprints);
    // console.log(countInactive);

    var sprintCount = Array(maxSprints).fill(0);
    var notasCount = Array(maxSprints).fill(0);
    // console.log(sprintCount);
    for(var i = 0; i < students.length; i++){
        for (var j = 0; j < students[i].sprints.length; j++){
            sprintCount[j] += 1;
            if ((students[i].sprints[j].score.tech + students[i].sprints[j].score.hse) >= 2100 ){
                notasCount[j] += 1;
            }
        }
    }
    console.log(notasCount);
    var counts = {
        sprint: sprintCount,
        notas: notasCount
    }
    return counts;
}

function drawChart() {

    // Create the data table.
    var datos = new google.visualization.DataTable();
    datos.addColumn('string', 'Sprints');
    datos.addColumn('number', 'Students');

    //var sprintCount = countSprints(data,'SCL','2017-2','students');


    for (var i = 0; i < counts.sprint.length; i++)
    {
        datos.addRow(['S' + (i + 1), counts.sprint[i]]);
    }



    // Set chart options
    var options = {
                'title':'Enrollment',
                'titleTextStyle': {
                    color: 'black',
                    fontSize: 20,
                    },
                'width':300,
                'height':300,
                'colors':'#FFC107'};

    var divActive = document.createElement('div');
    var divInactive = document.createElement('div');
    var active = document.createElement('h3');
    var inactive = document.createElement('h3');
    var container = document.getElementById('myPieChart');
    active.textContent=countActive;
    inactive.textContent=countInactive;
    var textActive = document.createElement('p');
    var textInactive = document.createElement('p');
    textActive.textContent='# enrolled';
    textInactive.textContent='# dropouts';
    divActive.appendChild(active);
    divActive.appendChild(textActive);
    divInactive.appendChild(inactive);
    divInactive.appendChild(textInactive);
    divActive.className="score";
    divInactive.className="score";





    // Instantiate and draw our chart, passing in some options.
    var chart = new google.charts.Bar(document.getElementById('myPieChart'));
    chart.draw(datos, google.charts.Bar.convertOptions(options));
    // chart.draw(datos, google.charts.Column.convertOptions(options));
    container.appendChild(divActive);
    container.appendChild(divInactive);
}

function achievementChart() {

    // Create the data table.
    var datos = new google.visualization.DataTable();
    datos.addColumn('string', 'Sprints');
    datos.addColumn('number', 'Students');


    for (var i = 0; i < counts.notas.length; i++)
    {
        datos.addRow(['S' + (i + 1), counts.notas[i]]);
    }



    // Set chart options
    var options = {
                'title':'Achievement',
                'titleTextStyle': {
                    color: 'black',
                    fontSize: 20,
                    },
                'width':300,
                'height':300,
                'colors':'#FFC107'};

    var divActive = document.createElement('div');
    var divInactive = document.createElement('div');
    var active = document.createElement('h3');
    var inactive = document.createElement('h3');
    var container = document.getElementById('achievement');
    active.textContent=counts.notas[counts.notas.length -1];
    inactive.textContent=(counts.notas[counts.notas.length -1] * 100 / countActive).toFixed(2) + '%';
    var textActive = document.createElement('p');
    var textInactive = document.createElement('p');
    textActive.textContent='# meet the target';
    textInactive.textContent='% of total';
    divActive.appendChild(active);
    divActive.appendChild(textActive);
    divInactive.appendChild(inactive);
    divInactive.appendChild(textInactive);
    divActive.className="score";
    divInactive.className="score";





    // Instantiate and draw our chart, passing in some options.
    var chart = new google.charts.Line(document.getElementById('achievement'));
    chart.draw(datos, google.charts.Line.convertOptions(options));
    // chart.draw(datos, google.charts.Column.convertOptions(options));
    container.appendChild(divActive);
    container.appendChild(divInactive);
}
