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
                width="50" viewBox="0 0 96.79 96.79">
                <Path fill="#ffa000" d="M96.79,86a10.75,10.75,0,0,1-10.7,10.8H10.79A10.75,10.75,0,0,1,0,86.08V10.79A10.75,10.75,0,0,1,10.71,0H86a10.75,10.75,0,0,1,10.8,10.7V86Z" transform="translate(0 0)" />
                <Path fill="#f5f8fa" d="M48.37,2A46.34,46.34,0,1,0,94.71,48.37,46.34,46.34,0,0,0,48.37,2Zm0,82.82A36.48,36.48,0,1,1,84.85,48.37h0A36.52,36.52,0,0,1,48.37,84.85Z" transform="translate(0 0)" />
                <Path fill="#f5f8fa" d="M72.52,46.94H51.7v-25a3.82,3.82,0,0,0-7.64,0h0V50.79a3.82,3.82,0,0,0,3.82,3.82H72.52A3.82,3.82,0,0,0,72.91,47h-.39Z" transform="translate(0 0)" />
            </Svg>
        </View>
    )
}

export default clockYellow;