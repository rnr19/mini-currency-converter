// const BASE_URL =
//   "https://2024-03-06.currency-api.pages.dev/v1/currencies";
// const BASE_URL = "https://api.exchangerate.host/convert";
//const BASE_URL =
  //"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");



for(let select of dropdowns){
for(currCode in countryList){
    let newOptions= document.createElement("option");
    newOptions.innerText=currCode;
    newOptions.value=currCode;
    
    if(select.name==="from" && currCode === "USD"){
        newOptions.selected="selected";
    }else if(select.name === "to" && currCode === "INR"){
        newOptions.selected="selected";
    }
    select.append(newOptions);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode= element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",(evt) =>{
    evt.preventDefault();
    updateExchangeRate();

});

const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval===""|| amtval < 1){
        amtval=1;
        amount.value="1";
    }

    // console.log(fromCurr.value,toCurr.value);
    //const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    //const URL = `${BASE_URL}?from=${fromCurr.value}&to=${toCurr.value}`;
    //const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    try{
    let response=await fetch(URL);
    let data = await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmount=(amtval*rate).toFixed(2);
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    }catch(error){
        msg.innerText="Error fetching the data,try again";
        console.error(error);
    }
    
};

window.addEventListener("load",()=>{
    updateExchangeRate();
});