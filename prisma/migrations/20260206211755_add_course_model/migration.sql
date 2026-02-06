-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "projects" INTEGER NOT NULL,
    "mode" JSONB NOT NULL,
    "priceOnline" INTEGER NOT NULL,
    "priceOffline" INTEGER,
    "icon" TEXT NOT NULL DEFAULT 'BookOpen',
    "gradient" TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
    "curriculum" JSONB NOT NULL,
    "tools" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
