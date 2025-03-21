import {View , Text} from 'react-native';
import { StyleSheet, Image, Platform } from 'react-native';
import { Link } from 'expo-router';

const marketplace = () => {
  return (
    <View style={{flex:1, justifyContent:"center",  backgroundColor: "grey"}}>
      <Text style={{color:"black",fontSize:50}}>Marketplace</Text>
      <Link href="/explore" style={styles.button}>
        Sell Production
      </Link>
      <Link href="/chatbot" style={styles.button}>
        Buy Machinery
      </Link>
    </View>       
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    text: {
      color: "red",
    },
    button: {
      fontSize: 20,
      backgroundColor: "white",
      margin: 10,
      padding: 10,
      borderRadius: 10,
      //textDecorationLine: 'underline',
      color: 'Black',
    },
  });

export default marketplace;