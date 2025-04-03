import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PlusCircle, Edit2, Trash2, Search, Image as ImageIcon, Globe } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const translations = {
  en: {
    title: 'Bazaar',
    addCrop: 'Add New Produce',
    search: 'Search crops...',
    noCrops: 'No crops available',
    price: 'Price (₹)',
    quantity: 'Quantity',
    location: 'Location',
    contact: 'Contact',
    editCrop: 'Edit Crop',
    newCrop: 'Add New Produce',
    uploadPhoto: 'Add Photo',
    uploading: 'Uploading...',
    save: 'Save',
    update: 'Update',
    cancel: 'Cancel',
    deleteConfirm: 'Are you sure you want to delete this crop?',
    delete: 'Delete',
    language: ''
  },
  hi: {
    title: 'किसान बाज़ार',
    addCrop: 'नया उत्पाद जोड़ें',
    search: 'फसल खोजें...',
    noCrops: 'कोई फसल उपलब्ध नहीं',
    price: 'मूल्य (₹)',
    quantity: 'मात्रा',
    location: 'स्थान',
    contact: 'संपर्क',
    editCrop: 'फसल संपादित करें',
    newCrop: 'नया उत्पाद जोड़ें',
    uploadPhoto: 'फोटो जोड़ें',
    uploading: 'अपलोड हो रहा है...',
    save: 'सहेजें',
    update: 'अपडेट करें',
    cancel: 'रद्द करें',
    deleteConfirm: 'क्या आप इस फसल को हटाना चाहते हैं?',
    delete: 'हटाएं',
    language: ''
  }
};

const CROP_CATEGORIES = [
  { id: '1', name: 'Grains', icon: '🌾', hindi: 'अनाज' },
  { id: '2', name: 'Pulses', icon: '🥜', hindi: 'दालें' },
  { id: '3', name: 'Vegetables', icon: '🥕', hindi: 'सब्जियाँ' },
  { id: '4', name: 'Fruits', icon: '🍎', hindi: 'फल' },
  { id: '5', name: 'Cash Crops', icon: '💰', hindi: 'नकदी फसलें' },
  { id: '6', name: 'Spices', icon: '🌶️', hindi: 'मसाले' },
];

interface Crop {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  image: string;
  location: string;
  farmerContact: string;
}

export default function FarmerCropMarketplaceScreen() {
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: '1',
      name: 'Paddy',
      hindiName: 'धान',
      category: 'Grains',
      quantity: 500,
      unit: 'kg',
      price: 25,
      image: 'https://images.unsplash.com/photo-1592980655573-66e8f9f4f37e',
      location: 'Ludhiana, Punjab',
      farmerContact: '+91-98765-43210'
    },
    {
      id: '2',
      name: 'Wheat',
      hindiName: 'गेहूं',
      category: 'Grains',
      quantity: 800,
      unit: 'kg',
      price: 30,
      image: 'https://images.unsplash.com/photo-1600873666538-3a54c0d5c946',
      location: 'Hisar, Haryana',
      farmerContact: '+91-87654-32109'
    },
    {
      id: '3',
      name: 'Tomato',
      hindiName: 'टमाटर',
      category: 'Vegetables',
      quantity: 200,
      unit: 'kg',
      price: 15,
      image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469',
      location: 'Nashik, Maharashtra',
      farmerContact: '+91-76543-21098'
    },
    {
      id: '4',
      name: 'Mango',
      hindiName: 'आम',
      category: 'Fruits',
      quantity: 150,
      unit: 'kg',
      price: 80,
      image: 'https://images.unsplash.com/photo-1591070486842-1d73fb48b8f8',
      location: 'Ratnagiri, Maharashtra',
      farmerContact: '+91-65432-10987'
    },
    {
      id: '5',
      name: 'Turmeric',
      hindiName: 'हल्दी',
      category: 'Spices',
      quantity: 100,
      unit: 'kg',
      price: 150,
      image: 'https://images.unsplash.com/photo-1615485291234-9d694218eb36',
      location: 'Erode, Tamil Nadu',
      farmerContact: '+91-54321-09876'
    },
    {
      id: '6',
      name: 'Moong Dal',
      hindiName: 'मूंग दाल',
      category: 'Pulses',
      quantity: 300,
      unit: 'kg',
      price: 90,
      image: 'https://images.unsplash.com/photo-1623164016047-9c608497836b',
      location: 'Jaipur, Rajasthan',
      farmerContact: '+91-43210-98765'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
  const [currentCropEdit, setCurrentCropEdit] = useState<Partial<Crop>>({});

  const t = translations[language];
  const filteredCrops = crops.filter(crop =>
    (crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     crop.hindiName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderCropItem = useCallback(({ item }: { item: Crop }) => (
    <TouchableOpacity
      style={styles.cropCard}
      onPress={() => {
        setSelectedCrop(item);
        setIsDetailsModalVisible(true);
      }}
    >
      <Image 
        source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
        style={styles.cropImage} 
      />
      <View style={styles.cropInfo}>
        <Text style={styles.cropName}>
          {language === 'en' ? item.name : item.hindiName}
        </Text>
        <Text style={styles.cropDetail}>₹{item.price}/{item.unit}</Text>
        <Text style={styles.cropDetail}>{item.quantity} {item.unit}</Text>
        <Text style={styles.cropLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  ), [language]);

  const handleSaveCrop = () => {
    if (!currentCropEdit?.name || !currentCropEdit?.quantity || !currentCropEdit?.price) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const newCrop: Crop = {
      id: currentCropEdit.id || Date.now().toString(),
      name: currentCropEdit.name || '',
      hindiName: currentCropEdit.hindiName || currentCropEdit.name || '',
      category: currentCropEdit.category || 'Grains',
      quantity: currentCropEdit.quantity || 0,
      unit: currentCropEdit.unit || 'kg',
      price: currentCropEdit.price || 0,
      image: currentCropEdit.image || 'https://via.placeholder.com/150',
      location: currentCropEdit.location || '',
      farmerContact: currentCropEdit.farmerContact || ''
    };

    setCrops(currentCropEdit.id
      ? crops.map(crop => crop.id === currentCropEdit.id ? newCrop : crop)
      : [...crops, newCrop]
    );
    setIsAddEditModalVisible(false);
    setCurrentCropEdit({});
  };

  const handleDeleteCrop = (cropId: string) => {
    Alert.alert(t.deleteConfirm, '', [
      { text: t.cancel, style: 'cancel' },
      {
        text: t.delete,
        style: 'destructive',
        onPress: () => {
          setCrops(crops.filter(crop => crop.id !== cropId));
          setIsDetailsModalVisible(false);
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.title}</Text>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => setLanguage(language === 'en' ? 'hi' : 'en')}
        >
          <Globe color="#fff" size={20} />
          <Text style={styles.languageText}>
            {t.language}: {language === 'en' ? 'English' : 'हिन्दी'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#666" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder={t.search}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredCrops}
        renderItem={renderCropItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>{t.noCrops}</Text>}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          setCurrentCropEdit({ category: 'Grains', unit: 'kg' });
          setIsAddEditModalVisible(true);
        }}
      >
        <PlusCircle color="#fff" size={24} />
        <Text style={styles.floatingButtonText}>{t.addCrop}</Text>
      </TouchableOpacity>

      {/* Details Modal */}
      <Modal visible={isDetailsModalVisible} animationType="slide" transparent>
        {selectedCrop && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Image source={{ uri: selectedCrop.image }} style={styles.modalImage} />
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {language === 'en' ? selectedCrop.name : selectedCrop.hindiName}
                </Text>
                <Text style={styles.modalInfo}>{t.price}: ₹{selectedCrop.price}/{selectedCrop.unit}</Text>
                <Text style={styles.modalInfo}>{t.quantity}: {selectedCrop.quantity} {selectedCrop.unit}</Text>
                <Text style={styles.modalInfo}>{t.location}: {selectedCrop.location}</Text>
                <Text style={styles.modalInfo}>{t.contact}: {selectedCrop.farmerContact}</Text>
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setCurrentCropEdit(selectedCrop);
                      setIsDetailsModalVisible(false);
                      setIsAddEditModalVisible(true);
                    }}
                  >
                    <Edit2 color="#fff" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteCrop(selectedCrop.id)}
                  >
                    <Trash2 color="#fff" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsDetailsModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>{t.cancel}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>

      {/* Add/Edit Modal */}
      <Modal visible={isAddEditModalVisible} animationType="slide" transparent>
        {currentCropEdit && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {currentCropEdit.id ? t.editCrop : t.newCrop}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Crop Name / फसल का नाम"
                value={currentCropEdit.name || ''}
                onChangeText={text => setCurrentCropEdit({ ...currentCropEdit, name: text, hindiName: text })}
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={currentCropEdit.category}
                  onValueChange={value => setCurrentCropEdit({ ...currentCropEdit, category: value })}
                  style={styles.picker}
                >
                  {CROP_CATEGORIES.map(category => (
                    <Picker.Item
                      key={category.id}
                      label={`${category.icon} ${language === 'en' ? category.name : category.hindi}`}
                      value={category.name}
                    />
                  ))}
                </Picker>
              </View>
              <TextInput
                style={styles.input}
                placeholder={t.quantity}
                keyboardType="numeric"
                value={currentCropEdit.quantity?.toString() || ''}
                onChangeText={text => setCurrentCropEdit({ ...currentCropEdit, quantity: parseInt(text) || 0 })}
              />
              <TextInput
                style={styles.input}
                placeholder={t.price}
                keyboardType="numeric"
                value={currentCropEdit.price?.toString() || ''}
                onChangeText={text => setCurrentCropEdit({ ...currentCropEdit, price: parseFloat(text) || 0 })}
              />
              <TextInput
                style={styles.input}
                placeholder={t.location}
                value={currentCropEdit.location || ''}
                onChangeText={text => setCurrentCropEdit({ ...currentCropEdit, location: text })}
              />
              <TextInput
                style={styles.input}
                placeholder={t.contact}
                keyboardType="phone-pad"
                value={currentCropEdit.farmerContact || ''}
                onChangeText={text => setCurrentCropEdit({ ...currentCropEdit, farmerContact: text })}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveCrop}>
                  <Text style={styles.buttonText}>{currentCropEdit.id ? t.update : t.save}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsAddEditModalVisible(false)}
                >
                  <Text style={styles.buttonText}>{t.cancel}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6E9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 15,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent  : 'center',
    alignItems : 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#81C784',
    padding: 10,
    borderRadius: 20,
  },
  languageText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  listContent: {
    padding: 15,
  },
  cropCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  cropImage: {
    width: 100,
    height: 120,
  },
  cropInfo: {
    flex: 1,
    padding: 10,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 10,
  },
  cropDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    marginLeft: 10,
  },
  cropLocation: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    padding: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalContent: {
    padding: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  modalInfo: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    width: 50,
    alignItems: 'center',
    margin: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
    width: 50,
    alignItems: 'center',
    margin: 5,
  },
  closeButton: {
    backgroundColor: '#B0BEC5',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#B0BEC5',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    margin:5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});