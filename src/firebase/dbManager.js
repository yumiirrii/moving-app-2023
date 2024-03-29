import { db } from './index'
import { doc, collection, Timestamp, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

// fetch all items
export const getAll = async(collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  const docRefs = []
  querySnapshot.forEach((doc) => {
    const id = doc.id
    const data = doc.data()
    if (collectionName === 'todos') {
      docRefs.push({
        id,
        task: data.task,
        dueDate: data.dueDate.toDate(),
        doneDate: data.doneDate ? data.doneDate.toDate() : '',
        isDone: data.isDone,
        updatedDate: data.updatedDate ? data.updatedDate.toDate() : '',
      })
    }
    if (collectionName === 'tobuys') {
      docRefs.push({
        id,
        item: data.item,
        price: data.price,
        isBought: data.isBought,
        createdDate: data.createdDate.toDate(),
        updatedDate: data.updatedDate ? data.updatedDate.toDate() : '',
      })   
    }
  })
  return docRefs
}

// Add a new item with a generated id.
export const save = async(collectionName, rec) => {
  let docRef
  if (collectionName === 'todos') {
    // Check if the document already exists
    if (rec.id !== null && rec.id !== '') {
      docRef = doc(db, collectionName, rec.id)
      await updateDoc(docRef, {
        task: rec.task,
        dueDate: Timestamp.fromDate(rec.dueDate),
        doneDate: rec.doneDate ? Timestamp.fromDate(rec.doneDate) : null,
        isDone: rec.isDone,
        updatedDate: Timestamp.fromDate(new Date()),
      })
    // Document doesn't exist, add a new one with a generated id
    } else {
      docRef = await addDoc(collection(db, collectionName), {
        task: rec.task,
        dueDate: Timestamp.fromDate(rec.dueDate),
        doneDate: null,
        isDone: false,
        createdDate: Timestamp.fromDate(new Date()),
        updatedDate: null
      })
    }
  }
  if (collectionName === 'tobuys') {
    if (rec.id !== null && rec.id !== '') {
      docRef = doc(db, collectionName, rec.id)
      await updateDoc(docRef, {
        item: rec.item,
        price: rec.price,
        isBought: rec.isBought,
        updatedDate: Timestamp.fromDate(new Date())
      })
    } else {
      // Document doesn't exist, add a new one with a generated id
      docRef = await addDoc(collection(db, collectionName), {
        item: rec.item,
        price: rec.price,
        isBought: false,
        createdDate: Timestamp.fromDate(new Date()),
        updatedDate: null
      })
    }
  }
}

// Delete item by id
export const deleteById = async(collectionName, id) => {
  const docRef = await deleteDoc(doc(db, collectionName, id))
}