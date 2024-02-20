function getRegionList(){
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
    for (let i = 0; i < RegionList.length; i++) {
        document.write(`<li>${RegionList[i].name} --- Génération : ${RegionList[i].gen} - ${RegionList[i].jeu}</li>`);
    }
    document.write('</ul>');
}
getRegionList();


document.addEventListener("DOMContentLoaded", function() {
    const trigger = document.getElementById('trigger');
    const hidden = document.getElementById('hidden');

    trigger.addEventListener('click', function() {
        hidden.style.display = 'block';
        trigger.style.display = 'none'; // Cacher le mot "secret" après avoir cliqué pour afficher le lien
    });

});

