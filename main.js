console.log('main.js');

const API_URL = "https://api.thecatapi.com/v1/images/search?limit=5&api_key=live_qk25bvQ1hO62Kefvi36G8pGTIqgt7cPSiFz2WxOFp1ipNSMevlrpJALlytmcWIHE";

async function reload() {  
      
    const res = await fetch(API_URL);
    const data = await res.json();
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    console.log(data);
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

}

reload();