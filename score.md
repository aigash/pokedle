# claude.md

# Pokédle — Système de score

## Philosophie du système

Le score doit mesurer :
- la qualité de déduction,
- la rapidité,
- l’autonomie du joueur.

Le joueur ne peut pas perdre puisqu’il dispose d’un nombre illimité d’essais.  
Le système ne récompense donc presque pas le simple fait de trouver le Pokémon.

L’objectif principal est de valoriser :
- les bons guesses,
- la logique,
- la connaissance Pokémon,
- l’utilisation minimale des aides,
- l’optimisation globale de la partie.

---

# Structure du score

## Calcul final

txt
Score essais
+ Bonus temps
- Malus indices

Puis multiplicateur Pokédex

### 1. Score principal
Essais -> Points
1 -> 5000
2 -> 4500
3 -> 4000
4 -> 3500
5 -> 3000
6 -> 2500
7 -> 2000
8 -> 1500
9 -> 1000
10 -> 800
11 -> 600
12 -> 450
13 -> 300
14+ -> 150

#### Intention design
Les premiers essais ont énormément de valeur.
Le système récompense fortement les joueurs capables de faire rapidement les bonnes déductions.
À partir de 8-9 essais, le joueur entre dans une logique davantage assistée.

### 2. Bonus temps
Le chrono démarre au premier guess.

Temps -> Bonus
<30s -> +2500
<1 min -> +2000
<2 min -> +1500
<3 min -> +1000
<5 min -> +600
>5 min -> +300

#### Intention design
Le temps est important sans devenir oppressant.
Le système évite de transformer le jeu en speedrun pur.
La qualité des guesses reste plus importante que la vitesse.

### 3. Pénalités d'indices
Les indices ne pénalisent le score que s’ils sont réellement utilisés.

Indice -> Malus
1er indice -> -500
2ème indice -> -250
3ème indice -> -750

### 4. Pokédex
Si le joueur ouvre le Pokédex :

Score final × 0.85
Fonctionnement recommandé
Le chrono peut être mis en pause pendant la consultation du Pokédex.
Cela transforme le Pokédex en véritable outil stratégique plutôt qu’en simple pénalité.
Intention design

Créer deux styles de jeu viables :

#### Jeu expert
mémoire pure,
optimisation maximale,
sans assistance.

#### Jeu analytique
consultation du Pokédex,
réflexion plus posée,
score légèrement réduit.

## Rang final
Le rang est déterminé principalement par le nombre d’essais.

Rang -> Condition
S+ -> ≤3 essais sans aide
S -> ≤5 essais sans aide
A -> ≤7 essais
B -> ≤10 essais
C -> ≤13 essais
D -> 14+ essais

## Objectifs UX et Game Design 
Le système doit :

être immédiatement compréhensible,
encourager la progression,
créer de la tension stratégique,
valoriser les connaissances Pokémon,
récompenser l’efficacité plutôt que le spam de guesses.

Le joueur doit comprendre :

pourquoi il a obtenu ce score,
ce qu’il peut améliorer,
comment optimiser ses futures parties.