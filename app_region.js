async function request_async_region(number) { // fonction asynchrone pour aller chercher les données de la région
    try { 
      const response = await fetch(`https://pokeapi.co/api/v2/region/${number}`); // on attend la réponse du lien vers les régions
      const data = await response.json(); // on attend la conversion de la réponse en json
      return data; // on retourne les données
    } catch (error) {
      console.error('Erreur lors de la récupération des données de Region :', error); // on affiche l'erreur si il y en a une
    }
} 
  
async function region_display(number) {
    const region_info = document.getElementById('region-info'); // on récupère l'élément html où on va afficher les données
    const region_data = await request_async_region(number); // on attend les données de la région
    const locations = region_data.locations.map(location => location.name);// on récupère les noms des lieux de la région
    const version_groups = region_data.version_groups.map(VersionGroup => VersionGroup.name); // on récupère les noms des différentes jeux dns lesquels on peut visiter la région
    
    const basicInfo = `<p1>Nom : ${region_data.name}</p1><br>
                       <p2>Génération d'apparition : ${region_data.main_generation.name}</p2><br>`; // On affiche le nom de la région et la génération d'apparition
    
    const sortlocations = locations.sort(); // On tri les lieux par ordre alphabétique
    const location = `<p3>Liste d'endroits marquants : <br> ${sortlocations.join(', ')}</p3>`; // on affiche les lieux dans l'élément html
    const version = `<p4>Liste des jeux dans lesquels il est possible de visiter cette région : ${version_groups.join(', ')}</p3>`; // on affiche les jeux dans l'élément html
  
    const info = `${basicInfo}<br><br>${location}<br><br>${version}`; // on regroupe les données dans une seule variable 
    region_info.innerHTML = info; // on affiche les données dans l'élément html
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
    const RegionList = [
        { number: 1, name1: "Kanto", name2: "kanto", name3: "KANTO" },
        { number: 2, name1: "Johto", name2: "johto", name3: "JOHTO" },
        { number: 3, name1: "Hoenn", name2: "hoenn", name3: "HOENN" },
        { number: 4, name1: "Sinnoh", name2: "sinnoh", name3: "SINNOH" },
        { number: 5, name1: "Unys", name2: "unys", name3: "UNYS" },
        { number: 6, name1: "Kalos", name2: "kalos", name3: "KALOS" },
        { number: 7, name1: "Alola", name2: "alola", name3: "ALOLA" },
        { number: 8, name1: "Galar", name2: "galar", name3: "GALAR" },
    ];
    
    
    // Parcours de chaque region dans RegionList
    for (let i = 0; i < RegionList.length; i++) {
      // Si le nom de la région est égal à la recherche (en majuscule première lettre et le reste en minuscule : name1 ; tout en minuscule : name2, tout en majuscule : name3)
      if ((searchTerm.toLowerCase() === RegionList[i].name1.toLowerCase()) || (searchTerm.toLowerCase() === RegionList[i].name2.toLowerCase()) || (searchTerm.toLowerCase() === RegionList[i].name3.toLowerCase())){
        try {
          // Attendre que la promesse soit résolue avant de récupérer les résultats
          await region_display(RegionList[i].number);
          result = "Affichage des informations de "+ RegionList[i].name1 + " réussi.";
          final_result.style.display = "block";
        } catch (error) {
          console.error('Erreur lors de l\'affichage des informations de : '+ RegionList[i].name1 + error);
          result = "Erreur lors de l'affichage des informations.";
        }
      }
    }
    // Affichage du résultat dans l'élément approprié (avec innerHTML)
    final_result.innerHTML = result;
  
  
  }