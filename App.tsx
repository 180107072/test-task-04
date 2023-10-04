import { Block, Button } from "galio-framework";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import store from "./lib/store/create";
import { postsApi, useGetAllPostsQuery } from "./lib/services/get-posts";
import { Provider } from "react-redux";
import { usePagintaion } from "./hooks/use-pagination";
import { useEffect, useState } from "react";
import { ArrowDown } from "./components/icons/arrow-down";
import { ArrowUp } from "./components/icons/arrow-up";

enum Sorting {
  asc = "asc",
  desc = "desc",
  initial = "initial",
}

const modes = [Sorting.initial, Sorting.asc, Sorting.desc];

type SortingOptions = {
  key: keyof Post | null;
  mode: number;
};

function App() {
  const { data, isLoading, isError } = useGetAllPostsQuery();

  const [posts, setPosts] = useState(data);
  const { range, currentPage, pagesCount, goto } = usePagintaion({
    pages: posts?.length || 0,
    limit: 5,
  });
  const [from, to] = range;
  const [sortingState, setSortingState] = useState<SortingOptions>({
    key: null,
    mode: 0,
  });

  const updateSortingState = (update: Partial<SortingOptions>) =>
    setSortingState({ ...sortingState, ...update });

  useEffect(() => setPosts(data), [data]);

  if (isLoading || isError || !posts) return null;

  const keys = Object.keys(posts[0]);

  const sortBy = (key: keyof Post) => {
    const mode = modes[sortingState.mode + 1] ?? modes[0];

    function compare(a: Post, b: Post) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    }

    const update = [...posts];

    const getSorted = () => {
      switch (mode) {
        case Sorting.asc:
          return update.sort(compare);
        case Sorting.desc:
          return update.sort(compare).reverse();
        default:
          return data;
      }
    };

    setPosts(getSorted());

    updateSortingState({
      key,
      mode: modes.indexOf(mode),
    });
  };

  const getIcon = () => {
    const mode = modes[sortingState.mode];
    switch (mode) {
      case Sorting.asc:
        return <ArrowDown style={{ width: 20, height: 20 }} />;
      case Sorting.desc:
        return <ArrowUp style={{ width: 20, height: 20 }} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {keys.map((key) => (
            <Button
              key={key}
              color="success"
              style={{
                flexDirection: "row",
                gap: 10,
              }}
              onPress={() => sortBy(key as keyof Post)}
            >
              <Text style={{ textTransform: "uppercase" }}>{key}</Text>
              {sortingState.key === key ? getIcon() : null}
            </Button>
          ))}
        </ScrollView>
      </View>
      <View style={styles.cardsContainer}>
        {posts.slice(from, to).map(({ id, title, body }) => (
          <View style={styles.card} key={id}>
            <Text style={{ fontSize: 20 }}>
              {id} {title}
            </Text>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={{ fontSize: 15, marginTop: "auto" }}
            >
              {body}
            </Text>
          </View>
        ))}
      </View>
      <Block style={styles.pagination}>
        <ScrollView
          horizontal
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {Array.from({ length: pagesCount }, (_, i) => i + 1).map((id) => (
            <Button
              key={`btn-${id}`}
              onPress={() => goto(id)}
              style={styles.roundedButton}
              round
              capitalize
              color={id === currentPage ? "success" : "primary"}
              size="small"
            >
              <Text>{id}</Text>
            </Button>
          ))}
        </ScrollView>
      </Block>
    </SafeAreaView>
  );
}

store.dispatch(postsApi.endpoints.getAllPosts.initiate());
export default function Providers() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },

  filtersContainer: {
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "white",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    flex: 1,
    alignItems: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },

  cardsContainer: {
    padding: 10,
    gap: 10,
    flex: 1,
  },

  pagination: {
    borderRadius: 30,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "white",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },

  roundedButton: {
    width: 40,
    height: 40,
  },
});
