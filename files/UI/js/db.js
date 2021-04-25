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

    document.getElementById('btn-edit').addEventListener('click', ()=>{
        stud = document.getElementById('input-edit').value
    
        axios.get(`http://localhost:3000/students/${stud}`)
        .then((res)=>{
            const students = res.data.message;
            document.getElementById('input_name').value = students[0].nombre;
            document.getElementById('input_last_name').value = students[0].apellido;
            document.getElementById('input_number').value = students[0].expediente;
            document.getElementById('input_career').value = students[0].carrera;
        }).catch((err)=>{
            console.log(err);
        })
    })

    document.getElementById('btn-fin-edit').addEventListener('click', ()=>{
        stud = document.getElementById('input-edit').value
        axios({
            method: 'put',
            url: `http://localhost:3000/students/${stud}`,
            data:{
                nombre: document.getElementById('input_name').value,
                apellido: document.getElementById('input_last_name').value,
                expediente: document.getElementById('input_number').value,
                carrera: document.getElementById('input_career').value
            }
        }).then((res)=>{
            alert("Estudiante editado correctamente.");
            const juas = base.childNodes.length;
            for(let i = 0; i<juas; i++){
                base.removeChild(base.lastChild);
            }
            loadStudents();
        }).catch((err)=>{
            console.log(err);
        })
    })
})



