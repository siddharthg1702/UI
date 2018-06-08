import React, { Component } from "react";
import {HomeScreen} from './Components/HomeScreen/HomeScreen';
import {Drawer} from './Components/Drawer/Drawer';
import {Curriculum} from './Components/DrawerItems/Curriculum';
import { DrawerNavigator } from "react-navigation";
import {Activity} from './Components/Activity/Activity';
import {ImageScreen} from './Components/ImageScreen/ImageScreen';
const HomeScreenRouter =  DrawerNavigator(
  {
   Home:{screen:HomeScreen},
   Curriculum:{screen:Curriculum},
   Activity: {screen: Activity},
   ImageScreen:{screen:ImageScreen}
},{
  contentComponent: props => <Drawer {...props} />
});

export default HomeScreenRouter;
