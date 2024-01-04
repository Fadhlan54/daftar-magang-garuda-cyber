
# Test Magang Garuda Cyber

Projek ini dibuat untuk daftar magang di Garuda Cyber





# Entity Relationship Diagram
Berikut adalah entity relationship diagram dari projek yang saya buat

![Entity Relationship Diagram](https://ik.imagekit.io/96gmelvyq/Garuda%20Cyber%20ERD.png?updatedAt=1704363087578)

# Menjalankan Projek Secara Lokal

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