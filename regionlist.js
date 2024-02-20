function getRegionList() {
    const RegionList = [
        { name: "Kanto", gen: 1, jeu: "Pokémon Rouge et Bleu" },
        { name: "Johto", gen: 2, jeu: "Pokémon Or et Argent" },
        { name: "Hoenn", gen: 3, jeu: "Pokémon Rubis et Saphir" },
        { name: "Sinnoh", gen: 4, jeu: "Pokémon Diamant et Perle" },
        { name: "Unys", gen: 5, jeu: "Pokémon Noir et Blanc" },
        { name: "Kalos", gen: 6, jeu: "Pokémon X et Y" },
        { name: "Alola", gen: 7, jeu: "Pokémon Soleil et Lune" },
        { name: "Galar", gen: 8, jeu: "Pokémon Épée et Bouclier" },
    ];

    const regionListDiv = document.getElementById('regionList');
    const ul = document.createElement('ul');

    RegionList.forEach(region => {
        const li = document.createElement('li');
        li.textContent = `${region.name}: ${region.gen} - ${region.jeu}`;
        ul.appendChild(li);
    });

    regionListDiv.appendChild(ul);

    const img = document.createElement('img');
    img.src = 'meanwhile.jpg';
    img.alt = 'Meanwhile...';
    img.style.width = '200px';
    img.style.height = 'auto';
    regionListDiv.insertAdjacentElement('afterend', img);

    img.addEventListener('click', function() {
        window.location.href = 'https://docs.google.com/document/d/1YMLUEa8xheORQFY_rC2BhfGZmlMqJKAYv0UhdJVHdfs/edit?usp=sharing';
    });
}

getRegionList();
