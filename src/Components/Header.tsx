import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    Image,
    View    
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import useAsyncEffect from "use-async-effect";

import colors from "../styles/colors";
import userImage from '../assets/cachorro.png'; 
import fonts from "../styles/fonts";
import { StorageEnum } from "../shared/constants";


export function Header(){

    const [userName, setUserName] = useState<string>('')

    async function getUserNameFromStorage() {
        const name = await AsyncStorage.getItem(StorageEnum.UserName) || '';
        setUserName(name);
    }


    useAsyncEffect(getUserNameFromStorage, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName} >{userName}</Text>
            </View>

            <Image 
                source={userImage} 
                style={styles.image}
            />
                

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },

    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
    image:{
        width: 70,
        height: 70,
        borderRadius:40
    }
})
