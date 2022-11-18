import PetListItem from "./PetListItem";

function PetList() {
  const pet = {
    _id:1,
    name:'Cali',
    species:'dog',
    gender:'M',
    age:15
  }
  return (<div>
    <h1>Pet List</h1>
    <PetListItem item={pet} />
  </div>)
}

export default PetList;