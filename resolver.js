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
      return;
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

  Mutation: {
    deleteGame(_, args, context) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame(_, args, context) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);
      return game;
    },
    updateGame(_, args, context) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return {
            ...args.game,
            id: args.id,
          };
        }
      });
      return db.games.find((game) => game.id === args.id);
    },
  },
};
