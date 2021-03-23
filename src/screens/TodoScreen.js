import React, { useState} from 'react' 
import { StyleSheet, View, Button, Dimensions } from 'react-native'
import {FontAwesome, AntDesign} from '@expo/vector-icons'
import { AppCard } from '../components/ui/AppCard'
import {THEME} from '../theme'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/ui/AppTextBold'
import { AppButton } from '../components/ui/AppButton'


export const TodoScreen = ({goBack, todo, onRemove, onSave}) => {
    const [modal, SetModal] = useState(false)

    const saveHandler = title => {
        onSave(todo.id, title)
        SetModal(false)
    }

    return (
    <View>

        <EditModal 
        value={todo.title} 
        visible={modal} 
        onCancel={() => SetModal(false)}
        onSave={saveHandler}
        />
        
        <AppCard style={styles.card}>
            <AppTextBold  style={styles.title}>{todo.title}</AppTextBold>
            <AppButton  onPress={() => SetModal(true)}>
                <FontAwesome name="edit" size={20} />
            </AppButton>
        </AppCard> 

        <View style={styles.buttons}>
            <View style={styles.button} >
                <AppButton  onPress={goBack } color={THEME.GREY_COLOR}>
                    <AntDesign name='back' size={20} color="#fff" />
                </AppButton>
            </View>
            <View style={styles.button} >
                <AppButton 
                color={THEME.DANGER_COLOR} 
                onPress={() => onRemove(todo.id)} >
                    <FontAwesome name='remove' size={20} color="#fff" /> 
                </AppButton>
            </View>
            
        </View>
        
    </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        marginBottom: 20,
        padding: 15
    },
    button: {
        //width: Dimensions.get('window').width / 3
        width: Dimensions.get('window').width > 400 ? 150 : 100
    },
    title: {
        fontSize: 20
    }

})