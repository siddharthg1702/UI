let alive;
export const NodeService = {
    isAlive(){
        if(typeof alive =='undefined')
        {
            fetch('http://192.168.99.11:3000/', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
                },
            body: JSON.stringify(
                {
                "userName":"Infoview",
                "pwd":"IVTL"
                }
            ), 
            }).then((Response) => {
            console.log(Response);
            let data = Response.json().then(data=>console.log(data.status));      
            }).catch((err) => { console.log(err); })

        }    
    },

    verify(userName,pwd,callback){
        fetch('http://192.168.99.11:3000/verifyLogin', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
                },
            body: JSON.stringify(
                {
                "userName":userName,
                "pwd":pwd
                } 
            ), 
            }).then((Response) => {
            console.log(Response);
            let data = Response.json().then((data)=>{console.log(data.status)
                callback(data);
            });      
            }).catch((err) => { console.log(err); 
                callback("Error occurred");
            })
    },
    fetchUpdate(userName,callback){
        fetch('http://192.168.99.11:3000/lastUpdated', {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
                },
            body: JSON.stringify(
                {
                "userName":userName
                } 
            ), 
            }).then((Response) => {
            console.log(Response);
            let data = Response.json().then((data)=>{console.log(data.status+"From fetchUpdate")
                callback(data.status);
            });      
            }).catch((err) => { console.log(err); 
                callback("Error occurred");
            });
    }
}