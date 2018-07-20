import React from 'react';
import Svg, {
    Path
} from 'react-native-svg';
import { View } from "react-native";

const locationIcon = (props) => {
    return (
        <View>
            <Svg height="70"
                width="80"
                viewBox="0 0 360 512">
                <Path fill="#ffa000" d="M180,0C80.75,0,0,80.75,0,180a179.59,179.59,0,0,0,26.87,94.65L169.75,504.91A15,15,0,0,0,182.5,512h.12a15,15,0,0,0,12.75-7.29L334.61,272.22A179.72,179.72,0,0,0,360,180C360,80.75,279.25,0,180,0ZM308.87,256.82,182.27,468.19,52.37,258.85A149.8,149.8,0,0,1,29.8,180C29.8,97.29,97.29,29.8,180,29.8S330.1,97.29,330.1,180A149.85,149.85,0,0,1,308.87,256.82Z" transform="translate(0)" />
                <Path fill="#ffa000" d="M180,90a90,90,0,1,0,90,90A90,90,0,0,0,180,90Zm0,150.2a60.2,60.2,0,1,1,60.1-60.3v.1A60.24,60.24,0,0,1,180,240.2Z" transform="translate(0)" />            
            </Svg>
        </View>
    )

}

export default locationIcon;

