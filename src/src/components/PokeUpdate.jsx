import { Component } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField, Autocomplete, Grid } from '@mui/material';
import axios from "axios";

class PokeDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemon: {}
    }

    axios.get(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_POKEMONS_ENDPOINT + `/${props.id}`)
      .then(({ data }) => {
        this.setState({
          pokemon: data
        })
      })
  }

  pokemon() {
    return this.state.pokemon
  }

  updatePokemon(formValues) {
    axios.put(
      process.env.REACT_APP_API_URL + process.env.REACT_APP_API_POKEMONS_ENDPOINT + `/${this.pokemon().id}`,
      {
        name: { french: formValues[0] },
        type: [],
        base: {
          "HP":          formValues[2],
          "Attack":      formValues[3],
          "Defense":     formValues[4],
          "Sp. Attack":  formValues[5],
          "Sp. Defense": formValues[6],
          "Speed":       formValues[7],
        }
      })
  }

  deletePokemon() {
    axios
      .delete(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_POKEMONS_ENDPOINT + `/${this.pokemon().id}`)
      .then(({ data }) => {
        window.location.href = "/"
      })

  }

  submitForm(event) {
    event.preventDefault()

    switch (event.nativeEvent.submitter.id) {
      case "delete-btn":
        this.deletePokemon()
        break;

      case "update-btn":
        this.updatePokemon([...event.target.querySelectorAll("input")].map(({ value }) => value))
        break;
    
      default:
        break;
    }
  }

  render() {
    if (this.state.pokemon.id)
      return <form onSubmit={this.submitForm.bind(this)}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        columns={3}
        spacing={4}
      >

        <Grid item xs={3}>
          <TextField
            label="Name"
            defaultValue={this.pokemon().name.french}
            fullWidth
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            multiple
            options={["Grass", "Fire"]}
            defaultValue={this.pokemon().type}
            renderInput={params => (
              <TextField
                {...params}
                label="Type"
                fullWidth
              />
            )}
          />
        </Grid>
          
        {
          Object.keys(this.pokemon().base).map(key => {
            return <Grid item xs={1} key={key}>
              <TextField
                label={key}
                defaultValue={this.pokemon().base[key]}
                fullWidth
              />
            </Grid>
          })
        }

        <Grid item xs={1} />

        <Grid item xs={1}>
          <Button id="update-btn" type="submit" variant="contained" fullWidth>Update</Button>
        </Grid>

        <Grid item xs={1}>
          <Button id="delete-btn" type="submit" variant="contained" color="error" fullWidth>Delete</Button>
        </Grid>

      </Grid>
      </form>
  }
}

export default function ParamsWrapper(props) {
  return <PokeDetail {...props} params={useParams()} />
}