export default function PokemonRow ({guess, pokemon}) {
    console.log(guess);
    console.log(pokemon);
    return <tr>
        <td><img className='imgClassic' src={guess.sprite_off} /></td>
        <td className={guess.type1.name_french == pokemon.type1.name_french || guess.type1.name_french == pokemon.type2.name_french ? 'bg-green-500' : 'bg-red-500'}>{guess.type1.name_french}</td>
        <td className={guess.type2.name_french == pokemon.type1.name_french || guess.type2.name_french == pokemon.type2.name_french ? 'bg-green-500' : 'bg-red-500'}>{(guess.type2 == 'Aucun' ? 'Aucun' : guess.type2.name_french)}</td>
        <td className={
            guess.couleur.length > 1 && pokemon.couleur.length > 1
            ? ((guess.couleur[0] === pokemon.couleur[0] || guess.couleur[0] === pokemon.couleur[1]) &&
               (guess.couleur[1] === pokemon.couleur[0] || guess.couleur[1] === pokemon.couleur[1]))
                ? 'bg-green-500'
                : ((guess.couleur[0] !== pokemon.couleur[0] && guess.couleur[0] !== pokemon.couleur[1]) &&
                   (guess.couleur[1] !== pokemon.couleur[0] && guess.couleur[1] !== pokemon.couleur[1]))
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
            : guess.couleur.length > 1 && pokemon.couleur.length === 1
                ? (guess.couleur[0] !== pokemon.couleur[0] && guess.couleur[1] !== pokemon.couleur[0])
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
                : guess.couleur.length === 1 && pokemon.couleur.length > 1
                    ? (guess.couleur[0] !== pokemon.couleur[0] && guess.couleur[0] !== pokemon.couleur[1])
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    : guess.couleur[0] === pokemon.couleur[0]
                        ? 'bg-green-500'
                        : 'bg-red-500'
        }>{(guess.couleur.length > 1 ? guess.couleur[0] + ', ' + guess.couleur[1] : guess.couleur[0])}</td>
        <td className={(guess.habitat !== pokemon.habitat ? 'bg-red-500' : 'bg-green-500')}>{guess.habitat}</td>
        <td className={(guess.stadeEvo > pokemon.stadeEvo ? 'bg-red-500 down' : (guess.stadeEvo < pokemon.stadeEvo ? 'bg-red-500 up' : 'bg-green-500'))}>{guess.stadeEvo}</td>
        <td className={(guess.taille > pokemon.taille ? 'bg-red-500 down' : (guess.taille < pokemon.taille ? 'bg-red-500 up' : 'bg-green-500'))}>{(guess.taille / 10).toFixed(1)}m</td>
        <td className={(guess.poids > pokemon.poids ? 'bg-red-500 down' : (guess.poids < pokemon.poids ? 'bg-red-500 up' : 'bg-green-500'))}>{(guess.poids / 10).toFixed(1)}kg</td>
    </tr>
}