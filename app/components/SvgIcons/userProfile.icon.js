import React from 'react';
import Svg, {
    Path,
} from 'react-native-svg';
import { View } from "react-native";

const userProfileIcon = (props) => {
    return (
        <View>
            <Svg height={props.height}
            width={props.width}
                viewBox="0 0 25.71 24.4">
                <Path fill={props.fill} d="M150,2A148,148,0,1,0,298,150,148,148,0,0,0,150,2Zm.45,217.82H86.33c0-46.23,40.6-46.22,49.61-58.31l1-5.51c-12.66-6.42-21.6-21.89-21.6-40,0-23.83,15.51-43.15,34.63-43.15S184.62,92.19,184.62,116c0,17.94-8.78,33.31-21.27,39.83l1.17,6.26c9.89,11.5,49.14,12.25,49.14,57.71Z" transform="translate(-2 -2)"/>
            </Svg>
        </View>
    )
}

export default userProfileIcon;

