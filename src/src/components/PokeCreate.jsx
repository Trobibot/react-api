import { Component } from "react";
import { Button, TextField, Autocomplete, Grid } from '@mui/material';
import axios from "axios";

export default class PokeCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      baseStats: [
        "HP",
        "Attack",
        "Defense",
        "Sp. Attack",
        "Sp. Defense",
        "Speed",
      ]
    }
  }

  pokemon() {
    return this.state.pokemon
  }

  createPokemon(formValues) {
    axios.post(
      process.env.REACT_APP_API_URL + process.env.REACT_APP_API_POKEMONS_ENDPOINT,
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
    .then(({ data }) => {
      window.location.href = `${data.id}`
    })
  }

  submitForm(event) {
    event.preventDefault()
    this.createPokemon([...event.target.querySelectorAll("input")].map(({ value }) => value))
  }

  render() {
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
            fullWidth
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            multiple
            options={["Grass", "Fire"]}
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
          this.state.baseStats.map(stat => {
            return <Grid item xs={1} key={stat}>
              <TextField
                label={stat}
                fullWidth
              />
            </Grid>
          })
        }

        <Grid item xs={1} />
        
        <Grid item xs={1} />

        <Grid item xs={1}>
          <Button id="create-btn" type="submit" variant="contained" fullWidth>Create</Button>
        </Grid>

      </Grid>
    </form>
  }
}