import React, { useState, useEffect } from 'react';
import { getStages, createStage, updateStage, deleteStage } from './services/api';
import StageForm from './components/StageForm';
import StageList from './components/StageList';
import './App.css';

function App() {
    const [stages, setStages] = useState([]);
    const [currentStage, setCurrentStage] = useState(null);

    // Load data on mount
    useEffect(() => {
        loadStages();
    }, []);

    const loadStages = async () => {
        try {
            const response = await getStages();
            setStages(response.data);
        } catch (error) {
            console.error("Error loading stages:", error);
        }
    };

    const handleSave = async (stageData) => {
        try {
            if (currentStage) {
                // Update existing
                await updateStage(currentStage._id, stageData);
            } else {
                // Create new
                await createStage(stageData);
            }
            loadStages(); // Refresh list
            setCurrentStage(null); // Reset active edit
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            alert("Error saving data: " + errorMessage);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this stage?")) {
            try {
                await deleteStage(id);
                // If we were currently editing the deleted item, reset the form
                if (currentStage && currentStage._id === id) {
                    setCurrentStage(null);
                }
                loadStages();
            } catch (error) {
                console.error("Error deleting:", error);
            }
        }
    };

    const handleEdit = (stage) => {
        setCurrentStage(stage);
    };

    const handleCancel = () => {
        setCurrentStage(null);
    };

    return (
        <div className="app-container">
            <h1>Stage Management System</h1>
            <div className="content">
                <StageForm 
                    currentStage={currentStage} 
                    onSave={handleSave} 
                    onCancel={handleCancel}
                />
                <StageList 
                    stages={stages} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                />
            </div>
        </div>
    );
}

export default App;