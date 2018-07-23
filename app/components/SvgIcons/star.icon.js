import React from 'react';
import Svg, {
    Path,
    G
} from 'react-native-svg';
import { View } from "react-native";

const star = (props) => {
    return (
        <View>
            <Svg height={props.height}
            width={props.width}
                viewBox="0 0 25.71 24.41">
                <Path fill={props.fill} d="M25.8,9.85c-.1,0-.1-.11-.1-.22a.56.56,0,0,0-.43-.54L17,7.91,13.3.36c-.11-.21-.22-.21-.43-.21a.54.54,0,0,0-.43.21L8.67,7.91.47,9.09a.38.38,0,0,0-.21.11c-.22.22-.22.54,0,.65l6,5.82L4.89,24v.11a.47.47,0,0,0,.43.43h.22L13,20.63l7.43,3.88c.11,0,.22.1.33,0s.43-.33.43-.54l-1.4-8.3ZM7.68,15.46a.64.64,0,0,0-.09-.39l-5-4.92,7-1c.1,0,.29-.11.29-.21L13,2.67,16.16,9c.09.1.19.21.29.21l7,1-5.12,4.92c-.09.1-.19.2-.09.39l1.17,6.89-6.2-3.24a.3.3,0,0,0-.4,0L6.51,22.35Z" transform="translate(-0.1 -0.15)" />
            </Svg>
        </View>
    )

}

export default star;

