import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startHomeScreen = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30),
        Icon.getImageSource("ios-menu", 30)
    ]).then(sources => {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'HomeScreen', // unique ID registered with Navigation.registerScreen
                title: 'Home', // title of the screen as appears in the nav bar (optional)
                navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                navigatorButtons: {
                    leftButtons: [
                        {
                            icon: sources[2],
                            title: "Menu",
                            id: "sideDrawerToggle"
                        }
                    ]
                } // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            },
            drawer: {
                left: {
                    screen: "SideDrawer"
                }
            }
        });
    });
};

export default startHomeScreen;