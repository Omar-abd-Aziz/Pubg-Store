

/////* start firebase */////

import {docName,firebaseConfig,initializeApp ,getFirestore,getCountFromServer, collection, query, where, getDocs,getDoc, setDoc, addDoc, doc,deleteDoc,onSnapshot,orderBy, limit,startAt, startAfter,endAt  } from "../firebase.js";


firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = firebase.storage();

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
    let username =  document.querySelector(".username-in").value;
    let password =  document.querySelector(".password-in").value;


    if (username.trim()!==""&&password.trim()!=="") {

        Swal.fire({
            title: 'Please Wait!',
            didOpen: () => {
              Swal.showLoading()
            }
        });

        const q = query(collection(db, "accounts"), where("username", "==", `${username}`), where("password", "==", `${password}`));
        let snapshot = await getCountFromServer(q);
        console.log(snapshot.data().count);

        if(snapshot.data().count!==0){

            Swal.fire({
                title: 'Please Wait!',
                didOpen: () => {
                  Swal.showLoading()
                }
            });

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if(doc.data().id!==undefined){
                    document.querySelector(".username-in").value="";
                    document.querySelector(".password-in").value="";
                    /**/
                    
                    localStorage.setItem(`${docName}`,doc.data().id);
                    localStorage.setItem(`${docName}_personData`,JSON.stringify(doc.data()));
                    // console.log(JSON.parse(localStorage.getItem(`${docName}_personData`)));
                    /**/
                    location.href="../Dashboard-Orders.html";
                } else {
                    Swal.fire("","Usename Or Password Are Wrong","error");
                };
            });

        } else {
            Swal.fire("","Usename Or Password Are Wrong","error");
        };


    } else {Swal.fire("","Enter Usename And Password","error")}

});

/*End Sing In*/






















/////* end firebase */////

const AdminCode="951";
















/* start create account */

document.querySelector(".btn-sign-up").addEventListener("click",async()=>{
    let username = document.querySelector(".username-up").value.trim();
    let password = document.querySelector(".password-up").value.trim();
    let email = document.querySelector(".email-up").value.trim();
    let adminCodeUp = document.querySelector(".AdminCode-up").value.trim();
    let name = username;

    if(username!=""&&password!=""&&email!=""&&adminCodeUp==AdminCode)
    {

        Swal.fire({
            title: 'Please Wait!',
            didOpen: () => {
              Swal.showLoading()
            }
        });


        const q = query(collection(db, "accounts"), where("username", "==", `${username}`));
        let snapshot = await getCountFromServer(q);
        console.log(snapshot.data().count);

 

        if(snapshot.data().count==0){


            Swal.fire({
                title: 'Please Wait!',
                didOpen: () => {
                  Swal.showLoading()
                }
            });

            let id = Math.floor(Math.random() * 1000000000000);



            setDoc(doc(db,"accounts",`${id}`),{
                id: id,
                isAdmin: true,
                name: name,
                username: username,
                password: password,
                email: email,
                date: Date.now(),
            }).then(e=>{

                
                document.querySelector(".username-up").value="";
                document.querySelector(".password-up").value="";
                document.querySelector(".email-up").value="";
                document.querySelector(".AdminCode-up").value="";
                
                /**/
                Swal.fire(
                    ' Account has been Created ',
                    ' You Can Now Log In ',
                    'success'
                );
                /**/
                
                document.querySelector("#tab-1").click();

            });
        

        } else {
            Swal.fire("","Usename Are Used Chose Anthor Username","error");
        };


    }else if(adminCodeUp!=AdminCode) {
        Swal.fire(""," Admin Code Not True","error")
    } else {
        Swal.fire("","Enter Username,Password and Email","error");
    };

});

/* end create account */

















/* start Forgot account Password account */


document.querySelector(".ForgotPassword").addEventListener("click",()=>{
    
    Swal.fire({
        title: ' Change Password ',
        html: `
    
        <div class="mainForm" style="overflow-y: hidden; overflow-c: scroll; font-size: 19px!important; font-family: 'Cairo', sans-serif; font-weight: bold!important;">
        
            <label for="Username"> Username: </label>
            <input style="width: 98%;" class="InputSwal" type="text" dir="auto" autocomplete="off" id="Username" >
            
            <br>
            
            <label for="Email"> Email: </label>
            <input style="width: 98%;" class="InputSwal" type="text" dir="rtl" autocomplete="off" id="Email">
        
            <br>
            
            <label for="NewPassword"> New Password: </label>
            <input style="width: 98%;" class="InputSwal" type="text" dir="rtl" autocomplete="off" id="NewPassword">
    
        </div>
        
        `,
        confirmButtonText: 'Ok',
        showCancelButton: true,
    }).then(async (result) => {

        
        if (result.isConfirmed) {

            let Username = document.querySelector("#Username").value.trim();
            let Email = document.querySelector("#Email").value.trim();
            let NewPassword = document.querySelector("#NewPassword").value.trim();
        
        

            if(Username!=""&&Email!=""&&NewPassword!=""){

                Swal.fire({
                    title: 'Please Wait!',
                    didOpen: () => {
                      Swal.showLoading()
                    }
                });
        
                let q = query(collection(db, "accounts"), where("username", "==", `${Username}`), where("email", "==", `${Email}`));
                let snapshot = await getCountFromServer(q);
                console.log(snapshot.data().count);
        
        
                if(snapshot.data().count!==0){

                    let querySnapshot = await getDocs(q);
                    let arrayOfAccounts = querySnapshot.docs.map(doc => doc.data());


                    setDoc(doc(db,"accounts",`${arrayOfAccounts[0].id}`),{
                        ...arrayOfAccounts[0],
                        password: NewPassword,
                    }).then(e=>{
                        Swal.fire("Done","","success");
                    });

                
                } else{
                    Swal.fire("Username Or Email Wrong","","error")
                };

            } else {
                Swal.fire("","","error")
            };
        
        };

    });


});    



/* start Forgot account Password  */























// await getDoc(doc(db, "accounts", "L8tRIutxitBgha5OdTby")).then(e=>cs(e.data()))



