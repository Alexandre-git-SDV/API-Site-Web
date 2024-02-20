function getRegionList(){
    /* Entrée : aucune 
       Sortie : une liste de régions de jeux Pokémon
       Fonction : affiche une liste de régions de jeux Pokémon avec leur génération et le nom du jeu associé
    */
    const RegionList = [
        { name: "Kanto", gen : 1, jeu: "Pokémon Rouge et Bleu" },
        { name: "Johto", gen : 2, jeu: "Pokémon Or et Argent" },
        { name: "Hoenn", gen : 3, jeu: "Pokémon Rubis et Saphir" },
        { name: "Sinnoh", gen : 4, jeu: "Pokémon Diamant et Perle" },
        { name: "Unys", gen : 5, jeu: "Pokémon Noir et Blanc" },
        { name: "Kalos", gen : 6, jeu: "Pokémon X et Y" },
        { name: "Alola", gen : 7, jeu: "Pokémon Soleil et Lune" },
        { name: "Galar", gen : 8, jeu: "Pokémon Épée et Bouclier" },
];
    for (let i = 0; i < RegionList.length; i++) { // pour i allant de 0 à la longueur de la liste de régions
        document.write(`<li>${RegionList[i].name} --- Génération : ${RegionList[i].gen} - ${RegionList[i].jeu}</li>`); // affiche le nom de la région, sa génération et le nom du jeu associé
    }
    document.write('</ul>'); // Fermer la liste
}
getRegionList(); // Appel de la fonction pour afficher la liste des régions de jeux Pokémon


document.addEventListener("DOMContentLoaded", function() { // Attendre que le DOM soit chargé
    /* Entrée : aucune 
       Sortie : aucune
       Fonction : affiche un lien caché après avoir cliqué sur le mot "secret" (bonus trop lol)
    */
    const trigger = document.getElementById('trigger'); // Récupérer l'élément avec l'id "trigger"
    const hidden = document.getElementById('hidden'); // Récupérer l'élément avec l'id "hidden"

    trigger.addEventListener('click', function() { // Ajouter un écouteur d'événement pour le clic
        hidden.style.display = 'block'; // Afficher le lien caché
        trigger.style.display = 'none'; // Cacher le mot "secret" après avoir cliqué pour afficher le lien
    });

});

