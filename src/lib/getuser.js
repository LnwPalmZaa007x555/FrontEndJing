import axios from 'axios';
import Cookies from 'js-cookie';

const endpoint = "http://localhost:5000/api/";

export async function getMe(token) {
    try {
        // เก็บ token ลงใน Cookies (client-side)
        Cookies.set('token', token, { expires: 1 });

        // ส่งคำขอ GET พร้อม cookie ที่มี token
        const response = await axios.get(endpoint + 'getme', {
            withCredentials: true, // อนุญาตให้ส่ง cookie ไปยัง backend
        });

        // ตรวจสอบ response
        if (!response.data.success) {
            throw new Error('Error during booking retrieval');
        }

        return response.data; // ส่งข้อมูลที่ได้จาก response กลับ
    } catch (err) {
        console.error(err); // พิมพ์ข้อผิดพลาดในคอนโซล
        throw err; // โยนข้อผิดพลาดไปยัง caller เพื่อให้สามารถจัดการได้
    }
}