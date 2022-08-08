const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonSearch = document.querySelector('.btn-search');

let searchPokemon = 1;


async function fetchPokemon(pokemon) {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();

        return data;
    }

}

async function renderPokemon(pokemon) {

    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name ;
        pokemonNumber.innerHTML = '#' + data.id + ' -';
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated['front_default'];
    
        inputSearch.value = '';

        searchPokemon = data.id;

    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :C';
        pokemonNumber.innerHTML = '';

        inputSearch.value = '';
    }

}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(inputSearch.value.toLowerCase());
       
})

buttonPrev.addEventListener('click', () => {

    if (searchPokemon > 1){
        searchPokemon --;

        renderPokemon(searchPokemon);
    }
       
})

buttonNext.addEventListener('click', () => {

    searchPokemon ++;

    renderPokemon(searchPokemon);
       
})

buttonSearch.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(inputSearch.value.toLowerCase());
       
})

renderPokemon(searchPokemon);