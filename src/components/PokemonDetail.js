import { setPokemonType } from "../modules/typeTag.js";

export default function PokemonDetail({ $app, initialState, handleTypeClick }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "pokemon-detail";

  this.handleTypeClick = handleTypeClick;
  $app.appendChild(this.$target);

  this.template = () => {
    let pokemonData = this.state;
    let temp = "";

    if (pokemonData) {
      temp += `
      <div class="detail-wrapper">
          <div class="left-wrapper">
              <img src="${pokemonData.img}"></img>
          </div>
          <div class="right-wrapper">
              <div class="pokemon-info">
                  <div class="index">No.${pokemonData.id}</div>
                  <div class="name">${pokemonData.name}</div>                 
                  <div class="type">${setPokemonType(pokemonData.type)}</div>
                  <div class="description">${pokemonData.description}</div>
              </div>
              <div class="detail-info">
                  <div>
                      <div class="label">키</div>
                      <div class="info">${pokemonData.height}m</div>
                  </div>
                  <div>
                      <div class="label">분류</div>
                      <div class="info">${pokemonData.info}</div>
                  </div>
                  <div>
                      <div class="label">몸무게</div>
                      <div class="info">${pokemonData.weight}kg</div>
                  </div>
              </div>
          </div>
      </div>`;
    }

    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
