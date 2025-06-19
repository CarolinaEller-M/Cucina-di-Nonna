document.getElementById("formRegistro").addEventListener("submit", function (e){
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if(localStorage.getItem(email)){
        alert("Este e-mail já está registrado");
        return;
    }

    const usuario = {
        nome: nome,
        email: email,
        senha: senha,
    };

    localStorage.setItem(email, JSON.stringify(usuario));
    alert("Registro realizado com sucesso!")

    window.location.href = "login.html";
});