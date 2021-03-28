import React, {useReducer, useContext} from 'react'  
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO , CLEAR_ERROR, FETCH_TODOS} from '../types'
import {Alert, Text, View} from 'react-native'

import {TodoContext} from './todoContext'
import { todoReducer } from './todoReducer'


export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null

    }
    const { changeScreen } = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async title => {
        const response = await fetch('https://mobile-todo-app-ac51f-default-rtdb.firebaseio.com/todos.json', {
             method: "POST",
             heders: {'Content-Type': 'application/json'},
             body: JSON.stringify({ title })
         })
         const data = await response.json()
        
            dispatch({type: ADD_TODO, title, id: data.name})
        
            
       
    }

    const removeTodo = id => {
        const todo = state.todos.find( t => t.id === id)
        Alert.alert(
           "Видалення елемента",
           `Ви впевнені що хочете видалити "${todo.title}"?`,
           [
                    
             {
               text: "Відмінити",
                  onPress: () => console.log("Cancel Pressed"),
               style: "cancel"
                },
             { text: "Видалити",
                  style: "destructive" ,
               onPress: async () => {
                changeScreen(null)
                await fetch(`https://mobile-todo-app-ac51f-default-rtdb.firebaseio.com/todos/${id}.json`, {
                    method: 'DELETE',
                    heders: {'Content-Type': 'application/json'}
                })
                
                dispatch({ type: REMOVE_TODO, id})
             } }
                ],
           {cancelable: false},
            
          )
        
    }

    const fetchTodos = async () => {
        showLoader()
        clearError()
        try {
            const response = await fetch('https://mobile-todo-app-ac51f-default-rtdb.firebaseio.com/todos.json', {

            method: 'GET',
            headers: { 'Content-Type': 'application/json' }

            })
            const data = await response.json()
            if (data === null) {
                return <View><Text>hh</Text></View>
            }
            const todos = Object.keys(data).map(key => ({...data[key], id: key}))
            dispatch({type: FETCH_TODOS, todos})
        } catch (e) {
            showError('Щось пішло не так ...')
            console.log(e)
        } finally {
            hideLoader()
        }     
    }

    const updateTodo = async (id, title) => {
        clearError()
        try {
            await fetch(`https://mobile-todo-app-ac51f-default-rtdb.firebaseio.com/todos/${id}.json`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({title})
            })
            
            dispatch({ type: UPDATE_TODO, id, title })
        } catch (e) {
            showError('Щось пішло не так ...')
            console.log(e)
        }
        
    }

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const hideLoader = () => dispatch({ type: HIDE_LOADER })

    const showError = (error) => dispatch({ type: SHOW_ERROR, error })

    const clearError = () => dispatch({ type: CLEAR_ERROR })

    return <TodoContext.Provider value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos
    }}>{ children }</TodoContext.Provider>
} 