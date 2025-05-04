```
SiteMap
- Docker Run Project
- User ทดสอบ และ URL เข้าใช้งาน
- Web แสดงผล
- Frontend Performance & PageSpeed
```


## Docker Run Project
```
--------------
1. Run คำสั่ง
--------------
docker-compose up -d หรือ docker-compose up

--------------
2. create table in docker
--------------
docker exec blog_api php artisan migrate

---------------
3. Seed Mockup (User, Admin) ลงตาราง User
---------------
docker exec blog_api php artisan migrate:fresh --seed

---------------
4. Create Symlink  ***********(กรณีรูปไม่ขึ้นและ upload failed)
---------------
- docker exec -it blog_api bash    
- php artisan storage:link
- cd /var/www/storage/app/public  
- mkdir blogs

หรือ new folder blogs ที่ storage/app/public/.... เครื่องผู้ใช้ (mount volumn auto)
---------------
5. Check Container 
---------------
- docker compose ps หรือ docker ps จะได้ตามรูปภาพด้านล่าง

 **หมาายเหตุ blog_api คือ container name
```
![Image](https://github.com/user-attachments/assets/41d315cc-5292-4160-aefd-04a1d9d47ab0)

## User ทดสอบ และ URL เข้าใช้งาน
```
## User (ทั่วไป)
email: member@jakkrit.site
password: Aa112233

## Admin
email: admin@jakkrit.site
pasword: password
```
```
Blog App (frontend):  http://localhost:3000/blogs
Blog Api (backend):  http://localhost:8000/api/blogs
```

### Web แสดงผล
![Image](https://github.com/user-attachments/assets/ac99fe71-c6c2-47a6-abf7-f202de8acd33)
![image](https://github.com/user-attachments/assets/5c2d439d-9046-4380-b80d-22c19a3ca75c)
![image](https://github.com/user-attachments/assets/c7d36b2d-8dab-4e78-a5ca-44d7dfe32d8d)

### -- Frontend Performance & PageSpeed --
```
Desktop
```
![Screenshot 2025-05-04 022339](https://github.com/user-attachments/assets/52661572-a448-4879-90f8-ecb3abebf761)

```
Mobile
```
![Screenshot 2025-05-04 022543](https://github.com/user-attachments/assets/31325acf-5a4a-45bd-a4cd-a6bffcfcf445)

