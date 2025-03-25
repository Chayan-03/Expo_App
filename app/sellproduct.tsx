// import React, { useState } from 'react';
// import { 
//   Text, 
//   View, 
//   SafeAreaView, 
//   ScrollView, 
//   TouchableOpacity, 
//   Image, 
//   TextInput,
//   Modal,
//   Alert,
//   FlatList
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useColorScheme } from 'nativewind';

// // Hardcoded crop categories
// const CROP_CATEGORIES = [
//   { id: '1', name: 'Grains', icon: '🌾' },
//   { id: '2', name: 'Pulses', icon: '🥜' },
//   { id: '3', name: 'Vegetables', icon: '🥬' },
//   { id: '4', name: 'Fruits', icon: '🍎' },
//   { id: '5', name: 'Cash Crops', icon: '🌱' },
//   { id: '6', name: 'Spices', icon: '🌶️' },
// ];

// // Hardcoded sample crop listings by the farmer
// const FARMER_CROPS = [
//   {
//     id: '1',
//     name: 'Basmati Rice',
//     category: 'Grains',
//     quantity: 2500,
//     unit: 'kg',
//     price: 45,
//     image: 'https://reactnative.dev/img/tiny_logo.png', // Replace with actual image
//     quality: 'Premium',
//     harvestDate: '2025-03-10',
//     description: 'Premium quality Basmati rice, freshly harvested. Long grain, aromatic, and perfect for biryani and pulao.',
//     location: 'Amritsar, Punjab'
//   },
//   {
//     id: '2',
//     name: 'Wheat',
//     category: 'Grains',
//     quantity: 5000,
//     unit: 'kg',
//     price: 28,
//     image: 'https://reactnative.dev/img/tiny_logo.png', // Replace with actual image
//     quality: 'Standard',
//     harvestDate: '2025-03-15',
//     description: 'Fresh wheat crop with good protein content. Suitable for flour production and baking applications.',
//     location: 'Ludhiana, Punjab'
//   },
//   {
//     id: '3',
//     name: 'Potatoes',
//     category: 'Vegetables',
//     quantity: 1200,
//     unit: 'kg',
//     price: 18,
//     image: 'https://reactnative.dev/img/tiny_logo.png', // Replace with actual image
//     quality: 'A-Grade',
//     harvestDate: '2025-03-18',
//     description: 'Large-sized potatoes with clean skin. Perfect for restaurants and food processing units.',
//     location: 'Jalandhar, Punjab'
//   },
// ];

// export default function FarmerCropSellingScreen() {
//   const { colorScheme } = useColorScheme();
//   const [crops, setCrops] = useState(FARMER_CROPS);
//   const [selectedCrop, setSelectedCrop] = useState<typeof FARMER_CROPS[0] | null>(null);
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false);
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [inquiryModalVisible, setInquiryModalVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [activeCategory, setActiveCategory] = useState('all');
  
//   // Form state for adding/editing crop
//   const [newCrop, setNewCrop] = useState({
//     id: '',
//     name: '',
//     category: 'Grains',
//     quantity: '',
//     unit: 'kg',
//     price: '',
//     quality: 'Standard',
//     harvestDate: '',
//     description: '',
//     location: '',
//     image: 'https://reactnative.dev/img/tiny_logo.png', // Default image
//   });

//   const openDetailsModal = (crop: typeof FARMER_CROPS[0]) => {
//     setSelectedCrop(crop);
//     setDetailsModalVisible(true);
//   };

//   const openAddModal = (crop: typeof FARMER_CROPS[0] | null = null) => {
//     if (crop) {
//       // Edit mode
//       setNewCrop({
//         ...crop,
//         quantity: crop.quantity.toString(),
//         price: crop.price.toString()
//       });
//       setEditMode(true);
//     } else {
//       // Add mode
//       setNewCrop({
//               id: '',
//               name: '',
//               category: 'Grains',
//               quantity: '',
//               unit: 'kg',
//               price: '',
//               quality: 'Standard',
//               harvestDate: '',
//               description: '',
//               location: '',
//               image: 'https://reactnative.dev/img/tiny_logo.png',
//             });
//       setEditMode(false);
//     }
//     setAddModalVisible(true);
//   };

//   const handleSaveCrop = () => {
//     // Validate form
//     if (!newCrop.name || !newCrop.quantity || !newCrop.price) {
//       Alert.alert('Missing Information', 'Please fill in all required fields.');
//       return;
//     }

//     if (editMode) {
//       // Update existing crop
//       setCrops(crops.map(crop => 
//         crop.id === newCrop.id ? {...crop, ...newCrop, quantity: parseInt(newCrop.quantity), price: parseInt(newCrop.price)} : crop
//       ));
//     } else {
//       // Add new crop with unique ID
//       const id = Date.now().toString();
//       setCrops([...crops, {...newCrop, id, quantity: parseInt(newCrop.quantity), price: parseInt(newCrop.price)}]);
//     }
    
//     setAddModalVisible(false);
//   };

//   const handleDeleteCrop = (id: string) => {
//     Alert.alert(
//       'Confirm Deletion',
//       'Are you sure you want to remove this crop listing?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           onPress: () => {
//             setCrops(crops.filter(crop => crop.id !== id));
//             setDetailsModalVisible(false);
//           },
//           style: 'destructive',
//         },
//       ]
//     );
//   };

//   const handleInquiry = () => {
//     // Here you would handle the buyer's inquiry logic
//     setInquiryModalVisible(true);
//   };

//   const closeInquiryModal = () => {
//     setInquiryModalVisible(false);
//     setDetailsModalVisible(false);
//     Alert.alert('Success', 'Your inquiry has been sent to the farmer. You will be notified when they respond.');
//   };

//   // Filter crops by category
//   const filteredCrops = activeCategory === 'all' 
//     ? crops 
//     : crops.filter(crop => crop.category === activeCategory);

//   // Render each crop card
//   const renderCropItem = ({ item }: { item: typeof FARMER_CROPS[0] }) => (
//     <TouchableOpacity 
//       className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-4 shadow-md"
//       onPress={() => openDetailsModal(item)}
//     >
//       <Image
//         source={{ uri: item.image }}
//         className="w-full h-40 bg-gray-200"
//         resizeMode="cover"
//       />
//       <View className="p-4">
//         <View className="flex-row justify-between items-center mb-2">
//           <Text className="text-lg font-bold text-gray-800 dark:text-white">{item.name}</Text>
//           <View className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
//             <Text className="text-sm font-medium text-green-800 dark:text-green-200">{item.category}</Text>
//           </View>
//         </View>
        
//         <View className="flex-row justify-between items-center mb-2">
//           <Text className="text-base text-gray-700 dark:text-gray-300">
//             {item.quantity} {item.unit} available
//           </Text>
//           <Text className="text-lg font-bold text-blue-600 dark:text-blue-400">
//             ₹{item.price}/{item.unit}
//           </Text>
//         </View>
        
//         <View className="flex-row justify-between items-center">
//           <Text className="text-sm text-gray-500 dark:text-gray-400">Quality: {item.quality}</Text>
//           <Text className="text-sm text-gray-500 dark:text-gray-400">{item.location}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
//       {/* Header */}
//       <View className="bg-green-600 dark:bg-green-800 p-4 shadow-md">
//         <Text className="text-xl font-bold text-white text-center">My Crop Listings</Text>
//       </View>
      
//       {/* Categories */}
//       <View className="py-3 px-4">
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false}
//           className="mb-2"
//         >
//           <TouchableOpacity 
//             className={`mr-2 px-4 py-2 rounded-full ${activeCategory === 'all' ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}`}
//             onPress={() => setActiveCategory('all')}
//           >
//             <Text className={`font-medium ${activeCategory === 'all' ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>
//               All Crops
//             </Text>
//           </TouchableOpacity>
          
//           {CROP_CATEGORIES.map(category => (
//             <TouchableOpacity 
//               key={category.id}
//               className={`mr-2 px-4 py-2 rounded-full flex-row items-center ${activeCategory === category.name ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}`}
//               onPress={() => setActiveCategory(category.name)}
//             >
//               <Text className="mr-1">{category.icon}</Text>
//               <Text className={`font-medium ${activeCategory === category.name ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>
//                 {category.name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
      
//       {/* Add New Crop Button */}
//       <TouchableOpacity 
//         className="mx-4 mb-4 p-3 bg-green-600 rounded-lg flex-row justify-center items-center"
//         onPress={() => openAddModal()}
//       >
//         <Text className="text-white font-bold text-base">+ Add New Crop Listing</Text>
//       </TouchableOpacity>
      
//       {/* Crop Listings */}
//       <FlatList
//         data={filteredCrops}
//         renderItem={renderCropItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={{ padding: 16 }}
//         ListEmptyComponent={
//           <View className="items-center justify-center py-10">
//             <Text className="text-gray-500 dark:text-gray-400 text-lg">No crops in this category</Text>
//             <TouchableOpacity 
//               className="mt-4 p-3 bg-green-600 rounded-lg"
//               onPress={() => openAddModal()}
//             >
//               <Text className="text-white font-bold">Add Your First Crop</Text>
//             </TouchableOpacity>
//           </View>
//         }
//       />
      
//       {/* Crop Details Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={detailsModalVisible}
//         onRequestClose={() => setDetailsModalVisible(false)}
//       >
//         <View className="flex-1 bg-black/50 justify-center items-center">
//           <View className="bg-white dark:bg-gray-800 rounded-xl w-11/12 max-h-5/6">
//             {selectedCrop && (
//               <ScrollView>
//                 <Image
//                   source={{ uri: selectedCrop.image }}
//                   className="w-full h-56 bg-gray-200"
//                   resizeMode="cover"
//                 />
                
//                 <TouchableOpacity 
//                   className="absolute right-2 top-2 z-10 p-2 bg-black/30 rounded-full" 
//                   onPress={() => setDetailsModalVisible(false)}
//                 >
//                   <Text className="text-xl text-white font-bold">✕</Text>
//                 </TouchableOpacity>
                
//                 <View className="p-5">
//                   <View className="flex-row justify-between items-center mb-4">
//                     <Text className="text-2xl font-bold text-gray-800 dark:text-white">
//                       {selectedCrop.name}
//                     </Text>
//                     <View className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
//                       <Text className="text-sm font-medium text-green-800 dark:text-green-200">
//                         {selectedCrop.category}
//                       </Text>
//                     </View>
//                   </View>
                  
//                   <View className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4 flex-row justify-between items-center">
//                     <View>
//                       <Text className="text-sm text-blue-800 dark:text-blue-200">Price per {selectedCrop.unit}</Text>
//                       <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{selectedCrop.price}</Text>
//                     </View>
//                     <View>
//                       <Text className="text-sm text-blue-800 dark:text-blue-200">Available Quantity</Text>
//                       <Text className="text-xl font-bold text-blue-600 dark:text-blue-400">
//                         {selectedCrop.quantity} {selectedCrop.unit}
//                       </Text>
//                     </View>
//                   </View>
                  
//                   <View className="mb-4">
//                     <Text className="text-lg font-bold text-gray-800 dark:text-white mb-2">Description</Text>
//                     <Text className="text-base text-gray-700 dark:text-gray-300">
//                       {selectedCrop.description}
//                     </Text>
//                   </View>
                  
//                   <View className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
//                     <View className="flex-row py-2 border-b border-gray-200 dark:border-gray-600">
//                       <Text className="flex-1 text-sm font-semibold text-gray-700 dark:text-gray-300">Quality:</Text>
//                       <Text className="flex-1 text-sm text-gray-800 dark:text-gray-200">{selectedCrop.quality}</Text>
//                     </View>
//                     <View className="flex-row py-2 border-b border-gray-200 dark:border-gray-600">
//                       <Text className="flex-1 text-sm font-semibold text-gray-700 dark:text-gray-300">Harvest Date:</Text>
//                       <Text className="flex-1 text-sm text-gray-800 dark:text-gray-200">{selectedCrop.harvestDate}</Text>
//                     </View>
//                     <View className="flex-row py-2">
//                       <Text className="flex-1 text-sm font-semibold text-gray-700 dark:text-gray-300">Location:</Text>
//                       <Text className="flex-1 text-sm text-gray-800 dark:text-gray-200">{selectedCrop.location}</Text>
//                     </View>
//                   </View>
                  
//                   <View className="flex-row justify-between mb-2">
//                     <TouchableOpacity
//                       className="flex-1 py-3 bg-blue-600 rounded-lg items-center mx-1"
//                       onPress={handleInquiry}
//                     >
//                       <Text className="text-white font-bold text-base">Contact for Purchase</Text>
//                     </TouchableOpacity>
//                   </View>
                  
//                   <View className="flex-row justify-between mt-4">
//                     <TouchableOpacity
//                       className="flex-1 py-2 bg-amber-500 rounded-lg items-center mx-1"
//                       onPress={() => {
//                         setDetailsModalVisible(false);
//                         openAddModal(selectedCrop);
//                       }}
//                     >
//                       <Text className="text-white font-bold">Edit Listing</Text>
//                     </TouchableOpacity>
                    
//                     <TouchableOpacity
//                       className="flex-1 py-2 bg-red-500 rounded-lg items-center mx-1"
//                       onPress={() => handleDeleteCrop(selectedCrop.id)}
//                     >
//                       <Text className="text-white font-bold">Delete</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </ScrollView>
//             )}
//           </View>
//         </View>
//       </Modal>
      
//       {/* Add/Edit Crop Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={addModalVisible}
//         onRequestClose={() => setAddModalVisible(false)}
//       >
//         <View className="flex-1 bg-black/50 justify-center items-center">
//           <View className="bg-white dark:bg-gray-800 rounded-xl w-11/12 max-h-5/6">
//             <ScrollView className="p-5">
//               <View className="flex-row justify-between items-center mb-6">
//                 <Text className="text-xl font-bold text-gray-800 dark:text-white">
//                   {editMode ? 'Edit Crop Listing' : 'Add New Crop'}
//                 </Text>
//                 <TouchableOpacity onPress={() => setAddModalVisible(false)}>
//                   <Text className="text-xl text-gray-500 dark:text-gray-400">✕</Text>
//                 </TouchableOpacity>
//               </View>
              
//               <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Crop Name *</Text>
//               <TextInput
//                 className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-white"
//                 placeholder="Enter crop name"
//                 placeholderTextColor={colorScheme === 'dark' ? "#9ca3af" : "#6b7280"}
//                 value={newCrop.name}
//                 onChangeText={(text) => setNewCrop({...newCrop, name: text})}
//               />
              
//               <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</Text>
//               <View className="bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
//                 <Picker
//                   selectedValue={newCrop.category}
//                   onValueChange={(itemValue) => setNewCrop({...newCrop, category: itemValue})}
//                   dropdownIconColor={colorScheme === 'dark' ? "#fff" : "#000"}
//                   style={{color: colorScheme === 'dark' ? "#fff" : "#000"}}
//                 >
//                   {CROP_CATEGORIES.map(category => (
//                     <Picker.Item key={category.id} label={category.name} value={category.name} />
//                   ))}
//                 </Picker>
//               </View>
              
//               <View className="flex-row mb-4">
//                 <View className="flex-1 mr-2">
//                   <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity *</Text>
//                   <TextInput
//                     className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-800 dark:text-white"
//                     placeholder="Amount"
//                     placeholderTextColor={colorScheme === 'dark' ? "#9ca3af" : "#6b7280"}
//                     keyboardType="numeric"
//                     value={newCrop.quantity.toString()}
//                     onChangeText={(text) => setNewCrop({...newCrop, quantity: text})}
//                   />
//                 </View>
//                 <View className="w-24">
//                   <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</Text>
//                   <View className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
//                     <Picker
//                       selectedValue={newCrop.unit}
//                       onValueChange={(itemValue) => setNewCrop({...newCrop, unit: itemValue})}
//                       dropdownIconColor={colorScheme === 'dark' ? "#fff" : "#000"}
//                       style={{color: colorScheme === 'dark' ? "#fff" : "#000"}}
//                     >
//                       <Picker.Item label="kg" value="kg" />
//                       <Picker.Item label="Quintal" value="quintal" />
//                       <Picker.Item label="Ton" value="ton" />
//                     </Picker>
//                   </View>
//                 </View>
//               </View>
              
//               <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price per {newCrop.unit} *</Text>
//               <TextInput
//                 className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-white"
//                 placeholder="Enter price"
//                 placeholderTextColor={colorScheme === 'dark' ? "#9ca3af" : "#6b7280"}
//                 keyboardType="numeric"
//                 value={newCrop.price.toString()}
//                 onChangeText={(text) => setNewCrop({...newCrop, price: text})}
//               />
              
//               <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quality</Text>
//               <View className="bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
//                 <Picker
//                   selectedValue={newCrop.quality}
//                   onValueChange={(itemValue) => setNewCrop({...newCrop, quality: itemValue})}
//                   dropdownIconColor={colorScheme === 'dark' ? "#fff" : "#000"}
//                   style={{color: colorScheme === 'dark' ? "#fff" : "#000"}}
//                 >
//                   <Picker.Item label="Premium" value="Premium" />
//                   <Picker.Item label="A-Grade" value="A-Grade" />
//                   <Picker.Item label="Standard" value="Standard" />
//                   <Picker.Item label="Commercial" value="Commercial" />
//                 </Picker>
//               </View>
              
//               <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Harvest Date</Text>
//               <TextInput
//                 className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-white"
//                 placeholder="YYYY-MM-DD"
//                 placeholderTextColor={colorScheme === 'dark' ? "#9ca3af" : "#6b7280"}
//                 value={newCrop.harvestDate}
//                 onChangeText={(text) => setNewCrop({...newCrop, harvestDate: text})}
//               />
              
//               <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</Text>
//               <TextInput
//                 className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-white"
//                 placeholder="Village, District, State"
//                 placeholderTextColor={colorScheme === 'dark' ? "#9ca3af" : "#6b7280"}
//                 value={newCrop.location}
//                 onChangeText={(text) => setNewCrop({...newCrop, location: text})}
//               />
              
//               <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</Text>
//               <TextInput
//                 className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-white h-24"
//                 placeholder="Describe your crop, quality, benefits, etc."
//                 placeholderTextColor={colorScheme === 'dark' ? "#9ca3af" : "#6b7280"}
//                 multiline={true}
//                 textAlignVertical="top"
//                 value={newCrop.description}
//                 onChangeText={(text) => setNewCrop({...newCrop, description: text})}
//               />
              
//               <Text className="text-xs text-gray-500 dark:text-gray-400 mb-4">* Required fields</Text>
              
//               <TouchableOpacity
//                 className="bg-green-600 p-3 rounded-lg items-center"
//                 onPress={handleSaveCrop}
//               >
//                 <Text className="text-white font-bold text-lg">
//                   {editMode ? 'Update Listing' : 'Add Crop Listing'}
//                 </Text>
//               </TouchableOpacity>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
      
//       {/* Inquiry Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={inquiryModalVisible}
//         onRequestClose={() => setInquiryModalVisible(false)}
//       >
//         <View className="flex-1 bg-black/60 justify-center items-center">
//           <View className="bg-white dark:bg-gray-800 rounded-xl w-4/5 p-6">
//             <Text className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
//               Contact Farmer
//             </Text>
            
//             {selectedCrop && (
//               <View className="mb-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
//                 <Text className="text-sm text-gray-500 dark:text-gray-400">Inquiry about:</Text>
//                 <Text className="text-base font-medium text-gray-800 dark:text-gray-200">
//                   {selectedCrop.name} - ₹{selectedCrop.price}/{selectedCrop.unit}
//                 </Text>
//               </View>
//             )}
            
//             <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</Text>
//             <TextInput
//               className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-white"
//               placeholder="Enter your name"
//               placeholderTextColor={colorScheme === 'dark' ? "#9ca3af" : "#6b7280"}
//             />
            
//             <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</Text>
//             <TextInput
//               className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-white"
//               placeholder="Enter your contact number"
//               placeholderTextColor={colorScheme === 'dark' ? "#9ca3af" : "#6b7280"}
//               keyboardType="phone-pad"
//             />
            
//             <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity Interested In</Text>
//             <TextInput
//               className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-white"
//               placeholder={`Quantity in ${selectedCrop?.unit || 'kg'}`}
//               placeholderTextColor={colorScheme === 'dark' ? "#9ca3af" : "#6b7280"}
//               keyboardType="numeric"
//             />
            
//             <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</Text>
//             <TextInput
//               className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-white h-24"
//               placeholder="Any specific requirements or questions..."
//               placeholderTextColor={colorScheme === 'dark' ? "#9ca3af" : "#6b7280"}
//               multiline={true}
//               textAlignVertical="top"
//             />
            
//             <View className="flex-row justify-between">
//               <TouchableOpacity
//                 className="flex-1 py-3 bg-gray-300 dark:bg-gray-600 rounded-lg items-center mx-1"
//                 onPress={() => setInquiryModalVisible(false)}
//               >
//                 <Text className="text-gray-800 dark:text-white font-bold">Cancel</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity
//                 className="flex-1 py-3 bg-green-600 rounded-lg items-center mx-1"
//                 onPress={closeInquiryModal}
//               >
//                 <Text className="text-white font-bold">Send Inquiry</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }


import React, { useState } from 'react';
import { 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  Modal,
  Alert,
  FlatList,
  StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Hardcoded crop categories
const CROP_CATEGORIES = [
  { id: '1', name: 'Grains', icon: '🌾' },
  { id: '2', name: 'Pulses', icon: '🥜' },
  { id: '3', name: 'Vegetables', icon: '🥬' },
  { id: '4', name: 'Fruits', icon: '🍎' },
  { id: '5', name: 'Cash Crops', icon: '🌱' },
  { id: '6', name: 'Spices', icon: '🌶️' },
];

// Hardcoded sample crop listings by the farmer
const FARMER_CROPS = [
  {
    id: '1',
    name: 'Basmati Rice',
    category: 'Grains',
    quantity: 2500,
    unit: 'kg',
    price: 45,
    image: 'https://reactnative.dev/img/tiny_logo.png', // Replace with actual image
    quality: 'Premium',
    harvestDate: '2025-03-10',
    description: 'Premium quality Basmati rice, freshly harvested. Long grain, aromatic, and perfect for biryani and pulao.',
    location: 'Amritsar, Punjab'
  },
  {
    id: '2',
    name: 'Wheat',
    category: 'Grains',
    quantity: 5000,
    unit: 'kg',
    price: 28,
    image: 'https://reactnative.dev/img/tiny_logo.png', // Replace with actual image
    quality: 'Standard',
    harvestDate: '2025-03-15',
    description: 'Fresh wheat crop with good protein content. Suitable for flour production and baking applications.',
    location: 'Ludhiana, Punjab'
  },
  {
    id: '3',
    name: 'Potatoes',
    category: 'Vegetables',
    quantity: 1200,
    unit: 'kg',
    price: 18,
    image: 'https://reactnative.dev/img/tiny_logo.png', // Replace with actual image
    quality: 'A-Grade',
    harvestDate: '2025-03-18',
    description: 'Large-sized potatoes with clean skin. Perfect for restaurants and food processing units.',
    location: 'Jalandhar, Punjab'
  },
];

export default function FarmerCropSellingScreen() {
  const [crops, setCrops] = useState(FARMER_CROPS);
  const [selectedCrop, setSelectedCrop] = useState<typeof FARMER_CROPS[0] | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [inquiryModalVisible, setInquiryModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Form state for adding/editing crop
  const [newCrop, setNewCrop] = useState({
    id: '',
    name: '',
    category: 'Grains',
    quantity: '',
    unit: 'kg',
    price: '',
    quality: 'Standard',
    harvestDate: '',
    description: '',
    location: '',
    image: 'https://reactnative.dev/img/tiny_logo.png', // Default image
  });

  const openDetailsModal = (crop: typeof FARMER_CROPS[0]) => {
    setSelectedCrop(crop);
    setDetailsModalVisible(true);
  };

  const openAddModal = (crop: typeof FARMER_CROPS[0] | null = null) => {
    if (crop) {
      // Edit mode
      setNewCrop({
        ...crop,
        quantity: crop.quantity.toString(),
        price: crop.price.toString()
      });
      setEditMode(true);
    } else {
      // Add mode
      setNewCrop({
        id: '',
        name: '',
        category: 'Grains',
        quantity: '',
        unit: 'kg',
        price: '',
        quality: 'Standard',
        harvestDate: '',
        description: '',
        location: '',
        image: 'https://reactnative.dev/img/tiny_logo.png',
      });
      setEditMode(false);
    }
    setAddModalVisible(true);
  };

  const handleSaveCrop = () => {
    // Validate form
    if (!newCrop.name || !newCrop.quantity || !newCrop.price) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    if (editMode) {
      // Update existing crop
      setCrops(crops.map(crop => 
        crop.id === newCrop.id ? {...crop, ...newCrop, quantity: parseInt(newCrop.quantity), price: parseInt(newCrop.price)} : crop
      ));
    } else {
      // Add new crop with unique ID
      const id = Date.now().toString();
      setCrops([...crops, {...newCrop, id, quantity: parseInt(newCrop.quantity), price: parseInt(newCrop.price)}]);
    }
    
    setAddModalVisible(false);
  };

  const handleDeleteCrop = (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to remove this crop listing?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setCrops(crops.filter(crop => crop.id !== id));
            setDetailsModalVisible(false);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleInquiry = () => {
    // Here you would handle the buyer's inquiry logic
    setInquiryModalVisible(true);
  };

  const closeInquiryModal = () => {
    setInquiryModalVisible(false);
    setDetailsModalVisible(false);
    Alert.alert('Success', 'Your inquiry has been sent to the farmer. You will be notified when they respond.');
  };

  // Filter crops by category
  const filteredCrops = activeCategory === 'all' 
    ? crops 
    : crops.filter(crop => crop.category === activeCategory);

  // Render each crop card
  const renderCropItem = ({ item }: { item: typeof FARMER_CROPS[0] }) => (
    <TouchableOpacity 
      style={styles.cropCard}
      onPress={() => openDetailsModal(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.cropImage}
        resizeMode="cover"
      />
      <View style={styles.cropCardContent}>
        <View style={styles.cropCardHeader}>
          <Text style={styles.cropName}>{item.name}</Text>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{item.category}</Text>
          </View>
        </View>
        
        <View style={styles.cropCardDetails}>
          <Text style={styles.quantityText}>
            {item.quantity} {item.unit} available
          </Text>
          <Text style={styles.priceText}>
            ₹{item.price}/{item.unit}
          </Text>
        </View>
        
        <View style={styles.cropCardFooter}>
          <Text style={styles.qualityText}>Quality: {item.quality}</Text>
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Crop Listings</Text>
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScrollView}
        >
          <TouchableOpacity 
            style={[
              styles.categoryButton, 
              activeCategory === 'all' ? styles.activeCategoryButton : styles.inactiveCategoryButton
            ]}
            onPress={() => setActiveCategory('all')}
          >
            <Text style={[
              styles.categoryButtonText, 
              activeCategory === 'all' ? styles.activeCategoryText : styles.inactiveCategoryText
            ]}>
              All Crops
            </Text>
          </TouchableOpacity>
          
          {CROP_CATEGORIES.map(category => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryButton, 
                activeCategory === category.name ? styles.activeCategoryButton : styles.inactiveCategoryButton
              ]}
              onPress={() => setActiveCategory(category.name)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryButtonText, 
                activeCategory === category.name ? styles.activeCategoryText : styles.inactiveCategoryText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Add New Crop Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => openAddModal()}
      >
        <Text style={styles.addButtonText}>+ Add New Crop Listing</Text>
      </TouchableOpacity>
      
      {/* Crop Listings */}
      <FlatList
        data={filteredCrops}
        renderItem={renderCropItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No crops in this category</Text>
            <TouchableOpacity 
              style={styles.emptyListButton}
              onPress={() => openAddModal()}
            >
              <Text style={styles.emptyListButtonText}>Add Your First Crop</Text>
            </TouchableOpacity>
          </View>
        }
      />
      
      {/* Crop Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsModalVisible}
        onRequestClose={() => setDetailsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedCrop && (
              <ScrollView>
                <Image
                  source={{ uri: selectedCrop.image }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                
                <TouchableOpacity 
                  style={styles.closeButton} 
                  onPress={() => setDetailsModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
                
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      {selectedCrop.name}
                    </Text>
                    <View style={styles.modalCategoryTag}>
                      <Text style={styles.modalCategoryText}>
                        {selectedCrop.category}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.priceContainer}>
                    <View>
                      <Text style={styles.priceLabel}>Price per {selectedCrop.unit}</Text>
                      <Text style={styles.modalPrice}>₹{selectedCrop.price}</Text>
                    </View>
                    <View>
                      <Text style={styles.quantityLabel}>Available Quantity</Text>
                      <Text style={styles.modalQuantity}>
                        {selectedCrop.quantity} {selectedCrop.unit}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                      {selectedCrop.description}
                    </Text>
                  </View>
                  
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Quality:</Text>
                      <Text style={styles.detailValue}>{selectedCrop.quality}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Harvest Date:</Text>
                      <Text style={styles.detailValue}>{selectedCrop.harvestDate}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Location:</Text>
                      <Text style={styles.detailValue}>{selectedCrop.location}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={styles.contactButton}
                      onPress={handleInquiry}
                    >
                      <Text style={styles.contactButtonText}>Contact for Purchase</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.editDeleteContainer}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        setDetailsModalVisible(false);
                        openAddModal(selectedCrop);
                      }}
                    >
                      <Text style={styles.editButtonText}>Edit Listing</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteCrop(selectedCrop.id)}
                    >
                      <Text style={styles.deleteButton}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
      
      {/* Add/Edit Crop Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.formScrollView}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>
                  {editMode ? 'Edit Crop Listing' : 'Add New Crop'}
                </Text>
                <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                  <Text style={styles.formCloseButton}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.inputLabel}>Crop Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter crop name"
                placeholderTextColor="#6b7280"
                value={newCrop.name}
                onChangeText={(text) => setNewCrop({...newCrop, name: text})}
              />
              
              <Text style={styles.inputLabel}>Category *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={newCrop.category}
                  onValueChange={(itemValue) => setNewCrop({...newCrop, category: itemValue})}
                  style={styles.picker}
                >
                  {CROP_CATEGORIES.map(category => (
                    <Picker.Item key={category.id} label={category.name} value={category.name} />
                  ))}
                </Picker>
              </View>
              
              <View style={styles.quantityRow}>
                <View style={styles.quantityInputContainer}>
                  <Text style={styles.inputLabel}>Quantity *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Amount"
                    placeholderTextColor="#6b7280"
                    keyboardType="numeric"
                    value={newCrop.quantity.toString()}
                    onChangeText={(text) => setNewCrop({...newCrop, quantity: text})}
                  />
                </View>
                <View style={styles.unitPickerContainer}>
                  <Text style={styles.inputLabel}>Unit</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={newCrop.unit}
                      onValueChange={(itemValue) => setNewCrop({...newCrop, unit: itemValue})}
                      style={styles.picker}
                    >
                      <Picker.Item label="kg" value="kg" />
                      <Picker.Item label="Quintal" value="quintal" />
                      <Picker.Item label="Ton" value="ton" />
                    </Picker>
                  </View>
                </View>
              </View>
              
              <Text style={styles.inputLabel}>Price per {newCrop.unit} *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter price"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={newCrop.price.toString()}
                onChangeText={(text) => setNewCrop({...newCrop, price: text})}
              />
              
              <Text style={styles.inputLabel}>Quality</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={newCrop.quality}
                  onValueChange={(itemValue) => setNewCrop({...newCrop, quality: itemValue})}
                  style={styles.picker}
                >
                  <Picker.Item label="Premium" value="Premium" />
                  <Picker.Item label="A-Grade" value="A-Grade" />
                  <Picker.Item label="Standard" value="Standard" />
                  <Picker.Item label="Commercial" value="Commercial" />
                </Picker>
              </View>
              
              <Text style={styles.inputLabel}>Harvest Date</Text>
              <TextInput
                style={styles.textInput}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#6b7280"
                value={newCrop.harvestDate}
                onChangeText={(text) => setNewCrop({...newCrop, harvestDate: text})}
              />
              
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Village, District, State"
                placeholderTextColor="#6b7280"
                value={newCrop.location}
                onChangeText={(text) => setNewCrop({...newCrop, location: text})}
              />
              
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.textAreaInput}
                placeholder="Describe your crop, quality, benefits, etc."
                placeholderTextColor="#6b7280"
                multiline={true}
                textAlignVertical="top"
                value={newCrop.description}
                onChangeText={(text) => setNewCrop({...newCrop, description: text})}
              />
              
              <Text style={styles.requiredFieldsNote}>* Required fields</Text>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveCrop}
              >
                <Text style={styles.saveButtonText}>
                  {editMode ? 'Update Listing' : 'Add Crop Listing'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      
      {/* Inquiry Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={inquiryModalVisible}
        onRequestClose={() => setInquiryModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.inquiryModalContainer}>
            <Text style={styles.inquiryTitle}>
              Contact Farmer
            </Text>
            
            {selectedCrop && (
              <View style={styles.inquiryAbout}>
                <Text style={styles.inquiryAboutLabel}>Inquiry about:</Text>
                <Text style={styles.inquiryAboutText}>
                  {selectedCrop.name} - ₹{selectedCrop.price}/{selectedCrop.unit}
                </Text>
              </View>
            )}
            
            <Text style={styles.inputLabel}>Your Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              placeholderTextColor="#6b7280"
            />
            
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your contact number"
              placeholderTextColor="#6b7280"
              keyboardType="phone-pad"
            />
            
            <Text style={styles.inputLabel}>Quantity Interested In</Text>
            <TextInput
              style={styles.textInput}
              placeholder={`Quantity in ${selectedCrop?.unit || 'kg'}`}
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
            />
            
            <Text style={styles.inputLabel}>Message</Text>
            <TextInput
              style={styles.textAreaInput}
              placeholder="Any specific requirements or questions..."
              placeholderTextColor="#6b7280"
              multiline={true}
              textAlignVertical="top"
            />
            
            <View style={styles.inquiryButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelInquiryButton}
                onPress={() => setInquiryModalVisible(false)}
              >
                <Text style={styles.cancelInquiryText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.sendInquiryButton}
                onPress={closeInquiryModal}
              >
                <Text style={styles.sendInquiryText}>Send Inquiry</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  header: {
    backgroundColor: '#16a34a',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  categoriesContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  categoriesScrollView: {
    marginBottom: 8
  },
  categoryButton: {
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  activeCategoryButton: {
    backgroundColor: '#16a34a'
  },
  inactiveCategoryButton: {
    backgroundColor: '#e5e7eb'
  },
  categoryButtonText: {
    fontWeight: '500'
  },
  activeCategoryText: {
    color: 'white'
  },
  inactiveCategoryText: {
    color: '#4b5563'
  },
  categoryIcon: {
    marginRight: 4
  },
  addButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#16a34a',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  listContainer: {
    padding: 16
  },
  cropCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  cropImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#e5e7eb'
  },
  cropCardContent: {
    padding: 16
  },
  cropCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  categoryTag: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50
  },
  categoryTagText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#065f46'
  },
  cropCardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  quantityText: {
    fontSize: 16,
    color: '#4b5563'
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb'
  },
  cropCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qualityText: {
    fontSize: 14,
    color: '#6b7280'
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280'
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  emptyListText: {
    color: '#6b7280',
    fontSize: 18
  },
  emptyListButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#16a34a',
    borderRadius: 8
  },
  emptyListButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '90%',
    maxHeight: '85%'
  },
  modalImage: {
    width: '100%',
    height: 224,
    backgroundColor: '#e5e7eb'
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50
  },
  closeButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  modalContent: {
    padding: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  modalCategoryTag: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50
  },
  modalCategoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#065f46'
  },
  priceContainer: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceLabel: {
    fontSize: 14,
    color: '#1e40af'
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb'
  },
  quantityLabel: {
    fontSize: 14,
    color: '#1e40af'
  },
  modalQuantity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb'
  },
  descriptionContainer: {
    marginBottom: 16
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8
  },
  descriptionText: {
    fontSize: 16,
    color: '#4b5563'
  },
  detailsContainer: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563'
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937'
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  contactButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  editDeleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  editButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#f59e0b',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  formScrollView: {
    padding: 20
  },
      formHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      },
      formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937'
      },
      formCloseButton: {
        fontSize: 24,
        color: '#6b7280'
      },
      inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#4b5563',
        marginBottom: 8
      },
      textInput: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#1f2937',
        marginBottom: 16
      },
      textAreaInput: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#1f2937',
        marginBottom: 16,
        height: 120
      },
      pickerContainer: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        marginBottom: 16
      },
      picker: {
        height: 50
      },
      quantityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      quantityInputContainer: {
        flex: 2,
        marginRight: 8
      },
      unitPickerContainer: {
        flex: 1
      },
      requiredFieldsNote: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 16,
        fontStyle: 'italic'
      },
      saveButton: {
        backgroundColor: '#16a34a',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 20
      },
      saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
      },
      inquiryModalContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        width: '90%',
        padding: 20
      },
      inquiryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 16,
        textAlign: 'center'
      },
      inquiryAbout: {
        backgroundColor: '#f3f4f6',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16
      },
      inquiryAboutLabel: {
        fontSize: 14,
        color: '#6b7280'
      },
      inquiryAboutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
        marginTop: 4
      },
      inquiryButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
      },
      cancelInquiryButton: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 8
      },
      cancelInquiryText: {
        color: '#4b5563',
        fontWeight: '500'
      },
      sendInquiryButton: {
        flex: 1,
        padding: 12,
        backgroundColor: '#2563eb',
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 8
      },
      sendInquiryText: {
        color: 'white',
        fontWeight: 'bold'
      }
    });


