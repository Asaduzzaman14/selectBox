import { useEffect, useState } from 'react';
import './App.css';
import Option from './components/Option';

function App() {


  const [option, setOption] = useState('')
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [agree, setAgree] = useState(false)
  console.log(id);

  const [data, setData] = useState()

  const getDate = () => {
    fetch('http://localhost:5000/all-options')
      .then(res => res.json())
      .then(data => { setData(data?.data); })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  useEffect(() => {
    getDate()
  }, [])

  const fromHandel = () => {

    if (!option || !name || !agree) {
      alert('All fields are mandatory');
      return
    }

    const data = {
      name: name,
      sectors: option,
      agree: agree
    }

    console.log(data);
    fetch(`http://localhost:5000/addData/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        alert('New data added');
        getDate()
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });


    console.log("ok");


  }
  return (
    <div className="App">

      <header className="App-body">
        <div >
          <h3>
            Please enter your name and pick the Sectors you are currently involved in.
          </h3>
          <div>
            <div className='nameInput'>
              <label htmlFor="name">Name:</label>
              <input onChange={(e) => setName(e.target.value)} type="text" name='name' />
            </div>
            {/* <select name="" id="">
              <option value="a"></option>
            </select> */}
            <select className='selectBox' name='select' multiple="" size="5">
              {
                data?.map(data => {
                  return <Option
                    key={data._id}
                    setId={setId}
                    setOption={setOption}
                    data={data}></Option>

                })
              }
            </select>


            <div>
              <input onClick={(e) => setAgree(!agree)} name='agree' type="checkbox" /> <span>Agree to terms</span>
              <br />
              <input onClick={() => fromHandel()} className='submit' type="submit" value="Save" />
            </div>

          </div>




        </div>
      </header>
    </div>
  );
}

export default App;
