const form = document.getElementById("siteForm");
const result = document.getElementById("result");
const preview = document.getElementById("preview");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = value("name");
  const job = value("job");
  const city = value("city");

  const pages = generatePages(name, job, city);
  preview.innerHTML = "";

  for (const file in pages) {
    preview.innerHTML += `<h3>${file}</h3><pre>${escapeHTML(pages[file])}</pre>`;
  }

  result.hidden = false;
});

function value(id) {
  return document.getElementById(id).value.trim();
}

function generatePages(name, job, city) {
  const nav = `
<nav>
  <a href="index.html">Accueil</a>
  <a href="about.html">À propos</a>
  <a href="services.html">Services</a>
  <a href="contact.html">Contact</a>
</nav>`;

  const base = (content) => `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>${name}</title>
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
${nav}
<main class="container">
${content}
</main>
</body>
</html>`;

  return {
    "index.html": base(`<h1>${name}</h1><p>${job} premium à ${city}</p>`),
    "about.html": base(`<h1>À propos</h1><p>${name}, ${job} basé à ${city}.</p>`),
    "services.html": base(`<h1>Services</h1><ul><li>Conseil premium</li><li>Solutions sur mesure</li></ul>`),
    "contact.html": base(`<h1>Contact</h1><p>Disponible pour nouveaux projets.</p>`)
  };
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[m])
  );
}
