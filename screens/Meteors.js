import axios from "axios";
import React, {Component} from "react";
import {Alert, Text, View, StyleSheet, SafeAreaView,
        FlatList, Image, ImageBackground, Dimensions,
        StatusBar} from "react-native";

export default class MeteorsScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            meteors: {}
        }
    }

    componentDidMount(){
        this.getMeteors();
    }


    getMeteors = () => {
        axios
        .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=oPDaMFkUOTWW5hvSXQvEs4lPzwzZPRQHB2sDUOAG")
        .then(response => {
            this.setState({meteors: response.data.near_earth_objects})
        })
        .catch(error => {
            Alert.alert(error.message);
        })
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => {
        let meteor = item;
        let imagemFundo, velocidade, tamanho;
        if(meteor.ameacaPont <= 30){
            imagemFundo = require("../assets/meteor_bg1.png");
            velocidade = require("../assets/meteor_speed1.gif");
            tamanho = 100;
        } else if(meteor.ameacaPont <= 75){
            imagemFundo = require("../assets/meteor_bg2.png");
            velocidade = require("../assets/meteor_speed2.gif");
            tamanho = 150;
        } else {
            imagemFundo = require("../assets/meteor_bg3.png");
            velocidade = require("../assets/meteor_speed3.gif");
            tamanho = 200;
        }
        return(
            <View>
                <ImageBackground source={imagemFundo} style = {styles.backgroundImage}>
                    <View style = {styles.gifContainer}>
                       <Image source={velocidade} style = {{width: tamanho, height: tamanho, alignSelf: "center"}}></Image>
                    </View>
                    <View>
                        <Text style = {styles.cardTitle}>{item.name}</Text>
                        <Text style = {[styles.cardText,{marginTop: 20}]}>Mais Próximo da Terra - {item.close_approach_data[0].close_approach_date_full}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Diâmetro Mínimo (km) - {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Diâmetro Máximo (km) - {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Velocidade (km/h) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                        <Text style = {[styles.cardText,{marginTop: 5}]}>Distância da Terra (km) - {item.close_approach_data[0].miss_distance.kilometers}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
    
    render(){;
        if(Object.keys(this.state.meteors).length === 0){
            return(
                <View style = {styles.loading}>
                    <Text>Carregando...</Text>
                </View>
            )
        } else {
            let matrizMeteor = Object.keys(this.state.meteors).map(dadosMeteors => {
                return this.state.meteors[dadosMeteors]
            })
            let meteors = [].concat.apply([],matrizMeteor)

            meteors.forEach(function(element){
                let diametroMedio = 
                (element.estimated_diameter.kilometers.estimated_diameter_min + 
                 element.estimated_diameter.kilometers.estimated_diameter_max) / 2;

                let pontAmeaca =
                (diametroMedio / element.close_approach_data[0].miss_distance.kilometers)
                * 1000000000;

                element.ameacaPont = pontAmeaca;
            })
            meteors.sort(function(a,b){
                return b.ameacaPont - a.ameacaPont;
            });
            meteors = meteors.slice(0,5);
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.areaSegura}/>
                <FlatList
                 keyExtractor={this.keyExtractor}
                 data={meteors}
                 renderItem={this.renderItem}
                 horizontal={true}/>
            </View>
        )
    }
}
}

const styles = StyleSheet.create({
   loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
   },
   container: {
    flex: 1
   },
   areaSegura: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
   },
   backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
},
titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center"
},
titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
},
meteorContainer: {
    flex: 0.85
},
listContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 10
},
cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15
},
cardText: {
    color: "white",
    marginLeft: 15,
    marginBottom: 10,
},
threatDetector: {
    height: 10,
    marginBottom: 10
},
gifContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
},
meteorDataContainer: {
    justifyContent: "center",
    alignItems: "center",

}
})