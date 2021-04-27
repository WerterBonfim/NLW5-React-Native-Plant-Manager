import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "../styles/colors";


export function Header(){

    return (
        <View style={styles.container}>
            <View>
                <Text>Olá,</Text>
                <Text>Werter</Text>
            </View>
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
        backgroundColor: colors.red
    }
})