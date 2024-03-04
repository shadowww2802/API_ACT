const express = require('express');
const app = express();

app.use(express.json());

const pokemons = [
    { id: 1, poke_name: 'Pikachu' },
    { id: 2, poke_name: 'Raichu' },
    { id: 3, poke_name: 'Charmander' },
    { id: 4, poke_name: 'Charmeleon' },
    { id: 5, poke_name: 'Charizard' },
    { id: 6, poke_name: 'Bulbasaur' },
    { id: 7, poke_name: 'Ivysaur' },
    { id: 8, poke_name: 'Venusaur' },
]


//for view all
app.get('/api/pokemons', (req, res) => {
    res.send(pokemons);
});

//for view specific id
app.get('/api/pokemons/:id', (req, res) => {
    const pokemon = pokemons.find(c => c.id === parseInt(req.params.id));
    if (!pokemon) res.status(404).send(`The pokemon with the given id is not found`);
    res.send(pokemon);
});

//for post or create 
app.post('/api/pokemons', (req, res) => {
    //validation
    if (!req.body.poke_name || req.body.poke_name < 3) {
        res.status(400).send('The pokemon name should be in minimum of 3 characters.');
        return;
    }

    const pokemon = {
        id: pokemons.length + 1,
        poke_name: req.body.poke_name
    };

    pokemons.push(pokemon);
    res.send(pokemon);
})

//for put or update
app.put('/api/pokemons/:id', (req, res) => {
    const pokemon = pokemons.find(c => c.id === parseInt(req.params.id));
    if (!pokemon) req.status(404).send('The pokemon with the given ID is not found.');
    pokemon.poke_name = req.body.poke_name;
    res.send(pokemon);
});

//for delete
app.delete('/api/pokemons/:id', (req, res) => {
    const pokemon = pokemons.find(c => c.id === parseInt(req.params.id));
    if (!pokemon) req.status(404).send('The pokemon with the given ID is not found.');

    const index = pokemons.indexOf(pokemon);
    pokemons.splice(index, 1);
    res.send(pokemon);
});


const port = process.env.port || 6969;
app.listen(port, () => console.log(`Listening on port ${port}`));