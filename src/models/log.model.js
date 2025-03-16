import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

export const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    algorithm: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    input: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    output: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    execution_time_ms: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'logs',
    timestamps: false,
});