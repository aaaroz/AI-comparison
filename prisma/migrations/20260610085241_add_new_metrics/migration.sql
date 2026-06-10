-- CreateTable
CREATE TABLE "BenchmarkResult" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "geminiResponse" TEXT NOT NULL,
    "geminiTaskCompletion" INTEGER NOT NULL,
    "geminiResponseQuality" INTEGER NOT NULL,
    "geminiInstructionFollowing" INTEGER NOT NULL,
    "geminiTravelKnowledge" INTEGER NOT NULL,
    "geminiHallucinationRisk" INTEGER NOT NULL,
    "geminiPracticality" INTEGER NOT NULL,
    "geminiOverallScore" INTEGER NOT NULL,
    "alibabaResponse" TEXT NOT NULL,
    "alibabaTaskCompletion" INTEGER NOT NULL,
    "alibabaResponseQuality" INTEGER NOT NULL,
    "alibabaInstructionFollowing" INTEGER NOT NULL,
    "alibabaTravelKnowledge" INTEGER NOT NULL,
    "alibabaHallucinationRisk" INTEGER NOT NULL,
    "alibabaPracticality" INTEGER NOT NULL,
    "alibabaOverallScore" INTEGER NOT NULL,

    CONSTRAINT "BenchmarkResult_pkey" PRIMARY KEY ("id")
);
