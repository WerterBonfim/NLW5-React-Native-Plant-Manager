import api from "../../services/api";
import { EnvironmentProps, PlantProps } from "./types";

type PlantSelectResources = {
  environments: EnvironmentProps[];
  plants: PlantProps[];
};

export async function getResourceOfPage(): Promise<PlantSelectResources> {
  const [environments, plants] = await Promise.all([
    fetchEnvironment(),
    fetchPlants(),
  ]);

  return {
    environments,
    plants,
  } ;
  
}

async function fetchEnvironment(): Promise<EnvironmentProps[]> {
  const { data } = await api.get<EnvironmentProps[]>("plants_environments", {
    params: {
      _sort: "title",
      _order: "asc",
    },
  });

  return data;
}

export async function fetchPlants(page: number = 1): Promise<PlantProps[]> {
  const { data } = await api.get<PlantProps[]>("plants", {
    params: {
      _sort: "name",
      _order: "asc",
      _page: page,
      _limit: 8
    },
  });

  return data;
}
