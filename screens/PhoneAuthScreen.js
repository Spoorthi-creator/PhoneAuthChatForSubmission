import React, { useRef, useState,useEffect} from 'react';
import { View, TextInput, Button, Alert,StyleSheet,ImageBackground,Image,Text ,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native';
import {firebaseConfig} from '../firebaseConfig';
//import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
//const db = firebase.firestore();
import db from '../firebaseConfig'
 const screenheight = Dimensions.get("window").height;
const PhoneAuth = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [isLoading,setIsLoading]=useState(false)
  const[userExists,setUserExists]=useState('')
  const recaptchaVerifier =useRef(null)
  useEffect(()=>{
    //setIsLoading(true)
   // getUsers();
  },[])

  const getUsers= async()=>{
    await db.collection("users").where("phoneNumber", "==", phoneNumber).onSnapshot((snapshot) => {
    // var allU = [];
      snapshot.docs.map((doc) => {
       
        var user = doc.data();
       // console.log(user)
      console.log(user.phoneNumber)

       
        console.log(user)

        setUserExists(user.phoneNumber)
        
      //  setName(doc.data().name)
       // allU.push(user)
      
      });
  
    
     setIsLoading(false)
    });
  }  
  const handleSendOtp = async () => {
    if(phoneNumber!=''&& name!=''){
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );

      setVerificationId(verificationId);
      Alert.alert('Verification code has been sent to your phone.');

    } catch (error) {
      console.log(error);
      Alert.alert('Failed to send verification code.Please try again after a while');
    }
  }
  else{
    alert('Please fill in both the fields')
  }
  };

  const handleVerifyOtp = async () => {
 
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );

      await firebase.auth().signInWithCredential(credential);
      db.collection("users").add({
        phoneNumber: phoneNumber,
        uid: firebase.auth().currentUser.uid,
       name:name,
      });
      Alert.alert('Successfully authenticated with phone number!');
      setCode("");
      setPhoneNumber("");

      navigation.navigate('Contacts')
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to verify OTP.Please try again');
    }

  };

  return (
    // <View style={{flex:1}}>
    //   <FirebaseRecaptchaVerifierModal
    //   ref={recaptchaVerifier}
    //   firebaseConfig={firebaseConfig}
    //   />
    //   <TextInput
    //     placeholder="Phone Number"
    //     value={phoneNumber}
    //     onChangeText={setPhoneNumber}
    //     style={{marginTop:100}}
    //   />
    //   <Button title="Send OTP" onPress={handleSendOtp} />
    //   <TextInput
    //     placeholder="OTP"
    //     value={code}
    //     onChangeText={setCode}
    //   />
    //   <Button title="Verify OTP" onPress={handleVerifyOtp} />
    // </View>
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/Flash.jpg')} style={styles.background} resizeMode="cover">
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <Animatable.View animation="slideInUp" style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome to Chat App</Text>
          <Text style={styles.subTitle}>Connect with friends globally</Text>
          <Input
            placeholder='Phone Number'
            leftIcon={<Icon name='phone' size={18} color='grey' />}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            autoCapitalize='none'
            autoCompleteType='tel'
            keyboardType='phone-pad'
          />
            <Input
            placeholder='Name'
            leftIcon={<Ionicons name="person" size={18} color="grey" />}
            value={name}
            onChangeText={(text) => setName(text)}
            autoCapitalize='none'
           // autoCompleteType='tel'
           // keyboardType='phone-pad'
          />
          <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
          <Input
            placeholder='OTP'
            leftIcon={<Icon name='lock' size={18} color='grey' />}
            value={code}
            onChangeText={(text) => setCode(text)}
            autoCapitalize='none'
            autoCompleteType='password'
            secureTextEntry={false}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
            <Text style={styles.signUpText}>Already a user? Sign in</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: screenheight,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    //borderRadius:20,
    //borderTopEndRadius: 50,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#064663',
    marginBottom: 10,
    textAlign: 'center',
  },

  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#064663',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingText: {
    color: '#064663',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: '#FAAB78',
    justifyContent: 'center',
    alignItems:'center', 
     borderRadius :5, 
     marginTop :10
     },
  buttonText :{
    fontWeight:'bold', 
    color:'#064663', 
    fontSize :20
     },
   forgotPasswordText :{
    fontWeight:'bold', 
    color:'#064663', 
    fontSize :15, 
    marginTop :10
     },
   signUpText :{
    fontWeight:'bold', 
    color:'#064663', 
    fontSize :15, 
    marginTop :10
     }
});

export default PhoneAuth;
