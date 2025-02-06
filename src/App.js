//COMPONENTS
import PokemonList from "./components/PokemonList.js";
import Header from "./components/Header.js";
import PokemonDetail from "./components/PokemonDetail.js";

//APIS
import { getPokemonList, getPokemonDetail } from "./modules/api.js";

export default function App($app) {
  const getSearchWord = () => {
    if (window.location.search.includes("search=")) {
      return window.location.search.split("search=")[1];
    }
    return "";
  };

  this.state = {
    type: "",
    pokemonList: [],
    searchWord: getSearchWord(),
    currentPage: window.location.pathname,
  };

  //헤더 코드 작성
  const renderHeader = () => {
    new Header({
      $app,
      initialState: {
        currentPage: this.state.currentPage,
        searchWord: this.state.searchWord,
      },

      //헤더 클릭 시 홈으로 이동
      handleClick: async () => {
        history.pushState(null, null, `/`);
        const pokemonList = await getPokemonList();
        this.setState({
          ...this.state,
          pokemonList: pokemonList,
          type: "",
          searchWord: getSearchWord(),
          currentPage: "/",
        });
      },

      //헤더 검색창에 입력 시
      handleSearch: async (searchWord) => {
        history.pushState(null, null, `?search=${searchWord}`);
        const searchedPokemonList = await getPokemonList(
          this.state.type,
          searchWord
        );

        this.setState({
          ...this.state,
          searchWord: searchWord,
          pokemonList: searchedPokemonList,
          currentPage: `?search=${searchWord}`,
        });
      },
    });
  };

  //포켓몬 리스트 코드 작성
  const renderPokemonList = () => {
    new PokemonList({
      $app,
      initialState: this.state.pokemonList,

      // 포켓몬 리스트 아이템 클릭 시 상세 페이지로 이동
      handleItemClick: async (id) => {
        history.pushState(null, null, `/detail/${id}`);

        this.setState({
          ...this.state,
          currentPage: `/detail/${id}`,
        });
      },

      // 포켓몬 리스트 타입 클릭 시 해당 타입의 포켓몬 리스트로 이동
      handleTypeClick: async (type) => {
        history.pushState(null, null, `/${type}`);

        const pokemonList = await getPokemonList(type);

        this.setState({
          ...this.state,
          pokemonList: pokemonList,
          searchWord: getSearchWord(),
          type: type,
          currentPage: `/${type}`,
        });
      },
    });
  };

  //포켓몬 상세 페이지 코드 작성
  const renderPokemonDetail = async (pokemonId) => {
    try {
      const pokemonDetail = await getPokemonDetail(pokemonId);
      new PokemonDetail({
        $app,
        initialState: pokemonDetail,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const render = () => {
    const path = this.state.currentPage;

    $app.innerHTML = "";

    if (path.startsWith("/detail/")) {
      const pokemonId = path.split("/detail/")[1];
      //포켓몬 상세 페이지 코드
      renderHeader();
      renderPokemonDetail(pokemonId);
    } else {
      // 메인 페이지 로드
      renderHeader();
      renderPokemonList();
    }
  };

  this.setState = (newState) => {
    this.state = newState;
    render();
  };

  window.addEventListener("popstate", async () => {
    const urlPath = window.location.pathname;

    const prevType = urlPath.replace("/", "");
    const prevSearchWord = getSearchWord();
    const prevPokemons = await getPokemonList(prevType, prevSearchWord);

    this.setState({
      ...this.state,
      type: prevType,
      pokemonList: prevPokemons,
      searchWord: prevSearchWord,
      currentPage: urlPath,
    });
  });

  const init = async () => {
    const path = this.state.currentPage;

    if (path.startsWith("/detail/")) {
      //포켓몬 상세 페이지 코드
      render();
    } else {
      const pokemonList = await getPokemonList(
        this.state.type,
        this.state.pokemonList,
        this.state.searchWord
      );
      this.setState({
        ...this.state,
        pokemonList: pokemonList,
      });
    }
  };

  init();
}
