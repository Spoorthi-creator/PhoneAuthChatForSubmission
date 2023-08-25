import { StyleSheet, Text, View } from 'react-native'
import  { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import React from 'react'
import firebase from 'firebase';
//import firebase from 'firebase/compat/app'
 //import firebase from 'firebase';
import db from '../firebaseConfig';
import { useRoute } from '@react-navigation/native'

//const db = firebase.firestore();

const Chat = ({navigation}) => {
    const [messagesList, setMessagesList] = useState([])
const route=useRoute();

  useEffect(() => {
    console.log("Id", route.params.id)
    console.log("Data", route.params.data)
   console.log(route.params.id + route.params.data)
 //  console.log("Id",route.params.id)
    const subcriber=db.collection("chats").
    doc(route.params.id + route.params.data).collection('messages').orderBy("createdAt","desc");
    subcriber.onSnapshot(querysnapshot=>{
       
const allmessages=querysnapshot.docs.map(item=>{
   // console.log("Snapshot",item.data)
   console.log("Data from chats",item.data())
    return{...item.data(),createdAt:Date.parse(new Date()) };
  
});
setMessagesList(allmessages);
    });
//return()=>subcriber();

  }, [])

  const onSend = useCallback(async(messages = []) => {
    const msg=messages[0];
    const myMsg={
        ...msg,sendBy:route.params.id,
       // messageId:msg._id,
        sendTo:route.params.data,
        createdAt:Date.parse(msg.createdAt)
    }
    setMessagesList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
    db.collection("chats").doc(route.params.id + route.params.data).collection('messages').add(myMsg);
   db.collection("chats").doc(route.params.data + route.params.id).collection('messages').add(myMsg);

  }, [])
  return (
    <View style={{flex:1}}>
      <GiftedChat
      messages={messagesList}
      onSend={messages => onSend(messages)}
      user={{
        _id:firebase.auth().currentUser.uid,
      }}
    />
    </View>
    
  )
}

export default Chat

const styles = StyleSheet.create({})
