import React from 'react';
import Svg, {
    Path,
    Polygon,
    Line
} from 'react-native-svg';
import { View } from "react-native";

const cityYellow = (props) => {
    return (
        <View>
            <Svg height="50"
                width="50" viewBox="0 0 512 512">
                <Path d="M512,455.11A56.89,56.89,0,0,1,455.11,512H56.89A56.89,56.89,0,0,1,0,455.11H0V56.89A56.89,56.89,0,0,1,56.89,0H455.11A56.89,56.89,0,0,1,512,56.89h0Z" transform="translate(0 0)" fill="#ffa000" />
                <Polygon points="204 110 204 481 182 481 182 134 121 134 121 481 99 481 99 110 204 110" fill="#f5f8fa" />
                <Polygon points="413 31 413 481 389 481 389 54 329 54 329 481 303 481 303 31 413 31" fill="#f5f8fa" />
                <Polygon points="295 187.73 295 481 277.61 481 277.61 206.71 229.39 206.71 229.39 481 212 481 212 187.73 295 187.73" fill="#f5f8fa" />
                <Line x1="44.6" y1="481" x2="470.58" y2="481" fill="none" />
            </Svg>
        </View>
    )
}

export default cityYellow;