import axios from "axios";
import { MovieModel, ReviewModel } from "../models";

export const indexMovieReviewsService = async (tmdbId: number) => {
  const movie = await showMovieService(tmdbId);
  const reviews = await ReviewModel.findAll({
    where: { movieId: movie.id },
    include: [MovieModel],
  });
  return reviews;
};

export const showMovieService = async (tmdbId: number) => {
  let movie = await MovieModel.findOne({ where: { tmdbId } });
  if (!movie) {
    movie = await fetchMovieData(tmdbId);
  }
  return movie;
};

export const fetchMovieData = async (tmdbId: number) => {
  const response = await getAxiosInstanceForTMDB().get(`/movie/${tmdbId}`);
  const {
    title,
    release_date: releaseDate,
    poster_path: poster,
    overview,
  } = response.data;

  const movie = await MovieModel.create({
    title,
    releaseDate,
    poster,
    overview,
    tmdbId,
  });

  return movie;
};

const TMDB_API_URL = 'https://api.themoviedb.org/3';

const getAxiosInstanceForTMDB = () => {
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  };

  const instance = axios.create({
    baseURL: TMDB_API_URL,
    headers,
  });
  return instance;
};
