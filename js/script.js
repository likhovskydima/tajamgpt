// закріплення хедера
const navbar = document.querySelector(".navbar");
const STICK_POINT = 100; // відстань для фікса хедера

function handleSticky() {
  if (window.scrollY > STICK_POINT) {
    navbar.style.position = "fixed";
    navbar.style.top = "0";
    navbar.style.left = "0";
    navbar.style.width = "100%";
    navbar.style.backgroundColor = "rgba(52, 43, 87, 0.9)";
    navbar.style.borderBottom = "1px solid rgba(0, 224, 208, .2)";
    navbar.style.zIndex = "999";
  } else {
    navbar.style.position = "";
    navbar.style.backgroundColor = "";
    navbar.style.borderBottom = "";
    navbar.style.zIndex = "";
  }
}
window.addEventListener("scroll", handleSticky);
handleSticky(); // ініціалізація 




// карусель
$('.carousel').carousel({ interval: 2500 });

// ПЕРЕХІД ПО КНОПКАМ
const menuLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

menuLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    const navH = navbar.offsetHeight || 0;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navH;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth"
    });
  });
});

// підсвітка активного пункта
const sections = Array.from(menuLinks)
  .map(a => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    return el ? { id, el } : null;
  })
  .filter(Boolean);

function highlightMenu() {
  const navH = navbar.offsetHeight || 0;
  const pos = window.scrollY + navH + 10; // невеликий відступ

  let currentId = sections.length ? sections[0].id : null;

  sections.forEach(({ id, el }) => {
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (pos >= top && pos < bottom) currentId = id;
  });

  menuLinks.forEach(a => {
    const isActive = a.getAttribute("href") === `#${currentId}`;
    // Підсвічування 
    a.style.color = isActive ? "rgba(0, 224, 208, 1)" : "rgba(255, 255, 255, 1)";
    a.style.fontWeight = isActive ? "700" : "400";
  });
}
window.addEventListener("scroll", highlightMenu);
window.addEventListener("load", highlightMenu);
