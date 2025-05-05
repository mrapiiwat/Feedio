-- CreateTable
CREATE TABLE "Dog" (
    "Dog_ID" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Breed" TEXT NOT NULL,
    "Weight" DOUBLE PRECISION NOT NULL,
    "Disease" TEXT,
    "Age" DOUBLE PRECISION NOT NULL,
    "Sex" TEXT NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("Dog_ID")
);

-- CreateTable
CREATE TABLE "Feeder" (
    "Feeder_ID" TEXT NOT NULL,
    "Food_Capacity" DOUBLE PRECISION NOT NULL,
    "Current_Food" DOUBLE PRECISION NOT NULL,
    "Status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feeder_pkey" PRIMARY KEY ("Feeder_ID")
);

-- CreateTable
CREATE TABLE "Feeding_Schedule" (
    "Schedule_ID" TEXT NOT NULL,
    "Feeder_ID" TEXT NOT NULL,
    "Dog_ID" TEXT NOT NULL,
    "Feeding_Time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Food_Amount" DOUBLE PRECISION NOT NULL,
    "Day_Type" TEXT NOT NULL,

    CONSTRAINT "Feeding_Schedule_pkey" PRIMARY KEY ("Schedule_ID")
);

-- CreateTable
CREATE TABLE "Feeding_History" (
    "History_ID" TEXT NOT NULL,
    "Feeder_ID" TEXT NOT NULL,
    "Dog_ID" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Time" TIMESTAMP(3) NOT NULL,
    "Given_Amount" DOUBLE PRECISION NOT NULL,
    "Remaining_Amount" DOUBLE PRECISION NOT NULL,
    "Image_Captured" TEXT,

    CONSTRAINT "Feeding_History_pkey" PRIMARY KEY ("History_ID")
);

-- CreateTable
CREATE TABLE "Weight_Sensor" (
    "Sensor_ID" TEXT NOT NULL,
    "Feeder_ID" TEXT NOT NULL,
    "Measured_Weight" DOUBLE PRECISION NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Weight_Sensor_pkey" PRIMARY KEY ("Sensor_ID")
);

-- CreateTable
CREATE TABLE "AI_Food_Recommendation" (
    "Recommendation_ID" TEXT NOT NULL,
    "Dog_ID" TEXT NOT NULL,
    "Recommended_Breakfast" DOUBLE PRECISION NOT NULL,
    "Recommended_Lunch" DOUBLE PRECISION NOT NULL,
    "Recommended_Dinner" DOUBLE PRECISION NOT NULL,
    "Date_Generated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AI_Food_Recommendation_pkey" PRIMARY KEY ("Recommendation_ID")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "Notification_ID" TEXT NOT NULL,
    "Feeder_ID" TEXT NOT NULL,
    "Dog_ID" TEXT NOT NULL,
    "Message" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("Notification_ID")
);

-- CreateTable
CREATE TABLE "_DogToFeeder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DogToFeeder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DogToFeeder_B_index" ON "_DogToFeeder"("B");

-- AddForeignKey
ALTER TABLE "Feeding_Schedule" ADD CONSTRAINT "Feeding_Schedule_Feeder_ID_fkey" FOREIGN KEY ("Feeder_ID") REFERENCES "Feeder"("Feeder_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feeding_Schedule" ADD CONSTRAINT "Feeding_Schedule_Dog_ID_fkey" FOREIGN KEY ("Dog_ID") REFERENCES "Dog"("Dog_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feeding_History" ADD CONSTRAINT "Feeding_History_Feeder_ID_fkey" FOREIGN KEY ("Feeder_ID") REFERENCES "Feeder"("Feeder_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feeding_History" ADD CONSTRAINT "Feeding_History_Dog_ID_fkey" FOREIGN KEY ("Dog_ID") REFERENCES "Dog"("Dog_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weight_Sensor" ADD CONSTRAINT "Weight_Sensor_Feeder_ID_fkey" FOREIGN KEY ("Feeder_ID") REFERENCES "Feeder"("Feeder_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AI_Food_Recommendation" ADD CONSTRAINT "AI_Food_Recommendation_Dog_ID_fkey" FOREIGN KEY ("Dog_ID") REFERENCES "Dog"("Dog_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_Feeder_ID_fkey" FOREIGN KEY ("Feeder_ID") REFERENCES "Feeder"("Feeder_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_Dog_ID_fkey" FOREIGN KEY ("Dog_ID") REFERENCES "Dog"("Dog_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DogToFeeder" ADD CONSTRAINT "_DogToFeeder_A_fkey" FOREIGN KEY ("A") REFERENCES "Dog"("Dog_ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DogToFeeder" ADD CONSTRAINT "_DogToFeeder_B_fkey" FOREIGN KEY ("B") REFERENCES "Feeder"("Feeder_ID") ON DELETE CASCADE ON UPDATE CASCADE;
