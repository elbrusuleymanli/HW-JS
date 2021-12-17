let buttons = document.querySelectorAll(".addToCart");
let dropdown = document.querySelector(".dropdown-menu")
if (localStorage.getItem("backet") === null) {
  localStorage.setItem("backet", JSON.stringify([]));
}
buttons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (localStorage.getItem("backet") === null) {
      localStorage.setItem("backet", JSON.stringify([]));
    }
    let backet = JSON.parse(localStorage.getItem("backet"));
    let price = this.previousElementSibling.children[0].innerText;
    let model = this.parentElement.children[0].innerText;
    let image = this.parentElement.previousElementSibling.src;
    let dataId = this.getAttribute("data-id");

    let existProd = backet.find((p) => p.dataId == dataId);

    if (existProd == undefined) {
      let product = {
        dataId,
        price,
        model,
        image,
        count: 1,
      };

      backet.push(product);
    } else {
      existProd.count++;
    }
    localStorage.setItem("backet", JSON.stringify(backet));
    productCount();
  });
});

function productCount() {
  let backet = JSON.parse(localStorage.getItem("backet"));
  let countElement = document.querySelector(".countProduct");
  let count = 0;

  backet.forEach((c) => {
    count = count + c.count;
  });
  countElement.innerText = count;
}


productCount();

function totalPrice() {
  let backet = JSON.parse(localStorage.getItem("backet"));
  let priceElement = document.querySelector(".totalPrice");

  let total = backet.reduce((total, p) => {
    return (total += p.price * p.count);
  }, 0);
  priceElement.innerText = total;
}
totalPrice();
let row = document.querySelector(".row");
if (
  localStorage.getItem("backet") === null ||
  localStorage.getItem("backet") == "[]"
) {
  localStorage.setItem("backet", JSON.stringify([]));
  let div = document.createElement("div");
  let p = document.createElement("p");

  p.innerText = "Your basket is empty";
  p.style.fontSize = "20px";
  p.style.color = "red";
  p.style.padding = "10px";
  
  div.appendChild(p);
  row.append(div);
  dropdown.append(p)
} else {
  let backet = JSON.parse(localStorage.getItem("backet"));

  backet.forEach((p) => {
    let div = document.createElement("div");
    let image = document.createElement("img");
    let pCount = document.createElement("p");
    let pPrice = document.createElement("p");
    let pModel = document.createElement("p");
    let del = document.createElement("button");
    
   
    
    del.className = "btn btn-danger ";
    pModel.style.fontWeight="bold" 
    pPrice.style.color="red"
    pPrice.style.marginLeft="10px"
    image.style.width = "110px";
    pCount.style.textAlign="center"
    pModel.style.marginLeft="10px"

    div.style.backgroundColor="#dfdfdf"
    div.style.width="450px"
    div.style.display="flex"
    div.style.padding="30px"
    del.style.marginLeft="15px"
    del.style.marginBottom = "10px";
    image.src = p.image;

    pCount.innerText = "Count: " + p.count;
    pModel.innerText = "Model: " + p.model;
    pPrice.innerText = "Price: " + p.price * p.count + "$";
    del.innerText = "Delete";
 
    

    div.append(image, pModel, pCount, pPrice, del);
  
    dropdown.append(div);
   
    del.addEventListener("click", function (e) {
        e.preventDefault();
     
      if (p.count == 1) {
        div.remove(this.image, this.pModel, this.pCount, this.pPrice, this.del);
      } else {
        p.count--;
        pCount.innerText = "Count: " + p.count;
        pPrice.innerText = "Price: " + p.price * p.count + "$";
       
      }
     
    });
     
  });
}
