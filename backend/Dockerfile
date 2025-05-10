FROM python:3.10-slim AS python-node

# ติดตั้ง Node.js และ OpenCV dependencies ใน Python image
RUN apt-get update && apt-get install -y \
    curl \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# ติดตั้ง Python dependencies
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ติดตั้ง Node.js dependencies
COPY package*.json ./
RUN npm install --force

# คัดลอกโปรเจกต์ทั้งหมด
COPY . .

# สร้าง Uploads directory
RUN mkdir -p Uploads

# Prisma generate
RUN npx prisma generate

# Expose port
EXPOSE 5000

# Volume สำหรับ Uploads
VOLUME ["/app/Uploads"]

# รัน backend
CMD ["npm", "start"]
