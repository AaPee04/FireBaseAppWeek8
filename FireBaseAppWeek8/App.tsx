import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItems, addItem, deleteItem } from "./firebase/itemService";

export default function App() {

  const [items, setItems] = useState<any[]>([]);
  const [text, setText] = useState("");

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>

        <Text style={styles.title}>Shopping List</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Add item"
            value={text}
            onChangeText={setText}
          />

          <Button
            title="Add"
            onPress={async () => {
              if (!text.trim()) return;
              await addItem(text);
              setText("");
              loadItems();
            }}
          />
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Button
                title="Delete"
                onPress={async () => {
                  await deleteItem(item.id);
                  loadItems();
                }}
              />
            </View>
          )}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },

  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },

  itemText: {
    fontSize: 18
  }
});