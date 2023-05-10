import { Component } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import axios from "axios";

export default class PokeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      filteredPokemons: []
    }

    axios.get(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_POKEMONS_ENDPOINT)
      .then(({ data }) => {
        this.setState({
          pokemons: data,
          filteredPokemons: data
        })
      })
  }

  filterPokemonByName(value) {
    this.setState({
      filteredPokemons: this.state.pokemons.filter(({ name }) => name.french.toLowerCase().match(value.toLowerCase()))
    })
  }

  render() {
    return <>
      <TextField
        label="Pokemon name"
        onChange={({target: { value }}) => this.filterPokemonByName(value)}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />
      <Link to={`/pokemons/+`}><Button id="update-btn" variant="contained" fullWidth>Add a new Pokemon</Button></Link>
      <List>
        {
          this.state.filteredPokemons.map(pokemon => (
            <Link to={`/pokemons/${pokemon.id}`} key={pokemon.id}>
              <ListItem>
                <ListItemText primary={pokemon.name.french} />
              </ListItem>
            </Link>
          ))
        }
      </List>
    </>
  }
}