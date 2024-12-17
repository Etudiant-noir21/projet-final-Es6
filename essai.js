// Sauvegarder article
function sauvgarderArticle(titr, cont, aut) {
    const date = new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    let donnes = {
        id: Date.now(),
        titre: titr,
        contenu: cont,
        auteur: aut,
        date: date // Enregistrer la date de création
    };

    let save = JSON.parse(localStorage.getItem('article')) || [];
    save.push(donnes);
    localStorage.setItem('article', JSON.stringify(save));
}

// Récupérer les articles sauvegardés
function recupererArticle() {
    let save = JSON.parse(localStorage.getItem('article')) || [];

    save.forEach(article => {
        ajouterArticle(article.titre, article.contenu, article.auteur, article.id, article.date);
    });
}

// Ajouter un article
function ajouterArticle(titr, cont, aut, id, date) {
    const items_content = document.createElement('div');
    listeTask.appendChild(items_content);
    items_content.classList.add('items');

    // Partie titre
    const itemText = document.createElement('li');
    items_content.appendChild(itemText);
    const item_titre = document.createElement('input');
    item_titre.type = 'text';
    item_titre.classList.add('text');
    item_titre.value = titr;
    item_titre.setAttribute('readonly', 'readonly');
    itemText.appendChild(item_titre);

    const edit_titre = document.createElement('button');
    edit_titre.type = 'button';
    edit_titre.classList.add('edit');
    edit_titre.style.backgroundColor = 'green';
    edit_titre.innerHTML = 'Edit';
    itemText.appendChild(edit_titre);

    edit_titre.addEventListener('click', () => {
        if (edit_titre.innerHTML.toLowerCase() === 'edit') {
            edit_titre.innerHTML = 'Save';
            item_titre.removeAttribute('readonly');
            item_titre.focus();
        } else {
            edit_titre.innerHTML = 'Edit';
            item_titre.setAttribute('readonly', 'readonly');
            misAJour(id, "titre", item_titre.value);
        }
    });

    // Partie contenu
    const itemTextContenu = document.createElement('li');
    items_content.appendChild(itemTextContenu);
    const item_Contenu = document.createElement('input');
    item_Contenu.type = 'text';
    item_Contenu.classList.add('text');
    item_Contenu.value = cont;
    item_Contenu.setAttribute('readonly', 'readonly');
    itemTextContenu.appendChild(item_Contenu);

    const edit_contenu = document.createElement('button');
    edit_contenu.type = 'button';
    edit_contenu.classList.add('edit');
    edit_contenu.style.backgroundColor = 'green';
    edit_contenu.innerHTML = 'Edit';
    itemTextContenu.appendChild(edit_contenu);

    edit_contenu.addEventListener('click', () => {
        if (edit_contenu.innerHTML.toLowerCase() === 'edit') {
            edit_contenu.innerHTML = 'Save';
            item_Contenu.removeAttribute('readonly');
            item_Contenu.focus();
        } else {
            edit_contenu.innerHTML = 'Edit';
            item_Contenu.setAttribute('readonly', 'readonly');
            misAJour(id, "contenu", item_Contenu.value);
        }
    });

    // Partie auteur
    const itemTextAuteur = document.createElement('li');
    items_content.appendChild(itemTextAuteur);
    const item_Auteur = document.createElement('input');
    item_Auteur.type = 'text';
    item_Auteur.classList.add('text');
    item_Auteur.value = aut;
    item_Auteur.setAttribute('readonly', 'readonly');
    itemTextAuteur.appendChild(item_Auteur);

    const edit_Auteur = document.createElement('button');
    edit_Auteur.type = 'button';
    edit_Auteur.classList.add('edit');
    edit_Auteur.style.backgroundColor = 'green';
    edit_Auteur.innerHTML = 'Edit';
    itemTextAuteur.appendChild(edit_Auteur);

    edit_Auteur.addEventListener('click', () => {
        if (edit_Auteur.innerHTML.toLowerCase() === 'edit') {
            edit_Auteur.innerHTML = 'Save';
            item_Auteur.removeAttribute('readonly');
            item_Auteur.focus();
        } else {
            edit_Auteur.innerHTML = 'Edit';
            item_Auteur.setAttribute('readonly', 'readonly');
            misAJour(id, "auteur", item_Auteur.value);
        }
    });

    // Date de création
    const itemTextDate = document.createElement('li');
    items_content.appendChild(itemTextDate);
    const item_date = document.createElement('input');
    item_date.type = 'text';
    item_date.classList.add('text');
    item_date.value = date;
    item_date.setAttribute('readonly', 'readonly');
    itemTextDate.appendChild(item_date);

    // Bouton supprimer
    const supp = document.createElement('button');
    supp.type = 'button';
    supp.classList.add('supp');
    supp.style.backgroundColor = 'red';
    supp.innerHTML = 'Supprimer';
    itemTextDate.appendChild(supp);

    supp.addEventListener('click', () => {
        items_content.remove();
        supprimerArticle(id);
    });
}
