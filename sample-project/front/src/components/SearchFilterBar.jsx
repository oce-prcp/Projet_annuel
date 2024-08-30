import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './Dashboard.css';

const SearchFilterBar = ({ setSearchTerm, setSelectedFileType }) => {
    return (
        <div className="search-filter-bar">
            <input 
                type="text" 
                placeholder="Rechercher par nom de fichier" 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-bar"
            />
            <DropdownButton
                id="dropdown-basic-button"
                title="Filtrer par type"
                onSelect={(eventKey) => setSelectedFileType(eventKey)}
                className="filter-dropdown"
                variant="custom"
            >
                <Dropdown.Item eventKey="All">Tous</Dropdown.Item>
                <Dropdown.Item eventKey="image">Image</Dropdown.Item>
                <Dropdown.Item eventKey="video">Vidéo</Dropdown.Item>
                <Dropdown.Item eventKey="audio">Audio</Dropdown.Item>
                <Dropdown.Item eventKey="pdf">PDF</Dropdown.Item>
                <Dropdown.Item eventKey="text">Texte</Dropdown.Item>
                <Dropdown.Item eventKey="autres">Autres</Dropdown.Item>
            </DropdownButton>
        </div>
    );
};

export default SearchFilterBar;
