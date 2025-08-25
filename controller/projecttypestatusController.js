import ProjectTypeStatus from "../models/ProjectTypeStatus";


export const createProjectTypeStatus = async (req, res) => {
    try {
        const { type, status } = req.body;
        const projectTypeStatus = await ProjectTypeStatus.create({ type, status });
        res.status(201).json(projectTypeStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProjectTypeStatus = async (req, res) => {
    try {
        const projectTypeStatus = await ProjectTypeStatus.find();
        res.status(200).json(projectTypeStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProjectTypeStatus = async (req, res) => {
    try {
        const { type, status } = req.body;
        
        const projectTypeStatus = await ProjectTypeStatus.findByIdAndUpdate(req.params.id, { type, status }, { new: true });
        res.status(200).json(projectTypeStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProjectTypeStatus = async (req, res) => {
    try {
        const projectTypeStatus = await ProjectTypeStatus.findByIdAndDelete(req.params.id);
        res.status(200).json(projectTypeStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
