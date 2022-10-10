import React, { useState, useEffect } from 'react'
import './Student.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BsCalendar2CheckFill } from 'react-icons/bs'


function Student() {

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [unCorrectAnswers, setUnCorrectAnswers] = useState(0);
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);





  function toBegin_() {
    document.querySelector('.savollar_qollanma').classList.add('qollanma_active')
    document.querySelector('.testlar').classList.add('testlar_active_1');
  }


  useEffect(() => {
    axios.get('https://6342931dba4478d4783dead2.mockapi.io/questions')
      .then((res) => setData(res.data))
    axios.get('https://6342931dba4478d4783dead2.mockapi.io/answers')
      .then((res) => setAnswers(res.data))
  },[]);


  function cor_uncor(e) {
      if (e.target.value === 'true') {
        setCorrectAnswers(correctAnswers + 1);
      }else {
        setUnCorrectAnswers(unCorrectAnswers + 1);
      }
  }


  function handleFinish() {
    console.log(correctAnswers);
    document.querySelectorAll('input')
      .forEach((el) => el.checked = false);

    document.querySelector('.testlar').classList.remove('testlar_active_1');
    document.querySelector('.testlar').classList.add('testlar_active_2');
    document.querySelector('.forma').classList.add('forma_active_1');
  }
  
  function show_popup() {
    document.querySelector('.popup').classList.add('active');
    document.querySelectorAll('.forma_input')
    .forEach((el) => el.value = '');
    console.log(correctAnswers);
  }

  function end_test() {
    setCorrectAnswers(0);
    setUnCorrectAnswers(0);
    console.log(correctAnswers);
  }



  const [details, setDetails] = useState({
    name: "",
    lname: "",
    number: "",
    ball: 0,
  });




  const PostData = async () => {

    details.ball = correctAnswers

    const { name, lname, number, ball } = details;


    const res = await fetch(
      "https://test-pr-7d46d-default-rtdb.firebaseio.com/tests.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lname,
          number,
          ball,
        }),
      }
    );
  };



  return (
    <div className='savollar'>

      <div className="savollar_qollanma">
          <h3>Test topshirish uchun qollanma ?</h3>
          <p>Test savollari Anatomiya va biologia fanlaridan olingan testlar 20 dona xarbir tog'ri javob uchun siz 10 balni qolga kiritasiz imtihondan o'tish uchun siz minimal 70 bal toplashingiz kerak boladi, va test natijasini 24-soat ichida operatorlarimiz aloqaga chiqishadi.</p>
          <button onClick={toBegin_}>Boshlash</button>
      </div>

      <div className="testlar">

          <h1>Savollar</h1>
          <hr />
          {
            data.map((question) => {
              return(
                <div className="question" key={question.id}>
                  <h2>{question.text}</h2>
                  <div className="answers">
                    {
                      answers.map((answer) => {
                        if (question.id === answer.questionId) {
                          return (
                            <div className='answer_v'>
                              <input
                                value={answer.correct}
                                type="radio"
                                id={answer.questionId}
                                name={"answer" + answer.questionId}
                                onChange={(e) => cor_uncor(e)}
                              /> <label htmlFor={"answer" + answer.questionId}>{answer.text}</label>
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                </div>
              )
            })
          }
          
      <button className='finish_btn' onClick={handleFinish}>Testni tugatish</button>

      </div>
          
        <div className="forma">
          <h5>Ism familiyangizni yozib qoldiring</h5>

          <label>Ism</label>
          <input 
          className='forma_input' 
          type="text" 
          placeholder='Ismingizni kiriting'
          onChange={(e) => setDetails({ ...details, name: e.target.value })} 
          /> 

          <label>Familiya</label>
          <input 
          className='forma_input' 
          type="text" 
          placeholder='Familiyangizni kiriting'
          onChange={(e) => setDetails({ ...details, lname: e.target.value })}
          /> 

          <label>Telefon</label>
          <input 
          className='forma_input' 
          type="text" 
          placeholder='Telefon raqamizni kiriting'
          onChange={(e) => setDetails({ ...details, number: e.target.value })}
          /> 


          <button onClick={() => {
          show_popup();
          PostData();
          }}>Jo'natish</button>
        </div>

        <div className="popup">
            <div className="popup_message">
              <BsCalendar2CheckFill />
              <h4>Test tugadi natijasi 24 soat ichida sizga jonatiladi.</h4>
              <Link to="/" className='end_btn' onClick={end_test}>OK</Link>
            </div>
        </div>

        


    </div>
  )
}

export default Student