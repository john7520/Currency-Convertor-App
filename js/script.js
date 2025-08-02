
const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

let selectValues=document.querySelectorAll("select")
let fromFlag=document.querySelector(".from-image")
let toFlag=document.querySelector(".to-flag")
let fromSelect=document.querySelector("#from-select")
let toSelect=document.querySelector("#to-select")
let exchangeBtn=document.querySelector(".exchange-btn")
let amount=document.querySelector("input")
let currencyDisplay=document.querySelector(".currency-display")
amount.value=0
exchangeBtn.addEventListener("click",Exchange)

for(let i in countryList){
  var option1=document.createElement("option")
  var option2=document.createElement("option")
  option1.innerText=i
  option2.innerText=i
  selectValues[0].appendChild(option1)
  selectValues[1].append(option2)
}
fromSelect.value="USD"
toSelect.value="ETB"
fromFlag.src=`https://flagsapi.com/${countryList[fromSelect.value]}/flat/64.png`
fromSelect.addEventListener("change",()=>{
  fromFlag.src=`https://flagsapi.com/${countryList[fromSelect.value]}/flat/64.png`
})
toFlag.src=`https://flagsapi.com/${countryList[toSelect.value]}/flat/64.png`
toSelect.addEventListener("change",()=>{
  toFlag.src=`https://flagsapi.com/${countryList[toSelect.value]}/flat/64.png`
})


async function Exchange(){
  if(amount.value>=0){
    currencyDisplay.textContent="waiting..."
    currencyDisplay.style.color=""
    let url=`https://v6.exchangerate-api.com/v6/bd3932e0f3d0ef9c49702280/latest/${fromSelect.value}`

    let promise=await fetch(url)
    let response=await promise.json()
    let data=response.conversion_rates
    for(let i in data){
      if(i==toSelect.value){
        let finalAmount=(amount.value*data[i]).toFixed(2)
        currencyDisplay.textContent=amount.value+fromSelect.value+" = "+finalAmount+toSelect.value
        console.log(data)
        return;
      }
    }
  }else{
    currencyDisplay.textContent="Invalid Amount"
    currencyDisplay.style.color="red"
  }

}
document.addEventListener("keydown",(event)=>{
  if(event.key=="Enter"){
    exchangeBtn.click()
  }
})

