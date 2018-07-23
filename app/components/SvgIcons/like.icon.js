import React from 'react';
import Svg, {
    Path,
    G
} from 'react-native-svg';
import { View } from "react-native";

const likeIcon = (props) => {
    return (
        <View>
            <Svg height={props.height}
                width={props.width}
                viewBox="0 0 24.15 22.46">
                <G>
                    <G>
                        <Path fill={props.fill} d="M24.15,6.83C23.8,2.93,21.05.12,17.6.12A6.48,6.48,0,0,0,12,3.33,6.27,6.27,0,0,0,6.58.12C3.14.12.39,2.93,0,6.83A6.8,6.8,0,0,0,.25,9.37,10.83,10.83,0,0,0,3.64,15L12,22.61,20.57,15a10.91,10.91,0,0,0,3.35-5.59A7,7,0,0,0,24.15,6.83Zm-2,2.5a9.31,9.31,0,0,1-2.83,4.73L12,20.62,4.73,14.06A9.26,9.26,0,0,1,1.89,9.32a5.56,5.56,0,0,1-.17-2V7.23C2,4.11,4.24,1.82,7,1.82A5.05,5.05,0,0,1,11.6,5.05L12,6l.4-1a5.18,5.18,0,0,1,4.77-3.23c2.73,0,4.93,2.29,5.2,5.48A5.56,5.56,0,0,1,22.19,9.33Z" transform="translate(0 -0.12)" />
                    </G>
                </G>            
            </Svg>
        </View>
    )

}

export default likeIcon;

