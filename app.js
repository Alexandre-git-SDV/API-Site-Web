async function request_async_pokemon(number) { // fonction asynchrone pour aller chercher les données du pokemon
  try { 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`); // on attend la réponse du lien vers le pokemon
    const data = await response.json(); // on attend la conversion de la réponse en json
    
    return data; 

  } catch (error) {
    console.error('Erreur lors de la récupération des données du pokemon :', error); // on affiche l'erreur si il y en a une
  }
}

/*fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
.then(response => response.json())
.then (value => pikachu_data = value)
.catch(error => console.log(error));
*/

/* async function request_async_region() { // fonction asynchrone pour aller chercher les données du pokemon pikachu
  try { 
    const response = await fetch('https://pokeapi.co/api/v2/region/'); // on attend la réponse du lien vers les régions
    const data = await response.json(); // on attend la conversion de la réponse en json
    return data; // on retourne les données
  } catch (error) {
    console.error('Erreur lors de la récupération des données de Region :', error); // on affiche l'erreur si il y en a une
  }
} */

async function pokemon_display(number) {
  const pokemon_info = document.getElementById('pokemon-info'); // on récupère l'élément html où on va afficher les données
  // const region_info = document.getElementById('region-info'); // on récupère l'élément html où on va afficher les données
  // const region_data = await request_async_region(); // on attend les données de la région
  const pokemon_data = await request_async_pokemon(number); // on attend les données du pokemon
  const moves = pokemon_data.moves.map(move => move.move.name); // on récupère les noms des mouvements du pokemon
  const types = pokemon_data.types.map(type => type.type.name); // on récupère les types du pokemon
  const stat_name = pokemon_data.stats.map(stat => stat.stat.name); // on récupère les noms des stats du pokemon
  const stat = pokemon_data.stats.map(stat => stat.base_stat); // on récupère les stats du pokemon

  const sprite = `<p1><img src="${pokemon_data.sprites.front_default}"></p1><br>`;
  const basicInfo = `<p2>Nom : ${pokemon_data.name}</p2><br>
                    <p3>Taille : ${pokemon_data.height} dm</p3><br>
                    <p4>Poids : ${pokemon_data.weight} hg</p4><br>
                    <p5>Types : ${types.join(', ')}</p5>`;
  
  const sortmoves = moves.sort();
  const attacks = `<p6>Attaques : ${sortmoves.join(', ')}</p6>`;

  let statsInfo = '<p7>Statistiques :</p7><br>'; 

  // Boucle pour afficher le nom de la stat puis la valeur de la stat
  for (let i = 0; i < stat.length; i++) {
    statsInfo += `<p8>${stat_name[i]} :  ${stat[i]}</p8><br>`;
  }

  const info = `${sprite}${basicInfo}<br><br>${attacks}<br><br>${statsInfo}`; 
  pokemon_info.innerHTML = info; // on affiche les données dans l'élément html
}




function performSearch() {
  // Récupérer la valeur de la barre de recherche
  var searchTerm = document.getElementById('searchInput').value;

  // Simuler une recherche 
  simulateSearch(searchTerm);
}

async function simulateSearch(searchTerm) {
  var final_result = document.getElementById('searchResults');

 
  var result = "Aucun résultat correspondant.";

  // Ajout  d'une condition spécifique pour "pikachu"
  if (searchTerm.toLowerCase().includes("pikachu")) {
      try {
          // Attendre que la promesse soit résolue avant de récupérer les résultats
          await pokemon_display(25);
          result = "Affichage des informations de Pikachu réussi.";
          final_result.style.display = "block";
      } catch (error) {
          console.error('Erreur lors de l\'affichage de Pikachu :', error);
          result = "Erreur lors de l'affichage de Pikachu.";
      }
  }

  // Affichage du résultat dans l'élément approprié (avec innerHTML)
  final_result.innerHTML = result;


}

