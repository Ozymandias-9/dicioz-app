addEventListener('load', () => {
    const base = document.getElementById('base');

    if(!localStorage.getItem('token')){
        window.location.href = "login.html";
    }
    else{
        loadStudents();
    }

    function loadStudents(){
        axios.get('http://localhost:3000/students/')
        .then((res) => {
            const students = res.data.message;
            console.log(students);
            fragment = document.createDocumentFragment();
            for(let els of students){
                const element = document.createElement('DIV');
                element.textContent = els.id + " " + els.nombre + " " + els.apellido + " " + els.expediente + " " + els.carrera;

                fragment.appendChild(element);
            }
            base.appendChild(fragment);
        }).catch((error) => {
            console.log(error);
        })
    }
})

