import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCoins from '../hooks/useSelectCoins'
import { coins } from '../data/coins'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: backgroud-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setCoins}) => {

    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    const [coin, SelectCoins] = useSelectCoins('Elige tu moneda', coins)
    const [criptocoin, SelectCriptocoins] = useSelectCoins('Elige tu Criptomoneda', criptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const response = await fetch(url)
            const result = await response.json()

            const arrayCriptos = result.Data.map(cripto => {

                const object = {
                    id: cripto.CoinInfo.Name,
                    name: cripto.CoinInfo.FullName
                }

                return object
            })

            setCriptos(arrayCriptos)

        }

        consultarAPI();
    }, []);

    const handleSubmit = e => {
        e.preventDefault()

        if ([coin, criptocoin].includes('')) {
            setError(true)
            return
        }

        setError(false)
        setCoins({
            coin,
            criptocoin
        })

    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}

            <form
                onSubmit={handleSubmit}
            >
                <SelectCoins />
                <SelectCriptocoins />

                <InputSubmit
                    type='submit' value='Cotizar'
                />
            </form>
        </>
    )
}

export default Form
