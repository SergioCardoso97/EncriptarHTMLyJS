var CryptoJS = require("crypto-js");


function encriptarPalabra(){
    var encriptar = document.getElementById("input1").value;
    document.getElementById("input2").value = this.Encrypt(encriptar,"0X47&$#7")
}

function desencriptarPalabra(){
    var encriptado = document.getElementById("input3").value;
    document.getElementById("input4").value = this.Decrypt(encriptado,"0X47&$#7")
}

function Encrypt(origin, key){
    try {
      let keyWordArray = CryptoJS.enc.Utf8.parse(key);
      let originWordArray = CryptoJS.enc.Utf16LE.parse(origin);
      let keyAndIv = CryptoJS.PBKDF2(keyWordArray, CryptoJS.enc.Base64.parse("SXZhbiBNZWR2ZWRldg=="), { 
        keySize: 256/32 + 128/32, 
        iterations: 1000, 
        hasher: CryptoJS.algo.SHA1 
      });
      let hexKeyAndIv = CryptoJS.enc.Hex.stringify(keyAndIv);
      let hexKey = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(0, 64));
      let iv = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(64, hexKeyAndIv.length));
      return CryptoJS.AES.encrypt(originWordArray, hexKey, {iv: iv}).toString();
    } 
    catch (error) {
      throw error;
    }
}
function Decrypt(encrypted, key){    
    try {
      let keyWordArray = CryptoJS.enc.Utf8.parse(key);
  
      let keyAndIv = CryptoJS.PBKDF2(keyWordArray, CryptoJS.enc.Base64.parse("SXZhbiBNZWR2ZWRldg=="), { 
        keySize: 256/32 + 128/32, 
        iterations: 1000,
        hasher: CryptoJS.algo.SHA1 
      });
    
      let hexKeyAndIv = CryptoJS.enc.Hex.stringify(keyAndIv);
  
      let hexKey = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(0, 64));
      let iv = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(64, hexKeyAndIv.length)); 
                                                     
      let decryptedWordArray = CryptoJS.AES.decrypt(encrypted, hexKey, {iv: iv});
      return CryptoJS.enc.Utf16LE.stringify(decryptedWordArray);   
    } 
    catch (error) {
      throw error;
    }
}