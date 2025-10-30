# Como Cães e Gatos — Site da ONG

Site institucional com foco em **acessibilidade** e **boas práticas web**.  
Desenvolvido para o projeto final da disciplina de Desenvolvimento Web.
Projeto desenvolvido para fins educacionais, com foco em:
HTML, CSS e JavaScript puros — sem dependências externas.

---

## 💡 Sobre o Projeto

Este projeto tem como objetivo divulgar o trabalho da ONG Como Cães e Gatos, voltada ao resgate, adoção e voluntariado de animais abandonados.
O site é composto por três páginas principais: Início, Projetos e Cadastro, todas responsivas e interativas..

---

📁 Estrutura do Projeto

📦 como-caes-e-gatos
├── index.html          # Página inicial (Quem somos + Contato + Mapa)
├── projeto.html        # Página dos projetos e formas de doação
├── cadastro.html       # Página de cadastro de voluntários
├── style.css           # Folha de estilo principal
├── script.js           # JavaScript principal (validações e interações)
└── assets/             # Pasta de imagens e ícones

---

## 🏠 Página Inicial (index.html)
**Conteúdo:**

**• Cabeçalho com menu responsivo**

    • Links para Início, Projetos e Cadastro.

    • Ícone “☰” aparece em telas pequenas (menu mobile).

**• Seção “Quem Somos”**

    • Texto explicativo sobre a ONG.

    • Galeria lateral com carrossel automático de imagens e botões de navegação.

**• Seção “Fale Conosco”**

    • Formulário com:

        • Nome

        • E-mail

        • Mensagem (limite de 500 caracteres)

    • Contador em tempo real.

    • Popup de sucesso/erro exibido ao enviar o formulário (sem redirecionar a URL).

**•Seção “Onde Estamos”**

    • Mapa interativo (Google Maps) mostrando o endereço da ONG.

## 🧩 Página de Projetos (projeto.html)
**Conteúdo:**

    • Seção de Projetos

        • Cards com imagem circular e descrição abaixo.

        • Cada imagem pode ser ampliada com o lightbox (ao clicar).

        • Layout responsivo: 3 imagens lado a lado em telas grandes e empilhadas em telas pequenas.

    • Seção “Formas de Doar”

        • Três cartões interativos com ícones, texto explicativo e efeitos hover.

        • Layout adaptável com grid automático.

## 👩‍💻 Página de Cadastro (cadastro.html)
**Funcionalidades:**

    • Formulário de cadastro de voluntários, com validações em tempo real:

        • Todos os campos obrigatórios mostram mensagens individuais (“Este campo é obrigatório”).

        • Verificação automática de CPF já cadastrado.

        • Verificação de idade mínima (18 anos).

        • Máscaras aplicadas automaticamente para:

            • CPF → 000.000.000-00

            • Telefone → (00) 00000-0000

            • CEP → 00000-000

        • Popup de sucesso/erro ao enviar.

    • Lista de pessoas cadastradas

        • Acesso protegido por senha pré-definida (comocaesegatos2025).

        • Tabela exibe cadastros salvos no LocalStorage.

        • E-mails e CPFs são parcialmente mascarados.

        • Botão “Excluir” apaga o cadastro do armazenamento local.

## ⚙️ Funcionalidades JavaScript (script.js)
**Principais funções:**

    • toggleMenu() → Abre/fecha o menu mobile.

    • mostrarPopup(texto, tipo) → Exibe mensagens de sucesso ou erro.

    • verificarIdadeMinima(data) → Garante que o voluntário tenha no mínimo 18 anos.

    • aplicarMascaras() → Formata os campos de CPF, CEP e telefone.

    • mascararEmail(email) → Oculta parte do endereço de e-mail na tabela.

    • atualizarTabelaCadastros() → Exibe os cadastros armazenados.

    • removerCadastro(index) → Remove um cadastro específico.

Além disso:

    • Implementa carrossel automático de imagens com botões.

    • Cria lightbox nas imagens dos projetos.

    • Mostra contador dinâmico no campo de mensagem.

    • Exibe popups estilizados de feedback para o usuário.

## 💾 Armazenamento de Dados

Os cadastros são salvos no LocalStorage do navegador, ou seja:

    • Os dados permanecem mesmo após atualizar a página.

    • Não há envio de informações para o servidor.

    • Cada exclusão remove permanentemente o item selecionado.

---

## 🔐 Acesso à Lista de Cadastros

Para visualizar os cadastros:

    1 - Vá até a página cadastro.html;

    2 - Role até a seção “Acesso à lista de cadastros”;

    3 - Digite a senha:

        comocaesegatos2025


    4 - Clique em Entrar;

    5 - A tabela aparecerá com todos os cadastros salvos localmente.

---

## 🧠 Boas Práticas Implementadas

    • Separação de responsabilidades (HTML + CSS + JS bem organizados).

    • Totalmente responsivo (mobile first).

    • Mensagens de erro e sucesso acessíveis e claras.

    • Código JavaScript modular e comentado.

    • Evita reloads e redirecionamentos desnecessários.

---

## 🚀 Como Executar Localmente

    1 - Baixe ou clone este repositório.

    2 - Certifique-se de manter os arquivos na mesma estrutura.

    3 - Abra o arquivo index.html no seu navegador.

    4- Navegue entre as páginas pelo menu superior.

---
