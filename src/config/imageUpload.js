export default {
    uriToBlob(uri) {

        return new Promise((resolve, reject) => {
    
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            // return the blob
            resolve(xhr.response);
          };     
          xhr.onerror = function() {
            // something went wrong
            reject(new Error('uriToBlob failed'));
          };
          // this helps us get a blob
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
    
        });
      },
    
      uploadToFirebase(blob , firebase , path) {
    
        return new Promise((resolve, reject)=>{
          var storageRef = firebase.storage().ref();
    
          var upload = storageRef.child(path).put(blob, {
            contentType: 'image/jpeg'
          }).then((snapshot)=>{
    
            blob.close();
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                resolve(downloadURL);
            });

           
    
          }).catch((error)=>{
    
            reject(error);
    
          });
    
        });
    
    
      }
    
}