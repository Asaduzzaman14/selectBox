import React from 'react';

const Option = ({ data, setOption, setId, openModal }) => {



 return (
  <>




   <option
    onClick={() => {
     setOption(data.text);
     setId(data._id)
    }
    } name="option" value={data.value}>{data.text}</option>
   {data.user && <option onClick={() => {
    setId(data._id)
    openModal(data)
   }
   } className='userData text-black' value="">{data?.user?.name}</option >
   }
  </>
 );
};

export default Option;