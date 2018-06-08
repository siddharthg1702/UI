import React from 'react';
import { ListView,StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Left,Right,Body,Title,Icon, List, ListItem, Text } from 'native-base';
const curriculum = [
  'Nature',
  'Lifestyle',
  'Culture',
  'WildLife',
  'Language',
  'Behaviour'
];

export class Curriculum extends React.Component {


  
  constructor(props){
      super(props);
      this.dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!= r2});
      this.state={
          basic:true,
          listViewData:curriculum
      };
    }

    deleteRow(secId,rowId,rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }

  
    
  

  render() {
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});

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
              <Title>Curriculum</Title>
          </Body>
          <Right />
        </Header>
        
        <Content>
          <List disableRightSwipe={true}
            dataSource={this.dataSource.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem style={{justifyContent:'space-between'}}>
                <Text> {data} </Text>
                <Icon active name="download"/>
              </ListItem>}
            
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>
      </Container>
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