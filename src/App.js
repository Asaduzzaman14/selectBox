import { useEffect, useState } from 'react';
import './App.css';
import Option from './components/Option';

function App() {


  const [option, setOption] = useState('')
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [agree, setAgree] = useState(false)
  const [userData, setUserData] = useState('')

  console.log(id);

  const [data, setData] = useState()

  // get all data from DB
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

    // data vaidatin
    if (!option || !name || !agree) {
      alert('All fields are mandatory');
      return
    }

    const data = {
      name: name,
      sectors: option,
      agree: agree
    }

    // console.log(data);
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

  }


  // modal function
  const openModal = (data) => {
    if (!name) {
      alert('you are not able to this data')
      return
    }
    setUserData(data?.user?.name)
    window.my_modal_1.showModal()

  }
  const handleInputChange = (event) => {
    setUserData(event.target.value);
  };

  const updateUserDate = () => {
    const data = {
      name: userData
    }
    console.log(data);
    fetch(`http://localhost:5000/updateData/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)

    })
      .then(res => res.json())
      .then(data => {
        alert('Updated Succesfull');
        getDate()
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }



  return (
    <div className="App">

      <header className="App-body">
        <div >

          <h3 className=' text-2xl font-bold mt-5 mb-2'>Please enter your name and pick the Sectors you are currently involved in.</h3>

          <div className='pb-5'>
            <div className='nameInput mr-10'>
              <label htmlFor="name">Name:</label>
              <input className='bg-white text-black' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} type="text" name='name' />
            </div>

            <dialog id="my_modal_1" className="modal">
              <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Update Your Data</h3>

                <p className="py-4">You can Update Your name</p>

                <input
                  className='bg-gray-300 p-1 text-black rounded-sm'
                  value={userData}
                  onChange={handleInputChange}
                  type="text" />

                <div>
                  <button
                    onClick={() => updateUserDate()}
                    className='submit bg-green-500 text-white' >Update</button>
                </div>

                <div className="modal-action">
                  <button className="btn">Close</button>
                </div>
              </form>
            </dialog>

            <select className='selectBox bg-gray-100 text-black' name='select' multiple="" size="5">
              {
                data?.map(data => {
                  return <Option
                    key={data._id}
                    setId={setId}
                    setOption={setOption}
                    openModal={openModal}
                    data={data}></Option>

                })
              }
            </select>


            <div>
              <input onClick={(e) => setAgree(!agree)} name='agree' type="checkbox" /> <span>Agree to terms</span>
              <br />
              <button onClick={() => fromHandel()} className='submit bg-green-500 text-white' type="submit" value="" >Save</button>
            </div>

          </div>




        </div>
      </header>
    </div>
  );
}

export default App;
