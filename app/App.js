import React, { useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import firestore from '@react-native-firebase/firestore';


const Login = ({navigation}) => {
  const [load, setLoad] = useState({
    isLoading: false,
    id:''
  });

  const onChange = (id) => {
    setLoad({id: id})
  }; 
  const userLogin = () => {
    let ref = firestore().collection('rbpid').doc('hello')

    const fid = ref.id;
    const str = load.id;
    {
      new Promise( () => {
        
        setLoad({
          isLoading: true,
        })      
        if(str === fid){
       { 
        console.log(str, fid, "success");
        setLoad({
          isLoading: false,
        })
        navigation.navigate("HOME");
       }
      }
        else{
         console.log("fail", str, fid);
         Alert.alert('login failed')
         setLoad({
          id:'',
          isLoading: false,
        })
        }       
      })
    }
  }
  
  if(load.isLoading){
    return(
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    )
  }  
  //var id;  
  return (
    <View style={styles.container}>  
      <TextInput
        style={styles.inputStyle}
        placeholder="id:hello"
        onChangeText={(id) => onChange(id)}
        value={load.id}

      />
      
      <Button
        color="#C53CFF"
        title="Login"
        onPress={() => userLogin() }
      />   
                               
    </View>
  )
}
 
const Home = ({navigation}) => {
  const [users, setUsers] = useState();
  const collection = firestore().collection('rbpid');

  useEffect( async ()=>{
    try {
      const data = await collection.get();
      setUsers(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    } 
  },[])
  return (
    <View style={{flex:1, backgroundColor:"#fffff0"}}>
      
      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <TouchableOpacity style={styles.menuButton} 
                          onPress={() => navigation.navigate("LOCATION")}>
          <Text>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} 
                          onPress={() => navigation.navigate("RATE")}>
          <Text>Rate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} 
                          onPress={() => navigation.navigate("LOGIN")}>
          <Text>Logout</Text>
        </TouchableOpacity>        
      </View>
      <View style={styles.background}>
        <Text style={styles.bigText}>Home</Text>
        {users?.map(doc=>{
          return(<Text style={styles.text}>{doc.name}님, 환영합니다!</Text>)
        })}
      </View>      
    </View>
  )
}

const Location = ({navigation}) => {
  const [users, setUsers] = useState();
  const collection = firestore().collection('location');

  useEffect( async ()=>{
    try {
      const data = await collection.get();
      setUsers(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    } 
  },[]) 
    
  return (
    <View style={{flex:1, backgroundColor:"#fffff0"}}>
      
      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <TouchableOpacity style={styles.menuButton} 
                          onPress={() => navigation.navigate("HOME")}>
          <Text>Home</Text>   
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} 
                          onPress={() => navigation.navigate("RATE")}>
          <Text>Rate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} 
                          onPress={() => navigation.navigate("LOGIN")}>
          <Text>Logout</Text>
        </TouchableOpacity>
        
      </View>      
      <View style={styles.background}>      
      
      <Text style={styles.bigText}>Location</Text>

      {users?.map((doc) => {
        return <Text style={styles.text}>층: {doc.floor}층</Text>;
      })}
       </View>
    </View>
  )
}

const Rate = ({navigation}) => {
  
  const [times, setTimes] = useState();
  const [rates, setRates] = useState();
  const collection = firestore().collection("time");
  const collection2 = firestore().collection("rate");
  const date = new Date();
  dateToStr = (date) => {
    var week = new Array('일', '월', '화', '수', '목', '금', '토');
  
    var localTime = date.toLocaleTimeString();
  
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dayName = week[date.getDay()];
    
    return year+'년 '+month+'월 '+day+'일 '+dayName+'요일 '+localTime.substring(0,localTime.length-3); 

  }

  

  const dt = dateToStr(date)
  
  useEffect( async ()=>{
    try {
      const data = await collection.get();
      setTimes(data._docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    } 
  },[]) 
  const call3 = async () => {
    try {
      const data2 = await collection2.get();
      setRates(data2._docs.map(doc => ({ ...doc.data(), id: doc.id })));
      
    } catch (error) {
      console.log(error.message);
    } 
  }
  return (
    <View style={{flex:1, backgroundColor:"#fffff0"}}>
      
      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <TouchableOpacity style={styles.menuButton} 
                          onPress={() => navigation.navigate("LOCATION")}>
          <Text>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} 
                          onPress={() => navigation.navigate("HOME")}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} 
                          onPress={() => navigation.navigate("LOGIN")}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.background}>
   
      
        <Text style={styles.bigText}>Rate</Text>
        {times?.map((doc) => {
        return <Text style={styles.text}>입장 {"\n"} {doc.time}{"\n\n"}현재 시간{"\n"} {dt}</Text>;
      })} 
       
       <TouchableOpacity style={styles.mainButton2} onPress={call3}>
        <Text style={styles.buttonText}>요금 정산</Text>
        </TouchableOpacity>
        {rates?.map((doc) => {
        return <Text style={{ fontSize:20, marginTop: 150, color: '#2E2E2E', }}>퇴장: {dt}{"\n\n"}요금: {doc.rate}원</Text>;
      })} 
      </View>
    </View>
  )
}
const Stack = createNativeStackNavigator(); // Stack Navigation함수를 Stack변수명으로 저장

const App = () => {
  

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="HOME" component={Home} />
      <Stack.Screen name="LOCATION" component={Location} />
      <Stack.Screen name="RATE" component={Rate} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  menuButton: {
    width: 70,
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#F7D3FA',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:12,
  },
  mainButton: {
    backgroundColor:"#C53CFF",
    flexDirection: "column",
    alignSelf: "center",
    width: 300,
    height: 60,
    marginTop: 30,
    padding:10,
    borderRadius:12
  },
  mainButton2: {
    backgroundColor:"#C53CFF",
    flexDirection: "column",
    alignSelf: "center",
    width: 300,
    height: 60,
    marginTop: 100,
    padding:10,
    borderRadius:12
  },
  background: {
    flex:1,
    backgroundColor: "#F1D1FF"
  },
  bigText: {
    fontSize:40,
    marginBottom: 20,
    color: 'black'
  },
  text: {
    fontSize:20,
    marginBottom: 30,
    color: '#2E2E2E',
  

  },
  buttonText: {
    flexDirection: "column",
    alignSelf: "center",
    color: 'black',
    fontSize:25
    }
});

export default App;