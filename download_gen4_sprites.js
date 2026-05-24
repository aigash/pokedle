import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Pour obtenir __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger le fichier pokemon.json pour obtenir les noms français
const pokemonData = JSON.parse(fs.readFileSync('./src/pokemon.json', 'utf8'));

// Créer le dossier de destination s'il n'existe pas
const outputDir = path.join(__dirname, 'public', 'assets', 'img', 'pokemons');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Fonction pour télécharger un sprite
async function downloadSprite(pokemonId) {
    try {
        // Récupérer les données depuis l'API
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const spriteUrl = response.data.sprites.versions['generation-iv'].platinum.front_default;

        if (!spriteUrl) {
            console.log(`⚠️  Sprite non disponible pour le Pokémon #${pokemonId}`);
            return;
        }

        // Trouver le nom français dans pokemon.json
        const pokemon = pokemonData.pokemon.find(p => p.id === pokemonId);
        if (!pokemon) {
            console.log(`⚠️  Pokémon #${pokemonId} non trouvé dans pokemon.json`);
            return;
        }

        // Construire le nom du fichier selon la nomenclature
        const fileName = `${pokemonId}_${pokemon.name_french}.png`;
        const filePath = path.join(outputDir, fileName);

        // Télécharger l'image
        const imageResponse = await axios.get(spriteUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(filePath, imageResponse.data);

        console.log(`✅ Téléchargé: ${fileName}`);
    } catch (error) {
        console.error(`❌ Erreur pour le Pokémon #${pokemonId}:`, error.message);
    }
}

// Fonction principale pour télécharger tous les sprites de la gen 4
async function downloadAllGen4Sprites() {
    console.log('🚀 Début du téléchargement des sprites de la génération 4 (387-493)...\n');

    const startTime = Date.now();
    let successCount = 0;
    let errorCount = 0;

    // Télécharger les sprites de 387 à 493
    for (let id = 387; id <= 493; id++) {
        try {
            await downloadSprite(id);
            successCount++;

            // Pause de 100ms entre chaque requête pour ne pas surcharger l'API
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            errorCount++;
        }
    }

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log('\n' + '='.repeat(50));
    console.log(`✨ Téléchargement terminé en ${duration} secondes`);
    console.log(`✅ Succès: ${successCount}`);
    console.log(`❌ Erreurs: ${errorCount}`);
    console.log(`📁 Dossier de destination: ${outputDir}`);
    console.log('='.repeat(50));
}

// Lancer le téléchargement
downloadAllGen4Sprites().catch(error => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
});
