// import {View , Text} from 'react-native';
// import { StyleSheet, Image, Platform } from 'react-native';
// import { Link } from 'expo-router';

// const marketplace = () => {
//   return (
//     <View style={{flex:1, justifyContent:"center",  backgroundColor: "grey"}}>
//       <Text style={{color:"black",fontSize:50}}>Marketplace</Text>
//       <Link href="../../sellproduct" style={styles.button}>
//         Sell Production
//       </Link>
//       <Link href="../../butmachine" style={styles.button}>
//         Buy Machinery
//       </Link>
//     </View>       
//   );
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "white",
//       alignItems: 'center',
//       justifyContent: 'center',
      
//     },
//     text: {
//       color: "red",
//     },
//     button: {
//       fontSize: 20,
//       backgroundColor: "white",
//       margin: 10,
//       padding: 10,
//       borderRadius: 10,
//       //textDecorationLine: 'underline',
//       color: 'Black',
//     },
//   });

// export default marketplace;



import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Marketplace = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Farmer's Marketplace</Text>
        <Text style={styles.subHeader}>Connect, Sell, Grow</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.marketButton}>
          <Link href="../../sellproduct" style={styles.linkStyle}>
            <View style={styles.buttonContent}>
              <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
              <Text style={styles.buttonText}>Sell Production</Text>
            </View>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.marketButton}>
          <Link href="../../butmachine" style={styles.linkStyle}>
            <View style={styles.buttonContent}>
              <Ionicons name="hammer-outline" size={24} color="#FFFFFF" />
              <Text style={styles.buttonText}>Buy Machinery</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Empowering Farmers, Connecting Markets</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8', // Soft blue-grey background
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: height * 0.05,
    backgroundColor: '#4CAF50', // Green header background
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  buttonContainer: {
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.05,
  },
  marketButton: {
    backgroundColor: '#2E7D32', // Darker green for buttons
    borderRadius: 15,
    marginVertical: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  linkStyle: {
    paddingVertical: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingVertical: height * 0.03,
    backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light green
  },
  bottomText: {
    color: '#2E7D32',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default Marketplace;