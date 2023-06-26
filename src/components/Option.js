import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

const Option = ({ data, setOption, setId }) => {



 return (
  <>
   <option
    onClick={() => {
     setOption(data.text);
     setId(data._id)
    }
    } name="option" value={data.value}>{data.text}</option>
   {data.user && <option onClick={() => setId(data._id)} className='userData' value="">{data?.user?.name}</option>
   }
  </>
 );
};

export default Option;