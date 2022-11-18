

function PetListItem({item}){
  return (<div className="card">
    <div>{item.name}</div>
    <div>{item.species}</div>
    <div>{item.gender}</div>
    <div>{item.age}</div>
  </div>)
}

export default PetListItem;