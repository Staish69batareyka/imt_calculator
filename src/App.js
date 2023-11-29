import React, {useState} from 'react';

import './index.css'; // файл с красотой :)
import './App.css'; // почти не фигурирует

function App() {

  //объявляем константы

  const [cm, setcm] = useState(null);
  const [kg, setkg] = useState(null);
  const [imt, setimt] = useState(null);
  const [message, setmessage] = useState('')

  /* Интересный факт: оказалось, что если вместо "0" в константе поставить "null", то это будет означать не просто "0"
   как начальное значение, а в прямом смысле "ничто". Таким образом, null читается не как строка, а как пустота.
   Тогда имеет смысл вместо <label> в return использовать placeholder, 
   и поле ввода будет выглядеть аккуратнее*/

  let calculator = (event) => // объект события 
  {
    event.preventDefault() // блокировка доступа после выполнения
    if (cm === null || kg === null) {alert('Введите данные')}
    else { let imt = (kg/((cm/100)**2))
    setimt(imt.toFixed(0)) // сколько знаков после запятой

    //Теперь типа вынесение вердикта
      if (imt<3){
        setmessage(" Неестественно маленький результат. Пожалуйста, проверьте ввод")
    } else if (imt >= 3 && imt <= 16){
      setmessage(" Выраженный дефицит массы тела")
    } else if (imt>16 && imt<=19){
      setmessage(" Дефицит массы тела")
    } else if (imt>19 && imt<=25){
      setmessage(" Норма")
    } else if (imt>25 && imt<=30){
      setmessage(" Избыточная масса")
    } else if (imt>30 && imt<=35){
      setmessage(" Ожирение первой степени")
    } else if (imt>35 && imt<=40){
      setmessage(" Ожирение второй степени")
    } else {setmessage(" Ожирение третьей степени")}
    }
  }



  let reload = () => // обновление страницы
  {window.location.reload()}

  let gifka; // переменная-картинка 
  if (imt < 3){
  gifka = null
  } else if (imt <= 16 && imt>=3)
    {gifka = require('../src/gifky/выраженный дефицит.gif')
  } else if (imt>16 && imt<=19)
    {gifka = require('../src/gifky/дефицит.gif')
  } else if (imt>19 && imt<=25)
    {gifka = require('../src/gifky/норма.gif')
  } else if (imt>25 && imt<=30)
    {gifka = require('../src/gifky/избыточная масса.gif')
  } else if (imt>30 && imt<=35)
    {gifka = require('../src/gifky/ожирение 1.gif')
  } else if (imt>35 && imt<=40)
    {gifka = require('../src/gifky/ожирение 2.gif')
  } else {gifka = require('../src/gifky/ожирение 3.gif')} 

  return (
    <div className='проект'>
      <div className='содержимое'>
        <h2 className='основа'>ЛУЧШИЙ ИМТ КАЛЬКУЛЯТОР</h2>
        <form onSubmit={calculator}> {/* вызов события */}
          <div>
            <input placeholder='Вес (кг)' value={kg} onChange={(event) => setkg(event.target.value)}></input>

            {/* 

            input - создали поле ввода
            value - создаёт значение по умолчанию для поля ввода. Значение будет автоматически вставляться при заходе на страницу
            onChange - возможность потом изменить значение.
            event.target.value - извлекает значение из поля ввода. В то время как "event.target" задаёт значение 

             */}

          </div>
          <div>
            <input placeholder='Рост (cм)' value={cm} onChange={(event) => setcm(event.target.value)}></input>
          </div>
          <div>
            {/* метки кнопки */}
            <button className='кнопка_отпр' type='submit'>Отправить</button> 
            <button className='кнопка_перез' onClick={reload} type='submit'>Перезапустить</button>
          </div>
        </form>

        <div className='основа'>
          <h3>Ваш индекс: {imt}</h3>
          <p>{message}</p> {/* непосредственно вердикт */}
        </div>

        <div className='гифки'>
          <img src={gifka}></img>
        </div>

      </div>
    </div>
    );
}

export default App;
