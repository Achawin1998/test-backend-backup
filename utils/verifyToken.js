// import jwt from 'jsonwebtoken'

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.accessToken; // ชื่อ Token ที่ตั้งเพื่อที่จะเข้าถึง token ที่สร้างไว้กับตัว '/auth/login' 

//     if (!token) {
//         return res.status(401).json({ success: false, message: 'You are not authorized' });
//     }

//     // if token exists then verify the token
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => { // ทำการเช็คว่า tokenถูกต้องมั้ย
//         if (err) {
//             return res.status(401).json({ success: false, message: 'Token is invalid' });
//         }
//         req.user = user;
//         next(); // เรียกใช้ next เพื่อไม่เกิดข้อผิดพลาดและ ส่งต่อไปยัง middleware ถัดไป
//     });
// };

// export const verifyUser = (req, res, next) => { // ตรวจสอบสิทธ์ผู้ใช้
//     verifyToken(req, res, next , () => { // เรียกใช้ ฟังชันตัวข้างบน เพื่อเช็คว่า id === params.id มั้ย 
//         if (req.user.id === req.params.id || req.user.role === 'admin') {
//             next();
//         } else {
//           return  res.status(401).json({ success: false, message: "You are not wwe" });
//         }
//     });
// };
 
// export const verifyAdmin = (req, res, next) => { // ตรวจสอบสิทธ์ admin
//     verifyToken(req, res, next , () => {
//         if (req.user.role === 'admin') {
//             next();
//         } else {
//           return  res.status(401).json({ success: false, message: "You are not authenticated" });
//         }
//     });
// };


import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => { // verifytoken ทำการตรวจ token จาก cookie 
    const token = req.cookies.accessToken;  // ชื่อ Token ที่ตั้งเพื่อที่จะเข้าถึง token ที่สร้างไว้กับตัว '/auth/login'  ถ้า token ถูกต้อง ข้อมูลผู้ใช้จะถูกเก็บใน const token 
    console.log('Token:', token); // เพิ่ม log เพื่อตรวจสอบ token

    if (!token) {
        console.log('No token found'); // เพิ่ม log เพื่อตรวจสอบว่าไม่มี token
        return res.status(401).json({ success: false, message: 'You are not authorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => { 
        if (err) {
            console.log('Token is invalid:', err); // เพิ่ม log เพื่อตรวจสอบว่า token ไม่ถูกต้อง
            return res.status(401).json({ success: false, message: 'Token is invalid' });    
        }
        req.user = user;
        next();
    });
};

// export const verifyUser = (req, res, next) => { 
//     verifyToken(req, res, () => { 
//         console.log('User:', req.user); // เพิ่ม log เพื่อตรวจสอบข้อมูลผู้ใช้
//         if (req.user.id === req.params.id || req.user.role === 'admin') {
//             next();
//         } else {
//             console.log('User is not authorized'); // เพิ่ม log เพื่อตรวจสอบว่า user ไม่มีสิทธิ์
//             return res.status(401).json({ success: false, message: "You are not authorized" });
//         }
//     });
// };

export const verifyUser = (req, res, next) => { 
    verifyToken(req, res, () => { 
        if (req.user) { // แค่เช็คว่ามีผู้ใช้ที่ผ่านการตรวจสอบ token
            next();
        } else {
            console.log('User is not authorized'); // เพิ่ม log เพื่อตรวจสอบว่า user ไม่มีสิทธิ์
            return res.status(401).json({ success: false, message: "You are not authorized" });
        }
    });
};

export const verifyAdmin = (req, res, next) => { 
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You are not authenticated" });
        }
    });
};



// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//     // ดึง token จาก header ของ request
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1]; // ดึง token จาก header

//     if (!token) {
//         return res.status(401).json({ success: false, message: 'You are not authorized' });
//     }

//     // ตรวจสอบว่า token ถูกต้อง
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//         if (err) {
//             return res.status(401).json({ success: false, message: 'Token is invalid' });
//         }
//         req.user = user;
//         next(); // ส่งต่อไปยัง middleware ถัดไป
//     });
// };

// export const verifyUser = (req, res, next) => { // ตรวจสอบสิทธ์ผู้ใช้
//     verifyToken(req, res, () => { // เรียกใช้ฟังก์ชัน verifyToken เพื่อเช็คว่า id === params.id หรือ role เป็น 'admin'
//         if (req.user.id === req.params.id || req.user.role === 'admin') {
//             next();
//         } else {
//             return res.status(401).json({ success: false, message: "You are not authorized" });
//         }
//     });
// };

// export const verifyAdmin = (req, res, next) => { // ตรวจสอบสิทธ์ admin
//     verifyToken(req, res, () => {
//         if (req.user.role === 'admin') {
//             next();
//         } else {
//             return res.status(401).json({ success: false, message: "You are not authenticated" });
//         }
//     });
// };
