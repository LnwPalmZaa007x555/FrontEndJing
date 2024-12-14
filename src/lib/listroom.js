import axios from 'axios';

const endpoint = "http://localhost:5000/api/";

export default async function listRoom(){
    try {
        console.log('test')
        
        const response = await axios.get(endpoint + 'rooms');
        
        // ตรวจสอบว่า login สำเร็จหรือไม่
        if (!response.data.success) {
            throw new Error('Error during login');
        }
        console.log(response.data)
        return response.data; // ส่งข้อมูลที่ได้จาก response กลับ
    } catch (err) {
        console.error(err); // พิมพ์ข้อผิดพลาดในคอนโซล
        throw err; // โยนข้อผิดพลาดไปยัง caller เพื่อให้สามารถจัดการได้
    }
}