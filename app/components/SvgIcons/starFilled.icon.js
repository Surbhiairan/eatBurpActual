import React from 'react';
import Svg, {
    Path,
    G
} from 'react-native-svg';
import { View } from "react-native";

const starFilled = (props) => {
    return (
        <View>
            <Svg height="70"
                width="80"
                viewBox="0 0 25.71 24.4">
                <Path fill={props.fill} d="M19.77,15.67l1.4,8.3c0,.21-.22.54-.43.54s-.22,0-.33,0L13,20.63,5.54,24.51H5.32a.47.47,0,0,1-.43-.43V24l1.4-8.3-6-5.82C0,9.74,0,9.42.26,9.2a.38.38,0,0,1,.21-.11l8.2-1.18L12.44.36a.54.54,0,0,1,.43-.21c.21,0,.32,0,.43.21L17,7.91l8.3,1.18a.56.56,0,0,1,.43.54c0,.11,0,.22.1.22Z" transform="translate(-0.09 -0.15)" />
            </Svg>
        </View>
    )
}

export default starFilled;

