import { useParams } from 'react-router-dom'
import PokeCreate from '../components/PokeCreate'
import PokeUpdate from '../components/PokeUpdate'

export default function PokeDetail() {
  const { id } = useParams()
  return id === "+" ? <PokeCreate /> : <PokeUpdate id={id} />
}