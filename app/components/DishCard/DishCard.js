import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const dishCard = (props) => (
    <View style={styles.dishCard}>
        <Text>{props.dishName}</Text>
    </View>
);

const styles = StyleSheet.create({
    dishCard: {
        backgroundColor: "#00FF00"
    }
});

export default dishCard;