import React from 'react';

import PropTypes from 'prop-types';
import {
    Animated,
    Dimensions,
    Easing,
    Modal,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewPropTypes,
    TouchableOpacity
} from 'react-native';

import LikeIcon from '../SvgIcons/like.icon';
import PenIcon from '../SvgIcons/pen.icon';

const STATES = {
    HIDDEN: 'HIDDEN',
    ANIMATING: 'ANIMATING',
    SHOWN: 'SHOWN',
};

const ANIMATION_DURATION = 300;
const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const SCREEN_INDENT = 8;

class Menu extends React.Component {
    _container = null;

    state = {
        dish: null,
        menuState: STATES.HIDDEN,

        top: 0,
        left: 0,

        menuWidth: 0,
        menuHeight: 0,

        buttonWidth: 0,
        buttonHeight: 0,

        menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
        opacityAnimation: new Animated.Value(0),
    };

    _setContainerRef = ref => {
        this._container = ref;
    };

    // Start menu animation
    _onMenuLayout = e => {
        if (this.state.menuState === STATES.ANIMATING) {
            return;
        }

        const { width, height } = e.nativeEvent.layout;

        this.setState(
            {
                menuState: STATES.ANIMATING,
                menuWidth: width,
                menuHeight: height,
            },
            () => {
                Animated.parallel([
                    Animated.timing(this.state.menuSizeAnimation, {
                        toValue: { x: width, y: height },
                        duration: ANIMATION_DURATION,
                        easing: EASING,
                    }),
                    Animated.timing(this.state.opacityAnimation, {
                        toValue: 1,
                        duration: ANIMATION_DURATION,
                        easing: EASING,
                    }),
                ]).start();
            },
        );
    };

    // Save button width and height for menu layout
    _onButtonLayout = e => {
        const { width, height } = e.nativeEvent.layout;
        this.setState({ buttonWidth: width, buttonHeight: height });
    };

    show = (x, y, dish) => {
        /* this._container.measureInWindow((x, y) => {
          const top = Math.max(SCREEN_INDENT, y);
          const left = Math.max(SCREEN_INDENT, x);
          this.setState({ menuState: STATES.SHOWN, top, left });
        }); */
        const top = y;
        const left = x;
        this.setState({
            menuState: STATES.SHOWN, top, left
        });
        this.setState({
            dish: dish
        })
    };

    hide = () => {
        Animated.timing(this.state.opacityAnimation, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            easing: EASING,
        }).start(() => {
            // Reset state
            this.setState(
                {
                    menuState: STATES.HIDDEN,
                    menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
                    opacityAnimation: new Animated.Value(0),
                },
                () => {
                    // Invoke onHidden callback if defined
                    if (this.props.onHidden) {
                        this.props.onHidden();
                    }
                },
            );
        });
    };

    render() {
        const dimensions = Dimensions.get('screen');

        const {
            menuSizeAnimation,
            menuWidth,
            menuHeight,
            buttonWidth,
            buttonHeight,
            opacityAnimation,
        } = this.state;
        const menuSize = {
            width: menuSizeAnimation.x,
            height: menuSizeAnimation.y,
        };

        // Adjust position of menu
        let { left, top } = this.state;
        const transforms = [];

        // Flip by X axis if menu hits right screen border
        if (left > dimensions.width - menuWidth - SCREEN_INDENT) {
            transforms.push({
                translateX: Animated.multiply(menuSizeAnimation.x, -1),
            });

            left = Math.min(dimensions.width - SCREEN_INDENT, left + buttonWidth);
        }

        // Flip by Y axis if menu hits bottom screen border
        if (top > dimensions.height - menuHeight - SCREEN_INDENT) {
            transforms.push({
                translateY: Animated.multiply(menuSizeAnimation.y, -1),
            });

            top =
                Math.min(dimensions.height - SCREEN_INDENT, top + buttonHeight);
        }

        const shadowMenuContainerStyle = {
            opacity: opacityAnimation,
            transform: transforms,
            left,
            top,
        };

        const { menuState } = this.state;
        const animationStarted = menuState === STATES.ANIMATING;
        const modalVisible = menuState === STATES.SHOWN || animationStarted;

        const { testID, button, style } = this.props;

        return (
            <View ref={this._setContainerRef} collapsable={false} testID={testID}>
                <View onLayout={this._onButtonLayout}>{button}</View>

                <Modal
                    visible={modalVisible}
                    onRequestClose={this.hide}
                    supportedOrientations={[
                        'portrait',
                        'portrait-upside-down',
                        'landscape',
                        'landscape-left',
                        'landscape-right',
                    ]}
                    transparent
                    animationType="slide"
                >
                    <TouchableWithoutFeedback onPress={this.hide}>
                        <View style={StyleSheet.absoluteFill}>
                            <Animated.View
                                onLayout={this._onMenuLayout}
                                style={[
                                    styles.shadowMenuContainer,
                                    shadowMenuContainerStyle,
                                    ,
                                ]}
                            >
                                <Animated.View
                                    style={[styles.menuContainer, animationStarted && menuSize]}
                                >
                                    <View style={{backgroundColor:'#ffa000',borderRadius:4}}>
                                        <TouchableOpacity onPress={() => this.props.onPressLike(this.state.dish)} style={[style.container]} >
                                            <View style={{margin:10,}}><LikeIcon width={28.17} height={26.55} fill={'white'} /></View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.props.onPressReview(this.state.dish)} style={[style.container]} >
                                        <View style={{margin:10}}><PenIcon width={27.75} height={27.69} fill={'white'} /></View>
                                        </TouchableOpacity>
                                    </View>
                                </Animated.View>
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }
}

Menu.propTypes = {
    button: PropTypes.node.isRequired,
    onHidden: PropTypes.func,
    style: ViewPropTypes.style,
    testID: ViewPropTypes.testID,
    onPressLike: PropTypes.func,
    onPressReview: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        height: 48,
        justifyContent: 'center',
        maxWidth: 200,
        minWidth: 35,
    },
    shadowMenuContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 4,
        opacity: 0,
        // Shadow
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.14,
                shadowRadius: 2,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    menuContainer: {
        overflow: 'hidden',
    },
});

export default Menu;
