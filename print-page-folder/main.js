

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import { getFirestore, collection, query, where, getDocs,getDoc, setDoc, addDoc, doc,deleteDoc,onSnapshot,orderBy, limit,startAt,endAt } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js';

  
import { firebaseConfig } from '../firebase.js';

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let X;

async function getCit(db,X) {
    const citiesCol = collection(db,`${X}`);
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
};


//////////////////////////////////////////////////////////////////////////





/* start set orderNumber */

let OrderNumber=parseInt(Math.random()*1000000);
document.querySelector(".OrderNumber").textContent=OrderNumber;

/* end set orderNumber */



/* start getOfferInfo function */
let OfferInfo;
async function getOfferInfo(OfferId) {
    await getDoc(doc(db,"offers",OfferId)).then(e=>{
        OfferInfo=e.data();
    });
    return OfferInfo;
}

/* end getOfferInfo function */




/* start get Offer Information if url have offer id */


const url = window.location.href;
const searchParams = new URL(url).searchParams; 
const urlSearchParams = new URLSearchParams(searchParams);
let OfferId = urlSearchParams.get('OfferId');


if(OfferId!==null){

    await getOfferInfo(OfferId).then(e=>{
        setTimeout(()=>{

            let OfferInfo = e;

            console.log(OfferInfo);

            document.querySelector(".NameOfBuyer").textContent=OfferInfo.OfferPersonName;
            document.querySelector(".OrderNumber").textContent=OfferInfo.id;
            document.querySelector(".OrderDate").textContent=OfferInfo.OfferDate;
            document.querySelector(".main-table-body").innerHTML=OfferInfo.OfferTableHtml;
            document.querySelector(".OfferNote").innerHTML=OfferInfo.OfferNote;
            document.querySelector(".OfferNote").dataset.text=OfferInfo.OfferNote;

            if(OfferInfo.OfferRival!==undefined){
                document.querySelector(".rival").textContent=OfferInfo.OfferRival;
            };

           

            setTimeout(()=>{
                
                document.querySelectorAll(".Total").forEach(e=>{

                    let TotalPricewithTax = e.dataset.TotalPricewithTax;
                    let TotalPricewithoutTax = (e.textContent).trim();

                    
                    let cc = TotalPricewithTax-TotalPricewithoutTax;
                    cc=cc*100/TotalPricewithoutTax;
                    if(TotalPricewithTax==TotalPricewithoutTax){
                        e.parentNode.parentNode.childNodes[3].innerHTML=`
                        
                        <select id="tax" class="tax">
                            <option value="0">لا يوجد</option>
                            <option value="15">15% القيمة المضافة</option>
                            <option value="14">14% القيمة المضافة</option>
                        </select>
                                    
                        `;

                    } else if (TotalPricewithTax!==TotalPricewithoutTax){
                        e.parentNode.parentNode.childNodes[3].innerHTML=`
                        
                        <select id="tax" class="tax">
                            <option value="${cc}">${cc}% القيمة المضافة</option>
                            <option value="14">14% القيمة المضافة</option>
                            <option value="15">15% القيمة المضافة</option>
                            <option value="0">لا يوجد</option>
                        </select>
                                    
                        `;

                    };
                    
                });


                document.querySelector(".tax").click();




            }, 1000)
            
        },1000)
        
    });

}


/* end get Offer Information if url have offer id */





/* start set date */



document.querySelector(".OrderDate").textContent=showDate();




window.onclick=(e)=>{

let allClassList = [...e.target.classList];
/* start remove btn */


if(allClassList.includes("remove")){
    let divToRemove=e.srcElement.parentNode.parentNode;
    divToRemove.remove();
    calcTotalPrice();
};

if(allClassList.includes("Remove")){
    let divToRemove=e.srcElement.parentNode.parentNode.parentNode;
    divToRemove.remove();
    calcTotalPrice();
};

/* end remove btn */



/* start add btn */

if(allClassList.includes("addToTable")){
    let mainTableBody=document.querySelector(".main-table-body");

    
    let html_to_insert=`
    
    <tr class="ToEdit">
        <td class="remove-dad">
            <span class="Total" data--total-pricewith-tax="0">0</span>
            <button class="remove" hiddenOnPrint>
                <i class="fa-solid fa-trash Remove"></i>
            </button>
        </td>
        <td class="hiddenOnPrint">
            <select id="tax" class="tax">
                <option value="15">15% القيمة المضافة</option>
                <option value="14">14% القيمة المضافة</option>
                <option value="0">لا يوجد</option>
            </select>
        </td>
        <td class="ToChange price">
            0
        </td>
        <td class="ToChange amount">
            0
        </td>
        <td class="ToChange">
            اسم المنتج
        </td>
    </tr>
    
    
    `;


    mainTableBody.insertAdjacentHTML('beforeend', html_to_insert);



};

/* end add btn */




/* start change text */


if(allClassList.includes("ToChange")){

    let text = e.target.textContent;
    text=text.trim();


    Swal.fire({
        title: 'Change Text',
        input: 'text',
        showCancelButton: true,
        inputValue: text,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else{
            e.target.textContent=value;
            calcTotalPrice();
          }
        }
    })

};



if(allClassList.includes("ToChangeNote")){

    let text = e.target.dataset.text;

    Swal.fire({
        showCancelButton: true,
        title: 'Change Text',
        input: 'textarea',
        inputPlaceholder: 'Type your message here...',
        showCancelButton: true,
        inputValue: text,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else{

      
            e.target.dataset.text=value;
            let result =value.replace(/(\r\n|\r|\n)/g, '<br>');
            e.target.innerHTML=result;
            e.target.dataset.text=value;
            calcTotalPrice();
          }
        }
    })

};


/* end change text */






/* start total price function */


if(allClassList.includes("ToChange"&&"price")||allClassList.includes("ToChange"&&"amount")){

    let text = e.target.textContent;
    text=text.trim();


    Swal.fire({
        title: 'Change Text',
        input: 'text',
        showCancelButton: true,
        inputValue: text,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else{
            e.target.textContent=value;
            
            let tax = e.target.parentNode.children[1].children[0].value;
            let price = e.target.parentNode.children[2].textContent;
            let amount = e.target.parentNode.children[3].textContent;
            let orderTotalPriceDiv = e.target.parentNode.children[0].children[0];

            let orderTotalPrice = Number(price)*Number(amount);

            
            orderTotalPriceDiv.textContent=`${orderTotalPrice}`;
            orderTotalPriceDiv.dataset.TotalPricewithTax=`${orderTotalPrice+(Number(tax)/100*orderTotalPrice)}`

            calcTotalPrice()
            
          }
        }
    })

};


if(allClassList.includes("tax")){

    let tax = e.target.parentNode.parentNode.children[1].children[0].value;
    let price = e.target.parentNode.parentNode.children[2].textContent;
    let amount = e.target.parentNode.parentNode.children[3].textContent;
    let orderTotalPriceDiv = e.target.parentNode.parentNode.children[0].children[0];

    let orderTotalPrice = Number(price)*Number(amount);

    orderTotalPriceDiv.textContent=`${orderTotalPrice}`;
    orderTotalPriceDiv.dataset.TotalPricewithTax=`${orderTotalPrice+(Number(tax)/100*orderTotalPrice)}`

    calcTotalPrice()
};


/* end total price function */






function calcTotalPrice(){
    let allOrdersPrices = document.querySelectorAll(".Total")
    let TotalPriceWithoutTax=0;
    let TotalPriceWithTax=0;
    let rival = Number(document.querySelector(".rival").textContent);

    allOrdersPrices.forEach(e=>{
        TotalPriceWithoutTax+=Number(e.textContent);
        TotalPriceWithTax+=Number(e.dataset.TotalPricewithTax);
    })

    document.querySelector(".TotalPriceWithoutTax").textContent=`${TotalPriceWithoutTax}`;
    document.querySelector(".AllTax").textContent=`${TotalPriceWithTax-TotalPriceWithoutTax}`;
    document.querySelector(".TotalPriceWithTax").textContent=`${TotalPriceWithTax}`;
    document.querySelector(".TotalPriceAfterRival").textContent=`${TotalPriceWithTax-rival}`;
}






};















/* start hidde elements before prient */


// window.addEventListener('beforeprint', (event) => {

//     document.body.style.backgroundColor="white";

//     if(Number(document.querySelector(".rival").textContent)==0){
//         document.querySelectorAll(".hiddenIfRival").forEach((e)=>{
//             e.classList.toggle("hidden");
//         })
//     }

//     document.querySelectorAll(".hiddenOnPrint").forEach((e)=>{
//         e.classList.toggle("hidden");
//     })
// });



// window.addEventListener('afterprint', (event) => {

//     document.body.style.backgroundColor="rgb(195, 195, 195)";

//     if(Number(document.querySelector(".rival").textContent)==0){
//         document.querySelectorAll(".hiddenIfRival").forEach((e)=>{
//             e.classList.toggle("hidden");
//         })
//     }

//     document.querySelectorAll(".hiddenOnPrint").forEach((e)=>{
//         e.classList.toggle("hidden");
//     })




// });
/* end hidde elements before prient */









/* start home btn */

document.querySelector(".HomeBtn").addEventListener("click",()=>{
    window.location='../Dashboard-Orders.html';
})



document.querySelector(".PrintBtn").addEventListener("click",()=>{


    let OfferTableHtml = document.querySelector(".main-table-body").innerHTML;
    let OfferId = document.querySelector(".OrderNumber").textContent;
    let OfferPersonName = document.querySelector(".NameOfBuyer").textContent;
    let OfferDate = document.querySelector(".OrderDate").textContent;
    let OfferPrice = document.querySelector(".TotalPriceAfterRival").textContent;
    let OfferNote = document.querySelector(".OfferNote").innerHTML;
    let OfferRival = document.querySelector(".rival").textContent;

    setDoc(doc(db,"offers",OfferId),{

        id: OfferId,
        OfferPersonName: OfferPersonName,
        OfferDate: OfferDate,
        OfferPrice: OfferPrice,
        OfferTableHtml: OfferTableHtml,
        OfferNote: OfferNote,
        OfferRival: OfferRival,
        dateNow: Date.now(),

    }).then(async (e)=>{

        await printPage();

    });





})

/* end home btn */






async function printPage(){
        
    let element = document.querySelector(".main-div");
    
    var opt = {
        margin:       0,
        filename:     `${document.querySelector(".NameOfBuyer").textContent.trim()} (${document.querySelector(".TotalPriceAfterRival").textContent}ر.س).pdf`,
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a3', orientation: 'portrait',precision: '12' }
    };
     
    html2pdf().set(opt).from(element).save();

}










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
    return `${year}/${month+1}/${day}`;
}


/* end set date */






document.querySelector(".OfferNote").addEventListener("input",(element)=>{

    document.querySelector(".OfferNote").style.height = "5px";
    document.querySelector(".OfferNote").style.height = (document.querySelector(".OfferNote").scrollHeight)+"px";
    
});










document.querySelector(".TheFlag").addEventListener("click",(e)=>{

    if(e.target.dataset.flag == "Saudi_Arabia"){
        e.target.dataset.flag="Egypt";
        e.target.src="./print-page-folder/imgs/Flag_of_Egypt.svg";
        document.querySelectorAll(".StateCurrency").forEach(el=>{
            el.textContent="ج.م"
        });
    } else if(e.target.dataset.flag == "Egypt"){
        console.log(e.target.dataset.flag);
        e.target.dataset.flag="Saudi_Arabia";
        e.target.src="./print-page-folder/imgs/Flag_of_Saudi_Arabia.svg";
        document.querySelectorAll(".StateCurrency").forEach(el=>{
            el.textContent="ر.س"
        });
    };
    
});





