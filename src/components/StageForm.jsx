import React, { useState, useEffect } from 'react';

const StageForm = ({ currentStage, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        date: '',
        place: '',
        stageName: '',
        cost: '',
        dept: ''
    });

    // Populate form if editing
    useEffect(() => {
        if (currentStage) {
            // Format date for HTML input (YYYY-MM-DD)
            const formattedDate = currentStage.date.split('T')[0];
            setFormData({ ...currentStage, date: formattedDate });
        } else {
            setFormData({ date: '', place: '', stageName: '', cost: '', dept: '' });
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
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Place:</label>
                    <input type="text" name="place" value={formData.place} onChange={handleChange} maxLength="50" required placeholder="Max 50 chars" />
                </div>
                <div>
                    <label>Stage Name:</label>
                    <input type="text" name="stageName" value={formData.stageName} onChange={handleChange} maxLength="50" required placeholder="Max 50 chars" />
                </div>
                <div>
                    <label>Cost (€):</label>
                    <input type="number" name="cost" value={formData.cost} onChange={handleChange} step="0.01" min="0" required />
                </div>
                <div>
                    <label>Dept (2 chars):</label>
                    <input type="text" name="dept" value={formData.dept} onChange={handleChange} maxLength="2" minLength="2" required placeholder="e.g. 75" style={{ textTransform: 'uppercase' }} />
                </div>
                
                <div className="buttons">
                    <button type="submit" className="btn-save">Save</button>
                    {currentStage && <button type="button" className="btn-cancel" onClick={onCancel}>Cancel Edit</button>}
                </div>
            </form>
        </div>
    );
};

export default StageForm;