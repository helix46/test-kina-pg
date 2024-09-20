function setValues() {
  document.getElementById("TERMINAL").value = "99999001";
  document.getElementById("TRTYPE").value = "1";
  document.getElementById("AMOUNT").value = "11.48";
  document.getElementById("CURRENCY").value = "PGK";
  document.getElementById("ORDER").value =
    "771446" + Math.floor(1000 + Math.random() * 9000);
  document.getElementById("MERCHANT").value = "000000099999001";
  document.getElementById("EMAIL").value = "developer@memberwizard.com.au";

  // document.getElementById("BACKREF").value =
  //   "https://testmemberwizard.azurewebsites.net/api/kinabank/webhook";
  document.getElementById("BACKREF").value = "https://test-40f84.web.app/";

  document.getElementById("TIMESTAMP").value = this.getTimeStamp();
  document.getElementById("MERCH_NAME").value = "Books Online Inc.";
  document.getElementById("COUNTRY").value = "PG";
  document.getElementById("MERCH_URL").value = "www.sample.com";
  document.getElementById("MERCH_GMT").value = "";
  document.getElementById("DESC").value = "IT Books. Qty: 2";
  document.getElementById("NONCE").value = "F2B2DD7E603A7ADA";

  this.getP_SIGN();
}

function getTimeStamp() {
  const d = new Date();
  // YYYYMMDDHHMMSS
  const s =
    d.getUTCFullYear() +
    "" +
    this.pad2(d.getUTCMonth() + 1) +
    "" +
    this.pad2(d.getUTCDate()) +
    "" +
    this.pad2(d.getUTCHours()) +
    "" +
    this.pad2(d.getUTCMinutes()) +
    "" +
    this.pad2(d.getUTCSeconds());
  console.log(s);
  return s;
}

function pad2(n) {
  return n < 10 ? "0" + n : n;
}

function getFieldString(field) {
  // console.log(field);
  const value = document.getElementById(field).value;
  // console.log(value);
  if (value) {
    return value.length + value;
  } else {
    return "-";
  }
}

function getEncryptedValue(macSourceString) {
  // in production do this in the backend to avoid exposing the secret key
  const secret = "debdd135e436905c7a02f20c56c83a4c501adf555457f0df";
  let txtKey = CryptoJS.enc.Hex.parse(secret);
  let encryptedMac = CryptoJS.HmacSHA256(macSourceString, txtKey);
  return encryptedMac.toString(CryptoJS.enc.Hex);
}

function getP_SIGN() {
  let s = "";
  s += this.getFieldString("TERMINAL");
  s += this.getFieldString("TRTYPE");
  s += this.getFieldString("AMOUNT");
  s += this.getFieldString("CURRENCY");
  s += this.getFieldString("ORDER");
  s += this.getFieldString("MERCHANT");
  s += this.getFieldString("EMAIL");
  s += this.getFieldString("BACKREF");
  s += this.getFieldString("TIMESTAMP");
  s += this.getFieldString("MERCH_NAME");
  s += this.getFieldString("COUNTRY");
  s += this.getFieldString("MERCH_URL");
  s += this.getFieldString("MERCH_GMT");
  s += this.getFieldString("DESC");
  s += this.getFieldString("NONCE");

  document.getElementById("P_SIGN").value = this.getEncryptedValue(s);
}

setValues();
