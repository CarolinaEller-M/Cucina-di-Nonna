document.getElementById("formLogin").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuarioSalvo = localStorage.getItem(email);

    if(!usuarioSalvo){
        alert("Usuário não encontrado");
        return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    if(usuario.senha !== senha){
        alert("Senha incorreta");
        return;
    }

    alert("Login realizado com sucesso!");

    window.location.href = "index.html";
});