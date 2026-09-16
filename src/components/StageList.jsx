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
                            <th>Adresse</th>
                            <th>Lien</th>
                            <th>Stage Name</th>
                            <th>Enseignants</th>
                            <th>Cost (€)</th>
                            <th>Dept</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stages.map((stage) => (
                            <tr key={stage._id}>
                                <td>{new Date(stage.date).toLocaleDateString()}</td>
                                <td>{stage.address || stage.place || '-'}</td>
                                <td>
                                    {stage.link ? (
                                        <a 
                                            href={stage.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            Voir le lien
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td>{stage.stageName}</td>
                                <td>
                                    {stage.enseignants && stage.enseignants.length > 0 ? (
                                        <ul style={{ margin: 0, paddingLeft: '16px' }}>
                                            {stage.enseignants.map((teacher, idx) => (
                                                <li key={idx}>
                                                    {teacher.firstName} {teacher.lastName}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        '-'
                                    )}
                                </td>
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