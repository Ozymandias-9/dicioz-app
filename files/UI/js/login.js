addEventListener('load', () => {

    if(!localStorage.getItem('token')){
        document.getElementById('btn-primary').addEventListener('click', ()=>{
            window.location.href = "signin.html";
        })

        document.getElementById('btn-secondary').addEventListener('click', login);
    }
    else{
        window.location.href = "db.html";
    }

    function login(){
        const last_name = document.getElementById('input_last_name').value;
        const number = document.getElementById('input_number').value;

        axios({
            method: 'post',
            url: 'http://localhost:3000/students/login',
            data: {
                apellido: last_name,
                expediente: number
            }   
        }).then((res) => {
            alert("Inicio de sesión exitoso.");
            localStorage.setItem('token', res.data.message);
            window.location.href = "db.html"
        }).catch((error) => {
            alert("Rellene los campos.");
            console.log(error);
        })
    }
})