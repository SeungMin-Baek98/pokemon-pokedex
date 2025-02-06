import { setPokemonType } from "../modules/typeTag.js";

export default function PokemonList({
  $app,
  initialState,
  handleItemClick,
  handleTypeClick,
}) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "pokemon-list";

  $app.appendChild(this.$target);
  this.handleItemClick = handleItemClick;
  this.handleTypeClick = handleTypeClick;

  this.template = () => {
    let temp = "";
    if (this.state) {
      this.state.forEach((pokemon) => {
        temp += `
        <div class="pokemon-wrapper">
          <div class="img-wrapper" id="${pokemon.id}">
            <img src="${pokemon.img}" alt="${pokemon.name}"/>
          </div>
          <div class="pokemon-info">
            <div class="index">No.${pokemon.id}</div>
            <div class="name">${pokemon.name}</div>
            <div class="type">${setPokemonType(pokemon.type)}</div> 
          </div>
        </div>`;
      });
    }
    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    //포켓몬 이미지 클릭 시 상세 페이지로 이동하는 로직
    this.$target.querySelectorAll("div.img-wrapper").forEach((elm) => {
      elm.addEventListener("click", () => {
        this.handleItemClick(elm.id);
      });
    });

    //타입 클릭 시 해당 타입의 포켓몬 리스트 불러오는 로직
    this.$target.querySelectorAll("div.type-tag").forEach((elm) => {
      elm.addEventListener("click", () => {
        this.handleTypeClick(elm.id);
      });
    });
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
