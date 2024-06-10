import { QueryFunctionContext } from "@tanstack/react-query";
import { Character, Episode, Info, Location } from "../types";
import axios from "axios";
import { characterKeys, episodeKeys, locationKeys } from "@/keys";

const axiosInstance = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const getAllCharacters = async ({
  queryKey: [{ gender, name, page, status }],
}: QueryFunctionContext<
  ReturnType<(typeof characterKeys)["charactersPage"]>
>) => {
  const { data } = await axiosInstance.get<Info<Character[]>>("/character", {
    params: { name, gender, status, page },
  });
  return data;
};

export const getCharacter = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof characterKeys)["character"]>>) => {
  const { data } = await axiosInstance.get<Character>(`/character/${id}`);
  return data;
};

export const getAllEpisodes = async ({
  queryKey: [{ name, page }],
}: QueryFunctionContext<ReturnType<(typeof episodeKeys)["episodesPage"]>>) => {
  const { data } = await axiosInstance.get<Info<Episode[]>>("/episode", {
    params: { name, page },
  });
  return data;
};

export const getEpisode = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof episodeKeys)["episode"]>>) => {
  const { data } = await axiosInstance.get<Episode>(`/episode/${id}`);
  return data;
};

export const getAllLocations = async ({
  queryKey: [{ page, name }],
}: QueryFunctionContext<
  ReturnType<(typeof locationKeys)["locationsPage"]>
>) => {
  const { data } = await axiosInstance.get<Info<Location[]>>("/location", {
    params: { page, name },
  });
  return data;
};

export const getLocation = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof locationKeys)["location"]>>) => {
  const { data } = await axiosInstance.get<Location>(`/location/${id}`);
  return data;
};
