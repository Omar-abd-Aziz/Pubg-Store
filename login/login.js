

/////* start firebase */////

/*1*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import { getFirestore, collection, getDocs,getDoc, setDoc, addDoc, doc,query,where } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js';

// TODO: Replace the following with your app's Firebase project configuration
import { firebaseConfig } from '../firebase.js';

// firebase.initializeApp(firebaseConfig);
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






/*Start Sing In*/


document.querySelector(".btn-sign-in").addEventListener("click",async()=>{
    let username =  document.querySelector(".username-in").value
    let password =  document.querySelector(".password-in").value

    if (username.trim()!==""&&password.trim()!=="") {

        const q = query(collection(db, "accounts"), where("username", "==", `${username}`), where("password", "==", `${password}`));

        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length==0){
            Swal.fire("","Usename Or Password Are Wrong","error");
        }
        querySnapshot.forEach((doc) => {  
            if(doc.data().id!==undefined){
                document.querySelector(".username-in").value=""
                document.querySelector(".password-in").value=""
                /**/
                localStorage.setItem("doc-digital-id",doc.data().id);
                /**/
                location.href="../Dashboard-Orders.html"
            } else {
                Swal.fire("","Usename Or Password Are Wrong","error");
            }
        });

    } else {Swal.fire("","Enter Usename And Password","error")}

})

/*End Sing In*/





/////* end firebase */////

const AdminCode="951";




/* start create account */

document.querySelector(".btn-sign-up").addEventListener("click",async()=>{
    var username = document.querySelector(".username-up").value
    var password = document.querySelector(".password-up").value
    var password2 = document.querySelector(".password-up-2").value
    var email = document.querySelector(".email-up").value
    let name = username

    

    if(username!=""&&password!=""&&password2!=""&&email==AdminCode&&password==password2)
    {

        function idGenerator() {
            var S4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        };

        let id = idGenerator();

        let q = query(collection(db, "accounts"), where("username", "==", `${username}`));

        const querySnapshot = await getDocs(q);
        if(querySnapshot.docs.length==0){
            setDoc(doc(db,"accounts",id),{
                isAdmin: true,
                id: id,
                name: name,
                username: username,
                password: password,
                date: Date.now(),
            }).then(e=>{
                Swal.fire(
                    'تم انشاء الحساب',
                    'يمكنك الان تسجيل الدخول',
                    'success'
                )
            });
        

            document.querySelector(".username-up").value=""
            document.querySelector(".password-up").value=""
            document.querySelector(".email-up").value=""
            document.querySelector(".password-up-2").value=""

            document.querySelector("#tab-1").click()
    
        } else {
            Swal.fire(
                'الاسم موجود بالفعل',
                'برجاء اختيار اسم اخر',
                'error'
            )
        }

      

    }else if(email!=AdminCode) {
        Swal.fire("","Error, Admin Code Not True","")
    } else if(username!=""&&password!=password2) {
        Swal.fire("","The Two Password Should be the Same and Enter Admin Code","error")
    } else {
        Swal.fire("","Enter Username,Password,admin code and Email","error")
    }
})

/* end create account */



// await getDoc(doc(db, "accounts", "L8tRIutxitBgha5OdTby")).then(e=>cs(e.data()))



