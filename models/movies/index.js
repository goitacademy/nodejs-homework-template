import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const moviesPath = path.resolve("models", "movies", "movies.json");

const updateMovies = movies => fs.writeFile(moviesPath, JSON.stringify(movies, null, 2));

export const getAllMovies = async () => {
    const data = await fs.readFile(moviesPath);
    return JSON.parse(data);
}

export const getMovieById = async (id) => {
    const movies = await getAllMovies();
    const result = movies.find(item => item.id === id);
    return result || null;
}

export const addMovie = async ({ title, director }) => {
    const movies = await getAllMovies();
    const newMovie = {
        id: nanoid(),
        title,
        director,
    };
    movies.push(newMovie);
    await updateMovies(movies);
    return newMovie;
}

export const updateMovieById = async (id, data) => {
    const movies = await getAllMovies();
    const index = movies.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    movies[index] = {id, ...data};
    await updateMovies(movies);
    return movies[index];
}

export const deleteMovieById = async (id) => {
    const movies = await getAllMovies();
    const index = movies.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = movies.splice(index, 1);
    await updateMovies(movies);
    return result;
}

export default {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovieById,
    deleteMovieById,
}