//db

import db from "./_db.js";

export const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args, context) {
      return db.games.find((game) => game.id === args.id);
    },

    reviews() {
      return db.reviews;
    },
    review(_, args, context) {
      return db.reviews.find((review) => review.id === args.id);
    },

    authors() {
      return db.authors;
    },
    author(_, args, context) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
};
