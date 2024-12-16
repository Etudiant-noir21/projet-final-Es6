// document.addEventListener('DOMContentLoaded', () => {
//     recupererArticle();
// });


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

// document load
document.addEventListener('DOMContentLoaded', () => {
    recupererArticle();
});

// ecouter le click sur le bouton ajouter un article
AjouterBlog.addEventListener("click", () => {
    formulaire.style.display = "block";
    pagePrincipale.style.display = "none";
    myForm.style.display = "block";
    
})


// ecouter le l'envoie du formulaire
formulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    formulaire.style.display = "none";
    pagePrincipale.style.display = "block";
    ajouterArticle(titre.value, contenu.value, auteur.value);

    // appell de notre fonction 
    sauvgarderArticle(titre.value, contenu.value, auteur.value)
    myForm.reset();
})

// sauvegarder article
function sauvgarderArticle(titr, cont, aut) {
    let donnes = {
        id: Date.now(),
       titre: titr,
       contenu: cont,
       auteur: aut
    }
 
    let save = JSON.parse(localStorage.getItem('article')) || []
    if(!Array.isArray(save)){
        save = []
    }
    save.push(donnes)
    localStorage.setItem('article', JSON.stringify(save))
    // console.log('Article sauvegardé :', donnes)
 }
 
 // fonction de recuperation 
 function recupererArticle(){
     let save = JSON.parse(localStorage.getItem('article')) || []
     if(!Array.isArray(save)){
         save = []
     }
 
     save.forEach(element => {
         ajouterArticle(element.titr, element.cont, element.aut)
     })
 }

// fonction pour ajouter un article
function ajouterArticle(titr, cont, aut) {
console.log('titr', titr, 'cont', cont, 'aut', aut);
// creation d'element d'affichage
const items_content = document.createElement('div')
listeTask.appendChild(items_content)
items_content.classList.add('items') //div conteneur

// affichage de la partie titre
const itemText = document.createElement('li')//li 
items_content.appendChild(itemText)
const item_titre = document.createElement('input')
item_titre.type = 'text'
item_titre.classList.add('text')
item_titre.value = titr
item_titre.setAttribute('readonly', 'readonly')
// console.log(item_titre.value);
itemText.appendChild(item_titre)

const edit_titre = document.createElement('button')
edit_titre.type = 'button'
edit_titre.classList.add('edit')
edit_titre.style.backgroundColor = 'green'
edit_titre.innerHTML = 'Edit'
itemText.appendChild(edit_titre)

// button edit
edit_titre.addEventListener('click', (e)=>{
    if(edit_titre.innerHTML.toLowerCase() == 'edit'){
        edit_titre.innerHTML = 'save'
        item_titre.removeAttribute('readonly')
        item_titre.focus()
    }else{
        edit_titre.innerHTML = 'Edit'
        item_titre.setAttribute('readonly', 'readonly')
        misAJour(titr, cont, aut)
    }
})

// partie contenu
const itemTextContenu = document.createElement('li')//li  contenu
items_content.appendChild(itemTextContenu)
const item_Contenu = document.createElement('input')
item_Contenu.type = 'text'
item_Contenu.classList.add('text')
item_Contenu.value = cont
item_Contenu.setAttribute('readonly', 'readonly')
itemTextContenu.appendChild(item_Contenu)

const edit_contenu = document.createElement('button')
edit_contenu.type = 'button'
edit_contenu.classList.add('edit')
edit_contenu.style.backgroundColor = 'green'
edit_contenu.innerHTML = 'Edit'
itemTextContenu.appendChild(edit_contenu)

// button edit
edit_contenu.addEventListener('click', (e)=>{
    if(edit_contenu.innerHTML.toLowerCase() == 'edit'){
        edit_contenu.innerHTML = 'save'
        item_Contenu.removeAttribute('readonly')
        item_Contenu.focus()
    }else{
        edit_contenu.innerHTML = 'Edit'
        item_Contenu.setAttribute('readonly', 'readonly')
        misAJour(titr, cont, aut)
    }
})

// Partie auteur
const itemTextAuteur = document.createElement('li')//li  auteur
items_content.appendChild(itemTextAuteur)
const item_Auteur = document.createElement('input')
item_Auteur.type = 'text'
item_Auteur.classList.add('text')
item_Auteur.value = aut
item_Auteur.setAttribute('readonly', 'readonly')
itemTextAuteur.appendChild(item_Auteur)

const edit_Auteur = document.createElement('button')
edit_Auteur.type = 'button'
edit_Auteur.classList.add('edit')
edit_Auteur.style.backgroundColor = 'green'
edit_Auteur.innerHTML = 'Edit'
itemTextAuteur.appendChild(edit_Auteur)

// button edit
edit_Auteur.addEventListener('click', (e)=>{
    if(edit_Auteur.innerHTML.toLowerCase() == 'edit'){
        edit_Auteur.innerHTML = 'save'
        item_Auteur.removeAttribute('readonly')
        item_Auteur.focus()
    }else{
        edit_Auteur.innerHTML = 'Edit'
        item_Auteur.setAttribute('readonly', 'readonly')
        misAJour(id,titr, cont, aut)
    }
})

// affichage date de publication
const date = new Date()
const affichage = date.toLocaleDateString('fr-FR',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
})
console.log(affichage);

const itemTextDate = document.createElement('li')//li  date
items_content.appendChild(itemTextDate)
const item_date = document.createElement('input')
item_date.type = 'text'
item_date.classList.add('text')
item_date.value = affichage
item_date.setAttribute('readonly', 'readonly')
itemTextDate.appendChild(item_date)

const supp = document.createElement('button')
supp.type = 'button'
supp.classList.add('supp')
supp.style.backgroundColor = 'red'
supp.innerHTML = 'Supprimer'
itemTextDate.appendChild(supp)

supp.addEventListener('click', (e)=>{
    items_content.remove()
    supprimerArticle(titr)
})
}

// fonction modifier
function misAJour(id,newTitre, newContenu, newAuteur){
    let save = JSON.parse(localStorage.getItem('article')) || []
    save = save.map(article => {
        if (article.id === id) {
            return {
                ...article, 
                titre: newTitre,
                contenu: newContenu,
                auteur: newAuteur
            };
        }
        return article;
    });

    }
   
// fonction supprimer
function supprimerArticle(eleSupp){
    let save = JSON.parse(localStorage.getItem('article')) || []
    save.forEach((element, index) => {
        if(element.titr == eleSupp){
            save.splice(index, 1)
        }
    });
    localStorage.setItem('article', JSON.stringify(save))
   
}


