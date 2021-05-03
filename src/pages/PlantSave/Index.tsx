import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    Alert
} from 'react-native';

import { useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { SvgFromUri } from 'react-native-svg';
import { format, isBefore } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Button } from '../../Components/Button'
import waterdrop from '../../assets/waterdrop.png';

import styles from "./Styles";
import { PlantProps } from '../../shared/types';


interface ParamsRoute {
    plant: PlantProps
}


export function PlantSave() {

    const route = useRoute();
    const { plant } = route.params as ParamsRoute

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

    function handlerChangeTime(event: Event, dateTime: Date | undefined) {

        if (Platform.OS === 'android')
            setShowDatePicker(oldValue => !oldValue);

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏲️')
        }

        if (dateTime)
            setSelectedDateTime(dateTime)

    }

    function handlerOpenDatatimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)
    }


    return (
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />



                <Text style={styles.plantName}>
                    {plant.name}
                </Text>

                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>

            </View>

            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>


                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>

                {showDatePicker &&
                    <DateTimePicker
                        value={selectedDateTime}
                        mode='time'
                        display='spinner'
                        onChange={handlerChangeTime}
                    />
                }

                {Platform.OS === 'android' && (

                    <TouchableOpacity
                        onPress={handlerOpenDatatimePickerForAndroid}
                        style={styles.dateTimePickerButton}
                    >

                        <Text style={styles.dateTimePickerText}>
                            {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>

                    </TouchableOpacity>

                )}

                <Button
                    title="Cadastrar Planta"
                    onPress={() => { }}
                />

            </View>
        </View>
    )
}
