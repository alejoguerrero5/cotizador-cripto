import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Form from './components/Form'
import Quotation from './components/Quotation'
import ImagenCripto from './assets/imagen-criptos.png'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2 rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`


function App() {

  const [coins, setCoins] = useState({});
  const [price, setPrice] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(Object.keys(coins).length>0){
      
      const quoteCripto = async () =>{
        setLoading(true)
        setPrice({})

        const {coin, criptocoin} = coins
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptocoin}&tsyms=${coin}`
        
        const response = await fetch(url)
        const result = await response.json()

        setPrice(result.DISPLAY[criptocoin][coin])
        setLoading(false)
      }

      quoteCripto()

    }
    
  }, [coins]);

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt='Imagenes Criptomonedas'
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form 
          setCoins={setCoins}
        />
        {loading && <Spinner/>}
        {price.PRICE && <Quotation price={price}/>}
      </div>

    </Contenedor>
  )
}

export default App
