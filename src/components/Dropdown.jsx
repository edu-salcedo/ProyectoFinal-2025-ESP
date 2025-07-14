
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

export default function DropdownCategory({ category, onSelectCategory }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [show, setShow] = useState(false);

    // useEffect para actualizar el estado de selctedCategory si viene una categoria en la prop category o cambie
    useEffect(() => {
        if (!category) {
            setSelectedCategory('');
        }
        else {
            setSelectedCategory(category);
        }
    }, [category]);

    // Función para manejar el toggle del dropdown muestra u oculta el menú
    const handleToggle = () => {
        setShow(prev => !prev);
    };

    // Llamamos a la función onSelectCategory cuando se selecciona una categoría
    const handleSelectCategory = (eventKey) => {
        setSelectedCategory(eventKey);
        onSelectCategory && onSelectCategory(eventKey); // Llamamos al callback del padre si existe para evitar el error de undefined
    };
    return (
        <Dropdown show={show} onToggle={handleToggle} onSelect={handleSelectCategory}>
            <Dropdown.Toggle variant="light" className="w-100">

                {selectedCategory || "Seleccioná una categoría"}

            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
                <Dropdown.Item eventKey="Celulares">Celulares</Dropdown.Item>
                <Dropdown.Item eventKey="Climatización">Climatización</Dropdown.Item>
                <Dropdown.Item eventKey="Herramientas">Herramientas</Dropdown.Item>
                <Dropdown.Item eventKey="Notebooks">Notebooks</Dropdown.Item>
                <Dropdown.Item eventKey="Moda">Moda</Dropdown.Item>
                <Dropdown.Item eventKey="Televisores">Televisores</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};