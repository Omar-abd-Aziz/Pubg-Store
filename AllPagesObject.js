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
  
document.querySelector(".AllPagesBtns").innerHTML=""
AllPagesObject.forEach(e=>{
  document.querySelector(".AllPagesBtns").innerHTML+=`
      
      <a class="active d-flex align-center fs-14 c-black rad-6 p-10" style="${(`.${location.pathname}`==`${e.link}`)?"background: rgba(176, 206, 226, 0.85)":"background: white;"};display: flex; justify-content: end;" href="${e.link}">
        <span style="font-weight: bold; font-size:20px;">${e.name}</span>
        <i class="${e.iconClass}" style=" ${e.iconStyle}  font-weight: bold; font-size:20px; margin-left: 10px;"></i>
      </a>
      
  `
});






  