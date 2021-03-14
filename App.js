import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { AddTodo } from './src/AddTodo';
import { Navbar } from './src/Navbar';
import { Todo } from './src/Todo';

export default function App() {
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

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }
  return (
    <View >
      <Navbar title="ToDo App" />
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />

        <FlatList
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({item}) => <Todo todo={item} onRemove = {removeTodo} />}
        />

        {/* <ScrollView>
          { todos.map(todo => {
            return <Todo todo={todo} key={todo.id} />
          }) }
        </ScrollView> */}
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
