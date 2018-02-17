import axios from "axios";

export default {
  // Gets all books
  getDogs: function() {
    return axios.get("/api/dogs");
  },
  // Gets the book with the given id
  getDog: function(id) {
    return axios.get("/api/dogs/" + id);
  },
  // Deletes the book with the given id
  deleteDog: function(id) {
    return axios.delete("/api/dog/" + id);
  },
  // Saves a dog to the database
  saveDog: function(dogData) {
    return axios.post("/api/dogs", dogData);
  }
};
