import React, {Component} from "react";
import {Text, View, StyleSheet, SafeAreaView, StatusBar, Platform,
        TouchableOpacity, ImageBackground, Image} from "react-native";

export default class HomeScreen extends Component {
    render(){
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.areaSegura}/>
                <ImageBackground source={require("../assets/bg_image.png")}
                                 style = {styles.espaco}>
                <View style = {styles.barraTitulo}>
                    <Text style = {styles.textTitle}>Informações Espaciais</Text>
                </View>
                <TouchableOpacity style = {styles.botao}
                                  onPress={()=>this.props.navigation.navigate("IssLocation")}>
                    <Text style = {styles.textoBotao}>Localização da EEI</Text>
                    <Text style = {styles.saibaMais}>{"Saiba Mais --->"}</Text>
                    <Text style = {styles.numero}>1</Text>
                    <Image source={require("../assets/iss_icon.png")}
                           style = {styles.icone}></Image>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.botao}
                                  onPress={()=>this.props.navigation.navigate("Meteors")}>
                    <Text style = {styles.textoBotao}>Meteoros</Text>
                    <Text style = {styles.saibaMais}>{"Saiba Mais --->"}</Text>
                    <Text style = {styles.numero}>2</Text>
                    <Image source={require("../assets/meteor_icon.png")}
                           style = {styles.icone}></Image>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textTitle: {
        fontSize: 33,
        fontWeight: "bold",
        color: "white"
    },
    areaSegura: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    barraTitulo: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    botao: {
        flex: 0.25,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        borderRadius: 30,
        backgroundColor: "white"
    },
    textoBotao: {
        fontSize: 28,
        fontWeight: "bold",
        color: "black",
        marginTop: 75,
        paddingLeft: 30
    },
    espaco: {
        flex: 1,
        resizeMode: "cover"
    },
    saibaMais: {
        paddingLeft: 30,
        color: "red",
        fontSize: 15
    },
    numero: {
        position: "absolute",
        color: "rgba(183,183,183,0.5)",
        fontSize: 150,
        right: 20,
        bottom: -15,
        zIndex: -1
    },
    icone: {
        position: "absolute",
        height: 200,
        width: 200,
        resizeMode: "contain",
        right: 20,
        top: -80
    }
})