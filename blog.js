// recupwration de mes donnes sur le dom

const pagePrincipale = document.querySelector(".liste");

const formulaire = document.querySelector(".form");

// recuperation des elements du formulaire
const titre = document.querySelector("#title");
const contenu = document.querySelector("#content");
const auteur = document.getElementById("author");
const myForm = document.getElementById("formulaire");

// form modifier
const formulaireModifier = document.querySelector("#formModifier");
const titreModif = document.querySelector("#titleModif");
const contenuModif = document.querySelector("#contentModif");
const auteurModif = document.getElementById("authorModif");
const EnregistrerModif = document.querySelector("#EnregistrerModif");
const Enregistrer = document.querySelector("#Enregistrer");


// recuperation des elements de la page principale
const listeTask = document.querySelector("#listeTask");
const AjouterBlog = document.querySelector("#AjouterBlog");

// ecouter le click sur le bouton ajouter un article
AjouterBlog.addEventListener("click", () => {
    formulaire.style.display = "block";
    pagePrincipale.style.display = "none";
})


// ecouter le click sur le bouton enregistrer
formulaire.addEventListener("submit", (e) => {
    formulaire.style.display = "none";
    pagePrincipale.style.display = "block";
    e.preventDefault();

    // appell de notre fonction 
    ajouterArticle(titre.value, contenu.value, auteur.value)
    sauvgarderArticle(titre.value, contenu.value, auteur.value)
    myForm.reset();
})

// form modifier


// ecouter le click sur le bouton modifier
EnregistrerModif.addEventListener("click", () => {
    
})
// fonction pour ajouter un article

function ajouterArticle(titre,contenu,auteur){
    // creation des elements

    const div = document.createElement('div')
    listeTask.appendChild(div)
const li1 = document.createElement('li')
div.appendChild(li1)

// titre

li1.innerHTML = ` <strong>Titre:</strong> <br> ${ titre}`
div.appendChild(li1)

// contenu
const li2 = document.createElement('li')
li2.innerHTML =`<strong>Contenu:</strong> <br> ${contenu}`
div.appendChild(li2)

// auteur
const li3 = document.createElement('li')
li3.innerHTML =`<strong>Auteur:</strong> <br> ${auteur}`
div.appendChild(li3)

// date 
const li4 = document.createElement('li')
const date = new Date()
const day = date.getDate()
const mois = date.getMonth() 
// Tableau des mois en français
const moisFrancais = [
    "jan", "fév", "mars", "avr", "mai", "juin",
    "juil", "août", "sept", "oct", "nov", "déc"
  ];

const moisName = moisFrancais[mois]
const annee = date.getFullYear()

const affichage = day + '/' + moisName + '/' + annee
li4.innerHTML =`<strong>Date:</strong> <br> ${affichage}`
div.appendChild(li4)

// modifier
const li5 = document.createElement('li')
const modifier = document.createElement('span')
modifier.innerHTML = `<i class="fa fa-pencil"></i>`
div.appendChild(li5)
li5.appendChild(modifier)
li5.classList.add('liAction')

// ecouter le click sur le bouton modifier
modifier.addEventListener("click", () => {
    const formeModifier = document.querySelector("#formeModifier");
    formulaire.style.display = "block";
    pagePrincipale.style.display = "none";
    formeModifier.style.display = "block";
    myForm.style.display = "none";

    modifierArticle(titre, contenu, auteur)

})


EnregistrerModif.addEventListener("click", () => {
    const formeModifier = document.querySelector("#formeModifier");
    formulaire.style.display = "none";
    pagePrincipale.style.display = "block";

  
    // ajout des nouvelles elements
    li1.innerHTML = ` <strong>Titre:</strong> <br> ${ titreModif.value}`
    li2.innerHTML =`<strong>Contenu:</strong> <br> ${contenuModif.value}`
    li3.innerHTML =`<strong>Auteur:</strong> <br> ${auteurModif.value}`
    sauvgarderArticle(titreModif.value, contenuModif.value, auteurModif.value)

    console.log(li1,li2,li3);
    
})


// supprimer
const supp = document.createElement('span')
supp.innerHTML = `<i class="fa fa-trash"></i>`
li5.appendChild(supp)

// ecouter le click sur le bouton supprimer
supp.addEventListener("click", () => {
    div.remove()
    supprimerArticle(listeTask.children.length - 1)
})


}


// fonction sauvgarder
function sauvgarderArticle(titre,contenu,auteur){
    let article = {
        titre: titre,
        contenu: contenu,
        auteur: auteur
    }
    let save = JSON.parse(localStorage.getItem("article")) || []
    save.push(article)
    localStorage.setItem("article", JSON.stringify(save))

}

// fonction de recuperation 
function recupererArticle(){
    let save = JSON.parse(localStorage.getItem("article")) || []
    save.forEach(article => {
        ajouterArticle(article.titre, article.contenu, article.auteur)
    });
}

recupererArticle()

// fonction modifier

function modifierArticle(titremodifier,contenumodifier,auteurmodifier){
    let save = JSON.parse(localStorage.getItem("article")) || []

    let index = save.findIndex(article=> article.titre === titremodifier)

    if(index === -1){
        save[index] ={
            titre: titremodifier,
            contenu: contenumodifier,
            auteur: auteurmodifier
        }
    }
   
    localStorage.setItem("article", JSON.stringify(save))

   titreModif.value = save[index].titre
   contenuModif.value = save[index].contenu
   auteurModif.value = save[index].auteur

}



// fonction supprimer

function supprimerArticle(supprimer){
    let save = JSON.parse(localStorage.getItem("article")) || []
    save.splice(supprimer, 1)
    localStorage.setItem("article", JSON.stringify(save))

}

