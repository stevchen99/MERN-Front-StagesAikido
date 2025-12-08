import React from 'react';

const StageList = ({ stages, onEdit, onDelete }) => {
    return (
        <div className="list-container">
            <h3>Stage List</h3>
            {stages.length === 0 ? (
                <p>No stages found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Place</th>
                            <th>Stage Name</th>
                            <th>Cost (€)</th>
                            <th>Dept</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stages.map((stage) => (
                            <tr key={stage._id}>
                                <td>{new Date(stage.date).toLocaleDateString()}</td>
                                <td>{stage.place}</td>
                                <td>{stage.stageName}</td>
                                <td>{stage.cost}</td>
                                <td>{stage.dept}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => onEdit(stage)}>Edit</button>
                                    <button className="btn-delete" onClick={() => onDelete(stage._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StageList;