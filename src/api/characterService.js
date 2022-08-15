import axios from "axios";
import { PUBLIC_KEY, HASH } from "./marvel";

export default {
  getCharacters() {
    return axios
      .get(
        `http://gateway.marvel.com/v1/public/characters?&apikey=${PUBLIC_KEY}&ts=1&hash=${HASH}`
      )
      .then((response) => {
        return response.data
      });
  },

  getCharacterById(id){
    return axios
    .get(
      `http://gateway.marvel.com/v1/public/characters/${id}?&apikey=${PUBLIC_KEY}&ts=1&hash=${HASH}`
    )
    .then((response) => {
      return response.data
    });
  }
};
