const responseHelpers = require('../response/methods');
const { Connection } = require('../dbLayer/dbService');
const { dataService } = require('../services/DataService');
const { moviesService } = require('../services/MoviesService');
const Movie = require('../models/Movie');

class Movies {
  static get(req, res, id) {
    if (id) {
      Movies.getConcreteMovie(req, res, id);
    } else {
      Movies.getAllMovies(req, res);
    }
  }

  static async getConcreteMovie(req, res, id) {
    try {
      const response = await moviesService.getSingleMovie(id);
      if (response === 0) {
        return responseHelpers.payloadError(res, 'Movie not found');
      }

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async getAllMovies(req, res) {
    try {
      const response = await moviesService.getJoinedMovieData();

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async post(req, res, id, body) {
    const validation = Movies.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      const movieFields = {
        name: body.name,
        directorId: body.directorId,
      };

      const addedMovie = await moviesService.addMovie(movieFields);

      if (addedMovie === 0) {
        return responseHelpers.payloadError(
          res,
          'You have tried to mark director which is not in the database'
        );
      }

      if (body.addGenres) {
        const shootingResponse = await moviesService.addShooting(
          body.addGenres,
          addedMovie.id
        );

        // if (shootingResponse === 0) {
        //   return responseHelpers.payloadError(
        //     res,
        //     'You have tried to add genre, which is not present is the database'
        //   );
        // }
      }

      const response = await moviesService.getSingleMovie(addedMovie.id);

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async put(req, res, id, body) {
    const validation = Movies.paramsValidation(body);

    if (!validation.result) {
      return responseHelpers.payloadError(res, validation.errorText);
    }

    try {
      const movieFields = {
        name: body.name,
        directorId: body.directorId,
      };

      if (body.addGenres) {
        const shootingResponse = await moviesService.addShooting(
          body.addGenres,
          id
        );

        if (shootingResponse === 0) {
          return responseHelpers.payloadError(
            res,
            'You have tried to add invalid genre'
          );
        }
      }
      if (body.removeGenres) {
        await moviesService.deleteShooting(body.removeGenres, id);
      }

      await dataService.updateData(Movie, movieFields, id);

      const response = await moviesService.getSingleMovie(id);
      if (response[0] === 0) {
        return responseHelpers.payloadError(
          res,
          'Movie not found, nothing to update'
        );
      }

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static async delete(req, res, id) {
    try {
      const response = await dataService.deleteData(Movie, id);
      if (response === 0) {
        return responseHelpers.payloadError(
          res,
          'Movie not found, nothing to delete'
        );
      }

      return responseHelpers.success(res, response);
    } catch (err) {
      console.error(err);
      return responseHelpers.error(res, err);
    }
  }

  static paramsValidation(params) {
    if (params.name === '') {
      return {
        result: false,
        errorText: 'Name is not given',
      };
    }

    if (!params.directorId) {
      return {
        result: false,
        errorText: 'Director ID is not provided',
      };
    }

    if (!params.name) {
      return {
        result: false,
        errorText: 'Data is not provided',
      };
    }

    return { result: true };
  }
}

module.exports = { Movies };
