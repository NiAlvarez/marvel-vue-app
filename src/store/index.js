import { createStore } from "vuex";
import axios from "axios";

import { PUBLIC_KEY, HASH } from "@/api/marvel";
import { v4 as uuidv4 } from 'uuid';

export const newCharacter = () => {
  return {
    name: '',
    image: '',
    modified: '',
    description: '',
    id: uuidv4()
  }
}

const mapCharacter = (item) => {
  return{
    name: item.name,
    image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
    modified: item.modified,
    id: item.id,
    description:
      item.description === ""
        ? "No description listed for this character."
        : item.description,
  };
}
export default createStore({
  state: {
    query: '',
    loading: false,
    limit: 10,
    loaded: 0,  
    characters: {},
    character: newCharacter(),
  },
  getters: {
    characters: (state) => {
      if(state.query === ''){
        return Object.values(state.characters).filter(x => x.list).sort((a,b) => a.index - b.index )
      }
      return Object.values(state.characters).filter(x => x.name.toLowerCase().includes(state.query.toLowerCase())).sort((a,b)=> {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()
        if(nameA < nameB){
          return -1
        }
        if(nameA > nameB){
          return 1
        }
        return 0
      })
    },
    loading: (state) => {
      return state.loading
    },
    getCharacterById: (state) => (id) => {
      return state.characters[id] || newCharacter()
    },
    character: (state) =>{
      return state.character
    }
  },
  mutations: {
    getCharacters(state) {
      state.loading = true;
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?&apikey=${PUBLIC_KEY}&ts=1&hash=${HASH}&limit=${state.limit}&offset=${state.loaded}`
        )
        .then((result) => {
          result.data.data.results.forEach((item, index ) => {
            if (state.characters[item.id]) {
              state.characters[item.id].index = state.loaded + index
              state.characters[item.id].list = true
              return;
            }
            state.characters[item.id] = {
              ...mapCharacter(item), 
              index: state.loaded + index,
              list : true
            }
          });
          state.loaded = state.loaded + state.limit
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          state.loading = false;
        });
    },
    getCharacterByName(state, name) {
      state.query = name;
      if(name === ''){
        return;
      }
      state.loading = true;
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters?name=${name}&apikey=${PUBLIC_KEY}&ts=1&hash=${HASH}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            if (state.characters[item.id]) {
              return;
            }
            state.characters[item.id] = {
              ...mapCharacter(item),
              index: 0,
              list: false,
            }
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          state.loading = false;
        });
    },
    getCharacterById(state, id) {
      if(state.characters[id]){
        state.character = state.characters[id]
        return;
      }
      state.loading = true;
      axios
        .get(
          `http://gateway.marvel.com/v1/public/characters/${id}?apikey=${PUBLIC_KEY}&ts=1&hash=${HASH}`
        )
        .then((result) => {
          result.data.data.results.forEach((item) => {
            if (state.characters[item.id]) {
              return;
            }
            state.characters[item.id] = {
              ...mapCharacter(item),
              index: 0,
              list: false,
            }
          });
          if(state.characters[id]){
            state.character = state.characters[id]
          }     
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          state.loading = false;
        });
    },
    editCharacter(state, character) {
      state.characters[character.id] = {
        ...state.characters[character.id],
        ...character,
        list: true,
        index: state.characters[character.id] && state.characters[character.id].index ? state.characters[character.id].index : -1,
        
      };
      state.character = state.characters[character.id]
    },
    newCharacter(state){
      const character = newCharacter()
      state.character = character;
    }
  },

  actions: {
    getCharacters: (context) => {
      context.commit("getCharacters");
    },
    getCharacterByName: (context, name) => {
      context.commit("getCharacterByName", name);
    },
    getCharacterById: (context, id) => {
      context.commit("getCharacterById", id)
    },
    editCharacter: ( context , character) => {
      context.commit("editCharacter", character);
    },
    newCharacter: (context) => {
      context.commit("newCharacter");
    }
  },
});
