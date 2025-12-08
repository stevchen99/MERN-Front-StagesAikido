import React, { useState, useEffect } from 'react';
import { getStages, createStage, updateStage, deleteStage } from './services/api';
import StageForm from './components/StageForm';
import StageList from './components/StageList';
import './App.css'; // We will add styles next

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
            setCurrentStage(null); // Reset form
        } catch (error) {
            alert("Error saving data: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this stage?")) {
            try {
                await deleteStage(id);
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