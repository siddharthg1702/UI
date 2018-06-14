import React,{Component} from "react";
import HomeScreen from "./HomeScreen.js";
import {Drawer} from '../Drawer/Drawer';
import {Curriculum} from '../DrawerItems/Curriculum';    
import { DrawerNavigator } from "react-navigation";
import {Activity} from '../Activity/Activity';
import {ImageScreen} from '../ImageScreen/ImageScreen';
import {PairScreen} from '../PairScreen/Pair';
import {Login} from '../LoginScreen/Login';

const HomeScreenRouter =  DrawerNavigator(
  {
   Home:{screen:HomeScreen},
   Curriculum:{screen:Curriculum},
   Activity: {screen: Activity},
   ImageScreen:{screen:ImageScreen},
   Pair:{screen:PairScreen}
},{
  contentComponent: props => <Drawer {...props} />
});

export default HomeScreenRouter;