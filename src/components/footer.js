import styled from "styled-components"
import image from "../assets/edited.png"

const Container =styled.div`
    width: 100%;
    padding: 50px;
    background-color: #213851;
    margin-top: 20px;
    display: flex;
    align-items: center;
    color: white;
    bottom: 0;

    @media screen and (max-device-width: 500px){
        padding: 5px;
    }
`
const ImageWrapper=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const SecondPart= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
`
const ListItems =styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin:0;
    align-items:center;
`

const ListItemInner =styled.li`
    cursor: pointer;
    display:inline-block;
    border:0.5px solid transparent;
    transition: 0.2s ease;
    &:hover {
        border-bottom: 0.5px solid #ffffff;
    }
`
const ThirdPart =styled.div`
    text-align: center;
`
const Copyright= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    background-color: #152435;
    color: #ffffff;
`
const Footer =()=>{
    return(
        <div>
        <Container>
          <ImageWrapper className="col-4">
            <img className= "col-5" src={image} alt="logo"></img>
          </ImageWrapper>
          <SecondPart className="col-4">
            <p style={{fontWeight: "bold"}}>EXPLORE</p>
            <ListItems>
              <ListItemInner>Home</ListItemInner>
              <ListItemInner>About</ListItemInner>
              <ListItemInner>Join us</ListItemInner>
              <ListItemInner>Contact</ListItemInner>
            </ListItems>
          </SecondPart>
          <ThirdPart className="col-4">
            <p style={{fontWeight: "bold"}}>Follow</p>
            <ListItems>
              <ListItemInner>Twitter</ListItemInner>
              <ListItemInner>Facebook</ListItemInner>
              <ListItemInner>Instagram</ListItemInner>
              <ListItemInner>Linkedin</ListItemInner>
            </ListItems>
          </ThirdPart>
        </Container>
        <Copyright>Copyrights 2022 © Lakshmi Sai Sumanth</Copyright>
        </div>
    )
}
export default Footer;