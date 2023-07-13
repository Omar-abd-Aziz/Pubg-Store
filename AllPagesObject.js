let AllPagesObject = [
{
  name: "المتجر",
  link: "./Dashboard-Store.html",
  iconClass: "fa-regular fa-cart-shopping",
  iconStyle: "color: black;",
},
{
  name: "الطلبات",
  link: "./Dashboard-Orders.html",
  iconClass: "fa-regular fa-circle-user fa-fw",
  iconStyle: "color: black;",
},
{
  name: "الشحن",
  link: "./Dashboard-Delivery.html",
  iconClass: "fa-solid fa-truck",
  iconStyle: "color: black;",
},
// {
//   name: "قسم التدريب",
//   link: "./Dashboard-Trainer.html",
//   iconClass: "fa-solid fa-book",
//   iconStyle: "color: black;",
// },
// {
//   name: "طلبات التفعيل",
//   link: "./Dashboard-OrdersActives.html",
//   iconClass: "fa-solid fa-circle-check fa-fw",
//   iconStyle: "color: blue;",
// },
{
  name: "العملاء",
  link: "./Dashboard-Accepted.html",
  iconClass: "fa-regular fa-circle-user fa-fw",
  iconStyle: "color: green;",
},
{
  name: "الارشيف",
  link: "./Dashboard-Archived.html",
  iconClass: "fa-solid fa-folder-open fa-fw",
  iconStyle: "color: gray;",
},
// {
//   name: "الدعم الفني",
//   link: "./Dashboard-Technical-Support.html",
//   iconClass: "fa-solid fa-headset",
//   iconStyle: "color: gray;",
// },
// {
//   name: "الموردين",
//   link: "./Dashboard-Suppliers.html",
//   iconClass: "fa-regular fa-truck-field",
//   iconStyle: "color: blue;",
// },
// {
//   name: "عرض السعر",
//   link: "./Print-Page.html",
//   iconClass: "fa-solid fa-file-invoice-dollar",
//   iconStyle: "color: blue;",
// },
// {
//   name: "التقارير",
//   link: "./Dashboard-Reports.html",
//   iconClass: "fa-regular fa-book",
//   iconStyle: "color: black;",
// },

]



let bg=`background-image: radial-gradient(circle at top right, rgb(78, 78, 78) 0%, rgb(78, 78, 78) 1%,rgb(72, 72, 72) 1%, rgb(72, 72, 72) 10%,rgb(65, 65, 65) 10%, rgb(65, 65, 65) 22%,rgb(59, 59, 59) 22%, rgb(59, 59, 59) 23%,rgb(53, 53, 53) 23%, rgb(53, 53, 53) 28%,rgb(46, 46, 46) 28%, rgb(46, 46, 46) 37%,rgb(40, 40, 40) 37%, rgb(40, 40, 40) 100%);`
  
document.querySelector(".AllPagesBtns").innerHTML=""
AllPagesObject.forEach(e=>{
  document.querySelector(".AllPagesBtns").innerHTML+=`
      
      <a class="active d-flex align-center fs-14 c-black rad-6 p-10" style="${(`.${location.pathname}`==`${e.link}`)?`${bg} color: white;`:"background: white;"};display: flex; justify-content: end;" href="${e.link}">
        <span style="font-weight: bold; font-size:20px;">${e.name}</span>
        <i class="${e.iconClass}" style="${(`.${location.pathname}`==`${e.link}`)?`color: white;`:`${e.iconStyle}`}  font-weight: bold; font-size:20px; margin-left: 10px;"></i>
      </a>
      
  `
});






  