import React, { Component } from 'react';
import { View, 
        Text, 
        Button, 
        StyleSheet, 
        KeyboardAvoidingView, 
        Keyboard,
        TouchableWithoutFeedback,
        ActivityIndicator
    } from 'react-native';
import {connect} from 'react-redux';

import { tryAuth, authAutoSignIn } from '../../actions/auth.action';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';

class AuthScreen extends Component {
    state = {
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            }
        }
    };

    componentDidMount() {
        this.props.onAutoSignIn();
    }
    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData, this.state.authMode);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            }
        })
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === "password"
                                ? validate(
                                    prevState.controls.confirmPassword.value,
                                    prevState.controls.confirmPassword.validationRules,
                                    connectedValue
                                )
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };

    render() {
        let confirmPasswordControl = null;
        let submitButton = (
            <ButtonWithBackground
                color="#29aaf4"
                onPress={this.authHandler}
                disabled={
                    !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' ||
                    !this.state.controls.email.valid ||
                    !this.state.controls.password.valid
                }
            >
                Submit
            </ButtonWithBackground>
        )
        if(this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <DefaultInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched}
                    secureTextEntry
                />
            )
        }

        if(this.props.isLoading) {
            submitButton = <ActivityIndicator />;
        }
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
                <ButtonWithBackground 
                    color="#29aaf4" 
                    onPress={this.switchAuthModeHandler}>
                    Switch to {this.state.authMode === 'login'? 'Sign up' : 'Login'}
                </ButtonWithBackground>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inputContainer}>
                        <DefaultInput
                            placeholder="Your E-Mail Address"
                            style={styles.input}
                            value = {this.state.controls.email.value}
                            onChangeText = {(val) => this.updateInputState('email', val)}
                            valid = {this.state.controls.email.valid}
                            touched = {this.state.controls.email.touched}
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            keyboardType = "email-address"
                        />
                        <DefaultInput 
                            placeholder="Password" 
                            style={styles.input} 
                            value={this.state.controls.password.value}
                            onChangeText={(val) => this.updateInputState('password', val)}
                            valid={this.state.controls.password.valid}
                            touched={this.state.controls.password.touched}
                            secureTextEntry
                        />
                        {confirmPasswordControl}
                    </View>
                </TouchableWithoutFeedback>
                {submitButton}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    }
});

const mapsStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

const mapsDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

export default connect(mapsStateToProps, mapsDispatchToProps)(AuthScreen);