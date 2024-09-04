# Aide aux secrétariats de petites mairies


## description générales
L'idée de ce site est d'aider les mairies de petites communes sur des taches qui sont répétitive. Comme par exemple les conseils municipaux.


## Partie mairie
Une mairie doit pouvoir s'inscrire, se modifier, se supprimer, voir ses données, elle doit avoir accès à tous les documents comme les convocations, les compte rendu qui la concerne.
Une mairie est composée de
* un id
* Nom de ville
* un code postal
* une adresse
* téléphone
* mail
* texte d'ouverture du secrétariat 
* accepte CGU
* est représentant de la commube



## Partie user
Un user doit soit être un admin et avoir accès à tout, soit un user et avoir accès à la mairie dont il dépend. Il doit pouvoir être inscrit, modifier, se supprimer, voir les infos qui le concerne
Un user est composé de
* un id
* Nom
* Prénom
* email
* téléphone
* mairie
* type (user/admin)
* mode de passe
* type


## Partie conseiller municipaux
Un user peut créer, voir, modifier et supprimer un conseiller municipal.
Un conseiller municipal est composé de
* un id
* id Mairie dont il est élu
* Nom
* Prénom
* adresse
* ville
* code postal
* adresse mail
* téléphone
* rôle (Maire, 1er adjoint, 2 em, conseiller)


## Partie réunion conseil municipal
Un user peut créer, voir, modifier et supprimer une réunion. Une fois la réunion créer, il faut créer les ordre du jour et on peut envoyer la convocation par mail aux conseillers municipaux de la mairie concernés, on peut imprimer la convocation pour affichage. On peut imprimer la feuille de présence, on peut entrer les procurations et les absence.
Une fois la réunion ayant eu lieu, on peut entrer les délibérations, les numéros des délibérations 

* un id
* date de seance
* numéro du conseil (AAAA-00)
* date de convocation
* liste des id d'ordre du jour 
* liste des id des presents
* liste des id des absents
* liste des id des procurations
* date de transmission en préfecture

 ## Partie délibération
 * un id
 * un id de la reunion
 * numéro de la délib (AAAA-00-00) numero du conseil + 00
 * titre
 * texte intro
 * votepour
 * votreContre
 * abstention
 * texte final



