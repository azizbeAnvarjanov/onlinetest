import React, { useState } from 'react'
import './Admin.css'
import Table from 'react-bootstrap/Table';

import StartFirebase from "../Firebase/Firebase";
import { ref, onValue } from "firebase/database";
const db = StartFirebase();

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      query: "",
    };
  }

  parol_f() {
    let parol = "admin";

    let user_value = document.querySelector(".parol_input").value;
    let input = document.querySelector(".parol_input");
    let parol_box = document.querySelector(".admin_box");
    let alert = document.querySelector(".alert");
    let result_box = document.querySelector(".result_box");

    if (user_value === parol) {
      input.classList.add("right_input");
      setTimeout(() => {
        parol_box.classList.add("active");
        result_box.classList.add("active");
        input.value = "";
      }, 1200);
    } else {
      parol_box.classList.remove("active");
      result_box.classList.remove("active");
      input.classList.add("error_input");
      alert.innerHTML = "Parol notog'ri";
      setTimeout(() => {
        input.classList.remove("error_input");
        alert.innerHTML = "";
      }, 3000);
    }
  }

  filtered(e) {
    this.state.query = e.target.value;
  document
      .querySelectorAll(".name")
      .forEach((el) => {
       if (this.state.query === el.innerHTML) {
          el.closest(".user").classList.add("find_active_noError");
          el.closest(".user").classList.remove("find_active_error");
        }else if(this.state.query === ''){
          el.closest(".user").classList.remove("find_active_error");
          el.closest(".user").classList.remove("find_active_noError");
        }else{
          el.closest('.user').classList.add('find_active_error');
          el.closest(".user").classList.remove("find_active_noError");
       }
      });

  }


  componentDidMount() {
    // /////////////////
    const dbRef = ref(db, "tests");

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
    });
  }

  render() {
    return (
      <div className="dashboard">
        <div className="admin_box">
          <div className="password_box">
            <h2>Parolni kiriting</h2>
            <input
              onInput={this.parol_f}
              className="parol_input"
              type="text"
              placeholder="Parolni kiriting"
            />
            <p className="alert"></p>
          </div>
        </div>

        <div className="result_box">
          <div className="compile_students">
            <h4>Topshirib bo'lgan talabalar - {this.state.tableData.length}</h4>
            <input
              onChange={(e) => this.filtered(e)}
              className="search-input"
              type="text"
              placeholder="Qidirish... "
            />
          </div>
          <Table striped>
            <thead>
              <tr>
                <th>№</th>
                <th>Ismi</th>
                <th>Familiasi</th>
                <th>Tel nomeri</th>
                <th>Tog'ri topganlar soni</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.tableData.map((row, i) => {
                    return (
                      <tr key={row.key} className="user">
                        <td>{i + 1}</td>
                        <td className='name'>{row.data.name}</td>
                        <td>{row.data.lname}</td>
                        <td>{row.data.number}</td>
                        <td>{row.data.ball}</td>
                      </tr>
                    );
                  })
                }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Admin







// row.data.lname.toLowerCase().includes(this.state.query);






// ////////////////////////////
// import React from 'react'
// import './Admin.css'
// import Table from 'react-bootstrap/Table';

// import StartFirebase from "../Firebase/Firebase";
// import { ref, onValue } from "firebase/database";
// const db = StartFirebase();

// function Admin() {


//     let parol = "admin7775";

//     function parol_f() {
//         let user_value = document.querySelector('.parol_input').value;
//         let input = document.querySelector('.parol_input');
//         let parol_box = document.querySelector('.admin_box');
//         let alert = document.querySelector('.alert');
//         let result_box = document.querySelector('.result_box');

//         if (user_value === parol) {
//             input.classList.add('right_input');
//             setTimeout(() => {
//                 parol_box.classList.add('active');
//                 result_box.classList.add('active');
//                 input.value = '';
//             }, 1200);
//         } else {
//             parol_box.classList.remove('active');
//             result_box.classList.remove('active');
//             input.classList.add('error_input');
//             alert.innerHTML = "Parol notog'ri";
//             setTimeout(() => {
//                 input.classList.remove('error_input');
//                 alert.innerHTML = "";
//             }, 3000)
//         }
//     }



//     let tableData = [];

//     const dbRef = ref(db, "tests");

//     onValue(dbRef, (snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//             let keyName = childSnapshot.key;
//             let data = childSnapshot.val();
//             tableData.push({ key: keyName, data: data });
//         });
//     });



//     return (
//         <div className='dashboard'>
//             <div className="admin_box">
//                 <div className="password_box">
//                     <h2>Parolni kiriting</h2>
//                     <input className='parol_input' type="text" placeholder='Parolni kiriting' />
//                     <p className='alert'></p>
//                     <button onClick={parol_f}>Kirish</button>
//                 </div>
//             </div>

//             <div className="result_box">
//                 <div className="compile_students">
//                     <h4>Topshirib bo'lgan talabalar - 100</h4>
//                     <input className='search-input' type="text" placeholder='Qidirish... ' />
//                 </div>
//                 <Table striped>
//                     <thead>
//                         <tr>
//                             <th>Ismi</th>
//                             <th>Familiasi</th>
//                             <th>Tel nomeri</th>
//                             <th>Toplagan bali</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             tableData.map((row) => (
//                                 <>
//                                     <tr>
//                                         <td>{row.data.name}</td>
//                                         <td>{row.data.lname}</td>
//                                         <td>{row.data.number}</td>
//                                         <td>{row.data.ball}</td>
//                                     </tr>
//                                 </>
//                             ))
//                         }
//                     </tbody>
//                 </Table>
//             </div>
//         </div>
//     )
// }

// export default Admin