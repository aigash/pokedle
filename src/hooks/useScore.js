import { useMemo } from 'react';

/**
 * Calcule le score basé sur les essais
 */
function getTriesScore(nbEssais) {
    const scoresMap = {
        1: 5000,
        2: 4500,
        3: 4000,
        4: 3500,
        5: 3000,
        6: 2500,
        7: 2000,
        8: 1500,
        9: 1000,
        10: 800,
        11: 600,
        12: 450,
        13: 300
    };
    return scoresMap[nbEssais] ?? 150;
}

/**
 * Calcule le bonus temps basé sur le temps écoulé en secondes
 */
function getTimeBonus(timeInSeconds) {
    if (timeInSeconds < 30) return 2500;
    if (timeInSeconds < 60) return 2000;
    if (timeInSeconds < 120) return 1500;
    if (timeInSeconds < 180) return 1000;
    if (timeInSeconds < 300) return 600;
    return 300;
}

/**
 * Calcule le malus d'indices basé sur les indices utilisés
 */
function getHintsPenalty(usedHints) {
    const penalties = [250, 500, 750]; // Indice 1, 2, 3
    return usedHints.reduce((total, hintNum) => {
        return total + (penalties[hintNum - 1] || 0);
    }, 0);
}

/**
 * Détermine le rang du joueur
 */
function getRank(nbEssais, usedHints, pokedexUsed) {
    const hasUsedHelp = usedHints.length > 0 || pokedexUsed;

    if (nbEssais <= 3 && !hasUsedHelp) return 'S+';
    if (nbEssais <= 5 && !hasUsedHelp) return 'S';
    if (nbEssais <= 7) return 'A';
    if (nbEssais <= 10) return 'B';
    if (nbEssais <= 13) return 'C';
    return 'D';
}

/**
 * Formate le temps en minutes:secondes
 */
export function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Hook pour calculer le score final
 */
export function useScore({ nbEssais, timeInSeconds, usedHints = [], pokedexUsed = false }) {
    const scoreData = useMemo(() => {
        const triesScore = getTriesScore(nbEssais);
        const timeBonus = getTimeBonus(timeInSeconds);
        const hintsPenalty = getHintsPenalty(usedHints);

        let baseScore = triesScore + timeBonus - hintsPenalty;

        // Appliquer le multiplicateur Pokédex
        const finalScore = pokedexUsed ? Math.floor(baseScore * 0.85) : baseScore;

        const rank = getRank(nbEssais, usedHints, pokedexUsed);

        return {
            triesScore,
            timeBonus,
            hintsPenalty,
            pokedexMultiplier: pokedexUsed ? 0.85 : 1,
            finalScore: Math.max(0, finalScore),
            rank,
            formattedTime: formatTime(timeInSeconds)
        };
    }, [nbEssais, timeInSeconds, usedHints, pokedexUsed]);

    return scoreData;
}
