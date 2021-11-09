// SOCKET CONNECTION

let ENDPOINT = 'https://suwitapp.herokuapp.com/'
// let ENDPOINT = 'http://localhost:5000'

var socket = io(ENDPOINT, {
  transports: ["websocket"],
  // origins : '*:*',
});

var lawanMain = "";

var dataSpin = [];

let name = prompt("Masukkan Nama mu");

if (name == "") {
  name = prompt("Masukkan Nama mu");
}
if (name == "") {
  name = prompt("Masukkan Nama mu");
}
// let namaa = Math.floor(nama);
let room = "suwit";

let imgLi = document.querySelectorAll("li img");
imgLi.forEach((data) => {
  data.setAttribute("value", name);
});

socket.emit("join", { name, room }, () => {});

socket.on("message", (datas) => {
  let result = datas["datas"];
  dataSpin = datas["datas"];
  let html = "";
  if (result.length > 2) {
    if (name == result[2].name) {
      window.location.href = "http://www.google.com";
    }
  }
  console.log(result);
  result.forEach((data) => {
    html += `<img src="assets/img/bg.png" class="${data.name}">`;
    let area = document.querySelector(".area-komputer");
    area.innerHTML = html;
  });
});

socket.on("result", (datas) => {
  let result = datas["userSuwit"];
  let i = 0;
  // spin(result);
  result.forEach((res) => {
    i++;
    if (i > 1) {
      socket.emit("sendMessage", () => {});
    }
  });
});

socket.on("finish", (response) => {
  let data = response["response"];
  const img = ["gajah", "semut", "orang"];
  let i = 0;
  // console.log(data);
  const waktuMulai = new Date().getTime();
  data.forEach((res) => {
    let imgComputer = document.querySelector(`.${res.name}`);
    // console.log(id);
    setInterval(function () {
      imgComputer.setAttribute("src", "assets/img/" + img[i++] + ".png");
      if (new Date().getTime() - waktuMulai > 1000) {
          clearInterval;
          imgComputer.setAttribute("src", "assets/img/" + res.cus + ".png");
          getHasil(data);
          return;
        }
        if (i == img.length) i = 0;
      }, 100);
    });
    setTimeout(() => {
        location.reload();
    }, 15000);
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getPilihanComputer() {
  const comp = Math.random();
  if (comp < 0.34) return "gajah";
  if (comp >= 0.34 && comp < 0.67) return "orang";
  return "semut";
}

function getHasil(data) {
  let hasil = "";
  let info = document.querySelector(".info");

  if (data[0].cus == "gajah" && data[1].cus == "orang") {
    if (data[0].name == name) {
      info.innerHTML = "MENANG!";
    } else {
      info.innerHTML = "KALAH!";
    }
  } else if (data[0].cus == "gajah" && data[1].cus == "semut") {
    if (data[0].name == name) {
      info.innerHTML = "KALAH!";
    } else {
      info.innerHTML = "MENANG!";
    }
  } else if (data[0].cus == "semut" && data[1].cus == "orang") {
    if (data[0].name == name) {
      info.innerHTML = "KALAH!";
    } else {
      info.innerHTML = "MENANG!";
    }
  } else if (data[0].cus == "orang" && data[1].cus == "semut") {
    if (data[0].name == name) {
      info.innerHTML = "MENANG!";
    } else {
      info.innerHTML = "KALAH!";
    }
  } else if (data[0].cus == "orang" && data[1].cus == "gajah") {
    if (data[0].name == name) {
      info.innerHTML = "KALAH!";
    } else {
      info.innerHTML = "MENANG!";
    }
  } else if (data[0].cus == "semut" && data[1].cus == "gajah") {
    if (data[0].name == name) {
      info.innerHTML = "MENANG!";
    } else {
      info.innerHTML = "KALAH!";
    }
  } else if (data[0].cus == "semut" && data[1].cus == "semut") {
    if (data[0].name == name) {
      info.innerHTML = "SERI!";
    } else {
      info.innerHTML = "SERI!";
    }
  } else if (data[0].cus == "orang" && data[1].cus == "orang") {
    if (data[0].name == name) {
      info.innerHTML = "SERI!";
    } else {
      info.innerHTML = "SERI!";
    }
  } else if (data[0].cus == "gajah" && data[1].cus == "gajah") {
    if (data[0].name == name) {
      info.innerHTML = "SERI!";
    } else {
      info.innerHTML = "SERI!";
    }
  }
}

function spin(data) {
  console.log(data);
  let id = 0;
  data.forEach((res) => {
    let imgComputer = document.querySelector(`.${res.name}`);
    // const img = ["gajah", "semut", "orang"];
    // let i = 0;
    // const waktuMulai = new Date().getTime();
    // // console.log(id);
    // setInterval(function () {
    //   if (new Date().getTime() - waktuMulai > 1000) {
    //     if (id > 1) {
    //       clearInterval;
    //       return;
    //     }
    //   }
    //   if (i == img.length) i = 0;
    // }, 100);

    if (id > 1) {
      imgComputer.setAttribute("src", "assets/img/" + res.cus + ".png");
    }
    id++;
  });
}

const pilihan = document.querySelectorAll("li img");
pilihan.forEach(function (pil) {
  pil.addEventListener("click", function () {
    // const pilihanComputer = getPilihanComputer();
    const cus = pil.className;
    // const hasil = getHasil(pilihanComputer, pilihanPlayer);
    // console.log(pilihanPlayer);
    // spin(name);

    socket.emit("suwit", { name, cus }, () => {});

    // setTimeout(() => {
    //   const imgComputer = document.querySelector(`.${name}`);
    //   imgComputer.setAttribute("src", "assets/img/" + pilihanPlayer + ".png");

    //   const info = document.querySelector(".info");
    //   info.innerHTML = hasil;
    // }, 1100);
  });
});

// const pilihan = document.querySelector('.pilihan');
// pilihan.addEventListener('click', function() {
//   const pilihanComputer = getPilihanComputer();
//   const pilihanPlayer = pilihan.getAttribute('value');
//   console.log(pilihanPlayer);
//   const hasil = getHasil(pilihanComputer, pilihanPlayer);
//   // console.log(hasil);

//   const imgComputer = document.querySelector('.img-komputer');
//   imgComputer.setAttribute('src', 'assets/img/' + pilihanComputer + '.png');

//   const info = document.querySelector('.info');
//   info.innerHTML = hasil;
// })

// const pOrang = document.querySelector('.orang');
// pOrang.addEventListener('click', function() {
//   const pilihanComputer = getPilihanComputer();
//   const pilihanPlayer = pOrang.className;
//   const hasil = getHasil(pilihanComputer, pilihanPlayer);
//   // console.log(hasil);

//   const imgComputer = document.querySelector('.img-komputer');
//   imgComputer.setAttribute('src', 'assets/img/' + pilihanComputer + '.png');

//   const info = document.querySelector('.info');
//   info.innerHTML = hasil;
// })

// const pSemut = document.querySelector('.semut');
// pSemut.addEventListener('click', function() {
//   const pilihanComputer = getPilihanComputer();
//   const pilihanPlayer = pSemut.className;
//   const hasil = getHasil(pilihanComputer, pilihanPlayer);
//   // console.log(hasil);

//   const imgComputer = document.querySelector('.img-komputer');
//   imgComputer.setAttribute('src', 'assets/img/' + pilihanComputer + '.png');

//   const info = document.querySelector('.info');
//   info.innerHTML = hasil;
// })
