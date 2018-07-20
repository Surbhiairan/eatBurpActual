import React from 'react';
import Svg, {
    Path,
    Polygon,
    Line
} from 'react-native-svg';
import { View } from "react-native";

const clockYellow = (props) => {
    return (
        <View>
            <Svg height="50"
                width="50" viewBox="0 0 33 25.71">
                <path fill="#212121" d="M33,1.73a1.72,1.72,0,0,1-1.73,1.73H1.73A1.73,1.73,0,0,1,1.73,0H31.27A1.72,1.72,0,0,1,33,1.73Z" transform="translate(0 0)" /> 
                <path fill="#212121" d="M32.87,12.72a1.73,1.73,0,0,1-1.6,1.87H1.73a1.74,1.74,0,0,1,0-3.47H31.27A1.74,1.74,0,0,1,32.87,12.72Z" transform="translate(0 0)" /> 
                <path fill="#212121" d="M32.87,23.84a1.73,1.73,0,0,1-1.6,1.87H1.73a1.74,1.74,0,0,1,0-3.47H31.27A1.74,1.74,0,0,1,32.87,23.84Z" transform="translate(0 0)" />
            </Svg>
        </View>
    )
}

export default clockYellow;



