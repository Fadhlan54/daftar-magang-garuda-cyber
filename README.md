
# Test Magang Garuda Cyber

Projek ini dibuat untuk daftar magang di Garuda Cyber.
Jika ada hal yang ingin ditanyakan bisa mengontak email muhammadfadhlan0011@gmail.com atau wa 08998653078

## Entity Relationship Diagram
Berikut adalah entity relationship diagram dari projek yang saya buat

![Entity Relationship Diagram](https://ik.imagekit.io/96gmelvyq/Garuda%20Cyber%20ERD.png?updatedAt=1704363087578)


## Environment Variables

Untuk menjalankan projek ini, kamu perlu menambahkkan environment variables ke dalam file .env di backend dan juga di frontend


### Backend
`PORT`
`DB_NAME`
`DB_USER`
`DB_PASS`
`DB_HOST`
`DB_PORT`
`JWT_SECRET`
`IMAGEKIT_PUBLIC_KEY`
`IMAGEKIT_PRIVATE_KEY`
`IMAGEKIT_URL`

### Frontend
`VITE_REACT_APP_API_URL`

## Menjalankan Projek di Lokal

### Menjalankan Backend

Clone projek github

```bash
  git clone https://github.com/Fadhlan54/daftar-magang-garuda-cyber
```

Masuk ke direktori project

```bash
  cd .\daftar-magang-garuda-cyber\
```

masuk ke folder backend

```bash
  cd .\backend\
```

Install dependencies backend

```bash
  npm install
```

Buat database

```bash
  npm run db:create
```

Migrate database

```bash
  npm run db:migrate
```

Seed database

```bash
  npm run db:seed
```

Jalankan server

```bash
  npm run dev
```

### Menjalankan Frontend

Clone projek github

```bash
  git clone https://github.com/Fadhlan54/daftar-magang-garuda-cyber
```

Buka direktori project

```bash
  cd .\daftar-magang-garuda-cyber\
```

Masuk ke folder frontend

```bash
  cd .\frontend\
```

Install dependencies frontend

```bash
  npm install
```

Build Project

```bash
  npm run build
```

Jalankan server

```bash
  npm run preview
```
