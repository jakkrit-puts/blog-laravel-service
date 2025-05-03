# blog-laravel-service" 

```
1.Setup and run Manual
2.Setup and run with Docker
```

## 1. Manual
### 1.How to install Tools 
```
1 Install PHP
- PHP VERSION: 8.1.10    (ติดตั้ง php ตาม version ที่ระบุ)

2.Install Composer  (https://getcomposer.org/)
- Laravel Framework: 10.48.29 

3.Install Node/js
- Node: v23.7.0

4.Install Datbase engine
- Xampp หรือ Laragon ก็ได้  (ต้องตรวจว่าสอบ version php ว่า support peoject หรือไม่)
```

### 2.Install Package and Config .env file 
```
1. cd project_name (backend)
2. composer install & npm install หรือ composer update (option)  # install package
3. create .env  
   $ copy .env.example .env
4. สร้าง ฐานข้อมูล และ config database & jwt ที่ .env (eg. #Database, #JWT) ให้ถูกต้อง
5. set APP_KEY ที่ .env  (generate)
```

### 3. Migrate Database
```
1. php artisan migrate หรือ php artisan migrate:fresh --seed 
(จะมีข้อ User Mockup มาให้ด้วย)

2. php artisan migrate:status
```

### 4. Usage
```
1. php artisan serve (Run project)
2. http://127.0.0.1:8000
3. import collection api 'Blog-Service.postman_collection.json' ที่ postman
(ไฟล์อยู่ Root Project)
```

## 2. Docker

