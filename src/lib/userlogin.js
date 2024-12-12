import axios from 'axios';

const endpoint = "http://localhost:5000/api/";

export default async function userLogin(userEmail, userPassword){
    try {
        const data = {
            email: userEmail,
            password: userPassword
        };
        console.log('ควย')
        const response = await axios.post(endpoint + 'login', data);
        
        // ตรวจสอบว่า login สำเร็จหรือไม่
        if (!response.data.success) {
            throw new Error('Error during login');
        }
        
        return response.data; // ส่งข้อมูลที่ได้จาก response กลับ
    } catch (err) {
        console.error(err); // พิมพ์ข้อผิดพลาดในคอนโซล
        throw err; // โยนข้อผิดพลาดไปยัง caller เพื่อให้สามารถจัดการได้
    }
}
