async function request_async_pokemon(number) { 
  /* Entrée : number (int) -> le numéro du pokemon (par exemple 1 pour bulbizarre)
     Sortie : data (json) -> les données du pokemon 
     Fonction : Fonction asynchrone qui permet de faire une demande pour récupérer les données du pokemon */
  try { 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`); // on attend la réponse du lien vers le pokemon
    const data = await response.json(); // on attend la conversion de la réponse en json
    
    return data; // On retourne les données

  } catch (error) { // Si il y a une erreur
    console.error('Erreur lors de la récupération des données du pokemon :', error); // on affiche l'erreur dans la console pour l'indiquer à l'utilisateur
  }
}

async function pokemon_display(number) {
  /* Entrée : number (int) -> le numéro du pokemon (par exemple 1 pour bulbizarre)
     Sortie : Affichage des données du pokemon dans l'élément html pokemon-info (chaque information est divisée par une balise <div> comme basicinfo)
     Fonction : Fonction asynchrone qui permet de récupérer les données du pokemon (en appellant la fonction request_async_pokemon) et de les afficher dans l'élément html pokemon-info */
  const pokemon_info = document.getElementById('pokemon-info'); // on récupère l'élément html où on va afficher les données
  const pokemon_data = await request_async_pokemon(number); // on attend les données du pokemon (avec l'appelle de la fonction asynchrone request_async_pokemon)
  const types = pokemon_data.types.map(type => type.type.name); // on récupère les types du pokemon
  const stat_name = pokemon_data.stats.map(stat => stat.stat.name); // on récupère les noms des stats du pokemon
  const stat = pokemon_data.stats.map(stat => stat.base_stat); // on récupère les stats du pokemon

  const sprite = `<div class="sprite-container"><img src="${pokemon_data.sprites.front_default}" class="pokemon-sprite"></div>`; // On affiche le sprite du pokemon dans une div pokemon-sprite
  const basicInfo = `<div class="basicinfo"> Nom : ${pokemon_data.name}</div><br> 
                     <div class="basicinfo"> Taille : ${pokemon_data.height} dm</div><br>
                     <div class="basicinfo"> Poids : ${pokemon_data.weight} hg</div><br>
                     <div class="basicinfo"> Types : ${types.join(', ')}</div>`; // On affiche les données basiques du pokemon dans une div basicinfo (nom, taille, poids, types)
  

  let statsInfo = '<div class="stats-container">Statistiques :</div><br>'; // On affiche les stats du pokemon dans une div stats-container (pour l'instant uniquement le texte "Statistiques :")

  // Boucle pour afficher le nom de la stat puis la valeur de la stat
  for (let i = 0; i < stat.length; i++) { // Pour i allant de 0 à la longueur de stat (avec une incrémentation de 1)
    statsInfo += `<div class="stats-container">${stat_name[i]} :  ${stat[i]}</div><br>`; // On ajoute le nom de la stat et la valeur de la stat dans la div stats-container
  }

  const info = `${sprite}${basicInfo}<br><br>${statsInfo}`; // On regroupe les données dans une div info (sprite, basicinfo, statsInfo)
  pokemon_info.innerHTML = info; // on affiche les données dans l'élément html
}




function performSearch() {
  /* Entrée : Aucune
     Sortie : Affichage des informations du pokemon recherché dans l'élément html pokemon-info
     Fonction : Fonction qui permet de récupérer la valeur de la barre de recherche, de simuler une recherche et d'afficher les informations du pokemon recherché dans l'élément html pokemon-info */

  // Récupérer la valeur de la barre de recherche
  var searchTerm = document.getElementById('searchInput').value;

  // Simuler une recherche (appel de la fonction simulateSearch avec searchTerm en paramètre)
  simulateSearch(searchTerm);
}

async function simulateSearch(searchTerm) {
  /* Entrée : searchTerm (string) -> le nom du pokemon recherché
     Sortie : Affichage des informations du pokemon recherché dans l'élément html pokemon-info
     Fonction : Fonction qui permet de simuler une recherche en parcourant une liste de pokemon et en affichant les informations du pokemon recherché dans l'élément html pokemon-info */

  // Récupérer l'élément où on va afficher le résultat (ici searchResults)
  var final_result = document.getElementById('searchResults');
  // Récupérer l'élément où on va afficher les informations du pokemon (ici pokemon-info)
  const pokemon_info = document.getElementById('pokemon-info');
  // On vide l'élément pokemon-info (pour bien réinitialiser l'affichage à chaque recherche)
  pokemon_info.innerHTML = "";

  // Par défaut, on affiche "Aucun résultat correspondant." (le résultat restera celui là uniquement si aucun pokemon correspondant n'est trouvé dans la liste de pokemon)
  var result = "Aucun résultat correspondant.";

  // On initialise la liste des pokemons (de 1 à 151)
  const PokemonList = [
    { number: 1, name1: 'bulbizarre' , name2: 'Bulbizarre', name3: 'BULBIZARRE'}, // number : numéro du pokemon, name1 : nom du pokemon en minuscule, name2 : nom du pokemon avec la première lettre en majuscule, name3 : nom du pokemon en majuscule
    { number: 2, name1: 'Herbizarre', name2: 'herbizarre', name3: 'HERBIZARRE'},
    { number: 3, name1: 'Florizarre', name2: 'florizarre', name3: 'FLORIZARRE'},
    { number: 4, name1: 'Salamèche', name2: 'salamèche', name3: 'SALAMÈCHE'},
    { number: 5, name1: 'Reptincel', name2: 'reptincel', name3: 'REPTINCEL'},
    { number: 6, name1: 'Dracaufeu', name2: 'dracaufeu', name3: 'DRACAUFEU'},
    { number: 7, name1: 'Carapuce', name2: 'carapuce', name3: 'CARAPUCE'},
    { number: 8, name1: 'Carabaffe', name2: 'carabaffe', name3: 'CARABAFFE'},
    { number: 9, name1: 'Tortank', name2: 'tortank', name3: 'TORTANK'},
    { number: 10, name1: 'Chenipan', name2: 'chenipan', name3: 'CHENIPAN'},
    { number: 11, name1: 'Chrysacier', name2: 'chrysacier', name3: 'CHRYSACIER'},
    { number: 12, name1: 'Papilusion', name2: 'papilusion', name3: 'PAPILUSION'},
    { number: 13, name1: 'Aspicot', name2: 'aspicot', name3: 'ASPICOT'},
    { number: 14, name1: 'Coconfort', name2: 'coconfort', name3: 'COCONFORT'},
    { number: 15, name1: 'Dardargnan', name2: 'dardargnan', name3: 'DARDARGNAN'},
    { number: 16, name1: 'Roucool', name2: 'roucool', name3: 'ROUCOOL'},
    { number: 17, name1: 'Roucoups', name2: 'roucoups', name3: 'ROUCOUPS'},
    { number: 18, name1: 'Roucarnage', name2: 'roucarnage', name3: 'ROUCARNAGE'},
    { number: 19, name1: 'Rattata', name2: 'rattata', name3: 'RATTATA'},
    { number: 20, name1: 'Rattatac', name2: 'rattatac', name3: 'RATTATAC'},
    { number: 21, name1: 'Piafabec', name2: 'piafabec', name3: 'PIAFABEC'},
    { number: 22, name1: 'Rapasdepic', name2: 'rapasdepic', name3: 'RAPASDEPIC'},
    { number: 23, name1: 'Abo', name2: 'abo', name3: 'ABO'},
    { number: 24, name1: 'Arbok', name2: 'arbok', name3: 'ARBOK'},
    { number: 25, name1: 'Pikachu', name2: 'pikachu', name3: 'PIKACHU'},
    { number: 26, name1: 'Raichu', name2: 'raichu', name3: 'RAICHU'},
    { number: 27, name1: 'Sabelette', name2: 'sabelette', name3: 'SABELETTE'},
    { number: 28, name1: 'Sablaireau', name2: 'sablaireau', name3: 'SABLAIREAU'},
    { number: 29, name1: 'Nidoran♀', name2: 'nidoran♀', name3: 'NIDORAN♀'},
    { number: 30, name1: 'Nidorina', name2: 'nidorina', name3: 'NIDORINA'},
    { number: 31, name1: 'Nidoqueen', name2: 'nidoqueen', name3: 'NIDOQUEEN'},
    { number: 32, name1: 'Nidoran♂', name2: 'nidoran♂', name3: 'NIDORAN♂'},
    { number: 33, name1: 'Nidorino', name2: 'nidorino', name3: 'NIDORINO'},
    { number: 34, name1: 'Nidoking', name2: 'nidoking', name3: 'NIDOKING'},
    { number: 35, name1: 'Mélofée', name2: 'mélofée', name3: 'MÉLOFÉE'},
    { number: 36, name1: 'Mélodelfe', name2: 'mélodelfe', name3: 'MÉLODELFÉE'},
    { number: 37, name1: 'Goupix', name2: 'goupix', name3: 'GOUPIX'},
    { number: 38, name1: 'Feunard', name2: 'feunard', name3: 'FEUNARD'},
    { number: 39, name1: 'Rondoudou', name2: 'rondoudou', name3: 'RONDOUDOU'},
    { number: 40, name1: 'Grodoudou', name2: 'grodoudou', name3: 'GRODOUDOU'},
    { number: 41, name1: 'Nosferapti', name2: 'nosferapti', name3: 'NOSFERAPTI'},
    { number: 42, name1: 'Nosferalto', name2: 'nosferalto', name3: 'NOSFERALTO'},
    { number: 43, name1: 'Mystherbe', name2: 'mystherbe', name3: 'MYSTHERBE'},
    { number: 44, name1: 'Ortide', name2: 'ortide', name3: 'ORTIDE'},
    { number: 45, name1: 'Rafflesia', name2: 'rafflesia', name3: 'RAFFLESIA'},
    { number: 46, name1: 'Paras', name2: 'paras', name3: 'PARAS'},
    { number: 47, name1: 'Parasect', name2: 'parasect', name3: 'PARASECT'},
    { number: 48, name1: 'Mimitoss', name2: 'mimitoss', name3: 'MIMITOSS'},
    { number: 49, name1: 'Aéromite', name2: 'aéromite', name3: 'AÉROMITE'},
    { number: 50, name1: 'Taupiqueur', name2: 'taupiqueur', name3: 'TAUPIQUEUR'},
    { number: 51, name1: 'Triopikeur', name2: 'triopikeur', name3: 'TRIOPIKEUR'},
    { number: 52, name1: 'Miaouss', name2: 'miaouss', name3: 'MIAOUSS'},
    { number: 53, name1: 'Persian', name2: 'persian', name3: 'PERSIAN'},
    { number: 54, name1: 'Psykokwak', name2: 'psykokwak', name3: 'PSYKOKWAK'},
    { number: 55, name1: 'Akwakwak', name2: 'akwakwak', name3: 'AKWAKWAK'},
    { number: 56, name1: 'Férosinge', name2: 'férosinge', name3: 'FÉROSINGE'},
    { number: 57, name1: 'Colossinge', name2: 'colossinge', name3: 'COLOSSINGE'},
    { number: 58, name1: 'Caninos', name2: 'caninos', name3: 'CANINOS'},
    { number: 59, name1: 'Arcanin', name2: 'arcanin', name3: 'ARCANIN'},
    { number: 60, name1: 'Ptitard', name2: 'ptitard', name3: 'PTITARD'},
    { number: 61, name1: 'Têtarte', name2: 'têtarte', name3: 'TÊTARTE'},
    { number: 62, name1: 'Tartard', name2: 'tartard', name3: 'TARTARD'},
    { number: 63, name1: 'Abra', name2: 'abra', name3: 'ABRA'},
    { number: 64, name1: 'Kadabra', name2: 'kadabra', name3: 'KADABRA'},
    { number: 65, name1: 'Alakazam', name2: 'alakazam', name3: 'ALAKAZAM'},
    { number: 66, name1: 'Machoc', name2: 'machoc', name3: 'MACHOC'},
    { number: 67, name1: 'Machopeur', name2: 'machopeur', name3: 'MACHOPEUR'},
    { number: 68, name1: 'Mackogneur', name2: 'mackogneur', name3: 'MACKOGNEUR'},
    { number: 69, name1: 'Chétiflor', name2: 'chétiflor', name3: 'CHÉTIFLOR'},
    { number: 70, name1: 'Boustiflor', name2: 'boustiflor', name3: 'BOUSTIFLOR'},
    { number: 71, name1: 'Empiflor', name2: 'empiflor', name3: 'EMPIFLOR'},
    { number: 72, name1: 'Tentacool', name2: 'tentacool', name3: 'TENTACOOL'},
    { number: 73, name1: 'Tentacruel', name2: 'tentacruel', name3: 'TENTACRUEL'},
    { number: 74, name1: 'Racaillou', name2: 'racaillou', name3: 'RACAILLOU'},
    { number: 75, name1: 'Gravalanch', name2: 'gravalanch', name3: 'GRAVALANCH'},
    { number: 76, name1: 'Grolem', name2: 'grolem', name3: 'GROLEM'},
    { number: 77, name1: 'Ponyta', name2: 'ponyta', name3: 'PONYTA'},
    { number: 78, name1: 'Galopa', name2: 'galopa', name3: 'GALOPA'},
    { number: 79, name1: 'Ramoloss', name2: 'ramoloss', name3: 'RAMOLOSS'},
    { number: 80, name1: 'Flagadoss', name2: 'flagadoss', name3: 'FLAGADOSS'},
    { number: 81, name1: 'Magnéti', name2: 'magnéti', name3: 'MAGNÉTI'},
    { number: 82, name1: 'Magnéton', name2: 'magnéton', name3: 'MAGNÉTON'},
    { number: 83, name1: 'Canarticho', name2: 'canarticho', name3: 'CANARTICHO'},
    { number: 84, name1: 'Doduo', name2: 'doduo', name3: 'DODUO'},
    { number: 85, name1: 'Dodrio', name2: 'dodrio', name3: 'DODRIO'},
    { number: 86, name1: 'Otaria', name2: 'otaria', name3: 'OTARIA'},
    { number: 87, name1: 'Lamantine', name2: 'lamantine', name3: 'LAMANTINE'},
    { number: 88, name1: 'Tadmorv', name2: 'tadmorv', name3: 'TADMORV'},
    { number: 89, name1: 'Grotadmorv', name2: 'grotadmorv', name3: 'GROTADMORV'},
    { number: 90, name1: 'Kokiyas', name2: 'kokiyas', name3: 'KOKIYAS'},
    { number: 91, name1: 'Crustabri', name2: 'crustabri', name3: 'CRUSTABRI'},
    { number: 92, name1: 'Fantominus', name2: 'fantominus', name3: 'FANTOMINUS'},
    { number: 93, name1: 'Spectrum', name2: 'spectrum', name3: 'SPECTRUM'},
    { number: 94, name1: 'Ectoplasma', name2: 'ectoplasma', name3: 'ECTOPLASMA'},
    { number: 95, name1: 'Onix', name2: 'onix', name3: 'ONIX'},
    { number: 96, name1: 'Soporifik', name2: 'soporifik', name3: 'SOPORIFIK'},
    { number: 97, name1: 'Hypnomade', name2: 'hypnomade', name3: 'HYPNOMADE'},
    { number: 98, name1: 'Krabby', name2: 'krabby', name3: 'KRABBY'},
    { number: 99, name1: 'Krabboss', name2: 'krabboss', name3: 'KRABBOSS'},
    { number: 100, name1: 'Voltorbe', name2: 'voltorbe', name3: 'VOLTORBE'},
    { number: 101, name1: 'Électrode', name2: 'électrode', name3: 'ÉLECTRODE'},
    { number: 102, name1: 'Noeunoeuf', name2: 'noeunoeuf', name3: 'NOEUNOEUF'},
    { number: 103, name1: 'Noadkoko', name2: 'noadkoko', name3: 'NOADKOKO'},
    { number: 104, name1: 'Osselait', name2: 'osselait', name3: 'OSSELAIT'},
    { number: 105, name1: 'Ossatueur', name2: 'ossatueur', name3: 'OSSATUEUR'},
    { number: 106, name1: 'Kicklee', name2: 'kicklee', name3: 'KICKLEE'},
    { number: 107, name1: 'Tygnon', name2: 'tygnon', name3: 'TYGNON'},
    { number: 108, name1: 'Excelangue', name2: 'excelangue', name3: 'EXCELANGUE'},
    { number: 109, name1: 'Smogo', name2: 'smogo', name3: 'SMOGO'},
    { number: 110, name1: 'Smogogo', name2: 'smogogo', name3: 'SMOGOGO'},
    { number: 111, name1: 'Rhinocorne', name2: 'rhinocorne', name3: 'RHINOCORNE'},
    { number: 112, name1: 'Rhinoféros', name2: 'rhinoféros', name3: 'RHINOFÉROS'},
    { number: 113, name1: 'Leveinard', name2: 'leveinard', name3: 'LEVEINARD'},
    { number: 114, name1: 'Saquedeneu', name2: 'saquedeneu', name3: 'SAQUEDENEU'},
    { number: 115, name1: 'Kangourex', name2: 'kangourex', name3: 'KANGOUREX'},
    { number: 116, name1: 'Hypotrempe', name2: 'hypotrempe', name3: 'HYPOTREMPE'},
    { number: 117, name1: 'Hypocéan', name2: 'hypocéan', name3: 'HYPOCÉAN'},
    { number: 118, name1: 'Poissirène', name2: 'poissirène', name3: 'POISSIRÈNE'},
    { number: 119, name1: 'Poissoroy', name2: 'poissoroy', name3: 'POISSOROY'},
    { number: 120, name1: 'Stari', name2: 'stari', name3: 'STARI'},
    { number: 121, name1: 'Staross', name2: 'staross', name3: 'STAROSS'},
    { number: 122, name1: 'M. Mime', name2: 'm. mime', name3: 'M. MIME'},
    { number: 123, name1: 'Insécateur', name2: 'insécateur', name3: 'INSÉCATEUR'},
    { number: 124, name1: 'Lippoutou', name2: 'lippoutou', name3: 'LIPPOUTOU'},
    { number: 125, name1: 'Élektek', name2: 'élektek', name3: 'ÉLEKTEK'},
    { number: 126, name1: 'Magmar', name2: 'magmar', name3: 'MAGMAR'},
    { number: 127, name1: 'Scarabrute', name2: 'scarabrute', name3: 'SCARABRUTE'},
    { number: 128, name1: 'Tauros', name2: 'tauros', name3: 'TAUROS'},
    { number: 129, name1: 'Magicarpe', name2: 'magicarpe', name3: 'MAGICARPE'},
    { number: 130, name1: 'Léviator', name2: 'léviator', name3: 'LÉVIATOR'},
    { number: 131, name1: 'Lokhlass', name2: 'lokhlass', name3: 'LOKHLASS'},
    { number: 132, name1: 'Métamorph', name2: 'métamorph', name3: 'MÉTAMORPH'},
    { number: 133, name1: 'Évoli', name2: 'évoli', name3: 'ÉVOLI'},
    { number: 134, name1: 'Aquali', name2: 'aquali', name3: 'AQUALI'},
    { number: 135, name1: 'Voltali', name2: 'voltali', name3: 'VOLTALI'},
    { number: 136, name1: 'Pyroli', name2: 'pyroli', name3: 'PYROLI'},
    { number: 137, name1: 'Porygon', name2: 'porygon', name3: 'PORYGON'},
    { number: 138, name1: 'Amonita', name2: 'amonita', name3: 'AMONITA'},
    { number: 139, name1: 'Amonistar', name2: 'amonistar', name3: 'AMONISTAR'},
    { number: 140, name1: 'Kabuto', name2: 'kabuto', name3: 'KABUTO'},
    { number: 141, name1: 'Kabutops', name2: 'kabutops', name3: 'KABUTOPS'},
    { number: 142, name1: 'Ptéra', name2: 'ptéra', name3: 'PTÉRA'},
    { number: 143, name1: 'Ronflex', name2: 'ronflex', name3: 'RONFLEX'},
    { number: 144, name1: 'Artikodin', name2: 'artikodin', name3: 'ARTIKODIN'},
    { number: 145, name1: 'Électhor', name2: 'électhor', name3: 'ÉLECTHOR'},
    { number: 146, name1: 'Sulfura', name2: 'sulfura', name3: 'SULFURA'},
    { number: 147, name1: 'Minidraco', name2: 'minidraco', name3: 'MINIDRACO'},
    { number: 148, name1: 'Draco', name2: 'draco', name3: 'DRACO'},
    { number: 149, name1: 'Dracolosse', name2: 'dracolosse', name3: 'DRACOLOSSE'},
    { number: 150, name1: 'Mewtwo', name2: 'mewtwo', name3: 'MEWTWO'},
    { number: 151, name1: 'Mew', name2: 'mew', name3: 'MEW'},
  ];
  // Parcours de chaque pokemon dans pokemonList
  for (let i = 0; i < PokemonList.length; i++) { // De i allant de 0 à la longueur de PokemonList (avec une incrémentation de 1)
    // Si le nom du pokemon est égal à la recherche (en majuscule première lettre et le reste en minuscule : name1 ; tout en minuscule : name2, tout en majuscule : name3)
    if ((searchTerm.toLowerCase() === PokemonList[i].name1.toLowerCase()) || (searchTerm.toLowerCase() === PokemonList[i].name2.toLowerCase()) || (searchTerm.toLowerCase() === PokemonList[i].name3.toLowerCase())){
      try {
        // Attendre que la promesse soit résolue avant de récupérer les résultats (appel de pokemon_display avec le numéro du pokemon correspondant à la recherche)
        await pokemon_display(PokemonList[i].number);
        result = "Affichage des informations de "+ PokemonList[i].name1 + " réussi."; // Message de succès pour prévenir l'utilisateur
        final_result.style.display = "block"; // On affiche le résultat (en block pour que le message soit bien visible)
      } catch (error) { // Si il y a une erreur
        console.error('Erreur lors de l\'affichage des informations de : '+ PokemonList[i].name1 + error); // On prévient l'utilisateur en affichant l'erreur dans la console
        result = "Erreur lors de l'affichage des informations."; // On change le résultat pour bien différencier un message prévenant l'utilisateur d'une erreur à un message le prévenant d'une absence de résultat
      }
    }
  }
  // Petit bonus trop lol  :D 
  if ((searchTerm.toLowerCase() === "Carapute" || searchTerm.toLowerCase() === "carapute" || searchTerm.toLowerCase() === "CARAPUTE")){ // Même message de test que précédemment mais pour un "pokemon spécifique" 
    const pokemon_info = document.getElementById('pokemon-info'); // Récupérer l'élément où on va afficher les informations du pokemon
    pokemon_info.innerHTML = `<img id="youtubeImage2" src="what.jpg" alt="THE ROCK">`; // Afficher une image spécifique dans l'élément pokemon-info (petite surprise)

    // Sélectionner l'image spécifique par son ID (ici youtubeImage2)
    const youtubeImage2 = document.getElementById('youtubeImage2');

    // Ajouter un gestionnaire d'événements clic à cette image spécifique
    youtubeImage2.addEventListener('click', () => { // Si on clique sur l'image
        // Rediriger l'utilisateur vers le lien YouTube
        window.location.href = 'https://www.youtube.com/watch?v=EltoaN4U4Oc';
    });
  }
  if ((searchTerm.toLowerCase() === "Rickrolled" || searchTerm.toLowerCase() === "rickrolled" || searchTerm.toLowerCase() === "RICKROLLED")) { // Même message de test que précédemment mais pour un "pokemon spécifique"
    const pokemon_info = document.getElementById('pokemon-info'); // Récupérer l'élément où on va afficher les informations du pokemon
    pokemon_info.innerHTML = `<img id="youtubeImage" src="lol.jpg" alt="NEVER GONNA GIVE YOU UP">`; // Afficher une image spécifique dans l'élément pokemon-info (petite surprise)

    // Sélectionner l'image spécifique par son ID (ici youtubeImage)
    const youtubeImage = document.getElementById('youtubeImage');

    // Ajouter un gestionnaire d'événements clic à cette image spécifique
    youtubeImage.addEventListener('click', () => { // Si on clique sur l'image
        // Rediriger l'utilisateur vers le lien YouTube
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    });
}

// Affichage du résultat dans l'élément approprié (avec innerHTML, valable pour les 151 premiers pokemons + les 2 bonus trop quoicou lol)
final_result.innerHTML = result;



}


// Si tu es arrivé jusqu'ici, bravo ! En petit bonus voici un poème pour toi :

/* 
This is the water
And this is the well.
Drink full and descend.
The horse is the white of the eyes and dark within 
*/ 

// Si tu as la référence bravooooo :D Tu as vraiment les cramptés dans ce cas là :D 

// Un autre easter egg est disponible dans un autre fichier .js sauras tu le trouver ? 
