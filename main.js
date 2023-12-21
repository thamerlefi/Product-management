let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let moode = "create";
let tmp;
//------------------------------------------------------------------------------- get total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = "$" + result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

//------------------------------------------------------------------------------ create products
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else dataPro = [];

submit.onclick = () => {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //---------------------------------------------------------------------------- count
  if (moode === "create") {
    if (newPro.count > 1) {
      for (i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else dataPro.push(newPro);
  } else {
    dataPro[tmp] = newPro;
    moode = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }
  //----------------------------------------------------- save data in local storage
  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  getTotal();
  shoowData();
};
//------------------------------------------------------------------------- clear inputs value
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//-------------------------------------------------------------------------------- read data
let deleteAll = document.getElementById("deleteAll");
function shoowData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="uppdate" onclick="updateData(${i})">update</button></td>
            <td><button onclick= "deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    document.getElementById("tbody").innerHTML = table;

    if (dataPro.length > 0) {
      deleteAll.innerHTML = `<button onclick="deleteAlll()" >delete All (${dataPro.length})</button>`;
    } else {
      deleteAll.innerHTML = "";
    }
  }
  console.log(dataPro);
}
shoowData();
//----------------------------------------------------------------------------------- delete
function deleteData(i) {
  localStorage.product = JSON.stringify(dataPro);
  dataPro.splice(i, 1);
  console.log(dataPro.length);
  if (dataPro.length === 0) {
    dataPro.splice(0);
    localStorage.clear();
    deleteAll.innerHTML = "";
    document.getElementById("tbody").innerHTML = "";
  }
  shoowData();
}
//------------------------------------------------------------------------------------clear all
function deleteAlll() {
  localStorage.clear();
  dataPro.splice(0);
  deleteAll.innerHTML = "";
  document.getElementById("tbody").innerHTML = "";
  console.log(dataPro);
  shoowData();
}
//----------------------------------------------------------------------------------- update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  getTotal();
  submit.innerHTML = "Update";
  moode = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
// clean data
