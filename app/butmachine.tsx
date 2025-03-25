// import React, { useState } from 'react';
// import { 
//   StyleSheet, 
//   Text, 
//   View, 
//   FlatList, 
//   Image, 
//   TouchableOpacity, 
//   Modal, 
//   ScrollView, 
//   SafeAreaView, 
//   StatusBar 
// } from 'react-native';

// // Hardcoded machinery data
// const MACHINERY_DATA = [
//   {
//     id: '1',
//     name: 'Tractor XL-2000',
//     image: 'assets\images\icon.png', // Replace with your image or use require('./assets/excavator.jpg')
//     price: 75000,
//     rentPrice: 750,
//     description: 'Heavy-duty excavator suitable for construction sites and large-scale digging operations. Features include climate-controlled cabin, GPS tracking, and fuel-efficient engine.',
//     specifications: {
//       weight: '20 tons',
//       power: '176 HP',
//       fuelCapacity: '300 liters',
//       maxDiggingDepth: '6.5 meters',
//       yearManufactured: '2023'
//     }
//   },
//   {
//     id: '2',
//     name: 'Bulldozer B-450',
//     image: 'assets\images\bulldozer.jpg', // Replace with your image
//     price: 85000,
//     rentPrice: 850,
//     description: 'Powerful bulldozer with reinforced blade and advanced hydraulic system. Perfect for land clearing, grading, and material handling.',
//     specifications: {
//       weight: '25 tons',
//       power: '260 HP',
//       fuelCapacity: '420 liters',
//       bladeWidth: '4.2 meters',
//       yearManufactured: '2022'
//     }
//   },
//   {
//     id: '3',
//     name: 'Harvestor CT-1500',
//     image: 'assets\images\harvestor.jpg', // Replace with your image
//     price: 120000,
//     rentPrice: 1200,
//     description: 'High-rise tower crane with maximum height of 80 meters. Features computerized load management and wind resistance technology.',
//     specifications: {
//       maxHeight: '80 meters',
//       maxLoad: '12 tons',
//       counterWeight: '15 tons',
//       powerSource: 'Electric',
//       yearManufactured: '2024'
//     }
//   },
//   {
//     id: '4',
//     name: 'Harrow CM-800',
//     image: 'assets\images\harrows.png', // Replace with your image
//     price: 45000,
//     rentPrice: 400,
//     description: 'Industrial concrete mixer with 800-liter capacity. Equipped with automatic batching system and digital controls.',
//     specifications: {
//       capacity: '800 liters',
//       power: '85 HP',
//       mixingSpeed: '18 rpm',
//       weight: '3.5 tons',
//       yearManufactured: '2023'
//     }
//   },
//   {
//     id: '5',
//     name: 'Thresher F-3000',
//     image: 'assets\images\thresher.jpg', // Replace with your image
//     price: 35000,
//     rentPrice: 300,
//     description: 'Versatile forklift with 3-ton lifting capacity. Features include electric powertrain, ergonomic controls, and extended battery life.',
//     specifications: {
//       liftingCapacity: '3 tons',
//       maxHeight: '6 meters',
//       weight: '4.8 tons',
//       powerSource: 'Electric',
//       batteryLife: '10 hours',
//       yearManufactured: '2024'
//     }
//   },
// ];

// export default function MachineryListingScreen() {
//   const [selectedMachinery, setSelectedMachinery] = useState<typeof MACHINERY_DATA[0] | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [confirmationModal, setConfirmationModal] = useState({
//     visible: false,
//     type: '', // 'buy' or 'rent'
//   });

//   const openMachineryDetails = (item: typeof MACHINERY_DATA[0]) => {
//     setSelectedMachinery(item);
//     setModalVisible(true);
//   };

//   const handleBuyOrRent = (type: 'buy' | 'rent') => {
//     setModalVisible(false);
//     setConfirmationModal({
//       visible: true,
//       type: type,
//     });
//   };

//   const closeConfirmationModal = () => {
//     setConfirmationModal({
//       visible: false,
//       type: '',
//     });
//     // In a real app, you might navigate to a payment screen or show another form
//   };

//   const renderMachineryItem = ({ item }: { item: typeof MACHINERY_DATA[0] }) => (
//     <TouchableOpacity
//       style={styles.machineryCard}
//       onPress={() => openMachineryDetails(item)}
//     >
//       <Image
//         source={{ uri: item.image }}
//         style={styles.machineryImage}
//         resizeMode="cover"
//       />
//       <View style={styles.machineryInfo}>
//         <Text style={styles.machineryName}>{item.name}</Text>
//         <Text style={styles.machineryPrice}>Buy: ${item.price.toLocaleString()}</Text>
//         <Text style={styles.machineryRentPrice}>Rent: ${item.rentPrice}/day</Text>
//         <TouchableOpacity 
//           style={styles.viewDetailsButton}
//           onPress={() => openMachineryDetails(item)}
//         >
//           <Text style={styles.viewDetailsButtonText}>View Details</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
      
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Industrial Machinery</Text>
//       </View>
      
//       <FlatList
//         data={MACHINERY_DATA}
//         renderItem={renderMachineryItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
      
//       {/* Machinery Details Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {selectedMachinery && (
//               <ScrollView>
//                 <TouchableOpacity 
//                   style={styles.closeButton} 
//                   onPress={() => setModalVisible(false)}
//                 >
//                   <Text style={styles.closeButtonText}>✕</Text>
//                 </TouchableOpacity>
                
//                 <Image
//                   source={{ uri: selectedMachinery.image }}
//                   style={styles.modalImage}
//                   resizeMode="contain"
//                 />
                
//                 <Text style={styles.modalTitle}>{selectedMachinery.name}</Text>
                
//                 <View style={styles.priceContainer}>
//                   <Text style={styles.buyPrice}>
//                     Purchase Price: ${selectedMachinery.price.toLocaleString()}
//                   </Text>
//                   <Text style={styles.rentPrice}>
//                     Rental Rate: ${selectedMachinery.rentPrice}/day
//                   </Text>
//                 </View>
                
//                 <Text style={styles.sectionTitle}>Description</Text>
//                 <Text style={styles.description}>{selectedMachinery.description}</Text>
                
//                 <Text style={styles.sectionTitle}>Specifications</Text>
//                 <View style={styles.specificationsContainer}>
//                   {Object.entries(selectedMachinery.specifications).map(([key, value]) => (
//                     <View style={styles.specRow} key={key}>
//                       <Text style={styles.specLabel}>
//                         {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
//                       </Text>
//                       <Text style={styles.specValue}>{value}</Text>
//                     </View>
//                   ))}
//                 </View>
                
//                 <View style={styles.buttonContainer}>
//                   <TouchableOpacity
//                     style={[styles.actionButton, styles.buyButton]}
//                     onPress={() => handleBuyOrRent('buy')}
//                   >
//                     <Text style={styles.actionButtonText}>Buy Now</Text>
//                   </TouchableOpacity>
                  
//                   <TouchableOpacity
//                     style={[styles.actionButton, styles.rentButton]}
//                     onPress={() => handleBuyOrRent('rent')}
//                   >
//                     <Text style={styles.actionButtonText}>Rent This Machinery</Text>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView>
//             )}
//           </View>
//         </View>
//       </Modal>
      
//       {/* Confirmation Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={confirmationModal.visible}
//         onRequestClose={() => closeConfirmationModal()}
//       >
//         <View style={styles.confirmModalOverlay}>
//           <View style={styles.confirmModalContent}>
//             <Text style={styles.confirmTitle}>
//               {confirmationModal.type === 'buy' 
//                 ? 'Confirm Purchase' 
//                 : 'Confirm Rental'}
//             </Text>
            
//             <Text style={styles.confirmText}>
//               {confirmationModal.type === 'buy'
//                 ? `You are about to purchase ${selectedMachinery?.name} for $${selectedMachinery?.price.toLocaleString()}.`
//                 : `You are about to rent ${selectedMachinery?.name} for $${selectedMachinery?.rentPrice}/day.`}
//             </Text>
            
//             <Text style={styles.confirmSubtext}>
//               In a real app, this would proceed to payment details.
//             </Text>
            
//             <View style={styles.confirmButtonsContainer}>
//               <TouchableOpacity
//                 style={[styles.confirmButton, styles.cancelButton]}
//                 onPress={() => closeConfirmationModal()}
//               >
//                 <Text style={styles.confirmButtonText}>Cancel</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity
//                 style={[styles.confirmButton, styles.proceedButton]}
//                 onPress={() => closeConfirmationModal()}
//               >
//                 <Text style={styles.confirmButtonText}>
//                   {confirmationModal.type === 'buy' ? 'Proceed to Payment' : 'Confirm Rental'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     backgroundColor: '#2a2a2a',
//     padding: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//   },
//   listContainer: {
//     padding: 10,
//   },
//   machineryCard: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginBottom: 15,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.15,
//     shadowRadius: 2,
//     flexDirection: 'row',
//     height: 150,
//   },
//   machineryImage: {
//     width: 150,
//     height: '100%',
//     backgroundColor: '#e1e1e1',
//   },
//   machineryInfo: {
//     flex: 1,
//     padding: 12,
//     justifyContent: 'space-between',
//   },
//   machineryName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#333',
//   },
//   machineryPrice: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#0066cc',
//   },
//   machineryRentPrice: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 5,
//   },
//   viewDetailsButton: {
//     backgroundColor: '#2a2a2a',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 4,
//     alignSelf: 'flex-start',
//   },
//   viewDetailsButtonText: {
//     color: '#fff',
//     fontWeight: '500',
//     fontSize: 14,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     width: '90%',
//     maxHeight: '90%',
//     padding: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   closeButton: {
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     zIndex: 1,
//     padding: 10,
//   },
//   closeButtonText: {
//     fontSize: 24,
//     color: '#555',
//     fontWeight: 'bold',
//   },
//   modalImage: {
//     width: '100%',
//     height: 200,
//     marginBottom: 15,
//     borderRadius: 8,
//     backgroundColor: '#f0f0f0',
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//   },
//   priceContainer: {
//     backgroundColor: '#f8f8f8',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   buyPrice: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#0066cc',
//     marginBottom: 5,
//   },
//   rentPrice: {
//     fontSize: 16,
//     color: '#666',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//     marginTop: 5,
//   },
//   description: {
//     fontSize: 15,
//     lineHeight: 22,
//     color: '#444',
//     marginBottom: 15,
//   },
//   specificationsContainer: {
//     backgroundColor: '#f8f8f8',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   specRow: {
//     flexDirection: 'row',
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   specLabel: {
//     flex: 1,
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#555',
//   },
//   specValue: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   actionButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 6,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   buyButton: {
//     backgroundColor: '#0066cc',
//   },
//   rentButton: {
//     backgroundColor: '#ff9500',
//   },
//   actionButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   confirmModalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   confirmModalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     width: '80%',
//     padding: 25,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   confirmTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   confirmText: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   confirmSubtext: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 20,
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   confirmButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   confirmButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 6,
//     alignItems: 'center',
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   cancelButton: {
//     backgroundColor: '#e0e0e0',
//   },
//   proceedButton: {
//     backgroundColor: '#00cc66',
//   },
//   confirmButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });










// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Modal,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';

// const MACHINERY_DATA = [
//     {
//       id: '1',
//       name: 'Tractor XL-2000',
//       image: 'assets\images\icon.png', // Replace with your image or use require('./assets/excavator.jpg')
//       price: 75000,
//       rentPrice: 750,
//       description: 'Heavy-duty excavator suitable for construction sites and large-scale digging operations. Features include climate-controlled cabin, GPS tracking, and fuel-efficient engine.',
//       specifications: {
//         weight: '20 tons',
//         power: '176 HP',
//         fuelCapacity: '300 liters',
//         maxDiggingDepth: '6.5 meters',
//         yearManufactured: '2023'
//       }
//     },
//     {
//       id: '2',
//       name: 'Bulldozer B-450',
//       image: 'assets\images\bulldozer.jpg', // Replace with your image
//       price: 85000,
//       rentPrice: 850,
//       description: 'Powerful bulldozer with reinforced blade and advanced hydraulic system. Perfect for land clearing, grading, and material handling.',
//       specifications: {
//         weight: '25 tons',
//         power: '260 HP',
//         fuelCapacity: '420 liters',
//         bladeWidth: '4.2 meters',
//         yearManufactured: '2022'
//       }
//     },
//     {
//       id: '3',
//       name: 'Harvestor CT-1500',
//       image: 'assets\images\harvestor.jpg', // Replace with your image
//       price: 120000,
//       rentPrice: 1200,
//       description: 'High-rise tower crane with maximum height of 80 meters. Features computerized load management and wind resistance technology.',
//       specifications: {
//         maxHeight: '80 meters',
//         maxLoad: '12 tons',
//         counterWeight: '15 tons',
//         powerSource: 'Electric',
//         yearManufactured: '2024'
//       }
//     },
//     {
//       id: '4',
//       name: 'Harrow CM-800',
//       image: 'assets\images\harrows.png', // Replace with your image
//       price: 45000,
//       rentPrice: 400,
//       description: 'Industrial concrete mixer with 800-liter capacity. Equipped with automatic batching system and digital controls.',
//       specifications: {
//         capacity: '800 liters',
//         power: '85 HP',
//         mixingSpeed: '18 rpm',
//         weight: '3.5 tons',
//         yearManufactured: '2023'
//       }
//     },
//     {
//       id: '5',
//       name: 'Thresher F-3000',
//       image: 'assets\images\thresher.jpg', // Replace with your image
//       price: 35000,
//       rentPrice: 300,
//       description: 'Versatile forklift with 3-ton lifting capacity. Features include electric powertrain, ergonomic controls, and extended battery life.',
//       specifications: {
//         liftingCapacity: '3 tons',
//         maxHeight: '6 meters',
//         weight: '4.8 tons',
//         powerSource: 'Electric',
//         batteryLife: '10 hours',
//         yearManufactured: '2024'
//       }
//     },
//   ];

// export default function MachineryListingScreen() {
//   const [selectedMachinery, setSelectedMachinery] = useState<typeof MACHINERY_DATA[0] | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [confirmationModal, setConfirmationModal] = useState({ visible: false, type: '' });

//   const openMachineryDetails = (item: typeof MACHINERY_DATA[0]) => {
//     setSelectedMachinery(item);
//     setModalVisible(true);
//   };

//   const handleBuyOrRent = (type: 'buy' | 'rent') => {
//     setModalVisible(false);
//     setConfirmationModal({ visible: true, type });
//   };

//   const closeConfirmationModal = () => {
//     setConfirmationModal({ visible: false, type: '' });
//   };

//   const renderMachineryItem = ({ item }: { item: typeof MACHINERY_DATA[0] }) => (
//     <TouchableOpacity
//       style={styles.machineryCard}
//       onPress={() => openMachineryDetails(item)}
//     >
//       <Image
//         source={{ uri: item.image }}
//         style={styles.machineryImage}
//         resizeMode="cover"
//       />
//       <View style={styles.machineryInfo}>
//         <Text style={styles.machineryName}>{item.name}</Text>
//         <Text style={styles.machineryPrice}>Buy: ₹{item.price.toLocaleString()}</Text>
//         <Text style={styles.machineryRentPrice}>Rent: ₹{item.rentPrice}/day</Text>
//         <TouchableOpacity style={styles.viewDetailsButton} onPress={() => openMachineryDetails(item)}>
//           <Text style={styles.viewDetailsButtonText}>View Details</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Indian Farm Machinery</Text>
//       </View>

//       <FlatList
//         data={MACHINERY_DATA}
//         renderItem={renderMachineryItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//       />

//       <Modal animationType="slide" transparent visible={modalVisible}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {selectedMachinery && (
//               <ScrollView>
//                 <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//                   <Text style={styles.closeButtonText}>✕</Text>
//                 </TouchableOpacity>
//                 <Image
//                   source={{ uri: selectedMachinery.image }}
//                   style={styles.modalImage}
//                   resizeMode="contain"
//                 />

//                 <Text style={styles.modalTitle}>{selectedMachinery.name}</Text>

//                 <View style={styles.priceContainer}>
//                   <Text style={styles.buyPrice}>Buy: ₹{selectedMachinery.price.toLocaleString()}</Text>
//                   <Text style={styles.rentPrice}>Rent: ₹{selectedMachinery.rentPrice}/day</Text>
//                 </View>

//                 <Text style={styles.sectionTitle}>Description</Text>
//                 <Text style={styles.description}>{selectedMachinery.description}</Text>

//                 <Text style={styles.sectionTitle}>Specifications</Text>
//                 <View style={styles.specificationsContainer}>
//                   {Object.entries(selectedMachinery.specifications).map(([key, value]) => (
//                     <View style={styles.specRow} key={key}>
//                       <Text style={styles.specLabel}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</Text>
//                       <Text style={styles.specValue}>{value}</Text>
//                     </View>
//                   ))}
//                 </View>

//                 <View style={styles.buttonContainer}>
//                   <TouchableOpacity style={[styles.actionButton, styles.buyButton]} onPress={() => handleBuyOrRent('buy')}>
//                     <Text style={styles.actionButtonText}>Buy</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity style={[styles.actionButton, styles.rentButton]} onPress={() => handleBuyOrRent('rent')}>
//                     <Text style={styles.actionButtonText}>Rent</Text>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView>
//             )}
//           </View>
//         </View>
//       </Modal>

//       <Modal animationType="fade" transparent visible={confirmationModal.visible}>
//         <View style={styles.confirmModalOverlay}>
//           <View style={styles.confirmModalContent}>
//             <Text style={styles.confirmTitle}>
//               {confirmationModal.type === 'buy' ? 'Confirm Purchase' : 'Confirm Rental'}
//             </Text>

//             <Text style={styles.confirmText}>
//               {confirmationModal.type === 'buy'
//                 ? `You are purchasing ${selectedMachinery?.name} for ₹${selectedMachinery?.price.toLocaleString()}.`
//                 : `You are renting ${selectedMachinery?.name} for ₹${selectedMachinery?.rentPrice}/day.`}
//             </Text>

//             <View style={styles.confirmButtonsContainer}>
//               <TouchableOpacity style={[styles.confirmButton, styles.cancelButton]} onPress={closeConfirmationModal}>
//                 <Text style={styles.confirmButtonText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={[styles.confirmButton, styles.proceedButton]} onPress={closeConfirmationModal}>
//                 <Text style={styles.confirmButtonText}>
//                   {confirmationModal.type === 'buy' ? 'Proceed to Pay' : 'Confirm Rental'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#ffffff' },
//   header: { backgroundColor: '#4CAF50', padding: 15, elevation: 4 },
//   headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
//   listContainer: { padding: 10 },
//   machineryCard: { backgroundColor: '#fdfdfd', borderRadius: 12, overflow: 'hidden', marginBottom: 15, elevation: 4, flexDirection: 'row', height: 160 },
//   machineryImage: { width: 150, height: '100%', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
//   machineryInfo: { flex: 1, padding: 12, justifyContent: 'space-between' },
//   machineryName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
//   machineryPrice: { fontSize: 16, color: '#2E7D32', fontWeight: '600' },
//   machineryRentPrice: { fontSize: 14, color: '#757575' },
//   viewDetailsButton: { backgroundColor: '#4CAF50', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
//   viewDetailsButtonText: { color: '#fff', fontWeight: '500' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
//   modalContent: { backgroundColor: '#fff', borderRadius: 16, width: '90%', maxHeight: '90%', padding: 20, elevation: 5 },
//   closeButton: { position: 'absolute', right: 10, top: 10 },
//   closeButtonText: { fontSize: 22, color: '#777' },
//   modalImage: { width: '100%', height: 220, borderRadius: 12, backgroundColor: '#f5f5f5', marginBottom: 20 },
//   modalTitle: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 15, textAlign: 'center' },
//   priceContainer: { backgroundColor: '#e8f5e9', padding: 10, borderRadius: 10, marginBottom: 20 },
//   buyPrice: { fontSize: 18, fontWeight: 'bold', color: '#1b5e20' },
//   rentPrice: { fontSize: 16, color: '#4e342e' },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
//   description: { fontSize: 15, color: '#424242', marginBottom: 20, lineHeight: 22 },
//   specificationsContainer: { backgroundColor: '#f1f8e9', padding: 15, borderRadius: 10, marginBottom: 20 },
//   specRow: { flexDirection: 'row', paddingVertical: 4 },
//   specLabel: { flex: 1, fontWeight: '600', color: '#555' },
//   specValue: { flex: 1, color: '#333' },
//   buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
//   actionButton: { paddingVertical: 12, borderRadius: 8, width: '45%', alignItems: 'center' },
//   buyButton: { backgroundColor: '#2E7D32' },
//   rentButton: { backgroundColor: '#FF9800' },
//   actionButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
//   confirmModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
//   confirmModalContent: { backgroundColor: '#fff', borderRadius: 16, width: '80%', padding: 25, elevation: 5 },
//   confirmTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 15 },
//   confirmText: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 20 },
//   confirmButtonsContainer: { flexDirection: 'row', justifyContent: 'space-around' },
//   confirmButton: { paddingVertical: 10, borderRadius: 8, width: '45%', alignItems: 'center' },
//   cancelButton: { backgroundColor: '#ccc' },
//   proceedButton: { backgroundColor: '#4CAF50' },
//   confirmButtonText: { color: '#fff', fontWeight: 'bold' },
// });




// import React, { useState } from 'react';
// import { 
//   Text, 
//   View, 
//   FlatList, 
//   Image, 
//   TouchableOpacity, 
//   Modal, 
//   ScrollView, 
//   SafeAreaView,
//   StatusBar 
// } from 'react-native';
// import { useColorScheme } from 'nativewind';

// // Hardcoded machinery data
// const MACHINERY_DATA = [
//   {
//     id: '1',
//     name: 'Tractor Model X-450',
//     image: 'assets\images\tractor.jpg', // Replace with your image
//     price: 45000,
//     rentPrice: 450,
//     description: 'High-power tractor with advanced features for efficient farming. Features include GPS navigation, climate-controlled cabin, and fuel-efficient engine. Suitable for various agricultural tasks.',
//     specifications: {
//       power: '75 HP',
//       fuelType: 'Diesel',
//       transmissionType: 'Manual',
//       liftCapacity: '2000 kg',
//       yearManufactured: '2023'
//     }
//   },
//   {
//     id: '2',
//     name: 'Harvester H-200',
//     image: 'assets\images\harvestor.jpg', // Replace with your image
//     price: 68000,
//     rentPrice: 700,
//     description: 'Advanced harvester designed for multiple crop types. Adjustable settings for different harvesting needs with minimal grain loss. Easy to operate and maintain.',
//     specifications: {
//       grainTankCapacity: '6000 liters',
//       headerWidth: '6 meters',
//       power: '220 HP',
//       fuelConsumption: '15 L/hour',
//       yearManufactured: '2022'
//     }
//   },
//   {
//     id: '3',
//     name: 'Seeder S-100',
//     image: 'assets\images\seeder.jpg', // Replace with your image
//     price: 28000,
//     rentPrice: 300,
//     description: 'Precision seeder with adjustable row spacing. Designed for consistent seed placement and depth control. Suitable for various seed types and field conditions.',
//     specifications: {
//       workingWidth: '4 meters',
//       rowSpacing: '15-75 cm (adjustable)',
//       seedCapacity: '800 kg',
//       weight: '1.5 tons',
//       yearManufactured: '2024'
//     }
//   },
//   {
//     id: '4',
//     name: 'Sprayer SP-500',
//     image: 'assets\images\sprayer.jpg', // Replace with your image
//     price: 35000,
//     rentPrice: 350,
//     description: 'Efficient crop sprayer with wide coverage and precise application. Features adjustable nozzles and automated rate control. Includes tank washing system for easy cleaning between different chemicals.',
//     specifications: {
//       tankCapacity: '2500 liters',
//       boomWidth: '18 meters',
//       pumpType: 'Centrifugal',
//       nozzleCount: '36',
//       yearManufactured: '2023'
//     }
//   },
//   {
//     id: '5',
//     name: 'Wagon R-300',
//     image: 'assets\images\wagon.png', // Replace with your image
//     price: 12000,
//     rentPrice: 150,
//     description: 'Heavy-duty rotavator for soil preparation. Effectively breaks down soil clumps and incorporates crop residue. Adjustable working depth for different soil conditions.',
//     specifications: {
//       workingWidth: '2.5 meters',
//       bladeCount: '42',
//       workingDepth: '5-25 cm',
//       powerRequirement: '45-60 HP Tractor',
//       yearManufactured: '2024'
//     }
//   },
// ];

// export default function MachineryListingScreen() {
//   const { colorScheme } = useColorScheme();
//   const [selectedMachinery, setSelectedMachinery] = useState<typeof MACHINERY_DATA[0] | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [confirmationModal, setConfirmationModal] = useState({
//     visible: false,
//     type: '', // 'buy' or 'rent'
//   });

//   const openMachineryDetails = (item: typeof MACHINERY_DATA[0]) => {
//     setSelectedMachinery(item);
//     setModalVisible(true);
//   };

//   const handleBuyOrRent = (type: 'buy' | 'rent') => {
//     setModalVisible(false);
//     setConfirmationModal({
//       visible: true,
//       type: type,
//     });
//   };

//   const closeConfirmationModal = () => {
//     setConfirmationModal({
//       visible: false,
//       type: '',
//     });
//     // In a real app, you might navigate to a payment screen or show another form
//   };

//   const renderMachineryItem = ({ item }: { item: typeof MACHINERY_DATA[0] }) => (
//     <TouchableOpacity
//       className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-4 shadow-md flex-row h-36"
//       onPress={() => openMachineryDetails(item)}
//     >
//       <Image
//         source={{ uri: item.image }}
//         className="w-36 h-full bg-gray-200"
//         resizeMode="cover"
//       />
//       <View className="flex-1 p-3 justify-between">
//         <Text className="text-lg font-bold text-gray-800 dark:text-white mb-1">{item.name}</Text>
//         <Text className="text-base font-semibold text-blue-600 dark:text-blue-400">
//           Buy: ₹{item.price.toLocaleString()}
//         </Text>
//         <Text className="text-sm text-gray-600 dark:text-gray-300 mb-1">
//           Rent: ₹{item.rentPrice}/day
//         </Text>
//         <TouchableOpacity 
//           className="bg-green-600 py-2 px-3 rounded-lg self-start"
//           onPress={() => openMachineryDetails(item)}
//         >
//           <Text className="text-white font-medium text-sm">View Details</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
//       <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
//       <View className="bg-green-600 dark:bg-green-800 p-4 shadow-md">
//         <Text className="text-xl font-bold text-white text-center">Farm Machinery</Text>
//       </View>
      
//       <FlatList
//         data={MACHINERY_DATA}
//         renderItem={renderMachineryItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={{ padding: 16 }}
//       />
      
//       {/* Machinery Details Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View className="flex-1 bg-black/50 justify-center items-center">
//           <View className="bg-white dark:bg-gray-800 rounded-xl w-11/12 max-h-5/6 p-5">
//             {selectedMachinery && (
//               <ScrollView>
//                 <TouchableOpacity 
//                   className="absolute right-2 top-2 z-10 p-2" 
//                   onPress={() => setModalVisible(false)}
//                 >
//                   <Text className="text-2xl text-gray-500 dark:text-gray-400 font-bold">✕</Text>
//                 </TouchableOpacity>
                
//                 <Image
//                   source={{ uri: selectedMachinery.image }}
//                   className="w-full h-48 mb-4 rounded-lg bg-gray-200"
//                   resizeMode="contain"
//                 />
                
//                 <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
//                   {selectedMachinery.name}
//                 </Text>
                
//                 <View className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
//                   <Text className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
//                     Purchase Price: ₹{selectedMachinery.price.toLocaleString()}
//                   </Text>
//                   <Text className="text-base text-gray-600 dark:text-gray-300">
//                     Rental Rate: ₹{selectedMachinery.rentPrice}/day
//                   </Text>
//                 </View>
                
//                 <Text className="text-lg font-bold text-gray-800 dark:text-white mb-2">Description</Text>
//                 <Text className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
//                   {selectedMachinery.description}
//                 </Text>
                
//                 <Text className="text-lg font-bold text-gray-800 dark:text-white mb-2">Specifications</Text>
//                 <View className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
//                   {Object.entries(selectedMachinery.specifications).map(([key, value]) => (
//                     <View className="flex-row py-2 border-b border-gray-200 dark:border-gray-600" key={key}>
//                       <Text className="flex-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
//                         {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
//                       </Text>
//                       <Text className="flex-1 text-sm text-gray-800 dark:text-gray-200">{value}</Text>
//                     </View>
//                   ))}
//                 </View>
                
//                 <View className="flex-row justify-between mb-2">
//                   <TouchableOpacity
//                     className="flex-1 py-3 bg-blue-600 rounded-lg items-center mx-1"
//                     onPress={() => handleBuyOrRent('buy')}
//                   >
//                     <Text className="text-white font-bold text-base">Buy Now</Text>
//                   </TouchableOpacity>
                  
//                   <TouchableOpacity
//                     className="flex-1 py-3 bg-amber-500 rounded-lg items-center mx-1"
//                     onPress={() => handleBuyOrRent('rent')}
//                   >
//                     <Text className="text-white font-bold text-base">Rent Now</Text>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView>
//             )}
//           </View>
//         </View>
//       </Modal>
      
//       {/* Confirmation Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={confirmationModal.visible}
//         onRequestClose={() => closeConfirmationModal()}
//       >
//         <View className="flex-1 bg-black/60 justify-center items-center">
//           <View className="bg-white dark:bg-gray-800 rounded-xl w-4/5 p-6">
//             <Text className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
//               {confirmationModal.type === 'buy' 
//                 ? 'Confirm Purchase' 
//                 : 'Confirm Rental'}
//             </Text>
            
//             <Text className="text-base text-gray-700 dark:text-gray-300 mb-2 text-center">
//               {confirmationModal.type === 'buy'
//                 ? `You are about to purchase ${selectedMachinery?.name} for ₹${selectedMachinery?.price.toLocaleString()}.`
//                 : `You are about to rent ${selectedMachinery?.name} for ₹${selectedMachinery?.rentPrice}/day.`}
//             </Text>
            
//             <Text className="text-sm text-gray-500 dark:text-gray-400 mb-5 text-center italic">
//               Select your preferred payment method on the next screen.
//             </Text>
            
//             <View className="flex-row justify-between">
//               <TouchableOpacity
//                 className="flex-1 py-3 bg-gray-300 dark:bg-gray-600 rounded-lg items-center mx-1"
//                 onPress={() => closeConfirmationModal()}
//               >
//                 <Text className="text-gray-800 dark:text-white font-bold">Cancel</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity
//                 className="flex-1 py-3 bg-green-600 rounded-lg items-center mx-1"
//                 onPress={() => closeConfirmationModal()}
//               >
//                 <Text className="text-white font-bold">
//                   {confirmationModal.type === 'buy' ? 'Proceed to Payment' : 'Confirm Rental'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }













import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
//import bulldozerImage from '../../assets/images/favicon.png';

const machineryData = [
  {
    id: '1',
    name: 'Excavator',
    image: require('@/assets/images/bulldozer.jpg'),
    description: 'Heavy-duty machine used for excavation.',
    price: 1500000,
    rentPrice: 15000,
  },
  {
    id: '2',
    name: 'Bulldozer',
    image: require('@/assets/images/bulldozer.jpg'),
    description: 'Powerful machine used for pushing materials.',
    price: 2000000,
    rentPrice: 20000,
  },
  // Add more items as needed
];

const MachineryList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMachinery, setSelectedMachinery] = useState<(typeof machineryData)[0] | null>(null);

  const renderItem = ({ item }: { item: (typeof machineryData)[0] }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() => {
          setSelectedMachinery(item);
          setModalVisible(true);
        }}
      >
        <Text style={styles.viewDetailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={machineryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.modalContent}>
            {selectedMachinery && (
              <>
                <Image source={selectedMachinery.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedMachinery.name}</Text>
                <Text style={styles.machineryDescription}>{selectedMachinery.description}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.buyPrice}>Buy Price: ₹{selectedMachinery.price}</Text>
                  <Text style={styles.rentPrice}>Rent Price: ₹{selectedMachinery.rentPrice} /day</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.actionButtonText}>Buy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rentButton}>
                    <Text style={styles.actionButtonText}>Rent</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.viewDetailsButton, { marginTop: 20, alignSelf: 'center', backgroundColor: '#FF9800' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.viewDetailsButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  viewDetailsButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  viewDetailsButtonText: {
    color: '#fff',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  machineryDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  priceContainer: {
    marginVertical: 10,
  },
  buyPrice: {
    fontSize: 18,
    color: 'green',
  },
  rentPrice: {
    fontSize: 18,
    color: 'orange',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buyButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  rentButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MachineryList;
