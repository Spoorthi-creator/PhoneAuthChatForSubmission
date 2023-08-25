import { StyleSheet, Text, View,FlatList,ScrollView,TouchableOpacity ,ActivityIndicator} from 'react-native'
import React ,{useEffect,useState}from 'react'
import firebase from 'firebase';
import { useRoute } from '@react-navigation/native'
import db from '../firebaseConfig'
//const db = firebase.firestore();
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
//import filter from 'lodash.filter';
export default function ChatScreen({ navigation }) {
  const id=firebase.auth().currentUser.uid;
    const [userC,setUserC]=useState([])
    const [isLoading, setIsLoading]=useState(false)
    const[fullData,setFullData]=useState([])
    const[searchQuery,setSearchQuery]=useState("")
    const[error,setError]=useState(null)
    const route=useRoute();
    //const name=route.params.nameU;
    //
  
   useEffect(()=>{
    setIsLoading(true)
    getUsers();
  //  console.log('Name in Contact',route.params.nameU)
  },[])

   

   if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size={'large'} color='#064663'></ActivityIndicator>
      </View>
    )
   }

    const getUsers= async()=>{
               await db.collection("users").where("uid", "!=", firebase.auth().currentUser.uid).onSnapshot((snapshot) => {
                var allU = [];
                 snapshot.docs.map((doc) => {
                  
                   var user = doc.data();
                   console.log(user)
                   allU.push(user)
                 
                 });
             
                setFullData(allU)
                setUserC(allU)
                setIsLoading(false)
               });
             }
             const emptylist=()=>{
                return(
                  <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',marginTop:100}}>
              <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}} > No users at the moment</Text>
              </View>
                ) 
              }

//               const handleSearch=(query)=>{
//                 setSearchQuery(query)
//                // const formattedQuery=query.toLowerCase();
//                const formattedQuery=query;
//                 const filteredData=filter(fullData,(user)=>{
//                   return contains (user,formattedQuery)
//                 });
//                 console.log("Filterd data", filteredData)
//                 setUserC(filteredData)
//                }

//                const contains=({name,email},query)=>{
// if(email.includes(query)||name.includes(query)){
//   console.log("Email there", email.includes(query))
//   return true;
// }
// else{
//   return false;
// }
//                }

              const renderItem = ({item}) => {
                
                return(
                 <ScrollView>
                  <TouchableOpacity style={{width:'90%',flex:1,borderWidth:1,margin:10,borderRadius:10}} onPress={()=>{
                    navigation.navigate('Chat',{data:item.uid,id:id})
                  }}>
                   
                        <View style={{flexDirection:'row'}}>
                        <Ionicons name="ios-person-circle-outline" size={30} color="#064663" />
                        <Text style = {{
                            fontSize : 25,
                            marginLeft : 25,
                            textAlign:'center',
                            color:'#064663',
                          
                            
                        }}>{item.name}</Text>
                        </View>
                       
                        </TouchableOpacity>
                        </ScrollView>
                       
                   
               
                )
              }
  return (
    <View>
     

      {/* <TextInput
      placeholder='Search'
      clearButtonMode='always'
      autoCapitalize='none'
      autoCorrect={false}
      value={searchQuery}
      onChangeText={(query)=>handleSearch(query)}
      style={{paddingHorizontal:20,paddingVertical:10,borderRadius:10,borderWidth:1,margin:20}}>

      </TextInput> */}
      <FlatList 
                         ListEmptyComponent={emptylist}
                         scrollEnabled = {true}
                        data = {userC}
                        renderItem={renderItem}
                        keyExtractor={(item, index)=>index.toString()}
                        style={{
                          marginBottom:20,
                         // marginTop:30
                        }}
                          />
    </View>
  )
}





// import React, { Component ,useEffect,useState,FlatList} from 'react';
// import { Text, View } from 'react-native';
// import firebase from 'firebase';
// import db from '../config';

// export default function ChatScreen() {
   
//          const [userC,setUserC]=useState([])
      
//   //  const [user, setUser]=useState([]);
//   useEffect(()=>{
//     getUsers();
//   },[])
//    // this.getUsers()
   
//     const getUsers= async()=>{
//        await db.collection('users')
//        .where('email', '!=', firebase.auth().currentUser.email)
//        .onSnapshot((snapshot) => {
//          snapshot.docs.map((doc) => {
//            var allU = [];
//            var user = doc.data();
//            console.log(user)
//            allU.push(user)
         
//          });
//         // this.setState({userC:allU});
//         setUserC(allU)
//        });
//     }
   
//     const emptylist=()=>{
//        return(
//          <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',}}>
//      <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}} > No contacts at the moment</Text>
//      </View>
//        ) 
//      }
   
//       renderItem = ({item}) => {
//        return(
//          <View style={{backgroundColor:'#e75480',width:'90%',marginLeft:30,marginRight:13,borderRadius:20,flex:1}}>
//            <View style = {{ 
//              backgroundColor:'#f9ccca',borderRadius:10,marginLeft:20,padding:10,width:'95%',marginTop:10}}>
//                <ScrollView>
//                <Text style = {{
//                    fontSize : RFValue(15),
//                    marginLeft : RFValue(5)
//                }}>Email : {item.email}</Text>
//                {/* <Text style = {{
//                    fontSize : RFValue(15),
//                    marginLeft : RFValue(5)
//                }}>Time : {item.time}:{item.min} </Text>
//                <Text style = {{
//                    alignSelf : "center",
//                    fontSize : RFValue(23)
//                }}>{item.task}</Text>
//                  <Pressable style={{alignSelf:'flex-end',marginRight:10}} onPress={()=>handleDelete(item.id)}>
//                       <MaterialCommunityIcons name="delete-empty" size={22} color="red" />
//                       </Pressable>
//                */}
//                </ScrollView>
//            </View>
//        </View>
//        )
//      }

//         return (
//             <View
//                 style={{
//                     flex: 1,
//                     justifyContent: "center",
//                     alignItems: "center"
//                 }}>
//                 <View style={{width:'100%',height:60,backgroundColor:'white',elevation:5,justifyContent:'center',alignItems:'center'}}>

//                     <Text style={{color:'blue',fontSize:20}}>Chat Feature</Text>

//                     <FlatList 
//                          ListEmptyComponent={emptylist()}
//                          scrollEnabled = {true}
//                         data = {userC}
//                         renderItem={renderItem}
//                         keyExtractor={(item, index)=>index.toString()}
//                         style={{
//                           marginBottom:20,
//                          // marginTop:30
//                         }}
//                           />
              
//                 </View>
//             </View>
//         )
                    
// }