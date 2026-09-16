import React, { useState, useEffect } from 'react';

const StageForm = ({ currentStage, onSave, onCancel }) => {
    const initialFormState = {
        date: '',
        address: '',
        link: '',
        stageName: '',
        cost: '',
        dept: '',
        enseignants: [{ firstName: '', lastName: '' }]
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (currentStage) {
            const formattedDate = currentStage.date ? currentStage.date.split('T')[0] : '';
            
            setFormData({
                date: formattedDate,
                address: currentStage.address || currentStage.place || '',
                link: currentStage.link || '',
                stageName: currentStage.stageName || '',
                cost: currentStage.cost || '',
                dept: currentStage.dept || '',
                enseignants: currentStage.enseignants && currentStage.enseignants.length > 0 
                    ? currentStage.enseignants 
                    : [{ firstName: '', lastName: '' }]
            });
        } else {
            setFormData(initialFormState);
        }
    }, [currentStage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle teacher input updates
    const handleTeacherChange = (index, field, value) => {
        const updatedEnseignants = [...formData.enseignants];
        updatedEnseignants[index][field] = value;
        setFormData({ ...formData, enseignants: updatedEnseignants });
    };

    // Add a new empty teacher row
    const handleAddTeacher = () => {
        setFormData({
            ...formData,
            enseignants: [...formData.enseignants, { firstName: '', lastName: '' }]
        });
    };

    // Remove a teacher row
    const handleRemoveTeacher = (index) => {
        const updatedEnseignants = formData.enseignants.filter((_, i) => i !== index);
        setFormData({ ...formData, enseignants: updatedEnseignants });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Filter out any completely empty teacher entries before submitting
        const cleanedData = {
            ...formData,
            enseignants: formData.enseignants.filter(
                (teacher) => teacher.firstName.trim() !== '' || teacher.lastName.trim() !== ''
            )
        };

        onSave(cleanedData);
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

                {/* Enseignants Section */}
                <div className="teachers-section">
                    <label>Enseignants:</label>
                    {formData.enseignants.map((teacher, index) => (
                        <div key={index} className="teacher-row" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input 
                                type="text" 
                                placeholder="Prénom" 
                                value={teacher.firstName} 
                                onChange={(e) => handleTeacherChange(index, 'firstName', e.target.value)}
                            />
                            <input 
                                type="text" 
                                placeholder="Nom" 
                                value={teacher.lastName} 
                                onChange={(e) => handleTeacherChange(index, 'lastName', e.target.value)}
                            />
                            {formData.enseignants.length > 1 && (
                                <button type="button" onClick={() => handleRemoveTeacher(index)}>
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddTeacher} style={{ marginTop: '4px' }}>
                        + Add Teacher
                    </button>
                </div>
                
                <div className="buttons" style={{ marginTop: '16px' }}>
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