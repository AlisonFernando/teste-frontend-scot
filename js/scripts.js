const regExpSenha =
  /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const regExpEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

function login(event) {
  event.preventDefault();

  const localEmail = localStorage.getItem("email");
  const localSenha = localStorage.getItem("senha");

  const email = event.target[0].value;
  const senha = event.target[1].value;

  if (email !== localEmail || senha !== localSenha) {
    alert("Credenciais inválidas");
  } else {
    window.location.href = "home.html";
  }
}

function trocarTela(tela) {
  const login = document.getElementById("login");
  const cadastro = document.getElementById("cadastro");

  if (tela === "login") {
    cadastro.style.display = "none";
    login.style.display = "block";
  }

  if (tela === "cadastro") {
    cadastro.style.display = "block";
    login.style.display = "none";
  }
}

function cadastrar(event) {
  event.preventDefault();

  const email = event.target[0].value;
  const senha = event.target[1].value;
  const confirmacao = event.target[2].value;

  if (senha !== confirmacao) {
    alert("Senhas não batem");
    return;
  }

  if (!regExpEmail.test(email)) {
    alert("Email inválido");
    return;
  }

  if (!regExpSenha.test(senha)) {
    alert("Senha fraca");
    return;
  }

  localStorage.setItem("email", email);
  localStorage.setItem("senha", senha);

  alert("Cadastrado com sucesso!");

  trocarTela("login");
}

class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li"
);
mobileNavbar.init();

function UserEmail(){
  const userLogado = localStorage.getItem("email");
  const user = document.getElementById("user-email");

  user.innerText = "Ola, " + userLogado;
}
UserEmail();
