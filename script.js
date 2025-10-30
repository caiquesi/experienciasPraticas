// ==================== MENU ====================
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  if (menu) menu.classList.toggle("active");
}

// ==================== POPUP ====================
function mostrarPopup(texto, tipo) {
  const popup = document.getElementById("popupMensagem");
  const conteudo = document.getElementById("popupConteudo");
  conteudo.textContent = texto;
  conteudo.className = "popup-conteudo " + (tipo === "sucesso" ? "popup-sucesso" : "popup-erro");

  popup.classList.add("mostrar");
  window.scrollTo({ top: 0, behavior: "smooth" });

  popup.onclick = e => { if (e.target === popup) fecharPopup(); };
  setTimeout(fecharPopup, 4000);
}

function fecharPopup() {
  const popup = document.getElementById("popupMensagem");
  if (popup) popup.classList.remove("mostrar");
}

// ==================== UTILITÁRIOS ====================
function verificarIdadeMinima(data) {
  const hoje = new Date(), nasc = new Date(data);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const mes = hoje.getMonth() - nasc.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade >= 18;
}

function aplicarMascaras() {
  const tel = document.getElementById("telefone");
  if (tel) tel.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 10)
      e.target.value = v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    else if (v.length > 6)
      e.target.value = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    else if (v.length > 2)
      e.target.value = v.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    else e.target.value = v.replace(/^(\d*)$/, "($1");
  });

  const cpf = document.getElementById("cpf");
  if (cpf) cpf.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    e.target.value = v.replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  });

  const cep = document.getElementById("cep");
  if (cep) cep.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 8);
    e.target.value = v.replace(/^(\d{5})(\d)/, "$1-$2");
  });
}

function mascararEmail(email) {
  if (!email.includes("@")) return email;
  const [usuario, dominio] = email.split("@");
  return `${usuario.slice(0, 4)}${"*".repeat(Math.max(0, usuario.length - 4))}@${dominio}`;
}

// ==================== PRINCIPAL ====================
document.addEventListener("DOMContentLoaded", () => {

  // ======== CARROSSEL ========
  const imagens = document.querySelectorAll("#galeria img");
  const btnEsquerda = document.querySelector(".seta.esquerda");
  const btnDireita = document.querySelector(".seta.direita");

  if (imagens.length && btnEsquerda && btnDireita) {
    let indiceAtual = 0, intervalo;

    const mostrarImagem = i => {
      imagens.forEach(img => img.classList.remove("ativo"));
      imagens[i].classList.add("ativo");
    };

    const proximaImagem = () => {
      indiceAtual = (indiceAtual + 1) % imagens.length;
      mostrarImagem(indiceAtual);
    };

    const anteriorImagem = () => {
      indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
      mostrarImagem(indiceAtual);
    };

    const iniciar = () => intervalo = setInterval(proximaImagem, 3000);
    const parar = () => clearInterval(intervalo);

    btnDireita.addEventListener("click", () => { parar(); proximaImagem(); iniciar(); });
    btnEsquerda.addEventListener("click", () => { parar(); anteriorImagem(); iniciar(); });

    mostrarImagem(indiceAtual);
    iniciar();
  }

  // ======== LIGHTBOX ========
  const imagensProjeto = document.querySelectorAll(".projetos-container img");
  if (imagensProjeto.length) {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);

    imagensProjeto.forEach(image => {
      image.addEventListener("click", () => {
        lightbox.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
        lightbox.classList.add("active");
      });
    });

    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) lightbox.classList.remove("active");
    });
  }

  // ======== CONTADOR DE MENSAGEM ========
  const textarea = document.getElementById("mensagem");
  const contador = document.getElementById("contador");
  if (textarea && contador) {
    textarea.addEventListener("input", () => {
      contador.textContent = `${textarea.value.length} / 500`;
    });
  }

  // ======== FORMULÁRIO DE CADASTRO ========
  const formCadastro = document.getElementById("formCadastro");
  if (formCadastro) {
    aplicarMascaras();

    formCadastro.addEventListener("submit", e => {
      e.preventDefault();

      document.querySelectorAll(".erro").forEach(el => el.classList.remove("erro"));
      document.querySelectorAll(".erro-mensagem").forEach(el => el.textContent = "");

      const campos = ["nome","email","cpf","telefone","nascimento","endereco","cep","cidade","estado"]
        .map(id => document.getElementById(id));
      const sobre = document.getElementById("mensagem");
      let valido = true;

      campos.forEach(campo => {
        const grupo = campo.closest(".form-group");
        const msg = grupo?.querySelector(".erro-mensagem");
        if (!campo.value.trim()) {
          campo.classList.add("erro");
          if (msg) msg.textContent = "Este campo é obrigatório.";
          valido = false;
        }
      });

      const email = document.getElementById("email");
      const msgEmail = email.closest(".form-group")?.querySelector(".erro-mensagem");
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add("erro");
        if (msgEmail) msgEmail.textContent = "Digite um e-mail válido.";
        valido = false;
      }

      const nasc = document.getElementById("nascimento");
      const msgNasc = nasc.closest(".form-group")?.querySelector(".erro-mensagem");
      if (nasc.value && !verificarIdadeMinima(nasc.value)) {
        nasc.classList.add("erro");
        if (msgNasc) msgNasc.textContent = "Você deve ter pelo menos 18 anos.";
        valido = false;
      }

      const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
      const cpf = document.getElementById("cpf");
      const msgCpf = cpf.closest(".form-group")?.querySelector(".erro-mensagem");
      if (cadastros.some(c => c.cpf === cpf.value)) {
        cpf.classList.add("erro");
        if (msgCpf) msgCpf.textContent = "Este CPF já está cadastrado.";
        mostrarPopup("CPF já cadastrado.", "erro");
        return;
      }

      if (!valido) return mostrarPopup("Verifique os campos destacados e corrija os erros.", "erro");

      const novoCadastro = {
        nome: campos[0].value,
        email: campos[1].value,
        cpf: campos[2].value,
        telefone: campos[3].value,
        nascimento: campos[4].value,
        endereco: campos[5].value,
        cep: campos[6].value,
        cidade: campos[7].value,
        estado: campos[8].value,
        sobre: sobre.value,
        dataCadastro: new Date().toLocaleString("pt-BR")
      };

      cadastros.push(novoCadastro);
      localStorage.setItem("cadastros", JSON.stringify(cadastros));
      formCadastro.reset();
      mostrarPopup("✅ Cadastro realizado com sucesso!", "sucesso");
    });
  }

  // ======== FORMULÁRIO DE CONTATO ========
  const contatoForm = document.getElementById("formContato");
  if (contatoForm) {
    contatoForm.addEventListener("submit", e => {
      e.preventDefault();
      const nome = document.getElementById("nome");
      const email = document.getElementById("email");
      const mensagem = document.getElementById("mensagem");

      if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
        mostrarPopup("⚠️ Por favor, preencha todos os campos antes de enviar.", "erro");
        return;
      }

      mostrarPopup("✅ Mensagem enviada com sucesso! Entraremos em contato em breve.", "sucesso");
      contatoForm.reset();
    });
  }

  // ======== SENHA E LISTA DE CADASTROS ========
  const btnAtualizar = document.getElementById("atualizarTabela");
  if (btnAtualizar) {
    btnAtualizar.addEventListener("click", atualizarTabelaCadastros);
    atualizarTabelaCadastros();
  }

  const btnEntrar = document.getElementById("btnEntrarLista");
  const campoSenha = document.getElementById("senhaAcesso");
  const erroSenha = document.getElementById("erroSenha");
  const listaCadastros = document.getElementById("listaCadastros");
  const SENHA_CORRETA = "comocaesegatos2025";

  if (btnEntrar) {
    btnEntrar.addEventListener("click", () => {
      if (campoSenha.value === SENHA_CORRETA) {
        document.getElementById("acessoCadastros").style.display = "none";
        listaCadastros.style.display = "block";
        atualizarTabelaCadastros();
      } else {
        erroSenha.style.display = "block";
        campoSenha.classList.add("erro");
        setTimeout(() => {
          erroSenha.style.display = "none";
          campoSenha.classList.remove("erro");
        }, 2000);
      }
    });

    campoSenha.addEventListener("keypress", e => {
      if (e.key === "Enter") btnEntrar.click();
    });
  }
});

// ==================== TABELA DE CADASTROS ====================
function atualizarTabelaCadastros() {
  const tbody = document.querySelector("#tabelaCadastros tbody");
  if (!tbody) return;

  const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  tbody.innerHTML = "";

  if (!cadastros.length) {
    tbody.innerHTML = `<tr><td colspan="9">Nenhum cadastro encontrado.</td></tr>`;
    return;
  }

  cadastros.forEach((c, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${c.nome}</td>
        <td>${mascararEmail(c.email)}</td>
        <td>${c.cpf.substring(0, 3)}********</td>
        <td>********${c.telefone.slice(-4)}</td>
        <td>${c.nascimento}</td>
        <td>${c.cidade}</td>
        <td>${c.estado}</td>
        <td>${c.dataCadastro}</td>
        <td><button onclick="removerCadastro(${i})">Excluir</button></td>
      </tr>`;
  });
}

function removerCadastro(index) {
  const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  const nome = cadastros[index]?.nome;
  if (!nome) return;

  if (confirm(`❌ Deseja realmente excluir todas as informações de ${nome}?`)) {
    cadastros.splice(index, 1);
    cadastros.length ? localStorage.setItem("cadastros", JSON.stringify(cadastros))
                     : localStorage.removeItem("cadastros");
    atualizarTabelaCadastros();
    mostrarPopup(`🗑️ Cadastro de ${nome} removido com sucesso.`, "sucesso");
  }
}
