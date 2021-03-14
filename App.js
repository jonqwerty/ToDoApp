import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([])

  const addTodo = (title) => {

  //   const newTodo = {
  //     id: Date.now().toString(),
  //     title: title
  //   }
    // setTodos((prevTodos) => {
    //   return [
    //     ...prevTodos, newTodo
    //   ]
    // })

    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title : title
    }])

  }
  let content = (<MainScreen todos={todos} addTodo={addTodo} 
    removeTodo={removeTodo} openTodo={(id) => {setTodoId(id)}}  />)

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id ===todoId)
    content = <TodoScreen goBack={() => setTodoId(null)} todo={selectedTodo} /> 
  }

  return (
    <View >
      <Navbar title="ToDo App" />
      <View style={styles.container}>
        { content }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    
  }
});
