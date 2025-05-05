
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

const dropDown=document.querySelectorAll(".dropDown select")

const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector('.msg')

let i=0;

for(let select of dropDown){
    for( currcode in countryList){
       let newOption=document.createElement("option")
       newOption.innerText=currcode;
       newOption.value=currcode;
       if(select.name==="from" && currcode==="USD"){
        newOption.selected="selected"
       }else if(select.name=== "to" && currcode==="INR"){
        newOption.selected="selected"
        
       }
       select.append(newOption)
       }
      select.addEventListener('change',(evt)=>{
            updateFlag(evt.target);
      }) 
}

const updateFlag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;

let img=element.parentElement.querySelector("img");
img.src=newSrc
}

btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
  
    if (amountValue === "" || amountValue < 1) {
      amountValue = 1;
      amount.value = "1";
    }
  
    const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
  
      let response = await fetch(URL);
       let data = await response.json();
       let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
       let finalAmloutn=amountValue*rate

       msg.innerText=`${amountValue} ${fromCurr.value} = ${finalAmloutn} ${toCurr.value}`
  });


  


