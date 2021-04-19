addEventListener('load', () => {

    if(!localStorage.getItem('token')){
        document.getElementById('btn-secondary').addEventListener('click', () => {
            window.location.href = "login.html";
        });
        
        document.getElementById('btn-primary').addEventListener('click', signin);
    }
    else{
        window.location.href="db.html";
    }
    
    
    function signin(){
        const name = document.getElementById('input_name').value;
        const last_name = document.getElementById('input_last_name').value;
        const number = document.getElementById('input_number').value;
        const career = document.getElementById('input_career').value;
    
        axios({
            method: 'post',
            url: 'http://localhost:3000/students/signin',
            data: {
                nombre: name,
                apellido: last_name,
                expediente: number,
                carrera: career
            }
        }).then((res) => {
            console.log(res);
            alert("Registro Exitoso.");
            window.location.href = "login.html";
        }).catch((error) => {
            console.log(error);
        });
    };
})