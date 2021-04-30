import React, { useState } from "react";
import { 
  View, 
  Text, 
  FlatList,
  ActivityIndicator
} from "react-native";
import useAsyncEffect from "use-async-effect";

import {
  EnviromentButton,
  Load,
  Header,
  PlantCardPrimary
} from './imports';

import { EnvironmentProps, PlantProps } from "./types";
import { fetchPlants, getResourceOfPage } from "./services";


import styles from "./styles";
import colors from "../../styles/colors";

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  async function fillResourcesOfPage() {
    const { environments, plants } = await getResourceOfPage();

    setEnvironments([
      {
        key: "all",
        title: "Todos",
      },
      ...environments,
    ]);

    setPlants(plants);
    setFilteredPlants(plants);

    setLoading(false);
  }

  function handlerEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === "all") return setFilteredPlants(plants);

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  async function changePage() {

    const data = await fetchPlants(page);

    if (!data)
      return setLoading(true)

    setPlants(oldValue => [...oldValue, ...data]);
    setFilteredPlants(oldValue => [...oldValue, ...data])

    setLoading(false)
    setLoadingMore(false)


  }

  async function handlerFetchMore(distance: number) {

    console.log('distance', distance)
    
    if (distance < 1) return;

    setLoadingMore(true);        
    setPage(oldValue => oldValue + 1);
    
    
  }

  useAsyncEffect(fillResourcesOfPage, []);
  useAsyncEffect(changePage, [page])

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>

        <Text style={styles.subTitle}>voçê quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handlerEnvironmentSelected(item.key)}
            />
          )}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handlerFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore 
              ? <ActivityIndicator color={colors.green} />
              : <></>
          }
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
        />
      </View>
    </View>
  );
}
