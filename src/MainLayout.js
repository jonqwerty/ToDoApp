import React, {useContext, useState} from 'react'  
import { View, StyleSheet } from 'react-native'

import { Navbar } from './components/Navbar'

import { THEME } from './theme'
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { TodoContext } from './context/todo/todoContext'
import { ScreenContext } from './context/screen/screenContext'


 export const MainLayout = () => {

   const { todoId} = useContext(ScreenContext )
   //const [todoId, setTodoId] = useState(null)
   //const [todos, setTodos] = useState([])

//   const addTodo = (title) => {
//     setTodos(prev => [...prev, {
//       id: Date.now().toString(),
//       title : title
//     }])

//   }

//   const removeTodo = id => {
//     const todo = todos.find(t => t.id === id)
//     Alert.alert(
//       "Видалення елемента",
//       `Ви впевнені що хочете видалити "${todo.title}"?`,
//       [
        
//         {
//           text: "Відмінити",
//           //onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         { text: "Видалити",
//           style: "destructive" ,
//           onPress: () => {
//             setTodoId(null)
//           setTodos(prev => prev.filter(todo => todo.id !== id))
//         } }
//       ],
//       {cancelable: false},

//     )
//   }
  
//   const updateTodo = (id, title) => {
//     setTodos(old => old.map(todo => {
//       if (todo.id === id) {
//         todo.title = title
//       }
//       return todo
//     }))
//   }

  // let content = (<MainScreen />)
  // if (todoId) {
   
  //   content = 
  //   <TodoScreen /> 
  // }


    return (
      <View style={styles.wrapper}>
        <Navbar title="ToDo App" />
        <View style={styles.container}>
          { todoId ? <TodoScreen /> : <MainScreen />}
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      paddingHorizontal: THEME.PADDING_HORIZONTAL,
      paddingVertical: 30,
      flex: 1
    },
    wrapper: {
      flex: 1
    }
  });