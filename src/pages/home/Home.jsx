import { Image } from "react-bootstrap"
import banner from "../../assets/banner.jpg"
import tvCategory from "../../assets/tvCategory.jpg"
import toolsCategory from "../../assets/toolsCategory.gif"
import climaCategory from "../../assets/climaCategory.png"
import { useNavigate } from "react-router-dom"
import styled from "styled-components";

export default function Home() {

    return (
        <>
            <Image src={banner} alt="banner" className=" mw-100 mt-5" />
            <div className=" d-flex flex-wrap justify-content-around  gap-2 mt-5">
                <CategoryCard image={tvCategory} name="televisores" />
                <CategoryCard image={toolsCategory} name="herramientas" />
                <CategoryCard image={climaCategory} name="climatización" />
            </div>
        </>
    )
}

function CategoryCard({ image, name }) {

    const navigate = useNavigate();

    const handleCategoryClik = () => {
        navigate(`/productos?categoria=${name}`);
    }

    return (
        <StyledImage src={image} alt={name} onClick={handleCategoryClik} />
    );
}
const StyledImage = styled.img`
    width: 25rem;                
    height: auto;
    object-fit: cover; 
    border-radius: 15px;
    cursor: pointer;
    object-fit: contain;
    &:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }                
`;