document.addEventListener('DOMContentLoaded', () => {
    recupererArticle();
});

AjouterBlog.addEventListener("click", () => {
    formulaire.style.display = "block";
    pagePrincipale.style.display = "none";
    myForm.style.display = "block";
});

formulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    formulaire.style.display = "none";
    pagePrincipale.style.display = "block";

    ajouterArticle(titre.value, contenu.value, auteur.value);
    sauvgarderArticle(titre.value, contenu.value, auteur.value);

    myForm.reset();
});

function sauvgarderArticle(titre, contenu, auteur) {
    let donnes = { titre, contenu, auteur };
    let save = JSON.parse(localStorage.getItem('article')) || [];
    save.push(donnes);
    localStorage.setItem('article', JSON.stringify(save));
}

function recupererArticle() {
    let save = JSON.parse(localStorage.getItem('article')) || [];
    save.forEach(element => {
        ajouterArticle(element.titre, element.contenu, element.auteur);
    });
}

function ajouterArticle(titre, contenu, auteur) {
    const items_content = document.createElement('div');
    items_content.classList.add('items');

    const item_titre = document.createElement('input');
    item_titre.type = 'text';
    item_titre.value = titre;
    item_titre.setAttribute('readonly', 'readonly');
    items_content.appendChild(item_titre);

    const item_contenu = document.createElement('input');
    item_contenu.type = 'text';
    item_contenu.value = contenu;
    item_contenu.setAttribute('readonly', 'readonly');
    items_content.appendChild(item_contenu);

    const item_auteur = document.createElement('input');
    item_auteur.type = 'text';
    item_auteur.value = auteur;
    item_auteur.setAttribute('readonly', 'readonly');
    items_content.appendChild(item_auteur);

    const supp = document.createElement('button');
    supp.innerHTML = 'Supprimer';
    supp.addEventListener('click', () => {
        items_content.remove();
    });
    items_content.appendChild(supp);

    listeTask.appendChild(items_content);
}
