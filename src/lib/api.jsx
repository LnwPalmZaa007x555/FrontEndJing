import axios from 'axios';

const endpoint = "http://localhost:5000/api/";

export const register = async (data) =>
    await axios.post(endpoint+'register',data)

export const login = async (data) =>
    await axios.post(endpoint+'login',data)

export const listRooms = async () =>
    await axios.get(endpoint+'rooms')