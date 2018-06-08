import React from 'react';
import { StyleSheet,StatusBar,Button, Text, View } from 'react-native';

export class Splash extends React.Component {


  static navigationOptions = {
    header:null,
  };

  constructor(props){
      super(props)
  }

  componentDidMount(){
    setTimeout(()=>{
        this.props.navigation.navigate("Navigation");
    },500);  
    
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Text style={styles.text}>Autism App</Text>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90a9d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
      fontSize:25,
      fontWeight:'bold'
  }
});