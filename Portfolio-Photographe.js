const addForm = document.querySelector(".addcase");
const cardsContainer = document.getElementById("cards");

const inputDescription = document.getElementById("Description");
const inpuTitre = document.getElementById("Titre-du-projet");
const urlinput = document.getElementById("urlinput");

const theURL= "http://localhost:4000/projects";


function createCard(projet) {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
  <img src="${projet.imageUrl}" alt="${projet.titre}">
  <h4>${projet.titre}</h4>
  <p style="display: none;">${projet.description}</p>
  <button style="display:none">🗑</button>`;

    // ou
  // const nouvelleCarte = `<div class="card">
  //     <img src="${imageUrl}" alt="${titre}">
  //     <h4>${titre}</h4>
  //     <p style="display: none;">${description}</p>
  //   </div>
  // `;
  // cardsContainer.innerHTML += nouvelleCarte;

  const titrecard = div.querySelector("h4");
  const descard = div.querySelector("p");
  const buttonsupprimer = div.querySelector("button");

  titrecard.addEventListener("click", () => {
    descard.style.display =descard.style.display === "block" ? "none" : "block";
    buttonsupprimer.style.display =buttonsupprimer.style.display === "block" ? "none" : "block";
  });

buttonsupprimer.addEventListener("click", () => {
    axios.delete(`${theURL}/${projet.id}`)
      .then(() => {
        div.remove();
        console.log(`Projet ${projet.id} supprimé`);
      })
      .catch(err => {
        console.error("Erreur lors de la suppression :", err);
      });
  });
  return div;
}

function chargerProjets() {
  axios.get(theURL).then((res) => {
      const projets = res.data;
      projets.forEach((projet) => {
        const card = createCard(projet);
        cardsContainer.appendChild(card);
      });
    });
}
chargerProjets();

addForm.addEventListener("submit", function (e) {
  e.preventDefault();

  
  const nouveauProjet = {
    titre: inpuTitre.value.trim(),
    description: inputDescription.value.trim(),
    imageUrl: urlinput.value.trim()
  };

  if (nouveauProjet.title === "" || nouveauProjet.description === "" || nouveauProjet.image === "" ) {
    alert("Veuillez remplir tous les champs avant d’ajouter un projet.");
    return; 
  }

  axios.post(theURL, nouveauProjet)
    .then(res => {
      const newCard = createCard(res.data);
      cardsContainer.appendChild(newCard);
      console.log("Projet enregistré dans db.json");
    })
    .catch((err) => console.error("Erreur lors de l'enregistrement :", err));

  inpuTitre.value = "";
  inputDescription.value = "";
  urlinput.value = "";
});
