import mongoose from "mongoose";

const userCollection = 'usuarios'
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        required: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial']
    }
});


export const userModel = mongoose.model(userCollection, userSchema)