import React from 'react';
import {StatusBar,StyleSheet,View} from "react-native";
import BarChart from './BarChart';

import { Button,
    Text,
    Container,
    Card,
    CardItem,
    Body,
    Content,
    Header,
    Title,
    Left,
    Icon,
    Right
} from 'native-base';
const colors = {
    chartBlue:'#4286F5',
    chartRed:'#DC4437',
    chartYellow:'#F5B400'
  }
export class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
    
        var chart = {
          values: [
            [100,80, 90, 130, 90],
            [80, 60, 80, 70, 60],
            [-20, -55, -50, -25, -10]
          ],
          colors: {
            labelsColor : ['#4286F5', '#DC4437', '#F5B400'],
            axisColor : 'rgba(216, 216, 216, 1)',
          },
          labels: ['CORRECT', 'PARTIAL', 'INCORRECT'],
          selected: null,
             axis: ['FEB', 'MAR', 'APR', 'MAY', 'JUNE'],
        }
    
        let count = [
          0,
          0,
          0,
        ];
    
        chart.values.forEach((data,index) => {
            data.forEach((elem) => {
                count[index] += elem;
            });
        });
    
        this.state = {
          chart : chart,
          count: count,
        }
    
        this.selectChart = this.selectChart.bind(this);
      }
    
      selectChart(index) {
        let chart = this.state.chart;
        chart["selected"] = index;
        this.setState({chart:chart});
      }
      removeSelected(){
        let chart = this.state.chart;
        chart["selected"] = null
        this.setState({chart:chart});
      }
    

  render() {

    const {chart,count} = this.state;
    const labels = count.map((elem, index) => {
        let value = elem;
        let color = {color : chart.colors.labelsColor[index]};
        let borderColor = {borderColor : chart.colors.labelsColor[index]};
        let border = {};
        if(index==1){
          border= {borderLeftWidth : 0.5,borderRightWidth : 0.5};
        }
        if(chart.selected != null)
          value = chart.values[index][chart.selected];

        return (
          <View key={index} style={[styles.listItemRow,border]}>
            <Text style={[styles.listItemRowTextTitle,color]}>{chart.labels[index]}</Text>
            <View style={[styles.listItemRowSeparator,borderColor]}></View>
            <Text style={[styles.listItemRowTextValue]}>{value}</Text>
          </View>
        )
      })

    let subtitle = "FROM " + chart.axis[0] + " TO " + chart.axis[chart.axis.length-1];
    let buttonRemoveSelected = null;
    if(chart.selected != null){
      subtitle = "IN " + chart.axis[chart.selected];
    }


    return (
      <Container>
          <Header>
              <Left>
                <Button
                    transparent
                    onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    >
                        <Icon name="menu" />
                </Button>
              </Left>
              <Body>
                  <Title>Autism App</Title>
              </Body>
              <Right />
            </Header>
            <Content>
                <View style={styles.container}>
                    <View style={styles.card}>
                    <BarChart onPressItem={this.selectChart} height={300} chart={chart} />
                    <View style={[styles.listSubtitle]}>
                        <Text style={[styles.listSubtitleText]}>{subtitle}</Text>
                    </View>
                    <View style={[styles.listItemColumn]}>
                        {labels}
                    </View>
                    </View>
                </View>
            </Content>
      </Container>
    
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 20,
    },
    card: {
      borderRadius : 0,
      borderWidth : 0.5,
      borderColor: 'lightgray',
      backgroundColor : '#FFF',
      margin: 8,
    },
    listHeaderText: {
      fontSize: 16,
    },
    listHeader: {
      display: 'flex',
      paddingTop: 10,
      paddingBottom: 20,
      paddingLeft: 15,
      paddingBottom: 10,
      borderBottomWidth:0.5,
      borderColor:'lightgray',
    },
    listSubtitle: {
  	  display: 'flex',
      paddingTop: 8,
      paddingBottom: 20,
      paddingLeft: 15,
      paddingBottom: 8,
      borderTopWidth:0.5,
      borderColor:'lightgray',
      flexDirection: 'row',
    },
    listSubtitleText: {
      fontSize: 13,
      textAlign: 'center',
      flex: 1,
    },
    listItemColumn: {
      borderTopWidth:0.5,
      borderColor:'lightgray',
      display: 'flex',
      flexDirection: 'row',
    },
    listItemRow: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      borderColor: 'lightgray',
      borderBottomWidth: 0.5,
    },
    listItemRowTextTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
      paddingTop: 3,
      paddingBottom: 3,
    },
    listItemRowSeparator: {
      borderTopWidth: 2,
    },
    listItemRowTextValue: {
      textAlign: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: 14,
    },
  });
