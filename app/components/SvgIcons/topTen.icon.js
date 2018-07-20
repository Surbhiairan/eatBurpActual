import React from 'react';
import Svg, {
    Path,
    G
} from 'react-native-svg';
import { View, StyleSheet } from "react-native";

const topTenIcon = (props) => {
    return (
        <View style={props.style}>
            <Svg height="40"
                width="40"
                viewBox="0 0 512 512">
                <Path fill="#ffa000" d="M512,455.11A56.89,56.89,0,0,1,455.11,512H56.89A56.89,56.89,0,0,1,0,455.11H0V56.89A56.89,56.89,0,0,1,56.89,0H455.11A56.89,56.89,0,0,1,512,56.89h0Z" transform="translate(0 0)" />
                <Path fill="#f5f8fa" d="M114.59,163.74H86.74c-22.64,0-32.07-16.52-32.07-32.55,0-16.5,11.79-32.54,32.07-32.54h67c20.29,0,31.62,14.62,31.62,33.48V400.57c0,23.58-15.09,36.78-35.38,36.78s-35.38-13.2-35.38-36.78V163.74Z" transform="translate(0 0)" />
                <Path fill="#f5f8fa" d="M385.83,268c0-35.85-3.3-109.45-51.42-109.45S283,232.14,283,268c0,33.5,3.3,109.44,51.42,109.44s51.41-76,51.41-109.44m-176.44,0c0-76.9,29.73-173.59,125-173.59s125,96.69,125,173.59-29.69,173.6-125,173.6-125-96.72-125-173.61" transform="translate(0 0)" />            
            </Svg>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        marginLeft: 60 
    }
})

export default topTenIcon;

