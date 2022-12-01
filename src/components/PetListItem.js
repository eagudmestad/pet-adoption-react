import { Link } from 'react-router-dom';

function PetListItem({ item }) {
  return (
    <div className="card border-dark mb-2">
      <div className="card-body">
        <h2 className="card-title fs-4">
          <Link to={`/pet/${item._id}`}>{item.name}</Link>
          </h2>
        <div className="card-text">
          <span className="badge bg-primary">Species: {item.species}</span>
          <span className="mx-2 badge bg-primary">
            Gender:{' '}
            {item.gender === 'M'
              ? 'Male'
              : item.gender === 'F'
              ? 'Female'
              : item.gender}
          </span>
          <span className="badge bg-primary">{item.age} years old</span>
        </div>
      </div>
    </div>
  );
}

export default PetListItem;
