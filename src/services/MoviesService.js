const Director = require('../models/Director');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');
const Shooting = require('../models/Shooting');

const { Connection } = require('../dbLayer/dbService');

class MoviesService {
  constructor() {
    this.services = {
      Director,
      Genre,
      Movie,
      Shooting,
    };
  }

  async getJoinedMovieData() {
    const response = await this.services.Movie.findAll({
      include: [this.services.Genre],
    }).then((movies) =>
      Promise.all(
        movies.map(async (item, index, array) => {
          const director = await this.services.Director.findOne({
            where: { id: item.directorId },
          }).then((directorData) => directorData.get({ plain: true }));

          return Promise.resolve({
            id: item.id,
            name: item.name,
            directorId: item.directorId,
            directorFirstName: director.firstName,
            directorLastName: director.lastName,
            genres: item.genres,
          });
        })
      )
    );

    return response;
  }

  async getSingleMovie(id) {
    const response = await this.services.Movie.findOne({
      include: [this.services.Genre],
      where: { id },
    }).then(async (movie) => {
      if (!movie) {
        return 0;
      }

      const director = await this.services.Director.findOne({
        where: { id: movie.directorId },
      }).then((directorData) => directorData.get({ plain: true }));

      return {
        id: movie.id,
        name: movie.name,
        directorId: movie.directorId,
        directorFirstName: director.firstName,
        directorLastName: director.lastName,
        genres: movie.genres,
      };
    });

    return response;
  }

  async deleteShooting(params, movieId) {
    Promise.all(
      params.map(async (item) => {
        await this.services.Shooting.destroy({
          where: { genreId: item, movieId },
        });
      })
    );
  }

  async addShooting(params, movieId) {
    for (let item of params) {
      await this.services.Shooting.create({ genreId: item, movieId });
    }
  }
}

const moviesService = new MoviesService();
module.exports = { moviesService };
