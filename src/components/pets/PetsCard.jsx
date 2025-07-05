export function PetsCard({ pet }) {
  return (
    <div>
      <h2>{pet.nombre}</h2>
      <img src={pet.img_url} alt={pet.nombre} />
    </div>
  )
}
