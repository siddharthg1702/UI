import React,{Component} from "react";
import {NetInfo, View} from 'react-native';
import Test123 from './Test';
import {LoginScreen} from './Components/HomeScreen/LoginScreen';
import {Splash} from './Components/SplashScreen/Splash';
import {Service} from './Services/DBServices';
//import { HomeScreen } from "./Components/HomeScreen/HomeScreen";
import Home from "./Components/HomeScreen/index";
import {createStackNavigator, StackNavigator, NavigationAction} from 'react-navigation';
import {NodeService} from './Services/NodeService';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isReady:false, 
      isOnline: false,
      isLogin: false,
    };
  }

  static navigationOptions={
    header:null
  }

  componentWillMount(){
    console.log("I have been called");

    Service.initDB();

    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
      if(isConnected) {
        this.setState({isOnline: true});
      }
      Service.checkLogin((dbResponse) => {
        if(dbResponse == 1) {
          //console.log("In checkLogin");                               //Logged in + Internet
          // NodeService.fetchUpdate("Infoview",(data)=>{
          //   console.log("Data from latestUpdate call "+data);
          //   this.setState({isLogin: true});

          // });
          this.setState({isReady:true});
          console.log('isLogin set True');
          //navigate('Home');
          this.props.navigation.navigate("Home");
        }
        else
        {
          if(this.state.isOnline)                           //Not Logged in + Internet
          {
            this.setState({isReady:true});
            //navigate('Login');
            console.log('Should Display Login Screen');
            this.props.navigation.navigate("Login");
            
          }
          else {                                            //Not Logged in + No Internet
            alert('No INTERNET');
          }
        }
      });
    });    
  }

  render(){

    // if(this.state.isReady)
    // {
    //   return (
    //     <View style={{width:"100%",height:"100%"}}>
    //         <Routes/>
    //     </View> 
    //   )
    // }
    
    return (
      <View style={{width:"100%",height:"100%"}}>
        <Splash />
      </View> 
    )
    
  }
}

export default Routes = StackNavigator({
  App: {screen : App},
  Home:{screen:Home},
  Login:{screen:LoginScreen},
},{
  initialRouteName: 'App',
  headerMode:'none'
});