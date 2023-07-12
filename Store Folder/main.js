/*1*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore,getCountFromServer, collection, query, where, getDocs,getDoc, setDoc, addDoc, doc,deleteDoc,onSnapshot,orderBy, limit,startAt, startAfter,endAt } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';


var firebaseConfig = {
  apiKey: "AIzaSyCxhFz0o6GZZr0xLC4qBbrDNRJWv2Wi0bI",
  authDomain: "ordersystem-f3088.firebaseapp.com",
  projectId: "ordersystem-f3088",
  storageBucket: "ordersystem-f3088.appspot.com",
  messagingSenderId: "676460912839",
  appId: "1:676460912839:web:a6e88519d4f45fc8055ee2",
  measurementId: "G-6R5MHRT3XJ"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let X;

async function getCit(db,X) {
  const citiesCol = collection(db,`${X}`);
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
/*1*/





/* start function return array from db */

let AllProducts;

async function forAllProducts(X){

  const q = query(collection(db, "StoreProducts"), orderBy("date","desc"), limit(X||8));
  const querySnapshot = await getDocs(q);
  const cityList = querySnapshot.docs.map(doc => doc.data());

  let array=cityList;

  return array;
};

/* end function return array from db */







  /* start calc the total price of products in cart */
  function totalPrice()
  {
    let ArrayOfPrie = Array.from(document.querySelectorAll(".totalPriceCard"))
    let TotalPrice = 0
    let numOfCardsHaveAdd=0

    ArrayOfPrie.forEach(e=>{
      numOfCardsHaveAdd++
      TotalPrice+=parseInt(e.innerText)
    })

    document.querySelector(".totalPrice").innerText=`${TotalPrice}`
    document.querySelector(".numOfCardsAdd").innerText=numOfCardsHaveAdd;
    saveCartLocal();
  }
  /* start calc the total price of products in cart */



























let arrayOfCardsHadAddToCart = [];

await getCartFromLocal();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product');


if(product==null){

/* start return the array and pass it to showData function */
  showBannar()

  forAllProducts(8).then(e=>{
    AllProducts = e;
    ShowAll(e);
  });
/* end return the array and pass it to showData function */

  
} else if(product!==null){

  document.querySelector(".mainPage").style.display="none";
  document.querySelector(".productPage").style.display="block";
  document.querySelector(".nav-link").textContent="المتجر";
  document.querySelector(".nav-link").href="./index.html";
  
  await getProductData(product).then(e=>{
 
    let productDivDad=document.querySelector("#productDetails");
    productDivDad.querySelector(".ProductName").textContent=`${e.ProductName}`;
    productDivDad.querySelector(".ProductPrice").textContent=`${e.ProductPrice}`;
    productDivDad.querySelector(".ProductNote").textContent=`${e.ProductNote}`;
    productDivDad.querySelector(".ProductId").dataset.id=`${e.id}`;
    document.querySelector("#imageSection").querySelector(".ProductImage").src=`${e.ProductImage}`;

    if(e.ArrayOfProductImages!==undefined){

      for(let i=0; i<e.ArrayOfProductImages.length; i++){
        let isHidden='block';
        if(i!==0){
          isHidden="none";
        };
        let html = `
        
        <div class="mySlides2 fade" style="margin-bottom: 20px; display: ${isHidden};">
          <a class="sliderLinkTwo">
            <img class="sliderImgTwo imgToOpen" src="${e.ArrayOfProductImages[i].src}" style="width:100%">
          </a>
        </div>
  
        `;
  
        document.querySelector(".slideshow-container2").insertAdjacentHTML("afterbegin", html);
      };

    } else {
      document.querySelector("#imageSection").querySelector(".ProductImage").style.display="block";
      document.querySelector(".sliderBtnsDad").style.display="none";
    }


   

    document.querySelector(".ProductToAddToCart").addEventListener("click",()=>{

      if(arrayOfCardsHadAddToCart.includes(e.ProductName)==false)
      {
        arrayOfCardsHadAddToCart.push(e.ProductName)
        
        document.querySelector(".divForCardsHasSelc").innerHTML+=`
        
        <div class="cartDiv productNote" data-note="${e.ProductNote}" data-price="${e.ProductPrice}" data-name="${e.ProductName}" data-src="${e.ProductImage}" data-number="">
          <img src="${e.ProductImage}" class="productImage" loading="lazy">
          <div class="nameOfCardDad">
            <h2 class="productName" data-id="${e.id}">${e.ProductName}</h2>
          </div>
          <div class="priceOfCardDad">
            <h2 class="productPrice">${e.ProductPrice} ${currency}</h2>
          </div>
          <div class="quantityOfCardDad">
            <span class="low">-</span>
            <span style="width: 40px;" class="productAmount">1</span>
            <span class="height">+</span>
          </div>
          <div class="totalPriceOfCardDad">
            <span class="totalPriceCard productTotalPrice">${e.ProductPrice} ${currency}</span>
          </div>
          <div class="delOfCardDad">
            <img src="./Store Folder/images/delete.png" class="btnForDeletFromCart" loading="lazy">
          </div>
        </div>
        
        ` 
      } else {
        Swal.fire(
          'المنتج موجود في السلة بالفعل',
        )
      }
  
      totalPrice();
  

    });

  });

};








/* start function to get product Data */

async function getProductData(productId){
  let productData;
  await getDoc(doc(db,"StoreProducts",`${productId}`)).then(e=>{
    productData = e.data();
  });
  return productData;
};

/* end function to get product Data */






/* start function loadMore start from last eelment and return array from db */

async function loadMore(X){
  const q = query(collection(db, "StoreProducts"), orderBy("date","desc"),startAfter(AllProducts[AllProducts.length-1].date), limit(X||8));
  const querySnapshot = await getDocs(q);
  const cityList = querySnapshot.docs.map(doc => doc.data());

  let array=cityList;

  return array;
}


async function loadMoreWithFilter(X){

  const q = query(collection(db, "StoreProducts"),where("ProductCategorieId",'==',`${AllProducts[0].ProductCategorieId}`), orderBy("date","desc"),startAfter(AllProducts[AllProducts.length-1].date), limit(X||8));
  const querySnapshot = await getDocs(q);
  const cityList = querySnapshot.docs.map(doc => doc.data());

  let array=cityList;

  return array;
}

/* end function loadMore start from last eelment and return array from db */



let currency = "Egp"




/* start function to show data and display it */

function ShowAll(array){
array.forEach(e=>{
  document.querySelector(".cardsDad").innerHTML+=`
  
  <div class="card">
      <div class="CardImgDad">
        <a href="?product=${e.id}">
          <img src="${e.ProductImage}" class="card-img-top cardImg" loading="lazy">
        </a>
      </div>

      <div class="card-body">
          <h1 class="card-title text-color cardName">${e.ProductName}</h1>
          <p class="priceDad">
              <span class="price">${e.ProductPrice}</span>
              <span>${currency}</span>
          </p>
          <div class="btn btn-outline-success btnForAddToCard" data-note="${e.ProductNote}" data-id="${e.id}"> إضافة للسلة  </div>
          
      </div>
      <div style="font-size: 18px; font-weight: 500;">
        <p>
        كود المنتج : ${e.id}
        </p>
      </div>
  </div>
  
  `;
});

};

/* start function to show data and display it */









/*start catch all product in cart and catch user info from inputs and send it to firebase */
document.querySelector(".sendData").addEventListener("click",()=>{

  let AllProductName=document.querySelectorAll(".productName");
  let AllProductPrice=document.querySelectorAll(".productPrice");
  let AllProductNote=document.querySelectorAll(".productNote");
  let AllProductImage=document.querySelectorAll(".productImage");
  let AllProductAmount=document.querySelectorAll(".productAmount");

  let dataStore=[];

  for(let i=0; i<AllProductName.length; i++){
    
    dataStore.push({
      productId: AllProductName[i].dataset.id,
      productName: AllProductName[i].textContent,
      productPrice: parseInt(AllProductPrice[i].textContent),
      productNote: AllProductNote[i].dataset.note,
      productImage: AllProductImage[i].src,
      productAmount: parseInt(AllProductAmount[i].textContent),
      productTotalPrice: parseInt(AllProductPrice[i].textContent)*parseInt(AllProductAmount[i].textContent),
    });
 
  };


  var name = document.querySelector(".NameOfPerson").value
  var phoneNumber = document.querySelector(".phoneNum").value
  var address = document.querySelector(".address").value
  var note = document.querySelector(".noteFromPerson").value


  if(name!=""&&phoneNumber!=""&&address!="")
  {
    let id = (Math.random()*1000000).toFixed();
    setDoc(doc(db,"Persons",`${id}`),{
      id: id,
      name: name,
      phone: phoneNumber,
      city: address,  
      note: note,
      date: Date.now(),
      orderByUser: "المتجر",
      isAccepted: "Orders-New",
      country_calling_code: "+20",
      orderDate: showDate(),
      active: "Store",
      dataStore: dataStore,
      orderNumber: id,
    });

    document.querySelector(".formDad").style.display="none"
    document.querySelector(".NameOfPerson").value=""
    document.querySelector(".phoneNum").value=""
    document.querySelector(".address").value=""

    /**/
    Swal.fire(
      'تم ارسال الطلب',
      'سنقوم بالتواصل معك قريبا',
      'success'
    )
    /**/

  } else{
    Swal.fire("","يجب عليك ادخال الاسم ورقم الهاتف والعنوان")
  };
});

/*end catch all product in cart and catch user info from inputs and send it to firebase */










/*start btn to hide cart div*/
document.querySelector(".btnCart").addEventListener("click", ()=>{
  document.querySelector(".divForCardsHasSelcDad").style.display="block"
  document.querySelector(".cartOk").addEventListener("click", ()=>{
    if(parseInt(document.querySelector(".totalPrice").innerText)!==0)
    {
      document.querySelector(".formDad").style.display="block"
    }
  })
})

document.querySelector(".btnToHide").addEventListener("click", ()=>{
  document.querySelector(".divForCardsHasSelcDad").style.display="none"
})
/*end btn to hide cart div*/












/* start on click */

window.onclick=(e)=>{

   /* start imgBtnOpen */
   if(e.target.classList.value.includes("imgToOpen")){
    let src = e.target.src;
    
    Swal.fire({
      imageUrl: src,
      imageWedith: 100,
      imageAlt: 'A tall image',
      customClass: {
        popup: 'widthContainer100',
      }
    })

  };
  /* end imgBtnOpen */


  /* start detailsBtn */
  if(e.target.classList.value.includes("detailsBtn")){
    let note = e.target.dataset.note;
    
    Swal.fire(`${note}`);

  };
  /* end detailsBtn */



  /* start load more */
  if(e.target.classList.value.includes("LoadMore")){
    loadMore(8).then(e=>{
      AllProducts=e;
      ShowAll(e);
    });
  };
  /* end load more */

  /* start load more */
  if(e.target.classList.value.includes("LoadFilter")){
    loadMoreWithFilter(4).then(e=>{
      AllProducts=e;
      ShowAll(e);
    });
  };
  /* end load more */


  
  /*start add card to cart*/

  if(e.target.classList.value.includes("btnForAddToCard")==true)
  {
    let src = e.target.parentNode.parentNode.querySelector(".cardImg").src;
    let nameOfCard = e.target.parentNode.parentNode.querySelector(".cardName").textContent;
    let priceOfCard = parseInt(e.target.parentNode.parentNode.querySelector(".price").innerText);
    let idOfCard = e.target.dataset.id;
    let noteOfCard = e.target.dataset.note;


    /**/
    if(arrayOfCardsHadAddToCart.includes(nameOfCard)==false)
    {
      arrayOfCardsHadAddToCart.push(nameOfCard)
      
      document.querySelector(".divForCardsHasSelc").innerHTML+=`
      
      <div class="cartDiv productNote" data-note="${noteOfCard}" data-price="${priceOfCard}" data-name="${nameOfCard}" data-src="${src}" data-number="">
        <img src="${src}" class="productImage" loading="lazy">
        <div class="nameOfCardDad">
          <h2 class="productName" data-id="${idOfCard}">${nameOfCard}</h2>
        </div>
        <div class="priceOfCardDad">
          <h2 class="productPrice">${priceOfCard} ${currency}</h2>
        </div>
        <div class="quantityOfCardDad">
          <span class="low">-</span>
          <span style="width: 40px;" class="productAmount">1</span>
          <span class="height">+</span>
        </div>
        <div class="totalPriceOfCardDad">
          <span class="totalPriceCard productTotalPrice">${priceOfCard} ${currency}</span>
        </div>
        <div class="delOfCardDad">
          <img src="./Store Folder/images/delete.png" class="btnForDeletFromCart" loading="lazy">
        </div>
      </div>
      
      ` 
    } else {
      Swal.fire(
        'المنتج موجود في السلة بالفعل',
      )
    }

    totalPrice();
  };
  /*end add card to cart*/




  /* start remove from cart */
  if(e.target.classList.value.includes("btnForDeletFromCart")==true)
  {
    e.target.parentNode.parentNode.remove()
    totalPrice()
    let name = e.target.parentNode.parentNode.children[1].innerText

    for(let i = 0; i < arrayOfCardsHadAddToCart.length; i++){ 
      if(arrayOfCardsHadAddToCart[i].trim()===name.trim())
      {
        arrayOfCardsHadAddToCart.splice(i, 1);
      }
    }
  }
  /* end remove from cart */





  /* start height btn + */
  if(e.target.classList.value.includes("height")==true)
  {
    e.target.parentNode.children[1].innerText++
    let mainNum = parseInt(e.target.parentNode.children[1].innerText)
    let pricee = parseInt(e.target.parentNode.parentNode.children[2].innerText)
    e.target.parentNode.parentNode.children[4].children[0].innerText=`${mainNum*pricee + `${currency}`}`
    totalPrice()
  }
  /* end height btn + */



  

  /* start low btn + */
  if(e.target.classList.value.includes("low")==true)
  {
    if(Number(e.target.parentNode.children[1].innerText>1))
    {
      e.target.parentNode.children[1].innerText--
      let mainNum = parseInt(e.target.parentNode.children[1].innerText)
      let pricee = parseInt(e.target.parentNode.parentNode.children[2].innerText)
      e.target.parentNode.parentNode.children[4].children[0].innerText=`${mainNum*pricee + `${currency}`}`
    }
    totalPrice()
  }
  /* end low btn + */


};

/* end on click */










/* start show and hide form  */

document.querySelector(".hideForm").addEventListener("click", ()=>{
  hideForm()
})


function hideForm()
{
  document.querySelector(".formDad").style.display="none"
}

/* start show and hide form  */





/* start btn scroll */

let btnup = document.getElementById('btnup')

window.onscroll = function() {
  if (window.scrollY >= 200) {
    btnup.style.display = "block";
  } else {
    btnup.style.display = "none";
  }
};

btnup.onclick = function() {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  })
}

/* end btn scroll */











/* 1 start function to get data now */
function showDate(){
  
  const d = new Date();
  
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let hour = d.getHours();
  let mint = d.getMinutes();
  
  if(mint<10){
    mint=`0${mint}`
  }
  
  let dateNow;


  if (hour>=12){
    
    dateNow= `
      ${year}/${month+1}/${day}
      => ${hour-12}:${mint} PM
      `;

  } else if (hour<=11){
    
      dateNow = `
      
      ${year}/${month+1}/${day}
         ${hour}:${mint} AM
      
      `;
  }
  return dateNow;
}

/* 1 end function to get data now */







/* start get bannar imgs */

async function showBannar(){
  
  await getDoc(doc(db,"Bannar","Bannar1")).then(e=>{
    document.querySelector(".sliderImgOne").src=e.data().BannarImg;
    document.querySelector(".sliderLinkOne").href=e.data().BannarLink;
  })
  
  
  await getDoc(doc(db,"Bannar","Bannar2")).then(e=>{
    document.querySelector(".sliderImgTwo").src=e.data().BannarImg;
    document.querySelector(".sliderLinkTwo").href=e.data().BannarLink;
  })
  
  
  await getDoc(doc(db,"Bannar","Bannar3")).then(e=>{
    document.querySelector(".sliderImgThree").src=e.data().BannarImg;
    document.querySelector(".sliderLinkThree").href=e.data().BannarLink;
  })

};

/* end get bannar imgs */







/* start function to save in local storage */


async function saveCartLocal(){
  await localStorage.setItem("divForCardsHasSelc",document.querySelector(".divForCardsHasSelc").innerHTML);
  await localStorage.setItem("numOfCardsAdd",document.querySelector(".numOfCardsAdd").textContent);
  await localStorage.setItem("arrayOfCardsHadAddToCart",JSON.stringify(arrayOfCardsHadAddToCart));
}



async function getCartFromLocal(){

  // console.log(localStorage.getItem("arrayOfCardsHadAddToCart"))

  if(localStorage.getItem("divForCardsHasSelc")!==null){
    document.querySelector(".divForCardsHasSelc").innerHTML=localStorage.getItem("divForCardsHasSelc");
  }

  if(localStorage.getItem("numOfCardsAdd")!==null){
    document.querySelector(".numOfCardsAdd").textContent=localStorage.getItem("numOfCardsAdd");
  } else if(localStorage.getItem("numOfCardsAdd")==null){
    document.querySelector(".numOfCardsAdd").textContent = 0;
  }

  if(localStorage.getItem("arrayOfCardsHadAddToCart")!==null){
    arrayOfCardsHadAddToCart=JSON.parse(localStorage.getItem("arrayOfCardsHadAddToCart"));
  } else if(localStorage.getItem("arrayOfCardsHadAddToCart")==null){
    arrayOfCardsHadAddToCart = [];
  }
};


/* end function to save in local storage */










/* start function to Filter Profucts With Categories */





/* start show all AllStoreCategories in her select */
AllStoreCategoriesInSelect();

async function AllStoreCategoriesInSelect(){

  let R = query(collection(db, "StoreCategories"), orderBy("date","desc"));
  const querySnapshot = await getDocs(R);
  const cityList = querySnapshot.docs.map(doc => doc.data());
  let array=cityList;

  document.querySelector("#AllStoreCategories").innerHTML=`
  
  <option value="AllStoreCategories">كل الاقسام</option>

  `;

  array.forEach(e=>{

    document.querySelector("#AllStoreCategories").innerHTML+=`
      
      <option value="${e.id}">${e.name}</option>
    
    `;

  });


};


/* end show all AllStoreCategories in her select */






document.querySelector("#AllStoreCategories").addEventListener("change",async (e)=>{
  let FilterWith = e.target.value;
  let q;

  if(FilterWith=="AllStoreCategories"){
    document.querySelector(".LoadFilter").style.display="none";
    document.querySelector(".LoadMore").style.display="block";
    q = query(collection(db, "StoreProducts"), orderBy("date","desc"), limit(8));
  } else {
    document.querySelector(".LoadMore").style.display="none";
    document.querySelector(".LoadFilter").style.display="block";
    q = query(collection(db, "StoreProducts"),where("ProductCategorieId",'==',`${FilterWith}`), orderBy("date","desc"), limit(4));
  };
  const querySnapshot = await getDocs(q);
  const cityList = querySnapshot.docs.map(doc => doc.data());
  let array=cityList;
  AllProducts=array;
  document.querySelector(".cardsDad").innerHTML=``;
  ShowAll(array);

});


/* end function to Filter Profucts With Categories */























/* start function FormToSendOrder */



document.querySelector(".FormToSendOrder").addEventListener("submit",(e)=>{
  e.preventDefault();

  let name = document.querySelector(".FormToSendOrder").querySelector("#full_name").value
  let phoneNumber = document.querySelector(".FormToSendOrder").querySelector("#phone_number").value
  let address = document.querySelector(".FormToSendOrder").querySelector("#full_address").value
  let note = document.querySelector(".FormToSendOrder").querySelector("#full_note").value
  let active = document.querySelector(".ProductName").textContent;


  
  
  if(name!=""&&phoneNumber!=""&&address!="")
  {
    let id = (Math.random()*1000000).toFixed();
    setDoc(doc(db,"Persons",`${id}`),{
      id: id,
      name: name,
      phone: phoneNumber,
      city: address,  
      note: note,
      date: Date.now(),
      orderByUser: "المتجر",
      isAccepted: "Orders-New",
      country_calling_code: "+20",
      orderDate: showDate(),
      active: `${active}`,
      orderNumber: id,
    }).then(e=>{


      document.querySelector(".FormToSendOrder").querySelector("#full_name").value=""
      document.querySelector(".FormToSendOrder").querySelector("#phone_number").value=""
      document.querySelector(".FormToSendOrder").querySelector("#full_address").value=""
      document.querySelector(".FormToSendOrder").querySelector("#full_note").value=""






      Swal.fire(
        'تم ارسال الطلب',
        'سنقوم بالتواصل معك قريبا',
        'success'
      )
    })

  } else{
    Swal.fire("","يجب عليك ادخال الاسم ورقم الهاتف والعنوان")
  };

  return false;
});



/* end function FormToSendOrder */