import axios from "axios";
import React, {Component} from "react";
import {Alert, Text, View, StyleSheet} from "react-native";

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

        return(
            <View style = {{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text>Tela de localização dos meteoros</Text>
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
   } 
})