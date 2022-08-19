import axios from "axios";
import React, {Component} from "react";
import {Text, View, ImageBackground, SafeAreaView,
        StatusBar, StyleSheet, Alert, Image} from "react-native";
import MapView, {Marker} from "react-native-maps";

export default class IssLocationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: {},
        }
    }

    componentDidMount(){
        this.getIssLocation();
    }

    getIssLocation = () => {
        axios
            .get("https://api.wheretheiss.at/v1/satellites/25544")
            .then(response => {
                this.setState({location: response.data})
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    render(){
        if(Object.keys(this.state.location).length === 0){
            return(
                <View style = {styles.loading}>
                    <Text>Carregando...</Text>
                </View>
            )
        } else {
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.areaSegura}/>
                <ImageBackground source={require("../assets/iss_bg.jpg")}
                                 style = {styles.espaco}>
                <View style = {styles.barraTitulo}>
                    <Text style = {styles.textTitle}>Tela de Localização da EEI</Text>
                </View>
                <View style={styles.lugarDoMapa}>
                    <MapView style = {styles.mapa}
                             region = {{
                                latitude: this.state.location.latitude,
                                longitude: this.state.location.longitude,
                                latitudeDelta: 100,
                                longitudeDelta: 100
                             }}      
                    >
                        <Marker coordinate={{
                                latitude: this.state.location.latitude,
                                longitude: this.state.location.longitude,
                        }}>
                            <Image source={require("../assets/iss_icon.png")}
                                   style = {styles.icone}/>
                        </Marker>
                    </MapView>
                </View>
                <View style = {styles.infoContainer}>
                    <Text style = {styles.infoText}>Latitude: {this.state.location.latitude}</Text>
                    <Text style = {styles.infoText}>Longitude: {this.state.location.longitude}</Text>
                    <Text style = {styles.infoText}>Altitude (km): {this.state.location.altitude}</Text>
                    <Text style = {styles.infoText}>Velocidade (km/h): {this.state.location.velocity}</Text>
                </View>  
                </ImageBackground>  
            </View>
        )
    }
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textTitle: {
        fontSize: 30,
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
    espaco: {
        flex: 1,
        resizeMode: "cover"
    },
    lugarDoMapa: {
        flex: 0.6
    },
    mapa: {
        width: "100%",
        height: "100%"
    },
    icone: {
        width: 50,
        height: 50
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: "white",
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    }
})