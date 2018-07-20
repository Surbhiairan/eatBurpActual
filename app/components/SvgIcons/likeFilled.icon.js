import React from 'react';
import Svg, {
    Path
} from 'react-native-svg';
import { View } from "react-native";

const likeYellowFilled = (props) => {
    return (
        <View>
            <Svg height="70"
                width="80"
                viewBox="0 0 24.15 22.46">
                <Path fill={props.fill} d="M23.89,9.37A10.91,10.91,0,0,1,20.54,15L12,22.6,3.63,15A10.86,10.86,0,0,1,.25,9.37,6.58,6.58,0,0,1,0,6.83a7.84,7.84,0,0,1,2.3-5h0A6.09,6.09,0,0,1,6.57.13,6.24,6.24,0,0,1,12,3.34,6.51,6.51,0,0,1,17.58.13c3.44,0,6.2,2.82,6.54,6.7A7,7,0,0,1,23.89,9.37Z" transform="translate(0 -0.13)" />
            </Svg>
        </View>
    )
    
}

export default likeYellowFilled;

