import React, { useState, useEffect } from 'react';

const StageForm = ({ currentStage, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        date: '',
        address: '',
        link: '',
        stageName: '',
        cost: '',
        dept: ''
    });

    // Remplir le formulaire en mode édition
    useEffect(() => {
        if (currentStage) {
            // Format de la date pour l'input HTML (YYYY-MM-DD)
            const formattedDate = currentStage.date ? currentStage.date.split('T')[0] : '';
            
            setFormData({
                date: formattedDate,
                address: currentStage.address || currentStage.place || '', // Fallback si d'anciennes données utilisent encore 'place'
                link: currentStage.link || '',
                stageName: currentStage.stageName || '',
                cost: currentStage.cost || '',
                dept: currentStage.dept || ''
            });
        } else {
            setFormData({
                date: '',
                address: '',
                link: '',
                stageName: '',
                cost: '',
                dept: ''
            });
        }
    }, [currentStage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="form-container">
            <h3>{currentStage ? 'Edit Stage' : 'Add New Stage'}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input 
                        type="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div>
                    <label>Adresse:</label>
                    <input 
                        type="text" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        maxLength="150" 
                        required 
                        placeholder="Ex: 10 Rue de la Paix, 75002 Paris" 
                    />
                </div>

                <div>
                    <label>Lien Web (URL):</label>
                    <input 
                        type="url" 
                        name="link" 
                        value={formData.link} 
                        onChange={handleChange} 
                        placeholder="Ex: https://exemple.com/details" 
                    />
                </div>

                <div>
                    <label>Stage Name:</label>
                    <input 
                        type="text" 
                        name="stageName" 
                        value={formData.stageName} 
                        onChange={handleChange} 
                        maxLength="50" 
                        required 
                        placeholder="Max 50 chars" 
                    />
                </div>

                <div>
                    <label>Cost (€):</label>
                    <input 
                        type="number" 
                        name="cost" 
                        value={formData.cost} 
                        onChange={handleChange} 
                        step="0.01" 
                        min="0" 
                        required 
                    />
                </div>

                <div>
                    <label>Dept (2 chars):</label>
                    <input 
                        type="text" 
                        name="dept" 
                        value={formData.dept} 
                        onChange={handleChange} 
                        maxLength="2" 
                        minLength="2" 
                        required 
                        placeholder="e.g. 75" 
                        style={{ textTransform: 'uppercase' }} 
                    />
                </div>
                
                <div className="buttons">
                    <button type="submit" className="btn-save">Save</button>
                    {currentStage && (
                        <button type="button" className="btn-cancel" onClick={onCancel}>
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default StageForm;