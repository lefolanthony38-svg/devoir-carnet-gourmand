// ==========================================================================
// Gestion des commentaires (ajout / suppression) sans rechargement de page
// ==========================================================================

// Sélection des éléments du DOM
const formulaire = document.querySelector("#form-commentaire");
const champNom = document.querySelector("#nom");
const champCommentaire = document.querySelector("#commentaire");
const zoneErreur = document.querySelector("#message-erreur");
const listeCommentaires = document.querySelector("#liste-commentaires");

// Longueurs minimales imposées
const LONGUEUR_MIN_NOM = 2;
const LONGUEUR_MIN_COMMENTAIRE = 10;

// Gestion de la soumission du formulaire
formulaire.addEventListener("submit", function (evenement) {
  evenement.preventDefault();

  const nom = champNom.value.trim();
  const commentaire = champCommentaire.value.trim();

  const erreur = validerFormulaire(nom, commentaire);

  if (erreur) {
    afficherErreur(erreur);
    return;
  }

  masquerErreur();
  ajouterCommentaire(nom, commentaire);
  formulaire.reset();
});

// Vérifie les règles de validation et renvoie un message d'erreur (ou null si valide)
function validerFormulaire(nom, commentaire) {
  if (nom.length < LONGUEUR_MIN_NOM) {
    return "Le nom doit contenir au moins 2 caractères.";
  }

  if (commentaire.length < LONGUEUR_MIN_COMMENTAIRE) {
    return "Le commentaire doit contenir au moins 10 caractères.";
  }

  return null;
}

// Affiche le message d'erreur sous le formulaire
function afficherErreur(message) {
  zoneErreur.textContent = message;
  zoneErreur.hidden = false;
}

// Masque le message d'erreur
function masquerErreur() {
  zoneErreur.textContent = "";
  zoneErreur.hidden = true;
}

// Construit et ajoute un commentaire dans la liste
function ajouterCommentaire(nom, texte) {
  const commentaireItem = document.createElement("li");
  commentaireItem.classList.add("commentaire");

  const auteur = document.createElement("p");
  auteur.classList.add("commentaire__auteur");
  auteur.textContent = nom;

  const contenu = document.createElement("p");
  contenu.classList.add("commentaire__texte");
  contenu.textContent = texte;

  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.classList.add("btn-supprimer");
  boutonSupprimer.type = "button";
  boutonSupprimer.textContent = "🗑️ Supprimer";

  boutonSupprimer.addEventListener("click", function () {
    commentaireItem.remove();
  });

  commentaireItem.appendChild(auteur);
  commentaireItem.appendChild(contenu);
  commentaireItem.appendChild(boutonSupprimer);

  listeCommentaires.prepend(commentaireItem);
}
