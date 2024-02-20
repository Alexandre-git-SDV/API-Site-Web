async function request_async_region(number) { 
  /* Entrée : number(int) -> le numéro de la région (par exemple 1 pour Kanto)
     Sortie : data(json) -> les données de la région
     Fonction : Fonction asynchrone qui permet de faire une demande pour récupérer les données de la région */
    try { 
      const response = await fetch(`https://pokeapi.co/api/v2/region/${number}`); // on attend la réponse du lien vers les régions
      const data = await response.json(); // on attend la conversion de la réponse en json

      return data; // on retourne les données

    } catch (error) { // si il y a une erreur
      console.error('Erreur lors de la récupération des données de Region :', error); // on affiche l'erreur dans la console pour l'indiquer à l'utilisateur
    }
} 
  
async function region_display(number) {
    /* Entrée : number(int) -> le numéro de la région (par exemple 1 pour Kanto)
       Sortie : affichage des données de la région dans l='élément html region-info (chaque information est divisée par une balise <div> comme basicinfo)
       Fonction : Fonction asynchrone qui permet de récupérer les données de la région (en appellant la fonction request_async_region) et d'afficher les données dans l'élément html region-info */
    const region_info = document.getElementById('region-info'); // on récupère l'élément html où on va afficher les données
    const region_data = await request_async_region(number); // on attend les données de la région
    const locations = region_data.locations.map(location => location.name);// on récupère les noms des lieux de la région
    const version_groups = region_data.version_groups.map(VersionGroup => VersionGroup.name); // on récupère les noms des différentes jeux dans lesquels on peut visiter la région
    
    const basicInfo = `<br><div class="basicinfo">Nom : ${region_data.name}</div>
                       <div class="basicinfo">Génération d'apparition : ${region_data.main_generation.name}</div>`; // On affiche le nom de la région et la génération d'apparition
    
    const sortlocations = locations.sort(); // On tri les lieux par ordre alphabétique
    const location = `<div class="location-container">Liste d'endroits marquants : <br> ${sortlocations.join(', ')}</div>`; // on affiche les lieux dans l'élément html
    const version = `<div class="version-container">Liste des jeux dans lesquels il est possible de visiter cette région : ${version_groups.join(', ')}</div>`; // on affiche les jeux dans l'élément html
  
    const info = `${basicInfo}<br><br>${location}<br><br>${version}`; // on regroupe les données dans une div info 
    region_info.innerHTML = info; // on affiche les données dans l'élément html
  }
  
  
  
  
  function performSearch() {
    /* Entrée : aucune
       Sortie : affichage des informations de la région recherchée dans l'élément html region-info
        Fonction : Fonction qui permet de récupérer la valeur de la barre de recherche, de simuler une recherche et d'afficher les informations de la région recherchée dans l'élément html region-info */
    // Récupérer la valeur de la barre de recherche
    var searchTerm = document.getElementById('searchInput').value;
  
    // Simuler une recherche (appel de la fonction simulateSearch avec searchTerm en paramètre)
    simulateSearch(searchTerm);
  }
  
  async function simulateSearch(searchTerm) {
    /* Entrée : searchTerm (string) -> le nom de la région recherchée
       Sortie : Affichage des informations de la région recherchée dans l'élément html region-info
       Fonction : Fonction qui permet de simuler une recherche en parcourant une liste de régions et en affichant les informations de la région recherchée dans l'élément html region-info */
    
    // Récupérer l'élément où on va afficher le résultat (ici searchResults)
    var final_result = document.getElementById('searchResults');
  
    // Récupérer l'élément où on va afficher les informations de la région (ici region-info)
    const region_info = document.getElementById('region-info');
    // On vide l'élément region-info (pour bien réinitialiser l'affichage à chaque recherche)
    region_info.innerHTML = "";

    // Par défaut, on affiche "Aucun résultat correspondant." (le résultat restera celui là uniquement si aucune région correspondante n'est trouvée dans la liste des régions)
    var result = "Aucun résultat correspondant.";

    // On initialise la liste des régions (de 1 à 8, pour les 8 régions principales de Pokémon et celle présente dans l'API)
    const RegionList = [
        { number: 1, name1: "Kanto", name2: "kanto", name3: "KANTO" }, // number : numéro de la région ; name1 : nom de la région (première lettre en majuscule et le reste en minuscule) ; name2 : nom de la région en minuscule ; name3 : nom de la région en majuscule 
        { number: 2, name1: "Johto", name2: "johto", name3: "JOHTO" },
        { number: 3, name1: "Hoenn", name2: "hoenn", name3: "HOENN" },
        { number: 4, name1: "Sinnoh", name2: "sinnoh", name3: "SINNOH" },
        { number: 5, name1: "Unys", name2: "unys", name3: "UNYS" },
        { number: 6, name1: "Kalos", name2: "kalos", name3: "KALOS" },
        { number: 7, name1: "Alola", name2: "alola", name3: "ALOLA" },
        { number: 8, name1: "Galar", name2: "galar", name3: "GALAR" },
    ];
    
    
    // Parcours de chaque region dans RegionList
    for (let i = 0; i < RegionList.length; i++) { // Pour i allant de 0 à la taille de RegionList, avec incrément de 1
      // Si le nom de la région est égal à la recherche (en majuscule première lettre et le reste en minuscule : name1 ; tout en minuscule : name2, tout en majuscule : name3)
      if ((searchTerm.toLowerCase() === RegionList[i].name1.toLowerCase()) || (searchTerm.toLowerCase() === RegionList[i].name2.toLowerCase()) || (searchTerm.toLowerCase() === RegionList[i].name3.toLowerCase())){
        try {
          // Attendre que la promesse soit résolue avant de récupérer les résultats (appel de region_display avec le numéro de la région correspondante à la recherche)
          await region_display(RegionList[i].number); 
          result = "Affichage des informations de "+ RegionList[i].name1 + " réussi."; // Message de succès pour prévenir l'utilisateur
          final_result.style.display = "block"; // On affiche le résultat (en block pour que le message soit bien visible)
        } catch (error) { // Si il y a une erreur
          console.error('Erreur lors de l\'affichage des informations de : '+ RegionList[i].name1 + error); // On prévient l'utilisateur en affichant l'erreur dans la console
          result = "Erreur lors de l'affichage des informations."; // On change le résultat pour bien différencier un message prévenant l'utilisateur d'une erreur à un message le prévenant d'une absence de résultat
        }
      }
    }
    if ((searchTerm.toLowerCase() === "Woodsman" || searchTerm.toLowerCase() === "woodsman" || searchTerm.toLowerCase() === "WOODSMAN")) { // Même message de test que précédemment mais pour autre chose 
      const pokemon_info = document.getElementById('region-info'); // Récupérer l'élément où on va afficher les informations du pokemon
      pokemon_info.innerHTML = `<img id="youtubeImage" src="woods.jpg" alt="WOODSMAN">`; // Afficher une image spécifique dans l'élément pokemon-info (petite surprise)
  
      // Sélectionner l'image spécifique par son ID (ici youtubeImage3)
      const youtubeImage = document.getElementById('youtubeImage');
  
      // Ajouter un gestionnaire d'événements clic à cette image spécifique
      youtubeImage.addEventListener('click', () => { // Si on clique sur l'image
          // Rediriger l'utilisateur vers le lien YouTube
          window.location.href = 'https://docs.google.com/document/d/1ZZvMIHczxUnVhI_yS7DdDKRiWVDKdXd1JarZVfiO2IA/edit?usp=sharing';
      });
  }
    // Affichage du résultat dans l'élément approprié (avec innerHTML, valable pour les 8 régions )
    final_result.innerHTML = result;
  
  
  }

// Si tu es arrivé jusqu'ici (encore une fois) , bravo ! En petit bonus voici un (autre) poème pour toi : 

/* 
Through the darkness of future past,
The magician longs to see.
One chants out between two worlds,
Fire walk with me.
*/ 

// Si tu as la référence, alors bravooooo :D Tu as doublement les cramptés dans ce cas là :D 

// Si tu ne l'as toujours pas alors je te laisse chercher sur internet, il n'y a pas que Pokemon dans la vie tu sais :D 