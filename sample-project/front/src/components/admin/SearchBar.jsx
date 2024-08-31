import React from 'react';
import './SearchBar.css'; 

const SearchBar = ({ searchTerm, setSearchTerm, selectedFileType, setSelectedFileType, showFilter }) => {
    return (
        <div className="search-bar-container">
            <input 
                type="text" 
                placeholder={showFilter ? "Rechercher par nom de fichier" : "Rechercher par nom"} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-bar"
            />
            {showFilter && (
                <select 
                    value={selectedFileType}
                    onChange={(e) => setSelectedFileType(e.target.value)} 
                    className="filter-dropdown-admin"
                >
                    <option value="All">Tous</option>
                    <option value="image">Image</option>
                    <option value="video">Vidéo</option>
                    <option value="audio">Audio</option>
                    <option value="pdf">PDF</option>
                    <option value="text">Texte</option>
                    <option value="autres">Autres</option>
                </select>
            )}
        </div>
    );
};

export default SearchBar;
