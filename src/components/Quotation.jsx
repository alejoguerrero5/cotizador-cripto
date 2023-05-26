import styled from "@emotion/styled"

const Container = styled.div`
  color: #FFF;
  font-family: 'Lato', sans-serif;

  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`
const Image = styled.img`
  display: block;
  width: 120px;
`

const Text = styled.p`
  font-size: 18px;
  span{
    font-weight: 700;
  }
`

const Price = styled.p`
  font-size: 34px;
  span{
    font-weight: 700;
  }
`

const Quotation = ({ price }) => {

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = price

  return (
    <Container>
      <Image
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt='imagen cripto'
      />
      <div>
        <Price>El Precio es de: <span>{PRICE}</span></Price>
        <Text>Precio más alto del día <span>{HIGHDAY}</span></Text>
        <Text>Precio más bajo del día: <span>{LOWDAY}</span></Text>
        <Text>Variación ultimas 24 horas <span>{CHANGEPCT24HOUR}</span></Text>
        <Text>Última actualización <span>{LASTUPDATE}</span></Text>
      </div>
    </Container>
  )
}

export default Quotation
