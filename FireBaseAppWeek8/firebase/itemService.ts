import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./config";

const collectionName = "shoppingItems";


// Retrieve data
export const getItems = async () => {
  const snapshot = await getDocs(collection(db, collectionName));

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};


// Add data
export const addItem = async (name: string) => {
  console.log("Adding item:", name);
  try {
    await addDoc(collection(db, collectionName), { name });
    console.log("Item added!");
  } catch (err) {
    console.log("Firestore error:", err);
  }
};



// Delete data
export const deleteItem = async (id: string) => {
  await deleteDoc(doc(db, collectionName, id));
};