import {RTCPeerConnection,RTCSessionDescription, RTCIceCandidate} from 'react-native-webrtc';
const config = {"iceServers":[{}]};
const connection = {
  'optional': 
  [{'DtlsSrtpKeyAgreement': true}, {'RtpDataChannels': true }] 
};
var net = require('react-native-tcp');
let server,SocketG,peerConn,dataChannel;
export const WebRTC = {

    startServer(callback){
        this.createDatachannel();
        if(typeof server =='undefined')
            server = net.createServer((socket)=>{
                SocketG=socket;
                socket.on('data',(data)=>{
                    console.log("Data Received: "+data);
                    let sdp = JSON.parse(data);
                    if(sdp.sdp){
                    peerConn.setRemoteDescription(new RTCSessionDescription(sdp),()=>{
                      peerConn.createAnswer(desc=>{
                        peerConn.setLocalDescription(desc,()=>{
                          SocketG.write(JSON.stringify(desc));
                        },(err)=>{
                          console.log("Error occurred in Local description "+err.message);
                        });
                      },(err)=>{
                        console.log("Error Occurred in Create Answer: "+err.message);
                      });        
                    },(err)=>{
                      console.log("Error Occurred: "+err.message);
                    });}
                    else
                    {
                      peerConn.addIceCandidate(new RTCIceCandidate(sdp));
                    }
                  });
            }).listen(8080,()=>{
                               
            });
        else{
            callback("Already Started");            
        }
    },
    setServer(obj){
        server=obj;
    },
    setDC(dc){
        console.log("In WebRTC service before setting DC: "+dc);
        //peerConn = new RTCPeerConnection(config,connection);
        dataChannel = dc;
        console.log("IN WebRTC Service: "+dataChannel);
    },
    getDC(){
      console.log("getDC: "+dataChannel);
      return dataChannel;
    }
}