import PetListItem from './PetListItem';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PetList({ auth }) {
  const [pending, setPending] = useState(true);
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setPending(true);
    setError('');
    axios(`${process.env.REACT_APP_API_URL}/api/pet/list`, {
      method: 'get',
      params: { species: 'Cat' },
      headers: { authorization: `Bearer ${auth?.token}` },
    })
      .then((res) => {
        setPending(false);
        if (_.isArray(res.data)) {
          console.log(res.data);
          setItems(res.data);
        } else {
          setError('Expected an array');
        }
      })
      .catch((err) => {
        setPending(false);
        console.log(err);
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <h1>Pet List</h1>
      {pending && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && <div className="text-danger mb-2">{error}</div>}
      {!error && _.isEmpty(items) && (
        <div className="text-danger mb-2">No Items Found</div>
      )}
      {_.map(items, (item) => (
        <PetListItem key={item._id} item={item} />
      ))}
    </div>
  );
}

export default PetList;
