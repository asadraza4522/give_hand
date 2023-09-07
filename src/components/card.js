import React from 'react';
import { StyleSheet,View } from 'react-native';

export default function Card(props){
    return (
        <View style={[styles.card,props.style]}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 5,
        elevation:5,
        backgroundColor:'#fff',
        // shadowOffset:{width: 1, height: 1},
        // shadowColor:'black',
        // shadowOpacity:0.3,
        shadowRadius: 5, 
        marginBottom:'4%',
        marginHorizontal:'4%',
    },
    cardContent :{
       marginHorizontal:'4%'
    }
   
})