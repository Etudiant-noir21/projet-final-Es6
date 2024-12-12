// recupwration de mes donnes sur le dom

const pagePrincipale = document.querySelector(".liste");

const formulaire = document.querySelector(".form");

// recuperation des elements du formulaire
const titre = document.querySelector("#title");
const contenu = document.querySelector("#content");
const auteur = document.getElementById("author");
const myForm = document.getElementById("formulaire");

// form modifier
const formulaireModifier = document.querySelector("#formeModifier");
console.log(formulaireModifier);

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
    sauvgarderArticle(titre.value, contenu.value, auteur.value)
    // ajouterArticle(titre.value, contenu.value, auteur.value)
    recupererArticle();
    myForm.reset();
})

// form modifier


// ecouter le click sur le bouton modifier
EnregistrerModif.addEventListener("click", () => {
    
})
// fonction pour ajouter un article

function ajouterArticle(titre,contenu,auteur,id){
    // creation des elements
    const div = document.createElement('div')
    div.setAttribute('data-id', id);
    listeTask.appendChild(div)

    // titre
const li1 = document.createElement('li')
div.appendChild(li1)
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

// supprimer
const supp = document.createElement('span')
supp.innerHTML = `<i class="fa fa-trash"></i>`
li5.appendChild(supp)

// gestionnaires des evennements
modifier.addEventListener("click", () => afficherFormModifier(id))
supp.addEventListener('click', () => supprimerArticle(id,div))


}


// sauvegarder article
function sauvgarderArticle(titre, contenu, auteur) {
    const article = {
        id: Date.now(), 
        titre: titre,
        contenu: contenu,
        auteur: auteur
    };
    let save = JSON.parse(localStorage.getItem("article")) || [];
    save.push(article);
    localStorage.setItem("article", JSON.stringify(save));
}


// fonction de recuperation 
function recupererArticle(){
    let save = JSON.parse(localStorage.getItem("article")) || []

    listeTask.innerHTML = ""

    save.forEach(article => {
        ajouterArticle(article.titre, article.contenu, article.auteur, article.id)
    });
}

recupererArticle()

// fonction modifier

function modifierArticle(id,titremodifier,contenumodifier,auteurmodifier){
    let save = JSON.parse(localStorage.getItem("article")) || []

    let index = save.findIndex(article=> article.id === id)

    if(index !== -1){
        save[index] ={

            //copier l'index
            ...save[index],
            titre: titremodifier,
            contenu: contenumodifier,
            auteur: auteurmodifier
        }
        localStorage.setItem("article", JSON.stringify(save))
    }
   

}

// fonction afficher formulaire

function afficherFormModifier(id){
    let save = JSON.parse(localStorage.getItem("article")) || []
    const article = save.find(article => article.id === id)

    if(article){
        titreModif.value = article.titre
        contenuModif.value = article.contenu
        auteurModif.value = article.auteur

        pagePrincipale.style.display = "none";
        formulaire.style.display = "block";
        formulaireModifier.style.display = "block";
        console.log(formulaireModifier);
        
        myForm.style.display = "none";

        // enregistrement des modifications
        EnregistrerModif.onclick = () => {
            modifierArticle(id, titreModif.value, contenuModif.value, auteurModif.value);
            recupererArticle(); 
            formulaire.style.display = "none";
            pagePrincipale.style.display = "block";
        };
    }

}

// fonction supprimer

function supprimerArticle(id,div){
    let save = JSON.parse(localStorage.getItem("article")) || []
    save = save.filter(article => article.id !== id)
    localStorage.setItem("article", JSON.stringify(save))

    div.remove()
}

