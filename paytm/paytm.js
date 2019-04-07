import React from 'react';
import {View, Text, Modal, WebView, TouchableOpacity} from 'react-native';


export default  class App extends React.Component{

    state = {
        showModal: false,
        ack:"",
        ORDER_ID:"pohrterdfggsfsdfdrgsdetasdsqedfhjlkkn3435",
        TXN_AMOUNT:"50",
        CUST_ID: "vichi1000",
        MOBILE_NO: "9833097595",
    }

    generateJSCode() {
      
      let jsCode = `document.getElementById("ORDER_ID").value = "${this.state.ORDER_ID}"; document.getElementById("TXN_AMOUNT").value = "${this.state.TXN_AMOUNT}"; document.getElementById("CUST_ID").value = "${this.state.CUST_ID}";  document.f1.submit()`;
      return jsCode;
    }

    handelResponse = (title) =>{
      console.log("resopnse : "+ title)
        if(title == 'true'){
          this.setState({showModal:false, ack : 'Your transaction was successful'})
        }else if(title == 'false'){
          this.setState({showModal:false, ack : 'Something went wrong'})
        }else{
          return
        }
    }

    render(){

      let{showModal, ack, ORDER_ID, TXN_AMOUNT, CUST_ID}= this.state
        return(

            <View style={{marginTop:90}}>
                <TouchableOpacity
                  onPress={() => this.setState({showModal:true})}
                >
                    <Text>Pay with PayTm</Text>
                </TouchableOpacity>
                <View style={{marginTop:50}}>

                  <Text>{ack}</Text>
                </View>

                <Modal
                  visible={showModal}
                  onRequestClose ={()=> this.setState({showModal:false})}
                
                >
                    <WebView
                        source={{uri:"http://192.168.43.64:3001/api/paytm/request"}}
                        injectedJavaScript={this.generateJSCode()}
                        onNavigationStateChange = {data => this.handelResponse(data.title)}

                    />

                </Modal>

            </View>
        );
    }
}