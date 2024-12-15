import axios from 'axios';
import Cookies from 'js-cookie';

const endpoint = "http://localhost:5000/api/";

export default async function creatUserBooking(data,token){
    console.log(token)
    console.log(roomId)
    try {
        console.log('test')
        // เก็บ token ลงใน Cookies (client-side)
        Cookies.set('token', token, { expires: 1 });

        const response = await axios.post(endpoint + 'bookings/'+roomId, data,{
            withCredentials: true,
        });
        
        // creatUserBooking({customerId : data.customerId,
        //     r
        //  })

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