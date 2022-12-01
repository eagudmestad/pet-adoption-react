import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import InputField from './InputField';

function PetEditor({ auth, showError, showSuccess }) {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_URL}/api/pet/${petId}`, {
      method: 'get',
      // params: { species: 'Cat' },
      headers: { authorization: `Bearer ${auth?.token}` },
    })
      .then((res) => {
        console.log(res.data);
        setPet(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        showError(err.message);
      });
  }, [auth, petId]);

  function setPetName(evt) {
    setPet({ ...pet, name: evt.currentTarget.value });
  }

  function setPetSpecies(evt) {
    setPet({ ...pet, species: evt.currentTarget.value });
  }

  function setPetGender(evt){
    setPet({...pet, gender:evt.currentTarget.value})
  }

  const editPet = (evt) => {
    axios(`${process.env.REACT_APP_API_URL}/api/pet/${pet._id}`, {
      method: 'put',
      headers: { authorization: `Bearer ${auth?.token}` },
      data: {name:pet.name,age:pet.age,gender:pet.gender,species:pet.species},
    }).then((res) => {
      console.log(res);
      showSuccess(res.data.message);
    }).catch((err) =>{
      console.log(err);
    });
      
  }


  return (
    <div>
      <h1>Pet Editor</h1>
      {pet && (
        <form>
          <InputField
            label="Pet Name:"
            id="txtPetName"
            className="form-control"
            value={pet.name}
            onChange={(evt) => setPetName(evt)}
          />
           <InputField
            label="Pet Age:"
            id="txtPetAge"
            className="form-control"
            value={pet.age}
            onChange={(evt) => {setPet({...pet,age:evt.currentTarget.value})}}
          / >
          <InputField
            label="Pet Species:"
            id="txtPetSpecies"
            className="form-control"
            value={pet.species}
            onChange={(evt) => setPetSpecies(evt)}
          />
          <div>
           <label htmlFor='rdoFemale'className='form-check-label'>Female</label>
           <input type='radio' value='F' className='form-check-input' id='rdoFemale' name='rdoGender' checked={pet.gender === 'F' ? true : false} onChange={(evt => setPetGender(evt))} />
           <label htmlFor='rdoMale' className='form-check-label ms-2'>Male</label>
           <input type='radio' value='M' className='form-check-input' id='rdoMale' name='rdoGender' checked={pet.gender === 'M' ? true : false} onChange={(evt => setPetGender(evt))}  />
          </div>
          <button type="button" className="btn btn-secondary btn-lg" onClick={(evt) => editPet(evt)}>
            Edit  
          </button>
        </form>
        
      )}
    </div>
  );
}
export default PetEditor;
